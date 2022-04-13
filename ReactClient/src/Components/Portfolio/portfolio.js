import React, { Component } from 'react';
import Stock from '../../Components/Stock/stock.js'
import './portfolio.css'
import transaction from '../../Helper/transaction';

class Portfolio extends Component {

  constructor(props){
    super(props);

    this.state = {
      stocks : [],
      balance : 3000
    }
  }

  componentDidMount(){
    //obtain account info - name, balance, stocks owned = array of objects

    transaction.getStocks(localStorage.getItem("userid")).then((response) => {

      if(response.data){
          if(response.data){
              this.setState({
                  error: "",
                  orderConfirmation: true,
                  stocks: response.data.stocks
              })
          }
          
      }
      else if(response.error){
          this.setState({
              error: response.error
          })
      }

    })
  
  }
  
    render() {

      


      var stocklist = [];

      for(var i = 0; i < this.state.stocks.length; i++){
        stocklist.push(<Stock stockname = {this.state.stocks[i].name} stockamount = {this.state.stocks[i].amount }/>)
      }

      
      return (
        <div className="Portfolio">

          <h2 className="Portfolio-header">Portfolio</h2>

          <div className='Portfolio-container'>
            {stocklist}
          </div>

        </div>
      );
    }
  }
  
  export default Portfolio;