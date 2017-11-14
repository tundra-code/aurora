import React from "react";
import { withMutations } from "../mutate";
import Frame from "../frame";
import { connect } from "react-redux";
import { Themed } from "../theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class Core extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.createToast(nextProps);
  }

  createToast(nextProps) {
    if (!nextProps.toast) {
      return;
    }
    if (nextProps.toast.type) {
      toast[nextProps.toast.type](nextProps.toast.message);
      return;
    }
    toast(nextProps.toast.message);
  }

  render() {
    return (
      <Themed>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <Frame />
      </Themed>
    );
  }
}

const mapStateToProps = state => {
  return {
    toast: state.toast
  };
};

export default connect(mapStateToProps)(withMutations(Core));
