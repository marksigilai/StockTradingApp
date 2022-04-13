import React, { Component } from 'react';
import Order from '../Order/order';
import './stock.css'

class Stock extends Component {

    constructor(){
        super()

        this.state = {
            sell: false,
            orderCompleted: false
        }

        console.log("Hello")

    }


    orderCompleted = () => {
        this.setState({
            orderCompleted: true
        });
    }


  
    //quote for sell ?
    render() {

        if(!this.state.sell){

            return (
                <div className="Stock">
                    
                    <button className="Stock-container" onClick = {() => this.setState({sell: true, orderCompleted:false})}>

                        <div className="Stock-name">{this.props.stockname}</div>
                        <div className="Stock-amount">{this.props.stockamount} $</div>
                        
                    </button>
        
                </div>
              );
        }

      return (
        <div className="Stock">
            <button className="Stock-backBtn" onClick = {() => this.setState({sell: false})}> Close </button>

            {!this.state.orderCompleted && 

                <Order ordertype="Sell" stockname={this.props.stockname}  amountowned={this.props.stockamount}  orderCompleted={this.orderCompleted}/>

            }
        </div>
      );
    }
  }
  
  export default Stock;