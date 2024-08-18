import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function GET(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ message: 'Protected data', user: decoded });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
  }
}
