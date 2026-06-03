import bcrypt from "bcrypt";
import pool from "../config/db.js";
import {
  findUserById,
  updateUserById,
  updateUserPhotoById,
  updatePasswordById,
  deleteUserPhotoById,
  deleteUserById,
} from "../repositories/userRepository.js";

export const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Nama dan email wajib diisi",
      });
    }

    const user = await updateUserById({
      id: req.user.id,
      name,
      email,
    });

    return res.json({
      success: true,
      message: "Profil berhasil diperbarui",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal memperbarui profil",
    });
  }
};

export const updateProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Foto profil wajib diunggah",
      });
    }

    const user = await updateUserPhotoById({
      id: req.user.id,
      photo: req.file.filename,
    });

    return res.json({
      success: true,
      message: "Foto profil berhasil diperbarui",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal memperbarui foto profil",
    });
  }
};
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password lama, password baru, dan konfirmasi wajib diisi",
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

    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    const userWithPassword = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [req.user.id]
    );

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      userWithPassword.rows[0].password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Password lama salah",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updatePasswordById({
      id: req.user.id,
      password: hashedPassword,
    });

    return res.json({
      success: true,
      message: "Password berhasil diganti",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengganti password",
    });
  }
};
export const deleteProfilePhoto = async (req, res) => {
  try {
    const user = await deleteUserPhotoById(req.user.id);

    return res.json({
      success: true,
      message: "Foto profil berhasil dihapus",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal menghapus foto profil",
    });
  }
};
export const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password wajib diisi untuk menghapus akun",
      });
    }

    const userWithPassword = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [req.user.id]
    );

    if (userWithPassword.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      userWithPassword.rows[0].password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Password salah",
      });
    }

    await deleteUserById(req.user.id);

    return res.json({
      success: true,
      message: "Akun berhasil dihapus",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Gagal menghapus akun",
    });
  }
};