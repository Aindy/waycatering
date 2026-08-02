import React from "react";
import styles from "./index.module.sass";
import { Link } from "react-router-dom";

const METHODS = ["WhatsApp", "Telegram", "Звонок", "SMS", "Email"];

// Получаем токен и chat_id из переменных окружения
const BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN || "";
const CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID || "";

// Используйте прокси для обхода CORS
// Вариант 1: PHP прокси (если на сервере есть PHP)
const USE_PROXY = true; // Включите для использования прокси
const PROXY_URL = "/telegram-proxy.php"; // Путь к PHP прокси на вашем сервере
// Вариант 2: Node.js прокси (если запущен отдельный сервер)
// const PROXY_URL = "http://localhost:3001/api/telegram/send";

// Прямой URL (не работает из-за CORS, но оставлен для справки)
const DIRECT_API_URL = BOT_TOKEN ? `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage` : "";

const ContactForm = ({ img }) => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    method: METHODS[0],
    agree: false,
  });
  const [touched, setTouched] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const phoneRef = React.useRef(null);

  React.useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = resolve;
        document.body.appendChild(s);
      });

    (async () => {
      if (!window.jQuery) {
        await loadScript("https://snipp.ru/cdn/jquery/2.1.1/jquery.min.js");
      }
      await loadScript(
        "https://snipp.ru/cdn/maskedinput/jquery.maskedinput.min.js"
      );

      const $ = window.$;
      if ($ && $.mask && phoneRef.current) {
        $.mask.definitions["h"] = "[0|1|3|4|5|6|7|9]";
        $(phoneRef.current).mask("+7 (h99) 999-99-99");
      }
    })();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const nameValid = form.name?.trim().length >= 2;

  const phoneRaw = phoneRef.current?.value || "";
  const digits = phoneRaw.replace(/\D/g, "");
  // валидно: 11 цифр и начинается с 7 (если надо — разреши и 8)
  const phoneValid = digits.length === 11 && digits.startsWith("7");

  // Валидация email: опционально, но если выбран Email как способ связи - обязательно
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = form.method === "Email" 
    ? form.email?.trim().length > 0 && emailRegex.test(form.email.trim())
    : form.email?.trim().length === 0 || emailRegex.test(form.email.trim());

  const canSubmit = nameValid && phoneValid && emailValid && form.agree;

  // Функция для экранирования специальных символов Markdown
  const escapeMarkdown = (text) => {
    if (!text) return "";
    return String(text)
      .replace(/\*/g, "\\*")      // *
      .replace(/_/g, "\\_")       // _
      .replace(/\[/g, "\\[")      // [
      .replace(/\]/g, "\\]")      // ]
      .replace(/\(/g, "\\(")      // (
      .replace(/\)/g, "\\)")      // )
      .replace(/~/g, "\\~")       // ~
      .replace(/`/g, "\\`")       // `
      .replace(/>/g, "\\>")       // >
      .replace(/#/g, "\\#")       // #
      .replace(/\+/g, "\\+")      // +
      .replace(/-/g, "\\-")       // -
      .replace(/=/g, "\\=")       // =
      .replace(/\|/g, "\\|")      // |
      .replace(/\{/g, "\\{")      // {
      .replace(/\}/g, "\\}");     // }
  };

  // ОТПРАВКА
  const submit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true, agree: true });

    if (!canSubmit) return;

    // Проверяем наличие токена и chat_id
    if (!BOT_TOKEN || !CHAT_ID) {
      alert("Ошибка конфигурации: не указан токен бота или chat_id. Проверьте файл .env");
      console.error("BOT_TOKEN:", BOT_TOKEN ? "установлен" : "не установлен");
      console.error("CHAT_ID:", CHAT_ID ? "установлен" : "не установлен");
      return;
    }

    // Экранируем данные пользователя для безопасной отправки в Markdown
    // Телефон не экранируем, так как он уже в безопасном формате (только цифры, скобки, дефисы)
    const escapedName = escapeMarkdown(form.name);
    const escapedEmail = form.email?.trim() ? escapeMarkdown(form.email.trim()) : "";
    const escapedMethod = escapeMarkdown(form.method);

    const emailText = escapedEmail ? `📧 Email: ${escapedEmail}` : "";
    const message = `📩 *Новая заявка с сайта WAYCATERING*
👤 Имя: ${escapedName}
📞 Телефон: ${phoneRaw}
${emailText ? emailText + "\n" : ""}💬 Способ связи: ${escapedMethod}
✅ Согласие: ${form.agree ? "Да" : "Нет"}`;

    try {
      setLoading(true);
      
      const url = USE_PROXY ? PROXY_URL : DIRECT_API_URL;
      const requestBody = USE_PROXY
        ? JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          })
        : (() => {
            const params = new URLSearchParams({
              chat_id: CHAT_ID,
              text: message,
              parse_mode: "Markdown",
            });
            return params.toString();
          })();

      const res = await fetch(url, {
        method: "POST",
        headers: USE_PROXY
          ? { "Content-Type": "application/json" }
          : { "Content-Type": "application/x-www-form-urlencoded" },
        body: requestBody,
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        alert("Заявка успешно отправлена ✅");

        setForm({ name: "", email: "", method: METHODS[0], agree: false });
        if (phoneRef.current) phoneRef.current.value = "";
        setTouched({});
      } else {
        console.error("Telegram API Error:", data);
        const errorMsg = data.description || data.error_code || "Неизвестная ошибка";
        alert(`Ошибка при отправке в Telegram 😢\n${errorMsg}\n\nПроверьте консоль браузера (F12) для подробностей.`);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      // Проверяем, это CORS ошибка?
      if (err.message?.includes("CORS") || err.message?.includes("Failed to fetch")) {
        alert("Ошибка CORS: Telegram Bot API не разрешает прямые запросы из браузера.\n\nНужно использовать прокси-сервер или backend. Обратитесь к разработчику.");
      } else {
        alert(`Не удалось отправить сообщение: ${err.message}\n\nПроверьте консоль браузера (F12) для подробностей.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contacts}>
      <div className="wrapper">
        <div className={styles.div}>
          {img && <img className={styles.img} src={img} alt="" />}
          <div className={styles.div2}>
            <h1 className={styles.contacts_title}>
              Свяжитесь с нами! Рады будем вам помочь.
            </h1>

            <form className={styles.form} onSubmit={submit} noValidate>
              <label className={styles.label}>
                Имя и фамилия
                <input
                  className={`${styles.input} ${
                    touched.name && !nameValid ? styles.error : ""
                  }`}
                  type="text"
                  name="name"
                  placeholder="Имя и фамилия"
                  value={form.name}
                  onChange={onChange}
                  onBlur={onBlur}
                  autoComplete="name"
                />
                {touched.name && !nameValid && (
                  <span className={styles.hint}>Введите минимум 2 символа</span>
                )}
              </label>

              <label className={styles.label}>
                Номер для связи
                <input
                  ref={phoneRef}
                  className={`${styles.input} ${
                    touched.phone && !phoneValid ? styles.error : ""
                  }`}
                  type="tel"
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                  inputMode="tel"
                  autoComplete="tel"
                  onBlur={onBlur}
                />
                {touched.phone && !phoneValid && (
                  <span className={styles.hint}>
                    Формат: +7 (999) 123-45-67
                  </span>
                )}
              </label>

              <label className={styles.label}>
                Email {form.method === "Email" && <span style={{ color: "#E6007E" }}>*</span>}
                <input
                  className={`${styles.input} ${
                    touched.email && !emailValid ? styles.error : ""
                  }`}
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={form.email}
                  onChange={onChange}
                  onBlur={onBlur}
                  autoComplete="email"
                />
                {touched.email && !emailValid && (
                  <span className={styles.hint}>
                    {form.method === "Email" 
                      ? "Email обязателен при выборе способа связи Email" 
                      : "Введите корректный email адрес"}
                  </span>
                )}
              </label>

              {/* Способ связи */}
              <label className={styles.label}>
                Способ связи
                <div className={styles.selectWrap}>
                  <select
                    className={styles.select}
                    name="method"
                    value={form.method}
                    onChange={onChange}
                  >
                    {METHODS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <span className={styles.chevron} aria-hidden>
                    ▾
                  </span>
                </div>
              </label>

              <label className={styles.agreeRow}>
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <span>
                  Я прочитал(а) и соглашаюсь с{" "}
                  <Link to="/privacy">Политикой конфиденциальности</Link>
                </span>
              </label>

              <div className={styles.submitRow}>
                <button
                  className={styles.submit}
                  type="submit"
                  disabled={!canSubmit || loading}
                >
                  {loading ? "Отправка..." : "Отправить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
