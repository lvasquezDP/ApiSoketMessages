import nodeMailer from "nodemailer";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachements?: attachments[];
}

interface attachments {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter;

  constructor(service: string, user: string, pass: string,private readonly send:boolean) {
    this.transporter = nodeMailer.createTransport({
      service,
      auth: { user, pass },
    });
  }

  async sendEmail(opt: SendEmailOptions): Promise<boolean> {
    try {
      if(!this.send)return true;
      const sendInformation = await this.transporter.sendMail(opt);
      // console.log(sendInformation);
      return true;
    } catch (error) {
      return false;
    }
  }
}
