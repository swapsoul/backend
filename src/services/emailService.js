const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const commonService = require('./commonService');

function readTemplateWithReplacements(templateNameWithRelativePath, replacements) {
    const filePath = path.join(__dirname, templateNameWithRelativePath);
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    // const replacements = {
    //     username: "Umut YEREBAKMAZ"
    // };
    return template(replacements);
}

const mailerConfig = {
    host: 'smtpout.secureserver.net',
    secureConnection: true,
    port: 465,
    auth: {
        user: "info@swapsoul.com",
        pass: "swapsoul@123"
    }
}

const mailTransport = nodemailer.createTransport(mailerConfig);
const templateStaticPath = '../static/templates/';

function sendMail(sendTo, emailSubject, templateName, replacements, callback) {
    let mailOptions = {
        from: mailerConfig.auth.user,
        to: typeof sendTo === 'string'? sendTo : sendTo.join(', '),
        subject: emailSubject,
        html: readTemplateWithReplacements(path.join(templateStaticPath, templateName), replacements)
        // html: `<body>` +
        //     `<p>Hey Bro</p>` +
        //     `</body>`
    };

    mailTransport.sendMail(mailOptions, (err) => {
       if (err) {
           console.log('error: ', err);
       } else {
           console.log('Mail Sent');
       }
       callback(err);
    });
}

sendMail("nitinkumar9054@gmail.com", "Hi From Swapsoul", 'forgotPassword.html', {
    name: "Nitin Kumar",
    pin: commonService.createOtp(6),
    timestamp: new Date().toUTCString()
}, (err) => {
    if (err) {
        console.log(err);
    }
});
