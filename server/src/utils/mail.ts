import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// console.log(process.env.GMAIL_USER + " " + process.env.GMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // app password
  },
});

export const sendOtpEmail = async (to: string, otp: string) => {
  console.log(to + " " + otp);
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject: 'Your TrackMyJobs OTP',
    html: `<p>Hello,</p>
           <p>Your OTP for TrackMyJobs is: <b>${otp}</b></p>
           <p>It expires in 5 minutes.</p>`,
  });
};
