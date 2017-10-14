import React from "react";
import { Background } from "../ui";
import { MutationsProvider } from "@react-mutate/core";
import { installMutations, loadMutations } from "@react-mutate/loader";
import PropTypes from "prop-types";
import path from "path";

// The actually renderable app
const App = ({ mutations }) => (
  <MutationsProvider mutations={mutations}>
    <Background className="background" />
  </MutationsProvider>
);
App.propTypes = {
  mutations: PropTypes.object.isRequired
};

// A little loader to show the user before we get going
const Loader = () => <div> Hold on, loading mutations... </div>;

const installAndLoadMutations = async () => {
  const userMutations = []; // We have no mutations yet.
  const mutationsPath = path.resolve("../../../extensions");
  await installMutations(userMutations, mutationsPath);
  return await loadMutations(mutationsPath);
};

// A wrapper that shows the loader while we wait for mutations
class Core extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const install = () => {
      this.setState({
        mutations: installAndLoadMutations()
      });
    };

    install();
  }

  render() {
    if (!this.state.mutations) {
      return <Loader />;
    }

    return <App mutations={this.state.mutations} />;
  }
}

export default Core;
