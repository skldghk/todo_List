import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import { generateToken } from '@/lib/auth';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// JWT 검증 함수
export function authenticateToken(req) {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
        return { valid: false, message: 'No token provided' };
    }

    const token = authHeader.split(' ')[1];

    try {
        const user = jwt.verify(token, SECRET_KEY);
        return { valid: true, user };
    } catch (error) {
        return { valid: false, message: 'Invalid token' };
    }
}
export async function POST(req) {
    const { email, password } = await req.json();

    try {
        const connection = await connectToDatabase();

        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        await connection.end();

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // JWT 토큰 생성
        const token = generateToken({ id: user.id, email: user.email });

        return NextResponse.json({ token }); // 토큰 반환
    } catch (error) {
        console.error('Error logging in:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
// 보호된 API 처리 (예: GET 요청)
export async function GET(req) {
    const { valid, user, message } = authenticateToken(req);

    if (!valid) {
        return NextResponse.json({ message }, { status: 401 });
    }

    return NextResponse.json({ message: 'This is a protected route', user });
}
