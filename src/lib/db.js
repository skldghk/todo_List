import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// .env 파일의 환경 변수를 로드
dotenv.config();

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,  // 기본 포트를 설정할 수도 있습니다.
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  return connection;
}
