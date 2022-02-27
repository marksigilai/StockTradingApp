import React, { Component } from 'react';
import axios from 'axios'
      


class Homepage extends Component {

    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
      axios.get('index').then(res => {
          console.log("Hiiiii");
          if (res.status !== 200) {
              throw Error(res.message) 
          }
          return res;
      });
    };
  
  
    render() {
      return (
        <div className="homepage">

          <>Buy any stock that the user wants</>
          

          QUOTE

          BUY

          COMMIT_BUY

          SET_BUY_AMOUNT

          SET_BUY_TRIGGER


        </div>
      );
    }

  }
  
  export default Homepage;