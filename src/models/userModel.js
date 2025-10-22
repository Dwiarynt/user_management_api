import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => password && password.length >= 6;

export const createUser = async (username, email, password) => {
  if (!validateEmail(email)) {
    throw new Error('Format email tidak valid');
  }
  if (!validatePassword(password)) {
    throw new Error('Password minimal 6 karakter');
  }

  const hashed = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, role, avatar_url
  `;
  const { rows } = await pool.query(query, [username, email, hashed]);
  return rows[0];
};

export const getAllUsers = async () => {
  const query = `
    SELECT id, username, email, role, avatar_url
    FROM users
    ORDER BY id ASC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};


export const findUserById = async (id) => {
  const query = 'SELECT id, username, email, role, avatar_url FROM users WHERE id = $1';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};


export const updateUser = async (id, { username, email, password }) => {
  if (email && !validateEmail(email)) {
    throw new Error('Format email tidak valid');
  }
  if (password && !validatePassword(password)) {
    throw new Error('Password minimal 6 karakter');
  }

  const updated_at = new Date(); 
  let query = `
    UPDATE users
    SET username = $1, email = $2, updated_at = $3
    WHERE id = $4
    RETURNING id, username, email, role, avatar_url
  `;
  let values = [username, email, updated_at, id];

  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    query = `
      UPDATE users
      SET username = $1, email = $2, password = $3, updated_at = $4
      WHERE id = $5
      RETURNING id, username, email, role, avatar_url
    `;
    values = [username, email, hashed, updated_at, id];
  }

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return { message: 'User deleted successfully' };
};
