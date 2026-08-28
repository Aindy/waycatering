import React from "react";
import styles from "./index.module.sass";

const Lightbox = ({ project, onClose }) => {
  const [index, setIndex] = React.useState(0);
  const photos = project?.photos ?? [];

  const prev = React.useCallback(
    () => setIndex((i) => (i - 1 + photos.length) % photos.length),
    [photos.length]
  );
  const next = React.useCallback(
    () => setIndex((i) => (i + 1) % photos.length),
    [photos.length]
  );

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  if (!project || photos.length === 0) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.inner} onClick={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <div>
            <h3 className={styles.title}>{project.title}</h3>
            {project.place && <p className={styles.place}>{project.place}</p>}
          </div>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Закрыть"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className={styles.stage}>
          <img className={styles.photo} src={photos[index]} alt={project.title} />

          {photos.length > 1 && (
            <>
              <button
                className={`${styles.nav} ${styles.left}`}
                onClick={prev}
                aria-label="Предыдущее фото"
                type="button"
              >
                ‹
              </button>
              <button
                className={`${styles.nav} ${styles.right}`}
                onClick={next}
                aria-label="Следующее фото"
                type="button"
              >
                ›
              </button>
            </>
          )}
        </div>

        <div className={styles.foot}>
          <span className={styles.counter}>
            {index + 1} / {photos.length}
          </span>
          <div className={styles.dots}>
            {photos.map((p, i) => (
              <button
                key={p}
                type="button"
                aria-label={`Фото ${i + 1}`}
                className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
