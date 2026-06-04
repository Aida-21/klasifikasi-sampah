import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async ({ email, otp }) => {
  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev", // ganti jika sudah verifikasi domain
    to: email,
    subject: "Kode OTP Verifikasi Website Klasifikasi Sampah",
    html: `
      <h2>Verifikasi Email</h2>
      <p>Kode OTP Anda:</p>
      <h1>${otp}</h1>
      <p>Kode ini berlaku selama 5 menit.</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message);
  }
};

export const sendResetPasswordEmail = async ({ email, token }) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev", // ganti jika sudah verifikasi domain
    to: email,
    subject: "Reset Password Klasifikasi Sampah",
    html: `
      <h2>Reset Password</h2>
      <p>Klik link berikut untuk mengganti password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Link ini berlaku selama 15 menit.</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message);
  }
};