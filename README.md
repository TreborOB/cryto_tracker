# Assignment 1 - ReactJS app.

Name: Robert O' Brien

## Overview.
Cryto Tracker is a crytocurrency tracking app which allows a user to create a custom list of crytocurrencies - each crytocurrency can then displayed along with it's price, market cap and many other cryrocurrency attributes. Using the Crytocompare API, live prices for each of the user defined crytocurrencies are also displayed.

 + Portfolio Dashboard View
 + Multi-Column Crytocurrency List
 + View Detailed Crytocurrency Information 
 + Add a New Crytocurrency
 + Edit an Existing Crytocurrency
 + Delete an Existing Crytocurrency
 + Live Crytocurrency Price View

## Installation requirements.
+ ReactJS v15.3.0
+ Bootstrap 3
+ create-react-app tool
+ lodash v.2.4.2
+ superagent v.1.6.1
+ axios v.0.18.0
+ react-table v.6.8.0

To run the application, simply clone or download the project and then run npm install + npm start

## Data Model Design.
The data model is focused on information about the crytocurrencies themselves.

##### Coin Information #####
Details such as the Crytocurrency name, price, amount purchased etc.

```javascript
{
   'id': '1',
   'name': 'Bitcoin',
   'name_abbrev': 'BTC',
   'amount_purchased': '123',
   'price': '132',
   'market_cap': '€108,169,629',
   'volume_24h': '€4,305,567',
   'circulating_supply': '16,940'
}
```

##### Additional Coin Information #####
Contains additional, more detailed information about the Crytocurency. For the next part of the assignment, this will be extensively populated via the Crytocompare API.

```javascript
{
  "description": "Ripple is a technology that acts as both a cryptocurrency and a digital payment network for financial transactions",
  "transaction_volume": {
    "btc": "17,362.78168825 LTC",
    "eur": "€232,112,281.09"
  },
  "id": "Litecoin",
  "image": [
    "/img/litecoin.jpg"
  ],
  "name": "Litecoin"
}
```

## App Component Design.
 
![alt text](/design.jpg)

## UI Design.

The UI uses a Navigational bar containing links to each section on the application. Styling is supplied by Bootstrap v.3.3.6 and CSS.

##### Portfolio Screen #####
![alt text](/portfolio_view.png)

##### Add/Edit Cryto List Screen #####
![alt text](/current_crytos_view.png)

##### Live Prices Screen #####
![alt text](/prices_view.png)

## Routing.
+ /#/ - Default portfolio view
+ /#/portfolio - Default portfolio view
+ /coins/coin-name e.g. Bitcoin - Detailed view of the specified crytocurrency
+ /current-crytos - Displays all current crytocurrencies being tracked
+ /prices - Displays the live EUR price for all tracked crytocurrencies

## Extra features

The HTTPS client Axios was used in conjunction with the Crytocompare API (https://min-api.cryptocompare.com/) to retrieve the live EUR price of all crytocurrencies being tracked within the application.

## Independent learning.

1. Research of third-party react components/libraries was carried out to see how they could be implemented to help improve the project

2. The Axios HTTP client and the Crytocompare API were both researched/investigated to dertermine how live Crytocurrency proces could be retrieved
