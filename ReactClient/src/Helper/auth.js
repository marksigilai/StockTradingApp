
import axios from 'axios';


class Transactions{

    constructor(){


        this.err = "";
        this.authenticated = false;
        this.token = "";
        this.user = "";



        this.login = this.login.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.logout = this.logout.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)

    }



    setPassword = (password) => {
        console.log("Setpassword --- " + this.password)
        this.password = password
    }

    login = (username, password) => {

        return new Promise((resolve, reject) => {

            axios.post("login", { username: username, password: password }).then( res => {
            
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
                    console.log("The userid is --> " + res.data.user)

                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("userid", res.data.user);

                    console.log(res);
                    resolve({
                        authenticated: true,
                        data: res.data
                    })

                }
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the log in function ")

        })
        
    }

    signup = (name, email , password) => {

        return new Promise((resolve, reject) => {

            axios.post("signup", { username: email, password: password }).then( res => {
            
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



    logout = () => {
        console.log("Logging out...")
        this.authenticated = false
    }

    isAuthenticated = () => {
        return this.authenticated
    }
}

export default new Transactions();