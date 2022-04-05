import React, { Component } from 'react';
import transaction from '../../Helper/transaction';
import './order.css'


//2 types of orders - triggered and market
class Order extends Component {

    constructor(){
        super()

        this.state = {
            ordertype : "",
            triggered : false,
            showConfirmationButtons : false,
        }


    }

    handleChange = (event) => {

        if(event.target.value === "triggered"){
            this.setState({
                triggered: true
            })
        }
        if(event.target.value === "market"){
            this.setState({
                triggered: false
            })
        }
    }

  
    //TODO: make this less messy
    makeOrder = (event) => {

        event.preventDefault()
        console.log(event.target.name)
        

        if(event.target.name === "Buy" || this.props.ordertype === "Sell"){

            this.setState({
                showConfirmationButtons: true
            })

            if(!this.state.triggered){
                event.target.name === "Buy" ? transaction.buy() : transaction.sell()
            }
            else{
                event.target.name === "Buy" ? transaction.setBuy() : transaction.setSell()
                
            }
            
        }

        if(event.target.name === "Commit Buy" || event.target.name === "Commit Sell"){

            this.setState({
                showConfirmationButtons: false
            })

            event.target.name === "Commit Buy" ? transaction.commitBuy() : transaction.commitSell()
           
        }

        if(event.target.name === "Cancel Buy" || event.target.name === "Cancel Sell"){

            this.setState({
                showConfirmationButtons: false
            })

            if(this.state.triggered){
                event.target.name === "Cancel Buy" ? transaction.cancelSetBuy() : transaction.cancelSetSell()
            }
            else if (!this.state.triggered){
                event.target.name === "Cancel Buy" ? transaction.cancelBuy() : transaction.cancelSell()
            }
            
        }


    }


    render() {

        let button;
        let confirmButtons;
        let cancelButtonName = "Cancel " + this.props.ordertype
        let commitButtonName = "Commit " + this.props.ordertype

        button = <button className="Order-submitBtn" name = {this.props.ordertype} type = "submit" onClick={this.makeOrder}>  {this.state.triggered ? "Set" : ""} {this.props.ordertype} </button>

        confirmButtons = <div className='btnContainer'>
                            {!this.state.triggered && 
                                <button className="Order-submitBtn" name = {commitButtonName} type="submit" onClick={this.makeOrder}>Commit {this.props.ordertype}</button>
                            }
                            <button className="Order-cancelBtn" name = {cancelButtonName} type="submit" onClick={this.makeOrder}>Cancel {this.state.triggered ? "Set" : ""} {this.props.ordertype}</button>
                        </div>


        return (
            <div className="Order">

                <h2 className="Order-header">Place an order.</h2>

                <h3 className="Order-subheading">{this.props.ordertype}</h3>

                <h3 className="Order-subheading">{this.props.stockName}</h3>

                <h3 className="Order-subheading">{this.props.stockCurrentPrice}</h3>

                <div className="Order-container">
                    <label className="Order-label">{this.props.ordertype} type </label>
                    <select className="Order-dropdown" name="order type" id="ordertype" onChange={this.handleChange}>
                        <option value="market">Market {this.props.ordertype}</option>
                        <option value="triggered">Set {this.props.ordertype} Trigger</option>
                    </select>
                </div>


                <form className="" onSubmit={this.makeOrder}>

                    <div className="Order-container">
                        <label className="Order-label">{this.props.ordertype} amount </label>
                        <input className="Order-input" name="amount" type="number" min="1" onChange={this.handleChange}></input>

                    </div>
                        
                    {this.state.triggered && 
                        <div className="Order-container">
                            <label className="Order-label">{this.props.ordertype} trigger  </label>
                            <input className="Order-input" name="triggerVal" type="number" min="1" onChange={this.handleChange}></input>
                        </div>
                    }

                    <div>
                        {this.state.showConfirmationButtons ? confirmButtons : button }
                    </div>
            
                </form>

            </div>
        );
       
    }
  }
  
  export default Order;