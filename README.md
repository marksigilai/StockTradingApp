# StockTradingApp
This project consisted of making a scalable stock trading app where users can create accounts, add virtual funds and complete trading transactions. 

# Architecture

![SENG468_soaktestv2 drawio](https://user-images.githubusercontent.com/56571667/177475209-9e38ef54-d17d-435d-a221-edc1044dc009.png)


## Getting Started

These instructions will cover usage information

### Prerequisities

In order to run this project you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)``

## To run 

Clone the repo

    git clone https://github.com/marksigilai/StockTradingApp.git


Ensure that the Docker Daemon is running.


In the project root directory run the following command

    docker-compose up --scale webserver=3 --build --detach

To stop the containers

    docker-compose down
    

visit http://localhost:3000/ for the reactclient

visit http://localhost:4000/ for the webserver

## Authors

* **Mark Sigilai**
* **Mark Kaiser**

## Supported Functionality
Following [this link](https://www.ece.uvic.ca/~seng468/ProjectWebSite/Commands.html) shows descriptions for the supported functionality listed below.
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
