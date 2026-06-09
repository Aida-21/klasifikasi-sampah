import crypto from "crypto";
import { registerValidation, loginValidation } from "../validations/authValidation.js";
import {
  createUser,
  findUserByEmail,
  verifyUserByEmail,
  updatePasswordByEmail,
} from "../repositories/userRepository.js";
import {
  createOtp,
  findOtpByEmail,
  deleteOtpByEmail,
} from "../repositories/otpRepository.js";
import {
  createPasswordResetToken,
  findPasswordResetToken,
  markPasswordResetTokenUsed,
} from "../repositories/passwordResetRepository.js";
import {
  sendOtpEmail,
  sendResetPasswordEmail,
} from "../services/emailService.js";
import hashPassword from "../utils/hashPassword.js";
import comparePassword from "../utils/comparePassword.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email sudah digunakan",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await createOtp({
      email,
      otp,
    });

    try {
      await sendOtpEmail({ email, otp });
    } catch (emailError) {
      console.log("Gagal kirim email:", emailError);
      // Lanjutkan meski email gagal
    }

        return res.status(201).json({
        success: true,
        message: "Register berhasil. Silakan cek email untuk OTP verifikasi.",
        user,
        });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error saat register",
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email dan OTP wajib diisi",
      });
    }

    const otpData = await findOtpByEmail(email);

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "OTP tidak ditemukan",
      });
    }

    if (new Date() > new Date(otpData.expired_at)) {
      return res.status(400).json({
        success: false,
        message: "OTP sudah kedaluwarsa",
      });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP salah",
      });
    }

    const user = await verifyUserByEmail(email);

    await deleteOtpByEmail(email);

    return res.json({
      success: true,
      message: "Email berhasil diverifikasi. Silakan login.",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal verifikasi OTP",
    });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email wajib diisi",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email tidak ditemukan",
      });
    }

    if (user.is_verified) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terverifikasi",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await createOtp({
      email,
      otp,
    });

    await sendOtpEmail({
      email,
      otp,
    });

    return res.json({
      success: true,
      message: "OTP baru berhasil dikirim ke email",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengirim ulang OTP",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email tidak ditemukan",
      });
    }

    if (!user.is_verified) {
      return res.status(403).json({
        success: false,
        message: "Email belum diverifikasi. Silakan cek OTP di email Anda.",
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Password salah",
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        is_verified: user.is_verified,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email wajib diisi",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email tidak ditemukan",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await createPasswordResetToken({
      email,
      token,
    });

    await sendResetPasswordEmail({
      email,
      token,
    });

    return res.json({
      success: true,
      message: "Link reset password telah dikirim ke email",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengirim reset password",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Token, password baru, dan konfirmasi wajib diisi",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password baru minimal 6 karakter",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Konfirmasi password tidak sama",
      });
    }

    const resetData = await findPasswordResetToken(token);

    if (!resetData) {
      return res.status(400).json({
        success: false,
        message: "Token tidak valid atau sudah digunakan",
      });
    }

    if (new Date() > new Date(resetData.expired_at)) {
      return res.status(400).json({
        success: false,
        message: "Token sudah kedaluwarsa",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    await updatePasswordByEmail({
      email: resetData.email,
      password: hashedPassword,
    });

    await markPasswordResetTokenUsed(token);

    return res.json({
      success: true,
      message: "Password berhasil direset. Silakan login kembali.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal reset password",
    });
  }
};