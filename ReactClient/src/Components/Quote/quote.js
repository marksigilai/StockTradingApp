import React, { Component } from 'react';
import transaction from '../../Helper/transaction';
import Order from "../Order/order"
import './quote.css'

class Quote extends Component {
    
    constructor(){
        super()

        this.state = {
            stockname: "",
            stockprice: "",
            error: "",
            searchSuccessful: false
        }
    }



    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});

    }


    handleSubmit = (event) => {

        event.preventDefault();

        if(!this.state.stockname){
            return
        }

        transaction.quote(localStorage.getItem("userid"), this.state.stockname.toUpperCase()).then((res) => {
            console.log(res.data);

            if(res.data.name === "Error" || res.error){
                this.setState({
                    error: JSON.stringify(res.data.message),
                    searchSuccessful : false
                })
            }
            //get stock name, price
            else{
                this.setState({
                    stock: res.data.stock,
                    stockprice: res.data.quote,
                    searchSuccessful : true
                })

            }
        });

    }

  
  
    render() {

      return (
          
        <div className="Quote">

            <form className="Quote-form" onSubmit={this.handleSubmit}>

                <h1 className="Quote-header">Search for a stock</h1>

                <input className="Quote-input" name="stockname" type="text" onChange={this.myChangeHandler} maxLength="6"/>

                <button className="Quote-btn" type="submit">Search</button>

            </form>

            {this.state.searchSuccessful && 

                <Order ordertype="Buy" stockname={this.state.stock} stockprice={this.state.stockprice}/>

            }

            {!this.state.searchSuccessful && 

                <>The search was not successful, try again</>

            }

        </div>
      );
    }
  }
  
  export default Quote;