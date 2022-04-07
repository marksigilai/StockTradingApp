import React, { Component } from 'react';
import Summary from '../../Components/Summary/summary.js'
import Funds from '../../Components/Funds/funds.js'

import './account.css';


class Account extends Component {
  
    render() {
      return (
        <div className="Account">

          <Funds userid = {this.props.userid}/>         

          <Summary userid = {this.props.userid}/>


        </div>
      );
    }
  }
  
  export default Account;