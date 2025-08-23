import GMailService  from '@base/config/mailer'
import { GetFullName } from '@utilities/dataHelper'

export const SendEmailVerification = async (idUser: string, body: any) => {
  const { email, firstName, lastName} = body
  const to = email
  const subject = 'Email Verification'
  const html = `Hello ${GetFullName(firstName, lastName)} From Gmail <a href="http://localhost:4000/sign-up/verify/${idUser}">Click Me To Verify</a>`

  return await GMailService.sendMail(to, subject, html)
}
