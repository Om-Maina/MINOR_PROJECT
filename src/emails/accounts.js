const sgMail = require('@sendgrid/mail')
const config = require('../config')

sgMail.setApiKey(config.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to:email,
        from:'om.meena3438@gmail.com',
        subject:'Thanks for joining!',
        text: `Welcome to the app, ${name}. Hope you will enjoy using app`   
    })
}

const sendCancelEmail = (email, name) =>{
    sgMail.send({
        to:email,
        from:'om.meena3438@gmail.com',
        subject:'See you soon!',
        text: `Sorry to see you go, ${name}. Hope you will join again`   
    })
}

module.exports ={
    sendWelcomeEmail,
    sendCancelEmail
}

