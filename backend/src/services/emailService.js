import { createRequire } from "module";
const require = createRequire(import.meta.url);
const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendOtpEmail = async ({ email, otp }) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
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
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
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