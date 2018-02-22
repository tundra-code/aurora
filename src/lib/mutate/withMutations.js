import React from "react";
import { MutationsProvider } from "@react-mutate/core";
import requireMutations from "./requireMutations";

function arrayToObject(muts) {
  let ob = {};
  for (const m of muts) {
    ob = Object.assign(ob, m.mutations);
  }
  return ob;
}
/**
 * A React HOC that wraps an app with react-mutate.
 */
const withMutations = Component => {
  class WithMutations extends React.Component {
    componentWillMount() {
      const muts = requireMutations();

      if (muts && muts.length !== 0 && muts[0]) {
        this.setState({ mutations: arrayToObject(muts) });
      }
    }

    componentDidMount() {
      this.forceUpdate();
    }

    getMutations = () => {
      if (
        this.state && // State exists
        this.state.mutations // We loaded mutations without an error
      ) {
        return this.state.mutations;
      }

      return {};
    };

    render() {
      return (
        <MutationsProvider mutations={this.getMutations()}>
          <Component {...this.props} />
        </MutationsProvider>
      );
    }
  }

  return WithMutations;
};

export default withMutations;
