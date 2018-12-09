import React, { Component, Fragment } from 'react';
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import _ from 'lodash';

import HeaderContainer from '../../containers/HeaderContainer';
import AdminRouteContainer from '../../containers/AdminRouteContainer';

import Home from '../../scenes/Home';

import AccountUnavailable from '../AccountUnavailable';
import Loading from  '../Loading';

const ONE_SECOND = 1000;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  body > div {
    height: 100%;
  }

  body {
    font-family: 'Barlow';
    font-size: 16px;
    color: #0D2484;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h3 {
    font-family: 'Barlow';
    font-weight: 700;
  }
`;

class App extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      web3: props.web3,
      giveaway: props.giveaway,
      accounts: props.accounts,
    };

    this.interval = null;
    this.pollAccounts = this.pollAccounts.bind(this);
    this.watchContract = this.watchContract.bind(this);
  }

  componentDidMount() {
    this.props.onLoad();

    // this.pollAccounts();
  }

  componentWillReceiveProps({ web3, giveaway, accounts }) {
    if (!_.isEqual(this.props.web3, web3)) {
      this.setState({ web3 });
    }

    if (!_.isEqual(this.props.giveaway, giveaway)) {
      this.setState({ giveaway }, () => {
        this.watchContract();
      });
    }

    if (!_.isEqual(this.props.accounts, accounts)) {
      this.setState({ accounts });
    }
  }

  pollAccounts() {
    if (!this.interval) {
      this.interval = setInterval(this.props.getAccounts, ONE_SECOND);
    }
  }

  watchContract() {
    const { giveaway: { Contract }, web3: { web3 } } = this.state;
    // Contract.events.SpotReserved((err, result) => {
    //   this.props.spotReserved(err, result);
    //   console.log('spot reserved ', err, result);
    // });

    // Contract.events.AllSpotsReserved((err, result) => {
    //   console.log('all spots reserved ', err, result);
    // });

    // ownerFee - 334999999665000000000
    // payoutToWinner - 3014999996985000000000
    Contract.events.Winner((err, result) => {
      this.props.onWinner(err, result);
      if (!err) {
        console.log(result)
      }

    });
  }

  render() {
    const { web3, giveaway, accounts } = this.state;
    const finishedLoading = !web3.isLoading && !giveaway.isLoading && !accounts.isLoading;

    if (!finishedLoading) {
      return <Loading />
    }

    if (_.isEmpty(accounts.accounts)) {
      return <AccountUnavailable />
    }

    return (
      <Router>
        <Fragment>

        { finishedLoading &&
          <Fragment>
            <HeaderContainer />

            <Route path="/" exact component={Home} />
            <AdminRouteContainer />

          </Fragment>
        }

          <GlobalStyle />
        </Fragment>
      </Router>
    );
  }
};

export default App;
