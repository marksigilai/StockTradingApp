import axios from 'axios';


class Transaction{

    constructor(){


        this.stockname = "";
        this.userid = "";
        this.token = "";
        this.amount = "";


        this.init = this.init.bind(this)
        this.add = this.add.bind(this)
        this.quote = this.quote.bind(this)
        this.buy = this.buy.bind(this)

    }

    init = () => {

        this.token = localStorage.getItem("token")

        let headers = {
            Accept: "application/json",
        };

        if (this.api_token) {
            headers.Authorization = `Bearer ${this.token}`;
        }

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client

    }

    getUserInfo = (userid) => {

        return new Promise((resolve, reject) => {

            axios.post("accountinfo", { userid: userid }).then( res => {

                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })

            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("Get Balance ")

        })
        
    }

    add = (userid, amount) => {

        return new Promise((resolve, reject) => {

            axios.post("add", { userid: userid, amount: amount }).then( res => {

                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("Add amount ")

        })
        
    }

    quote = (userid, stockSymbol) => {

        return new Promise((resolve, reject) => {

            axios.post("quote", { userid: userid, stockSymbol: stockSymbol }).then( res => {

                console.log(res.data)
                resolve({data: res.data})
    
            }).catch(err => {

                console.log(err)
                reject()
            })
    
            console.log("Quoted ")

        })
        
    }

    buy = (userid, stockSymbol, amount) => {

        return new Promise((resolve, reject) => {

            axios.post("buy", { userid: userid, stockSymbol: stockSymbol, amount: amount }).then( res => {
            
                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the buy function ")

        })
        
    }

    commitBuy = (userid) => {

        return new Promise((resolve, reject) => {

            axios.post("commitbuy", { userid: userid}).then( res => {
            
                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the commit buy function ")

        })
        
    }

    cancelBuy = (userid) => {

        return new Promise((resolve, reject) => {

            axios.post("cancelbuy", { userid: userid }).then( res => {
            
                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })

            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the cancel buy function ")

        })
        
    }

    sell = (userid, stockSymbol, amount) => {

        return new Promise((resolve, reject) => {

            axios.post("sell", { userid: userid, stockSymbol: stockSymbol, amount: amount }).then( res => {
            
                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the sell function ")

        })
        
    }

    commitSell = (userId) => {

        return new Promise((resolve, reject) => {

            axios.post("commitsell", { userId: userId }).then( res => {
            
                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })
    
            }).catch(err => {
                console.log(err.data)
                reject()
            })
    
            console.log("We have run the commit sell function ")

        })
        
    }

    cancelSell = (userId) => {

        return new Promise((resolve, reject) => {

            axios.post("cancelsell", { userId: userId }).then( res => {
            
                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })
    
            }).catch(err => {
                console.log(err.data)
                reject()
            })
    
            console.log("We have run the cancell sell function ")

        })
        
    }

    setBuy = (userid, stockSymbol, amount, trigger) => {

        return new Promise((resolve, reject) => {

            axios.post("setBuyAmount", { userid: userid, stockSymbol: stockSymbol, amount: amount }).then( res => {
            
                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })
    
            }).catch(err => {
                console.log(err)
                reject()
            })

            axios.post("setBuyTrigger", { userid: userid, stockSymbol: stockSymbol, amount: amount }).then( res => {
            
                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the set buy function ")

        })
        
    }

    setSell = (userid, stockSymbol, amount, trigger) => {

        return new Promise((resolve, reject) => {

            axios.post("setSellAmount", { userid: userid, stockSymbol: stockSymbol, amount: amount }).then( res => {
            
                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })

                //2nd post for the trigger
                axios.post("setSellTrigger", { userid: userid, stockSymbol: stockSymbol, trigger: trigger }).then( res => {
            
                    res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })
        
                }).catch(err => {
                    console.log(err)
                    reject()
                })
    
            }).catch(err => {
                console.log(err)
                reject()
            })
    
            console.log("We have run the set sell function ")

        })
        
    }

    cancelSetBuy = (userid, stockSymbol) => {
        return new Promise((resolve, reject) => {

            axios.post("cancelsetbuy", { userid: userid, stockSymbol: stockSymbol }).then( res => {
            
                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })
    
            }).catch(err => {
                console.log(err)
                reject()
            })

    
            console.log("We have run the cancel set buy function ")

        })

    }

    cancelSetSell = (userid, stockSymbol) => {
        return new Promise((resolve, reject) => {

            axios.post("cancelsetsell", { userid: userid, stockSymbol: stockSymbol }).then( res => {
            
                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })
    
            }).catch(err => {
                console.log(err)
                reject()
            })
            console.log("We have run the cancel set sell function ")

        })
        
    }


    displaySummary = (userId) => {

        return new Promise((resolve, reject) => {

            axios.post("displaysummary", { userId: userId }).then( res => {
            
                res.data.err ? resolve({ error: res.data.error}) : resolve({ data: res.data })
    
            }).catch(err => {
                console.log(err.data)
                reject()
            })
    
            console.log("We have run the display summary function ")

        })
        
    }

}

export default new Transaction();