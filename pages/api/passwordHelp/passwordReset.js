/* eslint-disable import/no-anonymous-default-export */
import { nanoid } from 'nanoid'

const mail = require('@sendgrid/mail')

const baseUrl = process.env.BASE_URL

const secureTokenId = nanoid(32) //secure reset password token

mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
    const body = JSON.parse(req.body)
   
    const userEmail = body.email

    const data = {
        to: `${userEmail}`,
        from: 'contact@morningritualsoap.com',
        bcc: `donbartojunior@gmail.com`,
        subject: `Morning Rituals Soap Password Reset`,
        text: 'Please click the link below to reset your password',
        html: `<h3>Please <a href=\"${baseUrl}/forgotPassword/${secureTokenId}\" > click here tp reset your </a> to reset your password</h3>`
    }

    await mail.send(data)

    res.status(200).json({ status: 'OK' })
}