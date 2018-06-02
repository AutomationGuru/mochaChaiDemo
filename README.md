# MOCHA CHAI API TEST EXAMPLES
This is a Demo of test, testcase, test suites with Mocha and Chai and nodejs

The project uses a Mock API https://reqres.in/ which retruns a list of user, to demonstrate using mocha and chai to assert and verify the API

## Installation/Prerequisite for test run
* Need to have NodeJS and NPM installed.
* from the root of the project 
```
npm i
```

## Running tests
```
npm test
```
## TEST FRAMEWORK
# MOCHA
* Mocha looks at the test folder and runs and *.js in it
* Mocha supports keywords : 
    _describe_ which is the test suite
    _it_ is the test case
    It supports nester test suites and multiple test cases with in a test suite
* Mocha also support hooks which can be added with in the describe block
    _before()_, _after()_ : run before an after all test in the block
    _beforEach()_, _afterEach()_ : runs before and after each test
    **NOTE** Adding any hook before the describe block also works and invoked it before/after any test as Mocha has an implicit describe block
* Asyncronous Tests: are supported by mocha and this can be expressed in few ways for both the test block and the hooks block
    _done()_ using a callback done in you test case
    _Promise_
    _Async/await_ 
* Skips: a testcase/test suite can be skipped by appending it to the _describe_ or _it_ block
* TimeOuts: Timeout can be also set at suite/test case and if set at suite level its inherited by all test and also can be set at the hook level
[More about Mocha] 
(https://mochajs.org/)
# CHAI
Mocha allows user to use different assertion library for this project we use Chai to assert the actual results
We use chai assert for this project to check the actual results. Chai also supports Expect/should which covers the BDD style of assertion while assert covers the TDD 
[Assert API]
(http://www.chaijs.com/api/assert/)

        







