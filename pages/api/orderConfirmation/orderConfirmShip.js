/* eslint-disable import/no-anonymous-default-export */
const mail = require('@sendgrid/mail')

mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const body = JSON.parse(req.body)
   
    const message = `
    Name: ${body.user.name}\r\n
    Email: ${body.user.email}\r\n
    Order #: ${body.order._id}\r\n 
    Total: \$ ${body.order.total} USD\r\n
  


    Thank you for your order and payment! You will be notified when the order ships.\r\n
    https://www.morningritualsoap.com/signin\r\n
    https://www.morningritualsoap.com/order/${body.order._id}\r\n
    ***DO NOT REPLY TO THIS EMAIL***\r\n
    https://www.morningritualsoap.com/contact\r\n
    or jen@morningritualsoap.com\r\n
    ` 
    
    const data = {
        to: body.user.email,
        from: 'contact@morningritualsoap.com',
        cc: `jen@morningritualsoap.com`,
        bcc: `jenbarto@gmail.com`,
        subject: `Order Confirmation from Morning Rituals Soap`,
        text: message,
        html: message.replace(/\r\n/g, '<br />')
    }

    await mail.send(data)

    res.status(200).json({ status: 'OK' })
}