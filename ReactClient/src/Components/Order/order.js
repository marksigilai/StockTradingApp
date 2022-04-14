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
            orderCompleted:false,
            error: "",
            orderConfirmation : false,
        }


    }

    handleChange = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});


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
        console.log("making an order")
        console.log(event.target.name)

        //do not submit form if no amount has been input
        if(!this.state.amount){
            return
        }
        
        console.log("The event target name is -->  ", event.target.name)

        if(event.target.name === "Buy" || event.target.name === "Sell"){  

            console.log("In here 1")

            if(!this.state.triggered){
                //regular buy
                if(event.target.name === "Buy"){
                    transaction.buy(localStorage.getItem("userid"), this.props.stockname, this.state.amount).then((response) => {
                        //allow commit buy only after completing buy successfully

                        if(response.data){
                            if(response.data.status === "passed"){
                                this.setState({
                                    error: "",
                                    orderConfirmation: true
                                })
                            }
                        }
                        else if(response.error){
                            this.setState({
                                error: response.error
                            })
                        }

                    })

                } else{
                    //regular sell
                    transaction.sell(localStorage.getItem("userid"), this.props.stockname, this.state.amount).then((response) => {
                        //allow commit sell only after completing buy successfully
                        if(response.data.status === "passed"){
                            console.log("sell has returned data")
                            this.setState({
                                orderConfirmation: true
                            })
                        }
                    })
                }
            }
            else{
                //triggered buy
                if(event.target.name === "Buy"){
                    console.log("Doing a set buy WITH TRIGGER VAL --> ", this.state.triggerVal);
                    transaction.setBuy(localStorage.getItem("userid"), this.props.stockname, this.state.amount, this.state.triggerVal).then((response) => {
                        if(response.data){
                            console.log("response")
                            if(response.data.status === "passed"){
                                console.log("Set buy passed")
                                this.setState({
                                    orderConfirmation: true
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
                //triggered sell
                else {
                    transaction.setSell(localStorage.getItem("userid"), this.props.stockname, this.state.amount, this.state.triggerVal).then((response) => {
                        if(response.data){
                            if(response.data.status === "passed"){
                                this.setState({
                                    orderConfirmation: true
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
            }
            return
        }

        if(event.target.name === "Commit Buy" || event.target.name === "Commit Sell"){

            console.log("In here 2")

            //commit last buy transaction
            if(event.target.name === "Commit Buy"){
                transaction.commitBuy(localStorage.getItem("userid")).then(response => {
                    console.log("Commit buy response is == ", response)

                    if(response.data){
                        if(response.data.status === "passed"){
                            this.props.orderCompleted()
                        }
                    }
                    else if(response.error){
                        this.setState({
                            error: response.error
                        })
                    }

                })
            } 
            //commit last sell transaction
            else{
                transaction.commitSell(localStorage.getItem("userid")).then(response => {
                    if(response.data.status === "passed"){
                        console.log("commitsell has passed")
                        if(response.data){
                            if(response.data.status === "passed"){
                                this.props.orderCompleted()
                            }
                        }
                        else if(response.error){
                            this.setState({
                                error: response.error
                            })
                        }
                    }

                })
            }
            return
        }

        if(event.target.name === "Cancel Buy" || event.target.name === "Cancel Sell"){

            console.log("In here 3")            

            if(this.state.triggered){
                //cancel last set buy
                if(event.target.name === "Cancel Buy"){ 
                    transaction.cancelSetBuy(localStorage.getItem("userid"), this.props.stockname).then(response => {
                        console.log(response)
                        if(response.data){
                            if(response.data.status === "passed"){
                                this.setState({
                                    error: "",
                                    orderConfirmation: true
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
                //cancel last set sell
                else{
                    transaction.cancelSetSell(localStorage.getItem("userid"), this.props.stockname).then(response => {
                        if(response.data.status === "passed"){
                            this.setState({
                                orderConfirmation: true
                            })
                        }
                    })
                }
            }
            
            else if (!this.state.triggered){
                if(event.target.name === "Cancel Buy"){
                    transaction.cancelBuy(localStorage.getItem("userid")).then(response => {
                        console.log(response)
                        if(response.data){
                            if(response.data.status === "passed"){
                                this.props.orderCompleted()
                            }
                        }
                        else if(response.error){
                            this.setState({
                                error: response.error
                            })
                        }
                    })
                }
                else{
                    transaction.cancelSell(localStorage.getItem("userid")).then(response => {
                        if(response.data.status === "passed"){
                            this.setState({
                                orderConfirmation: true
                            })
                        }
                    })
                }
            }
            return
        }


    }


    render() {

        let button;
        let confirmButtons;
        let cancelButtonName = "Cancel " + this.props.ordertype
        let commitButtonName = "Commit " + this.props.ordertype

        button = <button className="Order-submitBtn" name = {this.props.ordertype} onClick={this.makeOrder} type = "button">  {this.state.triggered ? "Set" : ""} {this.props.ordertype} </button>

        confirmButtons = <div className='btnContainer'>
                            {!this.state.triggered && 
                                <button className="Order-submitBtn" name = {commitButtonName} type="button" onClick={this.makeOrder}>Commit {this.props.ordertype}</button>
                            }
                            <button className="Order-cancelBtn" name = {cancelButtonName} type="button" onClick={this.makeOrder}>Cancel {this.state.triggered ? "Set" : ""} {this.props.ordertype}</button>
                        </div>



        return (
            <div className="Order">

                <h2 className="Order-header">Place an order.</h2>

                <div className="Order-descriptioncontainer">

                    <h3 className="Order-stockname">{this.props.stockname}</h3>

                {this.props.stockprice && 
                    <h3 className="Order-stockprice">{this.props.stockprice} $</h3>
                }

                {this.props.amountowned && 
                    <>
                        <label className="Order-labelowned">Owned</label>
                        <h3 className="Order-stockprice">{this.props.amountowned} $</h3>
                    </>                
                }
                </div>

                <div className="Order-container">
                    <label className="Order-label">{this.props.ordertype} type </label>
                    <select className="Order-dropdown" name="order type" id="ordertype" onChange={this.handleChange} disabled={this.state.orderConfirmation}>
                        <option value="market">Market {this.props.ordertype}</option>
                        <option value="triggered">Set {this.props.ordertype} Trigger</option>
                    </select>
                </div>


                <form className="">

                    <div className="Order-container">
                        <label className="Order-label">{this.props.ordertype} amount </label>
                        <input className="Order-input" name="amount" type="number" min="1" onChange={this.handleChange} readOnly={this.state.orderConfirmation}></input>
                    </div>
                        
                    {this.state.triggered && 
                        <div className="Order-container">
                            <label className="Order-label">{this.props.ordertype} trigger  </label>
                            <input className="Order-input" name="triggerVal" type="number" min="1" onChange={this.handleChange} readOnly={this.state.orderConfirmation} ></input>
                        </div>
                    }

                    <div>
                        {this.state.orderConfirmation ? confirmButtons : button }
                    </div>

                    {this.state.error}
            
                </form>

            </div>
        );

    }
  }
  
  export default Order;