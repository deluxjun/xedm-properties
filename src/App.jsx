import React, { FunctionComponent } from "react";
import {
  Link,
  Route,
  BrowserRouter,
  Switch,
  withRouter,
} from "react-router-dom";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

import { Provider } from "mobx-react";
import { stores } from "./stores";
import helper from "./utils/helper";
import log4js from "log4js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import intl from "react-intl-universal";
import initWebSocket from "@/service/wsserver";
import Properties from "./component/xedm-properties";
import History from "./pages/History";

// import koyaml from "json-loader!yaml-loader!@/locales/ko.yaml";

require("intl/locale-data/jsonp/en.js");

const locales = {
  "en-US": require("@/locales/en.json"),
  "ko-KR": require("@/locales/ko.json"),
};

var logger = log4js.getLogger();

// const { wss } = require("@/service/wsserver");
class App extends React.Component {
  pages = [];

  state = { selected: 0, initDone: false };

  handleChange = (event) => {
    this.setState({ selected: event.selected });
    console.log("selected : " + event.selected);
  };

  async componentWillMount() {
    if (window.navigator.onLine) {
      // init websocket server
      initWebSocket();
      // TODO: hide window
      // init log
      helper.initLog(process.env.NODE_ENV !== "production");
      // check session and init
      await stores.session.init();
      await stores.session.setAuth(
        "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhODI2ODE3YWRkOWQ0MGE2YmFlNWYxY2IxOTg3OWQ4MCIsImlhdCI6MTU5Mzc0MDUwNiwic3ViIjoiIiwiaXNzIjoiMzc0MDI5IiwiZXhwIjoxNTkzNzQ3NzA2fQ.NAcPHaFW9_ujUX-WYaiGqlGrIjmlHtRVluq_OMl2cc0"
      );
      logger.info("session initialized");
    }
  }
  componentDidMount() {
    this.loadLocales();
    this.initPages();
  }
  // init page
  initPages = () => {
    this.pages = [
      {
        disabled: false,
        index: 0,
        path: "/properties",
        title: intl.get("label.properties"),
        component: PropertiesItem(),
      },
      {
        disabled: false,
        index: 1,
        path: "/history",
        title: intl.get("label.history"),
        component: HistoryItem(),
      },
    ];
  };
  loadLocales() {
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    intl
      .init({
        currentLocale: "ko-KR",
        locales,
      })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({ initDone: true });
      });
  }

  setSelectedIndex = (pathName) => {
    let currentPath = this.pages.find((item) => item.path === pathName);
    return currentPath.index;
  };

  render() {
    const { selected } = this.state;
    // const selected = this.setSelectedIndex(this.props.location.pathname);

    return (
      this.state.initDone && (
        // <Provider {...stores}>
        <BrowserRouter>
          <div>
            <TabStrip selected={selected} onSelect={this.handleChange}>
              {this.pages.map((item) => {
                return (
                  <TabStripTab disabled={item.disabled} title={item.title}>
                    {item.component}
                  </TabStripTab>
                );
              })}
            </TabStrip>
            <Switch>
              <Route path="/properties" component={PageShell(PropertiesItem)} />
              <Route path="/history" component={PageShell(HistoryItem)} />
            </Switch>
          </div>
          <ToastContainer autoClose={5000} closeOnClick position="top-center" />
        </BrowserRouter>
      )
      // </Provider>
    );
  }
}

function PropertiesItem() {
  return <Properties />;
}

function HistoryItem() {
  return <History />;
}

const PageShell = (Page) => {
  return (props) => (
    <div className="page">
      <Page {...props} />
    </div>
  );
};

export default App;
