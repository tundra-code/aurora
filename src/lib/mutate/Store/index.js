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
import { INSTALLED } from "./InstallStates";

class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      items: []
    };

    // Don't search more than once every 100 miliseconds
    this.searchAndUpdate = debounce(this.searchAndUpdate, 100);

    this.searchAndUpdate();
  }

  searchAndUpdate = query => {
    search(query)
      .then(res => res.data)
      .then(data => {
        this.setState({ items: itemArrayToKeyValueObj(data.objects) });
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

  onInstallClick = pkg => {
    rendererEvents.sendInstallMutation(pkg);
    rendererEvents.onMutationInstalled((event, pkg) => {
      this.setState(prevState => {
        pkg.installState = INSTALLED;
        prevState.items[pkgKey(pkg)] = pkg;
      });

      // TODO ADD SOMETHING HERE
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
            items={Object.values(this.state.items)}
            onClick={this.onInstallClick}
          />
        </Container>
      </StoreContainer>
    );
  }
}
export default connect()(Store);
