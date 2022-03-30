import React, { Component } from 'react';
import transaction from '../../Helper/transaction.js';
import './summary.css'


class Summary extends Component {


    displaySummary(){

      transaction.displaySummary("userid").then((res) => {
        console.log(res)
      })

    }
  
  
    render() {
      return (
        <div className="Summary">

          <h3 className="Summary-header">Display Summary</h3>

          <div className="Summary-subheading">Click the button below to generate a summary of all your transactions</div>

          <button className="Summary-submitBtn" onClick={this.displaySummary}>Display Summary </button>
            
        </div>
      );
    }

  }
  
  export default Summary;