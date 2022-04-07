import React, { Component } from 'react';
import transaction from '../../Helper/transaction';
import './addFunds.css'


class AddFunds extends Component {


    constructor(){
        super();
    
        this.state = {

        }
    
      }


    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});

    }


    handleSubmit = (event) => {

        event.preventDefault();
        document.getElementById('signin-form').reset()

        //verification of amount
        if(!this.state.amount){
          return
        }

        transaction.add(localStorage.getItem('userid'), this.state.amount).then((res) => {

            //call super function to update balance
            this.props.updateBalance(res.data.balance)

        });

    }

  
    render() {

      return (


        <form className="AddFunds" id='signin-form' onSubmit={this.handleSubmit}>
            <label className='AddFunds-label'>Add funds</label>
            <input className="AddFunds-input" name='amount' type="number" min="0" step="0.01" onChange={this.myChangeHandler}></input>
            <button className="AddFunds-submitBtn" type="submit" >Add</button>

        </form>

      );
    }
  }
  
  export default AddFunds;