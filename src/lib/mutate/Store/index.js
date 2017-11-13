import React from "react";
import StoreItemList from "./StoreItemList";
import StoreContainer from "./Container";
import StoreSearchBar from "./StoreSearchBar";
import { Container } from "../../ui";
import search from "../npm-search";
import debounce from "debounce";
import { setScreen } from "../../../redux/actions";
import { connect } from "react-redux";
import rendererEvents from "../../electron-events/renderer";
import { itemArrayToKeyValueObj, pkgKey } from "./util";
import { nextState, UNINSTALL } from "./InstallStates";
import { Map } from "immutable";

class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      items: Map()
    };

    // Don't search more than once every 100 miliseconds
    this.searchAndUpdate = debounce(this.searchAndUpdate, 100);

    this.searchAndUpdate();
  }

  markItemsAsUninstallable = data => {
    let muts = [];
    if (this.props.preferences) {
      muts = this.props.preferences.mutations.map(m => m.name);
    }

    data.objects = data.objects.map(obj => {
      // If we've already got this mutation, then let the user uninstall it
      if (muts.includes(obj.package.name)) {
        obj.package.installState = UNINSTALL;
      }
      return obj;
    });

    return data;
  };

  searchAndUpdate = query => {
    search(query)
      .then(res => res.data)
      .then(this.markItemsAsUninstallable)
      .then(data => {
        this.setState({ items: Map(itemArrayToKeyValueObj(data.objects)) });
      });
  };

  onSearch = ({ target }) => {
    const searchValue = target.value;
    this.setState({ searchValue });
    this.searchAndUpdate(searchValue);
  };

  onBackClick = () => {
    this.props.dispatch(setScreen("main"));
  };

  bumpPkgInstallState = (pkg, isError) => {
    this.setState(prevState => {
      const key = pkgKey(pkg);
      if (isError) {
        return prevState.items.set(key, pkg);
      }

      const item = prevState.items.get(key);
      const installState = item.package.installState;
      item.package.installState = nextState(installState);

      prevState.items.set(key, item);
      return prevState;
    });
  };

  onInstallClick = pkg => {
    this.bumpPkgInstallState(pkg);
    rendererEvents.sendInstallMutation(pkg);

    rendererEvents.onMutationInstalled((event, pkg) => {
      this.bumpPkgInstallState(pkg);
    });
  };

  render() {
    return (
      <StoreContainer>
        <Container>
          <a href="#" onClick={this.onBackClick}>
            👈 Back
          </a>

          <StoreSearchBar
            value={this.state.searchValue}
            onChange={this.onSearch}
          />
          <StoreItemList
            items={this.state.items}
            onClick={this.onInstallClick}
          />
        </Container>
      </StoreContainer>
    );
  }
}

const mapStateToProps = state => {
  return { preferences: state.preferences };
};

export default connect(mapStateToProps)(Store);
