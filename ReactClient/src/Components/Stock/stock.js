import React, { Component } from 'react';
import Order from '../Order/order';
import './stock.css'

class Stock extends Component {

    constructor(){
        super()

        this.state = {
            sell: false
        }

        console.log("Hello")

    }
  
    //quote for sell ?
    render() {

        if(!this.state.sell){

            return (
                <div className="Stock">
                    
                    <button className="Stock-container" onClick = {() => this.setState({sell: true})}>

                        <div className="Stock-name">Name is: {this.props.name}</div>
                        <div className="Stock-amount">Amount owned is: {this.props.amount}</div>
                        
                    </button>
        
                </div>
              );
        }

      return (
        <div className="Stock">

            <Order ordertype="Sell" stockName={this.props.stockName}  stockAmount={this.props.stockAmount}  />

            <button className="Stock-backBtn" onClick = {() => this.setState({sell: false})}> Back </button>

        </div>
      );
    }
  }
  
  export default Stock;