# Demo Client Wallet App
    A mobile lending application that requires wallet functionality, where borrowers can receive loans
    and make repayments.

# Features
    - A user can create an account
    - A user can fund their account
    - A user can transfer funds to another user's account
    - A user can withdraw funds from from their account

# Tech Stack
    - NodeJS (LTS version)
    - KnexJS ORM
    - MySQL Database
    - TypeScript

# Getting Started
    1.  Clone the repository
            `` git clone https://github.com/tulbadex/lendsqr-loan-assessment.git ``
    2.  Install Dependencies
            `` npm install ``
            `` npm install knex -g ``
    3.  Start the development server
            `` npm start ``
    4.  Run test
            `` npm test ``

# ERD Diagram
    The following ERD diagram illustrates the schema of the database used in the project
<img src="/ERD/ERD-Screenshot 2023-01-11 131200.png" alt="Lendsqr ERD">

## API Eendpoints
<table>
    <thead>
        <tr>
            <td>Endpoints</td>
            <td>Method</td>
            <td>Description</td>
            <td>Body</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>/api/create_account</td>
            <td>POST</td>
            <td>Create a new user</td>
            <td>
                {
                    "firstname": "John", 
                    "lastname": "Doe",
                    "username": "johndoe",
                    "email": "johndoe@yahoo.com",
                    "password": "password"
                }
            </td>
        </tr>
        <tr>
            <td>/api/fund_account</td>
            <td>POST</td>
            <td>Fund a user account</td>
            <td>
                {
                    "token": "users_token", 
                    "amount": 1000
                }
            </td>
        </tr>
        <tr>
            <td>/api/transfer_fund</td>
            <td>POST</td>
            <td>Transfer funds from one account to another account</td>
            <td>
                {
                    "token": "users_token", 
                    "amount": 1000,
                    "recipeint_email": "johndoe1@yahoo.com"
                }
            </td>
        </tr>
        <tr>
            <td>/api/withdraw_fund</td>
            <td>POST</td>
            <td>Withdraw funds from user's account</td>
            <td>
                {
                    "token": "users_token", 
                    "amount": 1000
                }
            </td>
        </tr>
    </tbody>
</table>

# LENSQR ASSESSMENT QUESTION
## Background

At Lendsqr, many of our lenders use our mobile apps to reach over half a million customers. At this scale, we use NodeJS with TypeScript as its backend software development stack which allows us to rapidly ideate and release features and functionality.

To prepare for you as a possible backend engineer at Lendsqr, we would require that you create an application using NodeJS with TypeScript. This test will allow us to assess your strengths and weaknesses.

## Assessment

Demo Credit is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

You are required to build an MVP (Minimum viable product)  wallet service where:

    A user can create an account
    A user can fund their account
    A user can transfer funds to another user’s account
    A user can withdraw funds from their account. 

## Your task is to present  

    A  readme design document for your implementation
    An implementation of the project (NodeJS API using TypeScript)
    You may not bother about building a full authentication system, a faux token based authentication will suffice.
    Ensure to write unit tests for the project

## Tech Stack
    - NodeJS (LTS version)
    - KnexJS ORM
    - MySQL database
    - Typescript (optional)

## What would be assessed
    - Code quality; assessment of WET and DRY principles
    - Attention to details
    -Application of best practice in design and architecture
    -Unit testing (positive and negative test scenarios)
    -Commit history and messages on Github
    -Quality of README documentation (Please include your E-R Diagram in the README. you can use this tool to design your E-R Diagram (https://app.dbdesigner.net/) )
    -Folders and files organization
    - Variable and function naming, conventions and consistency
    - Semantic use of paths and resource naming
    - OOP concept used
    - Database design approach
    - Proper use of transaction scoping


