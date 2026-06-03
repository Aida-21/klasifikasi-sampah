import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async ({ email, otp }) => {
  await transporter.sendMail({
    from: `"Klasifikasi Sampah" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Kode OTP Verifikasi Website Klasifikasi Sampah",
    html: `
      <h2>Verifikasi Email</h2>
      <p>Kode OTP Anda:</p>
      <h1>${otp}</h1>
      <p>Kode ini berlaku selama 5 menit.</p>
    `,
  });
};

export const sendResetPasswordEmail = async ({ email, token }) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

  await transporter.sendMail({
    from: `"Klasifikasi Sampah" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Password Klasifikasi Sampah",
    html: `
      <h2>Reset Password</h2>
      <p>Klik link berikut untuk mengganti password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Link ini berlaku selama 15 menit.</p>
    `,
  });
};