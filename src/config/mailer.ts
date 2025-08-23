
import mailerconfig  from '@base/mailerconfig';
import { Transporter, createTransport, TransportOptions} from 'nodemailer';

interface ISendMailOptions {
  to?: string;
  from?: string;
  subject?: string;
  text?: string;
  html?: string;
  template?: string;
  context?: {
      [name: string]: any;
  };
}

class GMailService {
  private _transporter: Transporter;

  constructor() {
    this._transporter = createTransport( mailerconfig as TransportOptions );
  }

  async sendMail(to: string, subject: string, html: string) {
    const config: any = mailerconfig
    const options: ISendMailOptions = {
      from: config.auth.user,
      to,
      subject,
      html
    }

    const res = await this._transporter.sendMail(options)

    return res;
  }

}

export default new GMailService()
