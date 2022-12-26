const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require("mailgun-js")({apiKey: apiKey, domain: domain});

const email = {
    sendEmail: async function sendEmail(res, email) {
        mailgun.messages().send(email, function (error, body) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    errors: {
                        status: 500,
                        message: "Could not send email",
                    }
                })
            }
            console.log(body);
            return res.status(201).json({
                data: {
                    message: "Email successfully sent"
                }
            });
        });
    }
};

module.exports = email;
