import React from "react";
import { MutationsProvider } from "@react-mutate/core";
import requireMutations from "./requireMutations";

// A little loader to show the user before we get going
const Loader = () => <div> Hold on, loading mutations... </div>;

/**
 * A React HOC that wraps an app with react-mutate. 
 */
const withMutations = Component => {
  class WithMutations extends React.Component {
    constructor(props) {
      super(props);
      const muts = requireMutations();
      this.state = { showLoader: false, mutations: muts[0].mutations };
    }

    componentDidMount() {
      this.forceUpdate();
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
