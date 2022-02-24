
import axios from 'axios';


class Transactions{

    constructor(){


        this.stockname = "";
        this.userid = false;
        this.token = "";
        this.amount = "";


        this.login = this.login.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.logout = this.logout.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)

    }

    add = (userid, amount) => {

        return new Promise((resolve, reject) => {

            axios.post("", { userid: userid, amount: amount }).then( res => {
            
                if(res.data.error){

                    resolve({
                        authenticated: false,
                        error: res.data.error
                    })
    
                }
                else{
    
                    resolve({
                        authenticated: true,
                        data: res.data
                    })

                }
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the add function ")

        })
        
    }

    quote = (userid, stockSymbol) => {

        return new Promise((resolve, reject) => {

            axios.post("", { userid: userid, stockSymbol: stockSymbol }).then( res => {
            
                if(res.data.error){

                    resolve({
                        authenticated: false,
                        error: res.data.error
                    })
    
                }
                else{
    
                    resolve({
                        authenticated: true,
                        data: res.data
                    })

                }
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the add function ")

        })
        
    }

    buy = (userid, stockSymbol, amount) => {

        return new Promise((resolve, reject) => {

            axios.post("login", { userid: userid, stockSymbol: stockSymbol, amount: amount }).then( res => {
            
                if(res.data.error){

                    resolve({
                        authenticated: false,
                        error: res.data.error
                    })
    
                }
                else{
    
                    resolve({
                        authenticated: true,
                        data: res.data
                    })

                }
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the add function ")

        })
        
    }

    commitBuy = (userid) => {

        return new Promise((resolve, reject) => {

            axios.post("login", { userid: userid}).then( res => {
            
                if(res.data.error){

                    resolve({
                        authenticated: false,
                        error: res.data.error
                    })
    
                }
                else{
    
                    resolve({
                        authenticated: true,
                        data: res.data
                    })

                }
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the add function ")

        })
        
    }

    cancelBuy = (userid) => {

        return new Promise((resolve, reject) => {

            axios.post("login", { userid: userid }).then( res => {
            
                if(res.data.error){

                    resolve({
                        authenticated: false,
                        error: res.data.error
                    })
    
                }
                else{
    
                    resolve({
                        authenticated: true,
                        data: res.data
                    })

                }
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the add function ")

        })
        
    }

    sell = (userid, stockSymbol, amount) => {

        return new Promise((resolve, reject) => {

            axios.post("login", { userid: userid, stockSymbol: stockSymbol, amount: amount }).then( res => {
            
                if(res.data.error){

                    resolve({
                        authenticated: false,
                        error: res.data.error
                    })
    
                }
                else{
    
                    resolve({
                        authenticated: true,
                        data: res.data
                    })

                }
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the add function ")

        })
        
    }

    commitSell = (userId) => {

        return new Promise((resolve, reject) => {

            axios.post("signup", { userId: userId }).then( res => {
            
                if(res.data.error){

                    this.err = res.data.error
                    resolve({
                        authenticated: false,
                        error: res.data.error
                    })
    
                }
                else{
    
                    this.authenticated = true;
                    this.token = res.data.token;
                    this.user = res.data.user;

                    localStorage.setItem("token", res.data.token);

                    console.log(res);
                    resolve({
                        authenticated: true,
                        data: res.data
                    })

                }
    
            }).catch(err => {
                console.log(err.data)
                reject()
            })
    
            console.log("We have run the log in function ")

        })
        
    }

}

export default new Transactions();