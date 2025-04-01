import { pool } from '../config/db';
import { randomUUID } from 'crypto';

export interface User {
  id?: string;
  name: string;
  avatar: string | null;
  email: string;
  phone: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export async function createUser(user: User): Promise<User | null> {
  const id = randomUUID();
  const now = new Date();
  const avatar = user.avatar || null;

  try {
    await pool.execute(
      'INSERT INTO users (id, name, avatar, email, phone, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, user.name, avatar, user.email, user.phone, now, now]
    );
    
    return { ...user, id, created_at: now, updated_at: now };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [rows]: any = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  
  if (rows.length === 0) return null;
  return rows[0] as User;
}

export async function getAllUsers(): Promise<User[]> {
  const [rows]: any = await pool.execute('SELECT * FROM users ORDER BY created_at DESC');
  return rows as User[];
}

export async function getUserById(id: string): Promise<User | null> {
  const [rows]: any = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
  
  if (rows.length === 0) return null;
  return rows[0] as User;
}

export async function updateUser(id: string, userData: Partial<User>): Promise<boolean> {
  const user = await getUserById(id);
  if (!user) return false;
  
  const updated = { ...user, ...userData, updated_at: new Date() };
  
  await pool.execute(
    'UPDATE users SET name = ?, avatar = ?, email = ?, phone = ?, updated_at = ? WHERE id = ?',
    [updated.name, updated.avatar, updated.email, updated.phone, updated.updated_at, id]
  );
  
  return true;
}

export async function deleteUser(id: string): Promise<boolean> {
  const [result]: any = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
