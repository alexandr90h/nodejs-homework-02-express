const Mailgen = require("mailgen");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;
      case "production":
        this.link = "http://localhost:3000";
        break;
      default:
        this.link = "http://localhost:3000";
        break;
    }
  }
  #createTemplate(verifyToken, name = "Guest") {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "neopolitan",
      product: {
        name: "System Contacts",
        link: this.link,
      },
    });
    const template = {
      body: {
        name,
        intro: "Welcome to Mailgen! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Mailgen, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/auth/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(template);
  }
  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "alexandr90h@gmail.com", // Use the email address or domain you verified above
      subject: "Sending with Twilio SendGrid is Fun",
      html: emailBody,
    };
    //ES6
    await this.#sender.send(msg);
  }
}
module.exports = EmailService;
