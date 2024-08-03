// quiz-backend/integrate.js

const axios = require('axios');

function handleUserMessage(agent) {
    const userName = agent.parameters.name;
    const userEmail = agent.parameters.email;
    const userMessage = agent.parameters.message;

    return axios.post('https://api.hubapi.com/contacts/v1/contact', {
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
        params: { hapikey: 'your-hubspot-api-key' }
    })
    .then(() => {
        agent.add('Your message has been sent to HubSpot!');
    })
    .catch(error => {
        agent.add('Failed to send your message. Please try again later.');
    });
}
