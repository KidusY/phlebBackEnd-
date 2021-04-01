const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN } = require('../config');

const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;
const redirectUrl = REDIRECT_URL;
const refreshToken = REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

oAuth2Client.setCredentials({ refresh_token: refreshToken })


const sendMail = async (to) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: 'kidusyilma@gmail.com',
                clientId,
                clientSecret,
                refreshToken,
                accessToken

            }
        })


        const mailOptions = {
            from: "kidusyilma@gmail.com",
            to,
            subject: "New Student Registration",
            text: "Thank you for taking the time to go through the registration process. We Will get back to you shortly",
            html: `<h1> Thank You for Registering</h1>`
        }



        const result = await transport.sendMail(mailOptions)

        return result;

    }
    catch (err) {
        return err
    }
}


module.exports = sendMail;