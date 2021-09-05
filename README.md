# dentsu-bdd-js-boilerplate

This contains a base framework and example tests using codeceptjs utilising the recommended patterns. 

###For new UI projects yet to be integrated with codeceptjs:

1. Clone this repo inside your UI application repo 

2. codecept-tests folder and past it into the project folder

3. cd codecept-tests

4. Do npm i to install all the dependency locally

5. Do npm i -g @wdio/selenium-standalone-service@5.16.10 to install selenium driver in your global

6. Do npm i -g webdriverio@5.10.5 to install webdriverio in your global

7. Do npm i -g codeceptjs to install codeceptjs in your global


 
npm i -g webdriverio@5.10.5

####### To run full-BDD test ########

npm run test:e2e 

####### To run sanity test ########

npm run test:sanity 

####### To generate the test report #######

npm run test:report



####### To run test in parallel #######

1. npm run start:selenium-standalone

2. then un comment Hooks (bootstrap,bootstrapAll,tearbownAll,teardown) in codecept.conf.js 

3. and comment wdio plugin in codecept.conf.js

4. npm run test:multiple

