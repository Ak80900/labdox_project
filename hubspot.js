// quiz-backend/hubspot.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const HUBSPOT_API_KEY = 'api_key';
const HUBSPOT_API_URL = 'https://api.hubapi.com';

app.post('/webhook', async (req, res) => {
    const { userName, userEmail, userMessage } = req.body;

    try {
        // Create a new contact in HubSpot
        await axios.post(`${HUBSPOT_API_URL}/contacts/v1/contact`, {
            properties: [
                {
                    property: 'email',
                    value: userEmail
                },
                {
                    property: 'firstname',
                    value: userName
                },
                {
                    property: 'message',
                    value: userMessage
                }
            ]
        }, {
            params: { hapikey: HUBSPOT_API_KEY }
        });

        res.status(200).send('Data sent to HubSpot');
    } catch (error) {
        res.status(500).send('Failed to send data to HubSpot');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
