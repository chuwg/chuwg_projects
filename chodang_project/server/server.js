const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS 설정을 더 구체적으로 지정
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB 연결 성공'))
.catch((err) => console.error('MongoDB 연결 실패:', err));

// 테스트용 API 엔드포인트
app.get('/api/test', (req, res) => {
    res.json({ message: '서버 연결 성공!' });
});

// 기본 라우트
app.get('/', (req, res) => {
    res.send('쇼핑몰 API 서버');
});

// 서버 시작
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행중입니다.`);
}); 