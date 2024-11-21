# 4m Ecommerce App Web

This application is the web version of the 4m Consolidated Brands Ecommerce mobile application.

## Features

- Account and Authentication through AWS Cognito by way of AWS Amplify
- Food ordering through Toast API
- Cowork Administration through Nexudus API
- News Articles and Events through Nexudus API
- Short/Long-term Rental Listings through Guesty API
- Payment Methods administered through the Spreedly API
- Cowork Payment Processing through the Stripe API
- Outbound email communication through AWS SES by way of the AWS SDK

## Setup Local Environment

This project requires **@aws-amplify/cli** to be installed globally:

`yarn`

Run the following command to install project-level additional packages:

`yarn add aws-amplify`

## Backend Environment

This project requires a nodejs application called the "4m Orchestrator" to be running locally. [More info on the 4m Orchestrator here](https://gitlab.com/4m-apps/4m-orchestrator)

## Connecting to AWS via Amplify

### Full setup to be added here once AWS is connected

For authentication services and APIs, the AWS Ampify service needs to be initilized and setup:

`tbd`

```
tbd
```

Running the following command should show you the different Amplify services:

`amplify status`

Run the following command to build your local backend:

`amplify push`

```
tbd
```

This process may take some time and should complete without any errors.

## Running the Application

`yarn dev`

## Jira/Gitlab Integration

Adding the jira issue number either in the commit message or description, will automatically display the Gitlab MR in the Jira issue development panel.

For example: `docs(readme): REQ-122 updated readme details`

## Scanning with Sonarqube

### Full setup to be added here once SonarQube properties file applied

SonarQube empowers all developers to write cleaner and safer code. On command, it'll scan the code base and highlight:

- bugs
- code smells (which typically lead to bugs)
- vulnerabilities

The scan will also highlight:

- code coverage based on existing (or not existing unit tests)
- technical debt
- code duplication

Here are the steps to get SonarQube up and running:

- Download and Install Docker
- Download and Install SonarQube (Community Edition)
- Download and INstall SonarScanner
- Be sure to add the bin directory path to your environment variable (keeping in mind that you may or may not need an ending slash or dollar sign):
  '/path-to/sonar-scanner-4.2.0.1873-macosx/bin'

Run the following command to pull the latest docker image of Sonarqube:  
`docker pull sonarqube`

M1 chip macosx:  
`docker pull --platform linux/x86_64 sonarqube`

Run the following command to startup SonarQube:  
`yarn run sonar-start`

Log into Sonarqube with admin as the username and the password. Here, you'll want to ensure you you go to Administration > Security > and turn off "Force user authentication"

Click the Create New Project button and following the prompts. For consistency:

Project Name - 4m-Ecommerce-App-Web

Display Name - 4m-Ecommerce-App-Web

When finished, click Setup to continue

Generate a token with whatever name you prefer, and save for safe keeping

Run analysis on your project:

What is your project's main language? "Other"

What is your OS? "Choose which ever is appropriate"
Download and unzip the Scanner for your OS, and add the bin directory to the PATH environment variable. (\*Requires a pre-installed JVM - with the same requirements as the SonarQube server.)

Run the following command to scan the codebase:  
`yarn run sonar-scan`
