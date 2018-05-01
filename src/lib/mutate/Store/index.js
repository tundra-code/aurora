import React from "react";
import StoreItemList from "./StoreItemList";
import StoreContainer from "./Container";
import StoreSearchBar from "./StoreSearchBar";
import { Container } from "../../ui";
import search from "../npm-search";
import debounce from "debounce";
import { setScreen } from "../../../redux/actions";
import { connect } from "react-redux";
import { itemArrayToKeyValueObj, pkgKey } from "./util";
import { nextState, UNINSTALL } from "./InstallStates";
import { Map } from "immutable";
import { installMutation, uninstallMutation } from "../mutationsManager";
import { preferences, allNotes } from "../../../redux/selectors";
import Analytics from 'electron-google-analytics';

const analytics = new Analytics('UA-117599866-1');


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
    if (this.props.preferences && this.props.preferences.mutations) {
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

  itemValues = () => {
    return Array.from(this.state.items.values());
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
    this.bumpPkgInstallState(pkg); // Installing
    installMutation(pkg.name, this.props.dispatch).then(() =>
      this.bumpPkgInstallState(pkg)
    ); // Installed
    return analytics.event('Mutation', 'install', { evLabel: pkg.name, evValue: 1, clientID:window.clientID})
      .then((response) => {
        return response;
      }).catch((err) => {
        return err;
      });
  };

  mutationsInUse = () => {
    const mutationsInUse = [];
    for (const id in this.props.notes) {
      mutationsInUse.push(this.props.notes[id].mutationName);
    }
    return mutationsInUse;
  };

  mutationIsInUse = pkg => {
    const mutationsInUse = this.mutationsInUse();
    if (pkg.keywords === undefined) {
      return false;
    }
    for (const keyword of pkg.keywords) {
      if (mutationsInUse.includes(keyword)) {
        return true;
      }
    }
    return false;
  };

  onUninstallClick = pkg => {
    if (this.mutationIsInUse(pkg)) {
      if (
        !window.confirm(
          "This extension is currently used by a note(s). Are you sure you want to remove it?"
        )
      ) {
        return;
      }
    }
    uninstallMutation(pkg.name, this.props.dispatch);
    this.bumpPkgInstallState(pkg);

    return analytics.event('Mutation', 'uninstall', { evLabel: pkg.name, evValue: 1,clientID:window.clientID})
      .then((response) => {
        return response;
      }).catch((err) => {
        return err;
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
            items={this.itemValues()}
            onClick={this.onInstallClick}
            onUninstallClick={this.onUninstallClick}
          />
        </Container>
      </StoreContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    preferences: preferences(state),
    notes: allNotes(state)
  };
};

export default connect(mapStateToProps)(Store);
