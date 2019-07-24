const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from:'masontang@aol.com',
        subject:'Thanks for joinin in!',
        text:`Welcome to the app, ${name}. Let me know how you get along with the app`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from:'masontang@aol.com',
        subject:'Your account has been cancelled',
        text:`What can we do so that you dont cancel`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}