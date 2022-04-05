import React, { Component } from 'react';
import transaction from '../../Helper/transaction';
import './addFunds.css'


class AddFunds extends Component {


    constructor(){
        super();
    
        this.state = {
            //will change this to props to the add component
            userid:"mark sigilai",
        }
    
      }


    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});

    }


    handleSubmit = (event) => {

        event.preventDefault();

        transaction.add(this.state.userid, this.state.amount).then((res) => {
            console.log(res);
            this.setState({message: JSON.stringify(res.data.message)})
        });

    }

  
    render() {

      return (


        <form className="AddFunds" id='signin-form' onSubmit={this.handleSubmit}>
            <label className='AddFunds-label'>Add funds</label>
            <input className="AddFunds-input" name='amount' type="number" min="0" step="0.01" onChange={this.myChangeHandler}></input>
            <button className="AddFunds-submitBtn" type="submit" >Add</button>

            <div className="AddFunds-error">
                {this.state.message}
            </div>
        </form>

      );
    }
  }
  
  export default AddFunds;