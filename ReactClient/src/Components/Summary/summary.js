import React, { Component } from 'react';
import transaction from '../../Helper/transaction.js';
import './summary.css'


class Summary extends Component {


  constructor(){
    super();

    this.state = {
      logs:"",
    } 

  }


    displaySummary = () => {

      transaction.displaySummary(localStorage.getItem("userid")).then((res) => {
        this.setState({
          logs: res.data
        })
        console.log(this.state.logs)
      })

    }
  
  
    render() {
      let content = []

      for(let log in this.state.logs){
        content.push( 
                  <tr>
                    <td>{this.state.logs[log].action}</td>
                    <td>{this.state.logs[log].amount}</td>

                  </tr>
        )
      }

      if(!this.state.logs){
        return (
          <div className="Summary">
  
            <h3 className="Summary-header">Display Summary</h3>
  
            <div className="Summary-subheading">Click the button below to generate a summary of all your transactions</div>
  
            <button className="Summary-submitBtn" onClick={this.displaySummary}>Display Summary </button>
  
            <div>{this.state.logs}</div>
              
          </div>
        );
      }

      return(
        <table className="Summary-logs">
          <h1 className="Summary-header">Logs</h1>
          <tr>
            <th>Action</th>
            <th>Amount</th>
          </tr>
          {content}
          <button className="Summary-submitBtn" onClick={() => this.setState({logs:""})} >Close Logs</button>
        </table>      
      )
      
    }

  }
  
  export default Summary;