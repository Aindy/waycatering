import React from "react";
import styles from "./index.module.sass";
import dataPortfolio, { categories } from "../../../assets/data/dataPortfolio";
import Lightbox from "../../../components/Lightbox";

const Portfolio = () => {
  const [filter, setFilter] = React.useState("all");
  const [opened, setOpened] = React.useState(null);

  const counts = React.useMemo(() => {
    const acc = { all: dataPortfolio.length };
    dataPortfolio.forEach((p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
    });
    return acc;
  }, []);

  const items =
    filter === "all"
      ? dataPortfolio
      : dataPortfolio.filter((p) => p.category === filter);

  return (
    <div className="wrapper">
      <div className={styles.portfolio}>
        <h1>Наше портфолио</h1>
        <p className={styles.lead}>
          Фестивали, форумы, открытия и частные праздники — от кофе-брейка до
          зоны питания на несколько тысяч гостей.
        </p>

        <div className={styles.tags}>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`${styles.tag} ${
                filter === c.id ? styles.tagActive : ""
              }`}
              onClick={() => setFilter(c.id)}
            >
              {c.title}
              <span className={styles.count}>{counts[c.id] ?? 0}</span>
            </button>
          ))}
        </div>

        <div className={styles.cards}>
          {items.map((p) => {
            const hasPhotos = p.photos.length > 0;
            const hasVideo = Boolean(p.video);
            const openable = hasPhotos || hasVideo;
            return (
              <article
                key={p.id}
                className={`${styles.card} ${openable ? styles.clickable : ""}`}
                onClick={openable ? () => setOpened(p) : undefined}
              >
                <div className={styles.thumb}>
                  <img className={styles.img} src={p.cover} alt={p.title} loading="lazy" />
                  <span className={styles.badge}>
                    {hasPhotos ? `${p.photos.length} фото` : "Видео"}
                  </span>
                  {p.stat && <span className={styles.stat}>{p.stat}</span>}
                  {hasVideo && !hasPhotos && (
                    <span className={styles.play} aria-hidden>
                      ▶
                    </span>
                  )}
                </div>

                <div className={styles.card_info}>
                  <h3>{p.title}</h3>
                  {p.place && <p className={styles.place}>{p.place}</p>}
                  <p className={styles.desc}>{p.desc}</p>
                  {openable && (
                    <span className={styles.more}>
                      {hasPhotos ? "Смотреть фото →" : "Смотреть видео →"}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {opened && <Lightbox project={opened} onClose={() => setOpened(null)} />}
    </div>
  );
};

export default Portfolio;
