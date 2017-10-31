import React from "react";
import StoreItemList from "./StoreItemList";
import StoreContainer from "./Container";
import StoreSearchBar from "./StoreSearchBar";
import StoreContentContainer from "./StoreContentContainer";
import search from "../npm-search";
import debounce from "debounce";

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
        this.setState({ items: data.objects });
      });
  };

  onSearch = ({ target }) => {
    const searchValue = target.value;
    this.setState({ searchValue });
    this.searchAndUpdate(searchValue);
  };

  onInstallClick = pack => {
    // TODO: Install application here
  };

  render() {
    return (
      <StoreContainer>
        <StoreContentContainer>
          <StoreSearchBar
            value={this.state.searchValue}
            onChange={this.onSearch}
          />
          <StoreItemList
            items={this.state.items}
            onClick={this.onInstallClick}
          />
        </StoreContentContainer>
      </StoreContainer>
    );
  }
}

export default Store;
