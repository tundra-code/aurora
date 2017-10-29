import React from "react";
import StoreItem from "./StoreItem";
import StoreContainer from "./Container";
import StoreSidebar from "./StoreSidebar";
import StoreContentContainer from "./StoreContentContainer";

class Store extends React.Component {
  render() {
    return (
      <StoreContainer>
        <StoreSidebar>
          <p>Hello yes hello</p>
        </StoreSidebar>
        <StoreContentContainer>
          <StoreItem
            title={"Github"}
            description={"Foo fuzzballs caterpillars and stuff"}
          />
          <StoreItem
            title={"Github"}
            description={"Foo fuzzballs caterpillars and stuff"}
          />
          <StoreItem
            title={"Github"}
            description={"Foo fuzzballs caterpillars and stuff"}
          />
        </StoreContentContainer>
      </StoreContainer>
    );
  }
}

export default Store;
