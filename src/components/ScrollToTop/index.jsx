import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const timers = [];
    let attempts = 0;

    // Плавная прокрутка не работает в фоновых вкладках и при
    // prefers-reduced-motion, поэтому позицию потом доводим мгновенно.
    const settle = (el) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (Math.abs(window.scrollY - top) > 4) window.scrollTo(0, top);
    };

    const scrollToAnchor = () => {
      const el = document.querySelector(hash);

      if (!el) {
        // Секция может ещё не отрисоваться: страница загружается лениво.
        if (attempts < 20) {
          attempts += 1;
          timers.push(setTimeout(scrollToAnchor, 50));
        }
        return;
      }

      el.scrollIntoView({ behavior: "smooth", block: "start" });
      timers.push(setTimeout(() => settle(el), 700));
    };

    timers.push(setTimeout(scrollToAnchor, 0));
    return () => timers.forEach(clearTimeout);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
