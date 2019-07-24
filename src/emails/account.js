const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = 'SG.2vjo7ebxQHmU-SfG9IEYdQ.KsSHGa3bHxL2oVGSjyzQougHafbm1HaG8sfY7Tf8LgY'

sgMail.setApiKey(sendgridAPIKey)

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