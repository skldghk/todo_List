import mysql from 'mysql2/promise';

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,  // 데이터베이스 호스트
    port: process.env.DB_PORT,  // 데이터베이스 포트
    user: process.env.DB_USER,  // 데이터베이스 사용자
    password: process.env.DB_PASSWORD,  // 데이터베이스 비밀번호
    database: process.env.DB_NAME,  // 사용할 데이터베이스 이름
  });

  return connection;
}
