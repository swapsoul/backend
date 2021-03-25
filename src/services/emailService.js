const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const commonService = require('./commonService');

function readTemplateWithReplacements(templateNameWithRelativePath, replacements) {
    const filePath = path.join(__dirname, templateNameWithRelativePath);
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    return template(replacements);
}

const mailerConfig = {
    host: 'smtpout.secureserver.net',
    secureConnection: true,
    port: 465,
    auth: {
        user: process.env.FromEmail,
        pass: process.env.EmailPassword
    }
}

const mailTransport = nodemailer.createTransport(mailerConfig);
const templateStaticPath = '../static/templates/';
const staticPath = '../static/';

function sendMail(sendTo, emailSubject, templateName, replacements, attachments, callback) {
    const attachmentsObjectArray = [];
    attachments.forEach((value) => attachmentsObjectArray.push({path: path.join(__dirname, path.join(staticPath, value))}));
    let mailOptions = {
        from: mailerConfig.auth.user,
        to: typeof sendTo === 'string'? sendTo : sendTo.join(', '),
        subject: emailSubject,
        html: readTemplateWithReplacements(path.join(templateStaticPath, templateName), replacements),
        // check here for different kind of attachments https://nodemailer.com/message/attachments/
        attachments: attachmentsObjectArray
    };

    mailTransport.sendMail(mailOptions, (err) => {
       // if (err) {
       //     console.log('error: ', err);
       // } else {
       //     console.log('Mail Sent');
       // }
       callback(err);
    });
}
exports.sendMail = sendMail;

// sendMail("nitinkumar9054@gmail.com", "Hi From Swapsoul", 'forgotPassword.html', {
//     name: "Nitin Kumar",
//     pin: commonService.createOtp(6),
//     timestamp: new Date().toUTCString()
// }, ['img/image.jpeg'], (err) => {
//     if (err) {
//         console.log(err);
//     }
// });
