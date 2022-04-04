# StockTradingApp
A simple scalable stock trading web app

#TO RUN THE FILE USE:
docker-compose up --scale webserver=3 --build

visit http://localhost:3000/ for the reactclient
visit http://localhost:4000/ for the webserver


## Required Functionality
Following [this link](https://www.ece.uvic.ca/~seng468/ProjectWebSite/Commands.html), the below functionality is required to be implemented.
* ADD \[userid, amount\] 
* QUOTE \[userid, StockSymbol\]
* BUY \[userid, StockSymbol, amount\]
* COMMIT_BUY \[userid\]
* CANCEL_BUY \[userid\]
* SELL \[userid, StockSymbol, amount\]
* COMMIT_SELL \[userid\]
* CANCEL_SELL \[userid\]
* SET_BUY_AMOUNT \[userid, StockSymbol, amount\]
* CANCEL_SET_BUY \[userid, StockSymbol\]
* SET_BUY_TRIGGER \[userid, StockSymbol, amount\]
* SET_SELL_AMOUNT \[userid, StockSymbol, amount\]
* SET_SELL_TRIGGER \[userid, StockSymbol, amount\]
* CANCEL_SET_SELL \[userid, StockSymbol\]
* DUMPLOG \[userid, filename\]
* DUMPLOG \[filename\]
* DISPLAY_SUMMARY \[userid\]
