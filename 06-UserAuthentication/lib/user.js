import db from './db';
export default function CreateUser(email, password) {
  const result = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(
    email, 
    password
  )
  return result.lastInsertRowid
}

export function getUserByEmail(email) {
  // 데이터베이스에서 찾은 사용자의 첫 번째 결과를 반환 없으면 undefined
  // 이메일이 특정 값과 일치하는 모든 정보를 가져오는 쿼리. ?는 플레이스홀더로, 나중에 함수 인자로 받은 email 값이 여기에 삽입
  // .get(email): prepare된 SQL 쿼리를 실행하는 메서드. 쿼리의 결과가 하나일 때 사용된다. 여기서 email 값을 쿼리의 ? 자리에 대입

  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}