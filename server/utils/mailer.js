const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendBookingConfirmation = async (to, eventTitle) => {
  const mailOptions = {
    from: `"Event Platform" <${process.env.EMAIL_USER}>`,
    to,
    subject: '🎟️ Booking Confirmed!',
    html: `<p>Your booking for <strong>${eventTitle}</strong> is confirmed!</p>
           <p>See you at the event</p>`
  };

  await transporter.sendMail(mailOptions);
};
