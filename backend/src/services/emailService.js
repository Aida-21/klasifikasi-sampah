import Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;

export const sendOtpEmail = async ({ email, otp }) => {
  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.sender = { email: "nuraidaschool21@gmail.com", name: "Klasifikasi Sampah" };
  sendSmtpEmail.subject = "Kode OTP Verifikasi";
  sendSmtpEmail.htmlContent = `
    <h2>Verifikasi Email</h2>
    <p>Kode OTP Anda:</p>
    <h1>${otp}</h1>
    <p>Berlaku selama 5 menit.</p>
  `;
  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

export const sendResetPasswordEmail = async ({ email, token }) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.sender = { email: "nuraidaschool21@gmail.com", name: "Klasifikasi Sampah" };
  sendSmtpEmail.subject = "Reset Password Klasifikasi Sampah";
  sendSmtpEmail.htmlContent = `
    <h2>Reset Password</h2>
    <p>Klik link berikut:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>Berlaku selama 15 menit.</p>
  `;
  await apiInstance.sendTransacEmail(sendSmtpEmail);
};