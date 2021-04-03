const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN } = require('../config');

const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;
const redirectUrl = REDIRECT_URL;
const refreshToken = REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

oAuth2Client.setCredentials({ refresh_token: refreshToken })


const sendMail = async (to = "kidusyilma@gmail.com", mailOption

) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: 'notificationonestick@gmail.com',
                clientId,
                clientSecret,
                refreshToken,
                accessToken

            }
        })


        const mailOptions = {
            from: "onestickphlebsvs@gmail.com",
            to,
            subject: "New Student Registration",
            text: "Thank you for taking the time to go through the registration process. We Will get back to you shortly",
            html: `<center>
            <div>
            <h1> One Stick</h1>
            <h2>Your registration is complete</h2>
            <h3> You will here from one of our representative </h3>
            <p> In the mean time, please go to our website and look at our values and learn more about us</p>
             </div>
             </center>
             `
        }



        const result = await transport.sendMail(mailOptions)

        return result;

    }
    catch (err) {
        return err
    }
}


module.exports = sendMail;