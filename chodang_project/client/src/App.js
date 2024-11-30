import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // 서버 연결 테스트
    const testServerConnection = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/test');
        setMessage(response.data.message);
      } catch (err) {
        setError('서버 연결 실패: ' + err.message);
      }
    };

    testServerConnection();
  }, []);

  return (
    <div className="App">
      <h1>서버 연결 테스트</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
