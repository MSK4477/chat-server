import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to:to,
    subject:subject,
    html : message
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};

export default sendEmail; 
