export default function Home() {
  return (
    <div style={styles.container}>
      <h1>To-Do List 애플리케이션에 오신 것을 환영합니다</h1>
      <p>이 애플리케이션을 사용하여 할 수 있는 일은 다음과 같습니다:</p>
      <p>새로운 할 일을 목록에 추가하세요</p>
      <p>완료된 할 일을 표시하세요</p>
      <p>목록에서 할 일을 삭제하세요</p>
      <p>상단의 네비게이션 바를 사용하여 로그인 또는 회원가입 페이지로 이동하세요.</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
};
