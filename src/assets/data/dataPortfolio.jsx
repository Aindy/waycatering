import tehCover from "../img/portfolio/teh-cover.jpg";
import teh1 from "../img/portfolio/teh-1.jpg";
import teh2 from "../img/portfolio/teh-2.jpg";
import teh3 from "../img/portfolio/teh-3.jpg";
import teh4 from "../img/portfolio/teh-4.jpg";
import teh5 from "../img/portfolio/teh-5.jpg";
import teh6 from "../img/portfolio/teh-6.jpg";
import teh7 from "../img/portfolio/teh-7.jpg";
import teh8 from "../img/portfolio/teh-8.jpg";

import kavkazCover from "../img/portfolio/kavkaz-cover.jpg";
import kavkaz1 from "../img/portfolio/kavkaz-1.jpg";
import kavkaz2 from "../img/portfolio/kavkaz-2.jpg";
import kavkaz3 from "../img/portfolio/kavkaz-3.jpg";
import kavkaz4 from "../img/portfolio/kavkaz-4.jpg";
import kavkaz5 from "../img/portfolio/kavkaz-5.jpg";
import kavkaz6 from "../img/portfolio/kavkaz-6.jpg";
import kavkaz7 from "../img/portfolio/kavkaz-7.jpg";
import kavkaz8 from "../img/portfolio/kavkaz-8.jpg";

import autoCover from "../img/portfolio/auto-cover.jpg";
import auto1 from "../img/portfolio/auto-1.jpg";
import auto2 from "../img/portfolio/auto-2.jpg";
import auto3 from "../img/portfolio/auto-3.jpg";
import auto4 from "../img/portfolio/auto-4.jpg";
import auto5 from "../img/portfolio/auto-5.jpg";
import auto6 from "../img/portfolio/auto-6.jpg";
import auto7 from "../img/portfolio/auto-7.jpg";
import auto8 from "../img/portfolio/auto-8.jpg";

import pesnyaCover from "../img/portfolio/pesnya-cover.jpg";
import pesnya1 from "../img/portfolio/pesnya-1.jpg";
import pesnya2 from "../img/portfolio/pesnya-2.jpg";
import pesnya3 from "../img/portfolio/pesnya-3.jpg";
import pesnya4 from "../img/portfolio/pesnya-4.jpg";
import pesnya5 from "../img/portfolio/pesnya-5.jpg";
import pesnya6 from "../img/portfolio/pesnya-6.jpg";
import pesnya7 from "../img/portfolio/pesnya-7.jpg";
import pesnya8 from "../img/portfolio/pesnya-8.jpg";

import akademiyaCover from "../img/portfolio/akademiya-cover.jpg";
import veduchiCover from "../img/portfolio/veduchi-cover.jpg";
import kifCover from "../img/portfolio/kif-cover.jpg";
import krepostCover from "../img/portfolio/krepost-cover.jpg";
import korporativCover from "../img/portfolio/korporativ-cover.jpg";
import jigitCover from "../img/portfolio/jigit-cover.jpg";

export const categories = [
  { id: "all", title: "Все проекты" },
  { id: "forum", title: "Форумы и конференции" },
  { id: "sport", title: "Фестивали и спорт" },
  { id: "opening", title: "Открытия и презентации" },
  { id: "party", title: "Праздники и корпоративы" },
];

const dataPortfolio = [
  {
    id: "kif",
    title: "Кавказский инвестиционный форум",
    place: "г. Грозный",
    category: "forum",
    desc: "Организация питания гостей и участников форума. За три дня обслужено порядка 9 000 гостей.",
    stat: "9 000 гостей",
    cover: kifCover,
    photos: [],
  },
  {
    id: "pesnya",
    title: "Музыкальный фестиваль «Песня года»",
    place: "Дворец торжеств им. Дагуна Омаева",
    category: "party",
    desc: "Фуршет на финале ежегодной XIII музыкальной премии.",
    stat: "XIII премия",
    cover: pesnyaCover,
    photos: [pesnya1, pesnya2, pesnya3, pesnya4, pesnya5, pesnya6, pesnya7, pesnya8],
  },
  {
    id: "teh",
    title: "Спортивный фестиваль «Техноспорт Первых»",
    place: "",
    category: "sport",
    desc: "Организация обеда для гостей и участников фестиваля.",
    stat: "1 300 гостей",
    cover: tehCover,
    photos: [teh1, teh2, teh3, teh4, teh5, teh6, teh7, teh8],
  },
  {
    id: "kavkaz",
    title: "Туристический B2B форум «Открытый Кавказ»",
    place: "",
    category: "forum",
    desc: "Организация фуршета для участников форума.",
    stat: "Фуршет",
    cover: kavkazCover,
    photos: [kavkaz1, kavkaz2, kavkaz3, kavkaz4, kavkaz5, kavkaz6, kavkaz7, kavkaz8],
  },
  {
    id: "auto",
    title: "Открытие автосалона китайских производителей",
    place: "г. Грозный",
    category: "opening",
    desc: "Кейтеринг на открытии дилерского центра.",
    stat: "Открытие",
    cover: autoCover,
    photos: [auto1, auto2, auto3, auto4, auto5, auto6, auto7, auto8],
  },
  {
    id: "veduchi",
    title: "Спортивный фестиваль Wild Trail",
    place: "ГК «Ведучи»",
    category: "sport",
    desc: "Организация питания для участников и гостей фестиваля. Была организована зона питания на 1 200 человек.",
    stat: "1 200 человек",
    cover: veduchiCover,
    photos: [],
  },
  {
    id: "krepost",
    title: "Финал кольцевых гонок SMP Racing",
    place: "Автодром «Крепость Грозная»",
    category: "sport",
    desc: "Организация обеда и кофе-брейка для гостей финала.",
    stat: "Обед и кофе-брейк",
    cover: krepostCover,
    photos: [],
  },
  {
    id: "akademiya",
    title: "Открытие кулинарной академии имени Хадижат Мовлатовой",
    place: "",
    category: "opening",
    desc: "Кейтеринговое обслуживание церемонии открытия.",
    stat: "Открытие",
    cover: akademiyaCover,
    photos: [],
  },
  {
    id: "jigit",
    title: "Презентация МФК «ДЖИГИТ»",
    place: "",
    category: "opening",
    desc: "Организация кейтеринга на презентации клуба.",
    stat: "Презентация",
    cover: jigitCover,
    photos: [],
  },
  {
    id: "korporativ",
    title: "Частные и корпоративные мероприятия",
    place: "",
    category: "party",
    desc: "Организация питания на закрытых мероприятиях под запрос заказчика.",
    stat: "Под запрос",
    cover: korporativCover,
    photos: [],
  },
];

export default dataPortfolio;
