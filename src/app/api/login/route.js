import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';

export async function POST(req) {
  const { email, password } = await req.json();
  const connection = await connectToDatabase();

  try {
    // 데이터베이스에서 해당 이메일을 가진 사용자 찾기
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    // 사용자가 존재하지 않을 경우
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: '이메일 또는 비밀번호가 잘못되었습니다.' }), {
        status: 401,
      });
    }

    const user = rows[0];

    // 비밀번호 비교
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: '이메일 또는 비밀번호가 잘못되었습니다.' }), {
        status: 401,
      });
    }

    // 로그인 성공
    return new Response(JSON.stringify({ message: '로그인 성공' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } finally {
    connection.end();
  }
}
