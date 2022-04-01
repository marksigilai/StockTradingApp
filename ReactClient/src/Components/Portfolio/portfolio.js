import React, { Component } from 'react';
import Stock from '../../Components/Stock/stock.js'
import './portfolio.css'

class Portfolio extends Component {

  constructor(){
    super();

    this.state = {
      stocks :[{name: "APPLE", amount: 5}, {name: "BO", amount: 15}, {name: "WCM", amount: 3}, {name: "QYOU", amount: 1}],
      balance : 3000
    }
  }

  componentDidMount(){
    //obtain account info - name, balance, stocks owned = array of objects
    
  }
  
    render() {

      var stocks = [];

      for(var i = 0; i < this.state.stocks.length; i++){
        stocks.push(<Stock  name = {this.state.stocks[i].name} amount = {this.state.stocks[i].amount }/>)
      }

      
      return (
        <div className="Portfolio">

          <h2 className="Portfolio-header">Portfolio</h2>

          {stocks}

        </div>
      );
    }
  }
  
  export default Portfolio;