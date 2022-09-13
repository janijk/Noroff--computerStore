# Komputer Store
## Table of contents
* [Introduction](#introduction)
* [Features](#features)
* [Technologies](#technologies)
* [Launch](#launch)
* [Authors](#authors)
* [Sources](#sources)

## Introduction
A simple dynamic webpage built using vanilla JavaScript. The webpage has three parts: bank, work and laptop. At work you
can earn money and transfer your funds to your bank account or repay loan if you have one. At bank you can see your assets and liabilities and take a loan. Laptop has a selection of laptops to choose from and a preview for current choice, you can also buy laptop of your choice.


## Features
- Each click of work button increases pay by 100
- Bank button transfers pay to bank balance, if loan exists 10% of pay is used for loan repayment
- If loan exists repay loan button appears next to bank button, it uses whole pay for loan repayment
- Only one loan can be active and loans have to be paid in full before it is possible to take a new loan
- If bank balance is lower than price when attempting to buy a laptop insufficient funds alert is shown
- When bank balance is enough to cover cost of a laptop message is shown for succesfull purchase
- Data about laptops is fetched through API

## Technologies
- VSCode
- JavaScript
- HTML
- CSS

## Launch
1. Clone repository
2. Use software of choice to view the page

## Authors
https://gitlab.com/janijk

## Sources
Project was an assignment done during education program created by Noroff Education