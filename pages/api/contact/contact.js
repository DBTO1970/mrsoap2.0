// /* eslint-disable import/no-anonymous-default-export */
// const mail = require('@sendgrid/mail')

// mail.setApiKey(process.env.SENDGRID_API_KEY)

// export default async (req, res) => {
//     const body = JSON.parse(req.body)
   
//     const message = `
//     Name: ${body.name}\r\n
//     Email: ${body.email}\r\n
//     Message: ${body.message}
//     `
    
//     const data = {
//         to:'jen@morningritualsoap.com',
//         from: 'contact@morningritualsoap.com',
//         bcc: `jenbarto@gmail.com`,
//         subject: `New message from ${body.name}`,
//         text: message,
//         html: message.replace(/\r\n/g, '<br />')
//     }

//     await mail.send(data)

//     res.status(200).json({ status: 'OK' })
// }
import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

async function sendSimpleMessage() {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_SEND_API_KEY || "MAILGUN_API_KEY",
   
  });
  try {
    const data = await mg.messages.create("sandbox2066b35d1456479fba7863cf7026a4fe.mailgun.org", {
      from: "Mailgun Sandbox <postmaster@sandbox2066b35d1456479fba7863cf7026a4fe.mailgun.org>",
      to: ["Donald Barto Jr <donbartojunior@gmail.com>"],
      subject: "Hello Donald Barto Jr",
      text: "Congratulations Donald Barto Jr, you just sent an email with Mailgun! You are truly awesome!",
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}