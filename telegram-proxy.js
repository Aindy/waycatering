/**
 * Простой Node.js прокси для отправки сообщений в Telegram
 * 
 * Установка:
 * npm install express cors dotenv
 * 
 * Запуск:
 * node telegram-proxy.js
 * 
 * Или используйте PM2 для production:
 * pm2 start telegram-proxy.js --name telegram-proxy
 */

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // или используйте встроенный fetch в Node 18+

const app = express();
const PORT = process.env.PORT || 3001;

// Настройки - получаем из переменных окружения
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('ОШИБКА: TELEGRAM_BOT_TOKEN не установлен в переменных окружения!');
  console.error('Создайте файл .env или установите переменную окружения:');
  console.error('export TELEGRAM_BOT_TOKEN=your_bot_token_here');
  process.exit(1);
}

const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// Middleware
app.use(cors());
app.use(express.json());

// Прокси endpoint
app.post('/api/telegram/send', async (req, res) => {
  try {
    const { chat_id, text, parse_mode = 'Markdown' } = req.body;

    if (!chat_id || !text) {
      return res.status(400).json({
        ok: false,
        error: 'Missing required fields: chat_id and text'
      });
    }

    const params = new URLSearchParams({
      chat_id,
      text,
      parse_mode
    });

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Telegram Proxy Server running on port ${PORT}`);
});

