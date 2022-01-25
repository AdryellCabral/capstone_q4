import nodemailer from "nodemailer";
import path from "path";
import AppError from "../../errors/AppError";
import hbs from "nodemailer-express-handlebars";

interface RequestReport {
  name: string;
  totalCost: number;
}
interface RequestChangePassword {
  name: string;
  token: string;
}
export default class SendEmailService {
  public async execute(
    email:string,
    mailerType:string,
    obj: RequestReport | RequestChangePassword
    ): Promise<void> {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_AUTH_USER,
          pass: process.env.EMAIL_AUTH_PASS
        }
      });
    
    transport.use(
        "compile",
        hbs({
          viewEngine: {
            partialsDir: path.resolve(__dirname, "..", "..", "views"),
            defaultLayout: undefined,
          },
          viewPath: path.resolve(__dirname, "..", "..", "views"),
        })
      );
      
      let subject: string;
      if (mailerType === "report") {
        subject = "Solicitação de relatório de vendas"
      }else{
        subject = "token para alterar email."
      }
      
      const mailOptions = {
        from: "nao-responda@CapsBook.com.br",
        to: email,
        subject: subject,
        template: mailerType,
        context: obj,
      };
  
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new AppError("Error while sending the email", 500);
        }
  
        console.log(info);
      });
  
  }
}