<?php
/**
 * Прокси для отправки сообщений в Telegram
 * Разместите этот файл на вашем сервере и укажите путь к нему в ContactForm
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Разрешаем только POST запросы
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Получаем данные из запроса
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Проверяем наличие обязательных полей
if (!isset($data['chat_id']) || !isset($data['text'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
    exit;
}

// Токен бота из переменных окружения или конфига
// Вариант 1: Читаем из .env файла (если используется библиотека для .env)
// Вариант 2: Читаем из переменных окружения сервера
// Вариант 3: Читаем из отдельного конфиг-файла (рекомендуется для production)

// Попытка прочитать из переменных окружения
$BOT_TOKEN = getenv('TELEGRAM_BOT_TOKEN');

// Если не найдено в переменных окружения, читаем из конфиг-файла
if (!$BOT_TOKEN) {
    $configFile = __DIR__ . '/telegram-config.php';
    if (file_exists($configFile)) {
        $config = include $configFile;
        $BOT_TOKEN = $config['BOT_TOKEN'] ?? null;
    }
}

// Если все еще нет токена, используем значение по умолчанию (для обратной совместимости)
// ВАЖНО: В production удалите эту строку и используйте только переменные окружения или конфиг!
if (!$BOT_TOKEN) {
    $BOT_TOKEN = "8266578116:AAFDsNxPRhNO3A6bJh9MLoOaJ34L_Xm37c0";
}

if (!$BOT_TOKEN) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Bot token not configured']);
    exit;
}

$API_URL = "https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage";

// Подготавливаем данные для отправки
$postData = [
    'chat_id' => $data['chat_id'],
    'text' => $data['text'],
    'parse_mode' => $data['parse_mode'] ?? 'Markdown'
];

// Отправляем запрос в Telegram API
$ch = curl_init($API_URL);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $curlError]);
    exit;
}

http_response_code($httpCode);
echo $response;
?>

