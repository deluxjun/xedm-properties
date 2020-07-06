import React, { FunctionComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import Properties from "./component/xedm-properties";
import { Provider } from "mobx-react";
import { store } from "./stores";
import helper from "./utils/helper";
import log4js from "log4js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import intl from "react-intl-universal";

require("intl/locale-data/jsonp/en.js");

const locales = {
  "en-US": require("@/locales/en.json"),
  "ko-KR": require("@/locales/ko.json"),
};

var logger = log4js.getLogger();

interface TabPanelProps {
  children?: React.ReactNode;
  dir: any;
}

function TabContainer(props: TabPanelProps) {
  const { children, dir, ...other } = props;
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

interface IStyle {
  flexGlow: number;
  backgroundColor: string;
  width: number;
}

class App extends React.Component {
  state = { value: 0, initDone: false };

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ value: newValue });
  };

  async componentWillMount() {
    if (window.navigator.onLine) {
      // TODO: init websocket server
      // TODO: hide window
      // init log
      helper.initLog(process.env.NODE_ENV !== "production");
      // check session and init
      await store.session.init();
      await store.session.setAuth(
        "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhODI2ODE3YWRkOWQ0MGE2YmFlNWYxY2IxOTg3OWQ4MCIsImlhdCI6MTU5Mzc0MDUwNiwic3ViIjoiIiwiaXNzIjoiMzc0MDI5IiwiZXhwIjoxNTkzNzQ3NzA2fQ.NAcPHaFW9_ujUX-WYaiGqlGrIjmlHtRVluq_OMl2cc0"
      );
      logger.info("session initialized");
    }
  }
  componentDidMount() {
    this.loadLocales();
  }
  loadLocales() {
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    intl
      .init({
        currentLocale: "ko-KR", // TODO: determine locale here
        locales,
      })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({ initDone: true });
      });
  }
  render() {
    const { value } = this.state;

    return (
      this.state.initDone && (
        // <Provider {...stores}>
        <BrowserRouter>
          <div>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={this.handleChange}
                aria-label="simple tabs example"
              >
                <Tab
                  value={0}
                  label={intl.get("label.properties")}
                  component={Link}
                  to="/properties"
                />
                <Tab value={1} label="Item Two" component={Link} to="/two" />
              </Tabs>
            </AppBar>

            <Switch>
              <Route path="/properties" component={PageShell(PropertiesItem)} />
              {/* <Route path="/two" component={PageShell(ItemTwo)} /> */}
            </Switch>
          </div>
          <ToastContainer autoClose={5000} closeOnClick position="top-center" />
        </BrowserRouter>
      )
      // </Provider>
    );
  }
}
// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// }));
// export default function FullWidthTabs() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <Provider {...stores}>
//       <BrowserRouter>
//         <div className={classes.root}>
//           <AppBar position="static" color="default">
//             <Tabs
//               value={value}
//               onChange={handleChange}
//               aria-label="simple tabs example"
//             >
//               <Tab
//                 value={0}
//                 label="Properties"
//                 component={Link}
//                 to="/properties"
//               />
//               <Tab value={1} label="Item Two" component={Link} to="/two" />
//             </Tabs>
//           </AppBar>

//           <Switch>
//             <Route path="/properties" component={PageShell(PropertiesItem)} />
//             {/* <Route path="/two" component={PageShell(ItemTwo)} /> */}
//           </Switch>
//         </div>
//       </BrowserRouter>
//     </Provider>
//   );
// }

function PropertiesItem() {
  return (
    <Paper>
      <Properties />
    </Paper>
  );
}

function ItemTwo() {
  return (
    <Paper>
      <div>Item two</div>
    </Paper>
  );
}

const PageShell = (Page: FunctionComponent) => {
  return (props: any) => (
    <div className="page">
      {console.log(props)}
      <Page {...props} />
    </div>
  );
};

export default App;
