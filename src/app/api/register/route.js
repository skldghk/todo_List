import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';

export async function POST(req) {
  const { email, password } = await req.json();

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  const connection = await connectToDatabase();

  try {
    const [result] = await connection.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    return new Response(JSON.stringify({ message: 'User registered successfully!' }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    connection.end();
  }
}
