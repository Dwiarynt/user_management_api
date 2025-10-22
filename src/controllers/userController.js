import pool from '../config/db.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import { findUserById } from '../models/userModel.js';

export const getUsers = async (req, res) => {
  const { rows } = await pool.query('SELECT id, username, email, role, avatar_url FROM users');
  res.json(rows);
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user', error: err.message });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'avatars' },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadStream();
    const { id } = req.user;

    await pool.query('UPDATE users SET avatar_url = $1 WHERE id = $2', [result.secure_url, id]);

    res.json({ message: 'Avatar uploaded', url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

import { updateUser } from '../models/userModel.js';

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { username, email, password } = req.body;

    const updatedUser = await updateUser(userId, { username, email, password });

    res.json({
      message: 'Profil berhasil diperbarui',
      user: updatedUser
    });
  } catch (err) {
    res.status(400).json({ message: 'Gagal memperbarui profil', error: err.message });
  }
};

import { deleteUser } from '../models/userModel.js';

export const deleteMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await deleteUser(userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus user', error: err.message });
  }
};


