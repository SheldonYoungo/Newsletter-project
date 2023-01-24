const express = require('express');
const dotenv = require('dotenv').config(); //Requiring the enviroment config
const mailchimp = require('@mailchimp/mailchimp_marketing');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname)); //This serves the static files of the webpage
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

// Mailchimp Configuration 
mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: process.env.API_SERVER
});

app.post('/', (req, res) => {
    
    const listId = process.env.API_LIST_ID;
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

app.listen(port , () => {
    console.log(`Server running on port ${port}`);
})