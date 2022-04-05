import React, { Component } from 'react';
import Buttons from "../Buttons/buttons"


class Order extends Component {

    constructor(){
        super()

        this.state = {
            ordertype : "",
            triggeredbuy : false,
            triggeredsell : false
        }

        console.log("Hello")

    }

    handleChange = (event) => {

        if(event.target.value === "triggeredbuy"){
            this.setState({
                triggeredbuy: true
            })
        }
        if(event.target.value === "marketbuy"){
            this.setState({
                triggeredbuy: false
            })
        }
        if(event.target.value === "triggeredsell"){
            this.setState({
                triggeredsell: true
            })
        }
        if(event.target.value === "marketsell"){
            this.setState({
                triggeredsell: false
            })
        }
    }
  
    handleBuyOrder = () => {
        
    }

    handleSellOrder = () => {
        
    }

    render() {

        if(this.props.type === "Buy"){
            return (
                <div className="BuyOrder">

                    <h2>Place an order.</h2>

                    <h3>{this.props.type}</h3>

                    <h3>{this.props.stockName}</h3>

                    <h3>{this.props.stockCurrentPrice}</h3>

                    <select name="order type" id="ordertype" onChange={this.handleChange}>
                        <option value="marketbuy">Market Buy</option>
                        <option value="triggeredbuy">Set Buy Trigger</option>
                    </select>


                    <form>
                        Buy Amount: 
                        <input type="number" min="1"></input>
                        <br/>

                        {this.state.triggeredbuy && 
                            <div>
                                Buy Trigger: 
                                <input type="number" min="1"></input>
                                <br/>

                                <Buttons/>
                                <div>
                                    <button type="submit">Set Buy</button>
                                    <button type="submit">Commit Set Buy</button>
                                    <button type="submit">Cancel Set Buy</button>
                                </div>
                            
                            </div>
                        }

                        <Buttons type = {this.state.ordertype} />

                        {!this.state.triggeredbuy && 

                            <div>
                                <button type="submit">Buy</button>
                                <button type="submit">Commit Buy</button>
                                <button type="submit">Cancel Buy</button>
                            </div>
                            
                        }
                
                    </form>

                </div>
            );
        }


        return (
            <div className="SellOrder">

                <h2>Place an order.</h2>

                <h3>{this.props.type}</h3>

                <h3>{this.props.stockName}</h3>

                <h3>{this.props.stockCurrentPrice}</h3>

                <h3>{this.props.stockAmount}</h3>


                <select name="order type" id="ordertype" onChange={this.handleChange}>
                    <option value="marketsell">Market Sell</option>
                    <option value="triggeredsell">Set Sell Trigger</option>
                </select>

                <form>
                    Sell Amount: 
                    <input type="number" min="1"></input>
                    <br/>

                    {this.state.triggeredsell && 
                        <div>
                            Sell Trigger: 
                            <input type="number" min="1"></input>
                            <br/>
                            <button type="submit">Set Sell</button>
                            <button type="submit">Commit Set Sell</button>
                            <button type="submit">Cancel Set Sell</button>

                        </div>
                    }

                    {!this.state.triggeredsell && 

                        <div>
                            <button type="submit">Sell</button>
                            <button type="submit">Commit Sell</button>
                            <button type="submit">Cancel Sell</button>

                        </div>
                        
                    }

                </form>

            </div>
        );

            
    }
  }
  
  export default Order;