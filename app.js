const https = require('node:https');
const express = require('express');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const { response } = require('express');
const app = express();

app.use(express.static(__dirname)); //This serves the static files of the webpage
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

// Mailchimp Configuration 
mailchimp.setConfig({
    apiKey: 'd5a7781522c20c7a01195bd7aa313323-us17',
    server: 'us17'
});

app.post('/', (req, res) => {
    
    const listId = 'e8b4cd6db1';
    // Creating an object with the users data
    const subscribingUser = {
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email
    }
    
    async function subscribe() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: 'subscribed',
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
        res.sendFile(`${__dirname}/success.html`);
    }

    subscribe().catch(e => res.sendFile(`${__dirname}/failure.html`))
});

app.post('/failure', (req, res) => {
    res.redirect('/');
})

app.listen(process.env.PORT || 3000 , () => {
    console.log(`Server running on port ${port}`);
})

// API Key
// d5a7781522c20c7a01195bd7aa313323-us17

// List ID
// e8b4cd6db1