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

export default class App extends React.Component {
  state = { value: 0 };

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
      (window as any).logger.info("session initialized");
    }
  }
  render() {
    const { value } = this.state;
    return (
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
                label="Properties"
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
      </BrowserRouter>
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

// export default withStyles(styles, { withTheme: true })(FullWidthTabs);
