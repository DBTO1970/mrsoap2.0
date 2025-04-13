/* eslint-disable import/no-anonymous-default-export */
const mail = require('@sendgrid/mail')

mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const body = JSON.parse(req.body)
   
    const message = `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Message: ${body.message}\r\n
    ***DO NOT REPLY TO THIS EMAIL***\r\n
    https://www.morningritualsoap.com/contact\r\n
    `

    const data = {
        to:'jen@morningritualsoap.com',
        from: 'contact@morningritualsoap.com',
        bcc: `donbartojunior@gmail.com`,
        subject: `New message from ${body.name}`,
        text: message,
        html: message.replace(/\r\n/g, '<br />')
    }

    await mail.send(data)

    res.status(200).json({ status: 'OK' })
}