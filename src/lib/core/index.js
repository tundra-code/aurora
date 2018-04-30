import React from "react";
import { withMutations } from "../mutate";
import Frame from "../frame";
import { connect } from "react-redux";
import { Themed } from "../theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import * as selectors from "../../redux/selectors";
import Analytics from 'electron-google-analytics';

const analytics = new Analytics('UA-117599866-1');


class Core extends React.Component {
  constructor(props) {
    super(props);
    this.analytics();
  }

  analytics = () => {
    return analytics.screen('Aurora', '1.0.0', 'com.aurora.test', 'com.app.installer', 'MainScreen')
  .then((response) => {
    window.clientID=response.clientID;
    return response;
  }).catch((err) => {
    return err;
  });
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
    toast: selectors.toast(state)
  };
};

export default connect(mapStateToProps)(withMutations(Core));
