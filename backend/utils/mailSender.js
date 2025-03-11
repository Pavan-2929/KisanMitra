import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const mailSender = async (email, title, body) => {
  console.log("Email sent to ", email)
  try {
    // let transporter = nodemailer.createTransport({
    //   service: process.env.MAIL_SERVICE,
    //   port: process.env.MAIL_PORT,
    //   auth: {
    //     user: process.env.MAIL_USER,
    //     pass: process.env.MAIL_PASS,
    //   },
    // });

    // let info = await transporter.sendMail({
    //   from: '"Kishan mitra " <blogapp24@gmail.com>',
    //   to: `${email}`,
    //   subject: `${title}`,
    //   html: `${body}`,
    // });
    return "info";
  } catch (error) {
    console.log(error);
  }
};

export default mailSender;
