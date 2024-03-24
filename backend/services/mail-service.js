const nodemailer = require("nodemailer");

class MailService{
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'space.log@mail.ru',
                pass: 'CRm1dCgxjk08dbAqxU3d'
            }
        })
    }

    async sendMail(to, subject = '', html = '', text = ''){
        await this.transporter.sendMail({
            from: '<space.log@mail.ru>',
            to,
            subject,
            text,
            html
        })
    }

}

module.exports = new MailService();