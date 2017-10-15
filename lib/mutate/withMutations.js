import { ipcRenderer } from "electron";
import React from "react";
import { MutationsProvider } from "@react-mutate/core";

// Send a request to the main process to install mutations
ipcRenderer.send("install-mutations");

// A little loader to show the user before we get going
const Loader = () => <div> Hold on, loading mutations... </div>;

/**
 * A React HOC that wraps an app with react-mutate. 
 */
const withMutations = Component => {
  class WithMutations extends React.Component {
    constructor(props) {
      super(props);
      this.state = { showLoader: true, mutations: {} };
    }

    componentDidMount() {
      // Politely ask the main process to let us know when it has loaded some mutations
      ipcRenderer.on("mutations-loaded", (event, mutations) => {
        this.setState({ mutations: mutations, showLoader: false });
      });
    }

    render() {
      if (this.state.showLoader) {
        return <Loader />;
      }

      return (
        <MutationsProvider mutations={this.state.mutations}>
          <Component {...this.props} />
        </MutationsProvider>
      );
    }
  }

  return WithMutations;
};

export default withMutations;
