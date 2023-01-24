# Newsletter Service Project

Newsletter service was a project made to test API calls (Mailchimp in this case) with Node.js as part of a Fullstack bootcamp.

## Pre-requisites

You need to install [Node.js](https://nodejs.org/es/download/) and the NPM package manager (it comes with Node.js by default).

## Usage

To run this project you need to follow some simple steps:

1. Sign up in [Mailchimp](https://mailchimp.com/developer/marketing/) and get the Marketing API key, the server code (seen on the url https://*usXX*.admin.mailchimp.com) and List Id.

2. Download the code and open it with your preferred text editor.

3. erase the '.dist' extension from the .env.dist file then open it and put the previous Mailchimp codes you copied inside variables:

```
#EXAMPLES

API_KEY= '123456'
API_SERVER= 'us12'
API_LIST= '654321'
```
4. Open your terminal and run the server:

```
$ node app.js

```
5. At last, open your browser and get to localhost:3000 to see the result!!
