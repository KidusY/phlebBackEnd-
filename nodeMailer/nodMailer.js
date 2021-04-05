const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN } = require('../config');

const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;
const redirectUrl = REDIRECT_URL;
const refreshToken = REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

oAuth2Client.setCredentials({ refresh_token: refreshToken })


const sendMail = async (to, mailOption

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
            <h1>One Stick Phlebotomy Service</h1>
            <h2>Simple as "One & Done"</h2>
            <h3>Your registration is complete.</h3>
            <h3> You will hear from one of our student service representatives shortly. </h3>
            <p> Simple as "One & Done"</p>
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


const getContactUsEmail = async (to="kidusyilma@gmail.com",senderInfo)=>{

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
            from: senderInfo.email,
            to,
            subject: "Contact Us Form",           
            html: `<center>
            <div>
           <ul>
           <li>Email: ${senderInfo.email}</li>
           <li>Phone: ${senderInfo.phoneNumber}</li>
           <li>Message: ${senderInfo.message}</li>
           </ul>
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
const getNewStudentNotification = async (to ="onestickphlebsvs@gmail.com",newStudentInfo)=>{

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
            from: newStudentInfo.email,
            to,
            subject: "New Student",           
            html: `<center>
            <div>
           <ul>
        <li> Name: ${newStudentInfo.name} </li>
        <li> Email: ${newStudentInfo.email} </li>
        <li> Phone Number: ${newStudentInfo.phoneNumber} </li>
        <li> SSN: ${newStudentInfo.SSN} </li>
        <li> Course: ${newStudentInfo.courses[0]} </li>
        <li> Emergency Contact: ${newStudentInfo.emergencyContact} </li>
        <li> Address 1: ${newStudentInfo.streetAddress} </li>
        <li> State: ${newStudentInfo.state} </li>
        <li> Zip-Code: ${newStudentInfo.zipCode} </li>
        <li> City: ${newStudentInfo.city} </li>
           </ul>
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


module.exports = { sendMail, getContactUsEmail, getNewStudentNotification};