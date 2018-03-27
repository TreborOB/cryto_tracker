# Assignment 1 - ReactJS app.

Name: Robert O' Brien

## Overview.
Cryto Tracker is a crytocurrency tracking app which allows a user to create a custom list of crytocurrencies - each crytocurrency can then displayed along with it's price, market cap and many other cryrocurrency attributes. Using the Crytocompare API, live prices for each of the user defined crytocurrencies are also displayed.

 + Portfolio Dashboard View
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

To run the application, simply clone or download the project and then run npm install + npm start

## Data Model Design.

Diagram of app's data model (see example below) AND/OR a sample of the test data used (JSON or equivalent).

![][image1]

Use meaningful sample data. Briefly explain any non-trivial issues.

## App Component Design.

A diagram showing the app's hierarchical component design (see example below). 

![][image2]

## UI Design.

. . . . . Screenshots of app's views (see example below) with appropriate captions (user regeneration and login views, if implemented, can be omitted) . . . . . . . 

![][image3]

## Routing.

+ /#/ - Default portfolio view
+ /coins/coin-name e.g. Bitcoin - Detailed view of the specified crytocurrency
+ /current-crytos - Displays all current crytocurrencies being tracked
+ /prices - Displays the live EUR price for all tracked crytocurrencies

## Extra features

The HTTPS client Axios was used in conjunction with the Crytocompare API (https://min-api.cryptocompare.com/) to retrieve the live EUR price of any crytocurrencies being tracked within the application.

## Independent learning.

. . . . . State the non-standard aspects of Angular (or other related technologies) that you researched and applied in this assignment . . . . .  



[image1]: ../Archive/model.png
[image2]: ../Archive/design.jpg
[image3]: ../Archive/screen.png
