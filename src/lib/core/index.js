import React from "react";
import { withMutations } from "../mutate";
import Frame from "../frame";
import { connect } from "react-redux";
import { Themed } from "../theme";
import { setToast } from "../../redux/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class Core extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(setToast("do you like cats?", "info"));
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.toast.type) {
      case "error":
        toast.error(nextProps.toast.message);
        break;
      case "warn":
        toast.warn(nextProps.toast.message);
        break;
      case "info":
        toast.info(nextProps.toast.message);
        break;
      default:
        toast(nextProps.toast.message);
    }
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
