# stsRecycling-code-challenge

## Description

This app is a Node.js/Express API . Once deployed, this server will accept a Github login (for example, my own nick-echevarria) and return 100 users who follow the initial user and those users one by one, until the response reaches 100 total users or reaches 4 nested levels deep. 

## Getting Started

### Dependencies

Node.js' Watch Mode is only available with version 18.0 and above. Please ensure you either have the correct version installed or you remove the --watch flag from the start script in the package.json.

### Installing

First, fork and clone the app. 

Then, make sure to
```
npm i
``` 
to install all dependencies.

This app uses the Github API. There's an option to add a HEADER (detailed in the helpers.js folder) in the request along with a Github Token to increase the rate limit for API responses. The GITHUB_ACCESS_TOKEN is located in an .env file locally, so please add one and set a variable name GITHUB_ACCESS_TOKEN to a token you generate if you'd like to increase that rate limit. 

(Please see [this link](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for more details on how to generate your own token.) 

If you don't need to increase the rate limit, simply remove the HEADER passed in where a fetch() call is made.

### Executing program

Once installed, use 
```
npm start
``` 
to spin up the Node.js/Express server with Node 18's Watch mode active. 

Ping the API at this address: [http://localhost:3000/v1/followers/ENTER-GITHUB-USERNAME-HERE] using a tool like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/)

## Help

I haven't encountered any problems with how this app runs. However, that doesn't mean that there aren't or couldn't be any.
If you encounter one, please create a PR detailing the error, what was happening before the error occurred, and any potential fixes you've attempted and/or completed

## Authors

Nicholas Echevarria
[LINKEDIN](https://www.linkedin.com/in/nicholasechevarria)
[MEDIUM](https://nicholasechevarria.medium.com/)
[TRIPLE TRIAD DEMO](https://www.youtube.com/watch?v=QHVHftxr2os)
[TECH TALKL: CI/CD](https://www.youtube.com/watch?v=SehoXEggozM)

## Version History

* 0.1
    * Initial Release

## Acknowledgments

[STS Recycle](https://www.stselectronicrecyclinginc.com/)
[Discount Computer Depot](https://discountcomputerdepot.com/)
[Keith Homco](https://www.linkedin.com/in/homco)
[Neil Dayton](https://www.linkedin.com/in/neil-dayton-419678256/)
