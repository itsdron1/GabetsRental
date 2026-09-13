import { readFileSync, writeFileSync } from "node:fs";

function merge(base, overlay) {
  if (Array.isArray(overlay)) {
    if (
      Array.isArray(base) &&
      overlay.every((item) => item && typeof item === "object" && !Array.isArray(item))
    ) {
      return overlay.map((item, index) => merge(base[index], item));
    }
    return overlay;
  }
  if (overlay && typeof overlay === "object") {
    const out = { ...(base && typeof base === "object" ? base : {}) };
    for (const [key, value] of Object.entries(overlay)) {
      out[key] = merge(base?.[key], value);
    }
    return out;
  }
  return overlay;
}

function translateReturnStops(packages, word) {
  for (const pack of Object.values(packages)) {
    for (const route of pack.routes ?? []) {
      for (const stop of route.stops ?? []) {
        if (stop.name === "Return") stop.name = word;
      }
    }
  }
}

const ruTours = {
  index: {
    tag: "Туры",
    title: "Мототуры по Бали",
    subtitleBefore:
      "Мототуры по Бали на премиальных байках — вулканы, рисовые террасы, храмы и побережье. Совместите тур с",
    fleetLink: "арендой байка на Бали",
    subtitleAfter: "из нашего флота.",
    bookWhatsapp: "Забронировать тур в WhatsApp",
    viewFleet: "Смотреть флот",
    featuredTitle: "Маршруты",
    featuredSubtitle:
      "Полный день в горах, побережье, полудневные петли и полностью свой маршрут на Бали.",
    includedTitle: "Что входит",
    includedText: "Премиальный байк, бензин, сертифицированный шлем, брифинг и гид.",
    whyTitle: "Почему с нами",
    whyText: "Живой флот, быстрые ответы и маршруты с остановками, которые стоит снимать.",
    flexibleTitle: "Гибкая бронь",
    flexibleText: "Приват и группа. Подтверждение в WhatsApp без ожидания сутками.",
    faqTitle: "Вопросы по турам",
    customCta: "Нужен свой маршрут? Соберём под вас.",
    exploreCustom: "Смотреть Custom Tour",
    faqs: [
      {
        q: "Нужны ли права, чтобы ехать в туре?",
        a: "Для соло-райдера — да, действующие мотоправа. Международные права (IDP) очень желательны. Пассажиру сзади права не нужны.",
      },
      {
        q: "Что входит в пакет тура?",
        a: "Аренда байка, шлем, бензин по маршруту, гид, вода и базовая страховка. Подробности — на странице каждого тура.",
      },
      {
        q: "Можно ли заказать свой маршрут?",
        a: "Да. Custom Tour собираем под пляж, вулканы, джунгли и храмы — с учётом вашего опыта.",
      },
    ],
  },
  ui: {
    breadcrumb: "Навигация",
    twoRoutes: "2 маршрута",
    explore: "Смотреть тур",
    bookWhatsapp: "Бронь в WhatsApp",
    viewAll: "Все туры",
    bookNow: "Забронировать",
    readyTitle: "Поехали?",
    readyBody:
      "Бронь {title} в WhatsApp — быстрое подтверждение, гибкие даты и премиальный байк с местным гидом.",
    includedTitle: "Входит и не входит",
    included: "Входит",
    notIncluded: "Не входит",
    safety: "Требования безопасности",
    rider: "Требования к райдеру",
    places: "Куда заедем",
    description: "Подробно о туре",
    route: "Маршрут",
    info: "О туре",
    distance: "Дистанция",
    duration: "Длительность",
    departure: "Выезд",
    price: "Цена",
    difficulty: "Сложность",
    faq: "Частые вопросы",
    related: "Похожие туры",
    gallery: "Фото",
    closeGallery: "Закрыть галерею",
    flexible: "Гибко",
    types: { "half-day": "Полдня", "full-day": "Полный день", custom: "Свой маршрут" },
    difficulties: {
      Easy: "Легко",
      Moderate: "Средне",
      Challenging: "Сложно",
      Flexible: "Гибко",
    },
    includedLabels: {
      Motorcycle: "Премиальный мотоцикл",
      Helmet: "Шлем и защита",
      Fuel: "Бензин включён",
      "Local guide": "Профессиональный гид",
      "Drinking water": "Вода",
      "Basic insurance": "Базовая страховка",
      "Parking fees": "Парковка",
      "Professional guide": "Профессиональный гид",
      Sarong: "Саронг для храма",
      "Route planning consultation": "Помощь с маршрутом",
    },
    fromPrice: "от IDR {price}",
    returnStop: "Возврат",
    cardAlt: "{title} — мототур по Бали на big bike с гидом",
    heroAlts: {
      "kintamani-highlands":
        "Балийский храм на рассвете у Lake Bratan — мототур Kintamani Highlands",
      "tanah-lot-bedugul-explorer":
        "Рисовые террасы Jatiluwih на рассвете — тур Tanah Lot Bedugul Explorer",
      "denpasar-tanah-lot-nusa-dua":
        "Храм на скалах над океаном — тур Denpasar Tanah Lot Nusa Dua",
    },
  },
  packages: {
    "kintamani-highlands": {
      title: "Kintamani Highlands",
      tagline: "Две вулканические петли через художественный и горный Бали",
      description: [
        "Полный день на Бали: настоящий big bike adventure. Этот маршрут уводит дальше открыточных точек — в вулканическое сердце острова, где сходятся культура, виды и открытые горные дороги.",
        "Около 200 км и 8 часов — как раз чтобы почувствовать, зачем люди берут аренду Harley на Бали и другие туреры. У Kintamani Highlands два варианта, финал у кальдеры общий.",
        "Маршрут A идёт через художественный коридор: рынок Sukawati, дворец и галереи Ubud — и поднимается на кромку кальдеры Mount Batur. Обратно — сквозь кофейные террасы в тумане и ступени Tegalalang.",
        "Маршрут B тише: чёрный песок Lebih, традиционная деревня Penglipuran, та же смотровая Kintamani и спуск через плантации и Tegalalang.",
        "Гид едет на своём big bike. Можно соло, группой или пассажиром сзади.",
      ],
      duration: "±8 часов",
      highlights: [
        "Смотровая на кальдере Mount Batur",
        "Рисовые террасы Tegalalang",
        "Penglipuran — одна из самых цельных деревень Бали",
        "Рынок Sukawati и культурное сердце Ubud",
        "Традиционная кофейная плантация и luwak",
        "Два полностью гидовых варианта маршрута",
      ],
      notIncluded: ["Вход в храмы", "Еда и напитки", "Личная страховка"],
      toBring: [
        "Лёгкая куртка (в горах до 18°C)",
        "Солнцезащита",
        "Камера",
        "Наличные на входы (~IDR 50.000–100.000 за место)",
        "Закрытая удобная обувь",
      ],
      safetyRequirements: ["Действующие мотоправа", "Минимум 18 лет", "Только трезвым"],
      riderRequirements: [
        "Для соло — базовый опыт вождения",
        "Пассажиру сзади права не нужны",
      ],
      routes: [
        { label: "Маршрут A" },
        { label: "Маршрут B" },
      ],
      places: [
        {
          title: "Kintamani Volcano Viewpoint",
          description:
            "Кромка кальдеры Mount Batur: озеро, склоны и утренние облака — общий финал обоих маршрутов.",
        },
        {
          title: "Tegalalang Rice Terraces",
          description:
            "Знаковые ступенчатые террасы: прогулка по тропам и кадры, из-за которых сюда едут.",
        },
        {
          title: "Ubud & Sukawati Cultural Corridor",
          description:
            "Маршрут A проходит рынок Sukawati и дворец Ubud — художественное сердце центрального Бали.",
        },
        {
          title: "Penglipuran Traditional Village",
          description:
            "Маршрут B заезжает в одну из самых аккуратных традиционных деревень острова.",
        },
        {
          title: "Traditional Coffee Plantation",
          description:
            "Рабочая плантация: балийский кофе, прохлада и по желанию дегустация luwak.",
        },
        {
          title: "Scenic Highland Roads",
          description:
            "Горные перевалы, туман и живые серпантины — один из лучших полных дней на big bike.",
        },
      ],
      faq: [
        {
          q: "Можно ли проехать маршрут A и B за один день?",
          a: "Они делят смотровую Kintamani и кофейную плантацию. Склеить оба за день — уже слишком длинно. Лучше выбрать один или собрать Custom Tour.",
        },
        {
          q: "Какая температура в Kintamani?",
          a: "Плато около 1 500 м. Утром бывает 17–20°C. Куртка или ветровка очень кстати.",
        },
        {
          q: "Tegalalang — полноценная остановка или проездом?",
          a: "Останавливаемся по-настоящему: 30–45 минут на тропы и фото.",
        },
        {
          q: "Входы входят в цену?",
          a: "Базовые входы в большинство мест — да. Некоторые смотровые и храмы берут небольшую доплату на месте (обычно IDR 20.000–50.000).",
        },
        {
          q: "Новичок может ехать соло?",
          a: "Маршрут B спокойнее для тех, кто мало ездил в горах. A больше городского трафика через Ubud. Если дороги Бали в новинку — лучше первый тур пассажиром.",
        },
      ],
    },
    "bedugul-pupuan-lush-ride": {
      tagline: "Самый зелёный коридор Бали — сад, озёра в кальдере и гвоздичная деревня",
      description: [
        "Полный день в зелени: королевский храм, ботанический сад, два вулканических озера и редко посещаемый Pupuan с гвоздичными террасами.",
        "Около 200 км и 8 часов в стороне от пляжной толпы. После южного коридора дороги широкие, ровные и почти пустые.",
        "Старт у Taman Ayun — большого храма с рвом в Mengwi. Дальше подъём в Bedugul: сад на 150 гектарах, Lake Bratan и храм на воде.",
        "От Bedugul — к тихому Lake Tamblingan по кромке джунглей. Финал в Pupuan: рабочие террасы гвоздики и кофе, туристов почти нет.",
        "Гид на премиальном байке. Можно соло, группой или сзади.",
      ],
      duration: "±8 часов",
      highlights: [
        "Taman Ayun — королевский храм Mengwi с садом и рвом",
        "Ботанический сад Bedugul — больше 150 гектаров",
        "Pura Ulun Danu Bratan — храм на озере",
        "Lake Tamblingan — тихое вулканическое озеро",
        "Pupuan — деревня гвоздики и кофе",
        "Прохладный горный воздух весь день",
      ],
      notIncluded: ["Вход в ботанический сад", "Пожертвования в храмах", "Еда и напитки"],
      toBring: [
        "Лёгкая дождевая куртка (в Bedugul часто туман)",
        "Камера",
        "Наличные на вход в сад (~IDR 30.000)",
        "Удобная обувь для прогулки",
      ],
      safetyRequirements: ["Действующие мотоправа", "Минимум 18 лет", "Только трезвым"],
      riderRequirements: ["Подходит почти всем: дороги в хорошем состоянии"],
      places: [
        {
          title: "Taman Ayun Temple",
          description:
            "Один из самых красивых королевских храмов Бали — ров, сад и архитектура в списке UNESCO.",
        },
        {
          title: "Bedugul Botanical Garden",
          description:
            "Крупнейший сад острова: горный лес, орхидеи и дороги, по которым приятно ехать на байке.",
        },
        {
          title: "Lake Bratan & Ulun Danu Temple",
          description:
            "Храм словно стоит на воде. Прохлада и кадр, который все узнают.",
        },
        {
          title: "Lake Tamblingan",
          description:
            "Тихое озеро в лесу — один из самых спокойных видов на острове.",
        },
        {
          title: "Pupuan Rice Terraces",
          description:
            "Бесконечная зелень и пустые дороги — для тех, кто ищет живой Бали без толпы.",
        },
        {
          title: "Scenic Mountain Roads",
          description:
            "Лес, озёра и перевалы — один из самых вкусных полных дней за рулём.",
        },
      ],
      faq: [
        {
          q: "Безопасна ли дорога в Bedugul после дождя?",
          a: "Основная трасса обычно в порядке. Опциональная джунглевая тропа у Lake Tamblingan после ливня скользкая — гид решит на месте.",
        },
        {
          q: "Какая погода в Bedugul?",
          a: "Около 1 200 м, 20–24°C, днём часто туман. Выезжаем рано, чтобы застать ясное утро у озера.",
        },
        {
          q: "Вход в ботанический сад входит в цену?",
          a: "Нет, около IDR 30.000 платите на месте.",
        },
        {
          q: "Можно ли купаться в Lake Tamblingan?",
          a: "Нет, озеро священное. Смотрим тропу и виды.",
        },
        {
          q: "Стоит ли ехать до Pupuan?",
          a: "Да. Мало туристов, прохлада и террасы гвоздики — для тех, кто хочет настоящий горный Бали.",
        },
      ],
    },
    "tanah-lot-bedugul-explorer": {
      tagline: "Храм в море, террасы UNESCO и озеро в кальдере — за один кинематографичный день",
      description: [
        "Главные хиты острова на премиальном байке: побережье, дворец, террасы UNESCO и высокогорное озеро в одной петле около 200 км.",
        "На рассвете — Tanah Lot, когда скала поднимается из океана. Дальше Puri Kerambitan, живой королевский дворец почти без туристов, и подъём к Jatiluwih.",
        "Финал у Lake Bratan и Pura Ulun Danu, спуск через Taman Ayun и возвращение на юг. Море, дворец, террасы и озеро за один день — так мало кто собирает.",
        "Гид на своём байке. Соло, группа или пассажир сзади.",
      ],
      duration: "±8 часов",
      highlights: [
        "Tanah Lot на золотом свете",
        "Puri Kerambitan — живой дворец без толпы",
        "Jatiluwih — рисовые террасы UNESCO",
        "Lake Bratan и храм Pura Ulun Danu",
        "Taman Ayun с отражающим рвом",
        "Срез всего пейзажа Бали за один день",
      ],
      notIncluded: ["Вход в Jatiluwih UNESCO", "Пожертвования в храмах", "Еда и напитки"],
      toBring: [
        "Солнцезащита",
        "Камера",
        "Наличные на вход UNESCO (~IDR 40.000)",
        "Удобная обувь для террас",
      ],
      safetyRequirements: ["Действующие мотоправа", "Минимум 18 лет", "Только трезвым"],
      riderRequirements: ["Подходит почти любому уровню"],
      places: [
        {
          title: "Tanah Lot Temple",
          description: "Самый известный морской храм Бали на скале над Индийским океаном.",
        },
        {
          title: "Puri Kerambitan",
          description: "Исторический королевский дворец с живой балийской архитектурой.",
        },
        {
          title: "Jatiluwih Rice Terraces",
          description: "Объект UNESCO: террасы на целых склонах и горный горизонт.",
        },
        {
          title: "Lake Bratan & Ulun Danu Temple",
          description: "Одно из самых снимаемых мест острова — прохлада и озеро.",
        },
        {
          title: "Taman Ayun Temple",
          description: "Королевский комплекс с садами и водой.",
        },
        {
          title: "Scenic Highland Roads",
          description: "Горные дороги, деревни и смотровые на всём пути.",
        },
      ],
      faq: [
        {
          q: "Нужен ли саронг в Tanah Lot?",
          a: "Да, на территорию храма. Саронги даём мы — свой везти не нужно.",
        },
        {
          q: "Вход в Jatiluwih входит в цену?",
          a: "Нет. UNESCO берёт около IDR 40.000 с человека на месте.",
        },
        {
          q: "Можно позавтракать у Tanah Lot?",
          a: "Да, выезжаем рано, до толпы. У храма хорошие варунги. Еда в цену не входит.",
        },
        {
          q: "Сколько времени на Jatiluwih?",
          a: "Обычно 45–60 минут на главную тропу и фото. Дольше — в Custom Tour.",
        },
        {
          q: "Подойдёт ли маршрут новичкам?",
          a: "Да. Дороги в порядке, самых забитых городских кусков избегаем. Один из лучших первых туров на Бали.",
        },
      ],
    },
    "denpasar-tanah-lot-nusa-dua": {
      tagline: "Столица, главный храм и самый ухоженный берег — за четыре часа",
      description: [
        "Полудневный тур для тех, у кого мало времени, но хочется настоящего big bike, а не пробки ради галочки.",
        "Около 100 км и 4 часа — короткий, но цельный вход в прокат мотоцикла на Бали и в гидовые маршруты.",
        "Denpasar: Bajra Sandhi и Puputan Square. Дальше запад — Tanah Lot. Финал на променаде Nusa Dua.",
        "Гид на живом байке. Соло, группа или сзади. Хотите дольше — берите полный день.",
      ],
      duration: "±4 часа",
      priceNote: "Полудневный тур — удобно, если времени мало",
      highlights: [
        "Bajra Sandhi — монумент независимости Бали",
        "Puputan Square — исторический центр Denpasar",
        "Tanah Lot у кромки океана",
        "Променад Nusa Dua",
        "Ровные дороги и спокойный темп",
        "Лучший первый big bike тур на острове",
      ],
      notIncluded: ["Пожертвования в храмах", "Еда и напитки"],
      toBring: ["Солнцезащита", "Саронг (даём мы)", "Камера", "Немного наличных"],
      safetyRequirements: ["Действующие мотоправа", "Минимум 18 лет", "Только трезвым"],
      riderRequirements: [
        "Любой уровень, новичкам можно пассажиром",
      ],
      places: [
        {
          title: "Denpasar City",
          description: "Пульс столицы: рынки, площадь и живые улицы.",
        },
        {
          title: "Tanah Lot Temple",
          description: "Иконный храм на океане — один из главных кадров Бали.",
        },
        {
          title: "Nusa Dua Coastline",
          description: "Ухоженный берег, пальмы и спокойная прибрежная дорога.",
        },
        {
          title: "Coastal Scenic Roads",
          description: "Ровная езда вдоль южного побережья.",
        },
        {
          title: "Cultural Landmarks",
          description: "Современный Бали, традиция и открыточные точки в одном коротком круге.",
        },
      ],
      faq: [
        {
          q: "Это хороший первый тур на Бали?",
          a: "Да — один из самых частых стартов. Дороги понятные, дистанция спокойная, гид не гонит.",
        },
        {
          q: "Можно продлить до полного дня?",
          a: "Да. Пишите — апгрейд до полного дня или свой маршрут поверх этого.",
        },
        {
          q: "Tanah Lot — полноценная остановка?",
          a: "Да, 30–45 минут: скала, территория, фото.",
        },
        {
          q: "Когда лучше быть у Tanah Lot?",
          a: "Рано утром меньше людей и лучше свет. Выезд в 08:00 как раз ставит нас туда до основного наплыва.",
        },
        {
          q: "Нужно ли уметь ездить?",
          a: "Пассажиру — нет. Соло — только с мотоправами. Перед стартом короткий брифинг.",
        },
      ],
    },
    "custom-tour": {
      title: "Custom Tour",
      tagline: "Твой маршрут, твой темп, твой Бали",
      description: [
        "Свой тур: сами выбираете точки, темп и длительность. Самый гибкий формат в линейке мототуров.",
        "Побережье, перевалы, водопады, вулканы, храмы — гид собирает маршрут под вас, не под шаблон.",
        "От 4 часов до петли на 12 часов и до 200 км. Время выезда и остановки — ваши.",
        "Гид на своём байке или на модели из флота. Можно соло, с друзьями или пассажиром.",
        "Для вдохновения смотрите полудневный и полный день — или просто напишите, что хотите увидеть.",
      ],
      distance: "до ±200 KM",
      duration: "Гибко (4–12 часов)",
      departureTime: "Как договоримся",
      routes: [{ label: "Пример маршрута" }],
      highlights: [
        "Полная свобода в точках",
        "Побережье, горы — или всё сразу",
        "Свой темп и длина остановок",
        "Приватный формат",
        "До 200 км за день",
        "Маршрут с местным планированием",
        "Любой уровень и размер группы",
        "Удобно тем, кто уже ездил стандартные петли",
      ],
      notIncluded: [
        "Входы (зависят от точек)",
        "Еда и напитки",
        "Апгрейд личной страховки",
      ],
      toBring: ["Зависит от маршрута — гид скажет на созвоне"],
      safetyRequirements: [
        "Для соло — действующие мотоправа",
        "Минимум 18 лет",
        "Только трезвым",
      ],
      riderRequirements: ["Любой уровень — маршрут подстроим"],
      places: [
        {
          title: "Ваши точки",
          description: "Собираем день так, как хотите вы — без чужого шаблона.",
        },
        {
          title: "Скрытые места",
          description: "Водопады, смотровые, храмы, деревни и пляжи без толпы.",
        },
        {
          title: "Побережье",
          description: "Юг и запад Бали по прибрежным дорогам.",
        },
        {
          title: "Горы",
          description: "Вулканы, перевалы, озёра и прохлада.",
        },
        {
          title: "Культура",
          description: "Храмы, деревни, рынки и живые улицы.",
        },
        {
          title: "Свой ритм",
          description: "Маршрут под стиль езды и список желаний, не наоборот.",
        },
      ],
      faq: [
        {
          q: "Как собрать Custom Tour?",
          a: "Напишите в WhatsApp дату, размер группы, опыт и идеи. Маршрут пришлём в течение 24 часов и правим, пока не сядет.",
        },
        {
          q: "Есть минимум по времени?",
          a: "От 4 часов / примерно 80 км. Верхней границы нет — водили и 12-часовые петли на 250 км.",
        },
        {
          q: "Можно менять маршрут в день поездки?",
          a: "Да. Хотите дольше постоять, пропустить точку или добавить новую — скажите гиду.",
        },
        {
          q: "За сколько бронировать?",
          a: "Лучше за 48 часов. Для групп от 6 человек или нескольких дней — за 5–7 дней.",
        },
        {
          q: "Можно совместить с обычной арендой?",
          a: "Да. Гид ведёт, вы едете на арендованном байке в своём темпе рядом.",
        },
      ],
    },
  },
};

const idTours = {
  index: {
    tag: "Paket Tur",
    title: "Tur Motor Bali",
    subtitleBefore:
      "Jelajah Bali dengan tur motor premium — jalan gunung, teras sawah, pura, dan pesisir di motor gede dan sport. Padukan tur dengan",
    fleetLink: "sewa motor Bali",
    subtitleAfter: "dari armada kami.",
    bookWhatsapp: "Pesan Tur via WhatsApp",
    viewFleet: "Lihat Armada Sewa",
    featuredTitle: "Rute Unggulan",
    featuredSubtitle:
      "Loop dataran tinggi seharian, jelajah pesisir, highlight setengah hari, dan itinerari tur motor Bali yang fully custom.",
    includedTitle: "Yang Termasuk",
    includedText: "Motor premium, bensin, helm bersertifikat, briefing rute, dan dukungan guide lokal.",
    whyTitle: "Mengapa Naik bersama Kami",
    whyText: "Armada rapi, respons cepat, dan rute Bali dengan pemberhentian yang layak difoto.",
    flexibleTitle: "Booking Fleksibel",
    flexibleText: "Tur privat dan grup. Konfirmasi cepat via WhatsApp.",
    faqTitle: "FAQ Tur",
    customCta: "Butuh rute custom? Kami rakitkan.",
    exploreCustom: "Lihat Custom Tour",
    faqs: [
      {
        q: "Perlu SIM motor untuk ikut tur?",
        a: "Untuk rider solo, ya. International Driving Permit (IDP) sangat disarankan. Penumpang belakang tidak perlu SIM.",
      },
      {
        q: "Apa saja yang termasuk paket tur?",
        a: "Sewa motor, helm, bensin rute, guide lokal, air minum, dan asuransi dasar. Detail lengkap ada di halaman tiap tur.",
      },
      {
        q: "Bisa minta rute privat atau custom?",
        a: "Bisa. Custom Tour menyesuaikan pantai, jalan gunung, hutan, dan destinasi budaya dengan level riding kamu.",
      },
    ],
  },
  ui: {
    breadcrumb: "Navigasi",
    twoRoutes: "2 rute",
    explore: "Lihat Tur",
    bookWhatsapp: "Pesan via WhatsApp",
    viewAll: "Semua Tur",
    bookNow: "Pesan Sekarang",
    readyTitle: "Siap Jalan?",
    readyBody:
      "Pesan {title} via WhatsApp — konfirmasi cepat, tanggal fleksibel, dan motor gede premium bersama guide lokal.",
    includedTitle: "Termasuk & Tidak Termasuk",
    included: "Termasuk",
    notIncluded: "Tidak Termasuk",
    safety: "Syarat Keselamatan",
    rider: "Syarat Rider",
    places: "Tempat yang Akan Disinggahi",
    description: "Deskripsi Tur",
    route: "Ikhtisar Rute",
    info: "Informasi Tur",
    distance: "Jarak",
    duration: "Durasi",
    departure: "Berangkat",
    price: "Harga",
    difficulty: "Tingkat",
    faq: "Pertanyaan Umum",
    related: "Tur Terkait",
    gallery: "Galeri Foto",
    closeGallery: "Tutup galeri",
    flexible: "Fleksibel",
    types: { "half-day": "Setengah Hari", "full-day": "Sehari Penuh", custom: "Custom" },
    difficulties: {
      Easy: "Mudah",
      Moderate: "Sedang",
      Challenging: "Menantang",
      Flexible: "Fleksibel",
    },
    includedLabels: {
      Motorcycle: "Motor Premium",
      Helmet: "Helm & Perlengkapan",
      Fuel: "Bensin Termasuk",
      "Local guide": "Guide Profesional",
      "Drinking water": "Minuman",
      "Basic insurance": "Asuransi Dasar",
      "Parking fees": "Parkir",
      "Professional guide": "Guide Profesional",
      Sarong: "Sarung Pura",
      "Route planning consultation": "Konsultasi rute",
    },
    fromPrice: "Mulai IDR {price}",
    returnStop: "Kembali",
    cardAlt: "{title} — tur motor Bali, petualangan big bike berpemandu",
    heroAlts: {
      "kintamani-highlands":
        "Pura Bali saat matahari terbit di Lake Bratan — tur motor Kintamani Highlands",
      "tanah-lot-bedugul-explorer":
        "Teras sawah Jatiluwih UNESCO saat matahari terbit — Tanah Lot Bedugul Explorer",
      "denpasar-tanah-lot-nusa-dua":
        "Pura di tebing menghadap laut — tur Denpasar Tanah Lot Nusa Dua",
    },
  },
  packages: {
    "kintamani-highlands": {
      tagline: "Dua loop vulkanik menembus jiwa seni dan dataran tinggi Bali",
      description: [
        "Tur sehari penuh: petualangan motor gede yang utuh. Rute ini membawa kamu keluar dari titik wisata biasa — ke jantung vulkanik tempat budaya, pemandangan, dan jalan gunung bertemu.",
        "Sekitar 200 km dalam 8 jam. Ada dua variasi Kintamani Highlands, finale kaldera yang sama.",
        "Rute A lewat koridor seni: pasar Sukawati, istana dan gang galeri Ubud, lalu naik ke bibir kaldera Mount Batur. Pulangnya turun lewat kebun kopi berkabut dan teras Tegalalang.",
        "Rute B lebih tenang: pantai pasir hitam Lebih, desa adat Penglipuran, viewpoint Kintamani yang sama, lalu kebun kopi dan Tegalalang.",
        "Guide naik motor gede sendiri. Bisa solo, rombongan, atau jadi penumpang belakang.",
      ],
      duration: "±8 Jam",
      highlights: [
        "Viewpoint bibir kaldera Mount Batur",
        "Teras sawah Tegalalang",
        "Penglipuran — salah satu desa paling utuh di Bali",
        "Pasar seni Sukawati dan jantung budaya Ubud",
        "Perkebunan kopi Bali dan luwak",
        "Dua variasi rute berpemandu",
      ],
      notIncluded: ["Tiket masuk pura", "Makanan dan minuman", "Asuransi pribadi"],
      toBring: [
        "Jaket ringan (dataran tinggi bisa 18°C)",
        "Tabir surya",
        "Kamera",
        "Tunai untuk tiket (~IDR 50.000–100.000 per lokasi)",
        "Sepatu tertutup yang nyaman",
      ],
      safetyRequirements: ["SIM motor yang berlaku", "Usia minimal 18", "Naik dalam kondisi sadar"],
      riderRequirements: [
        "Pengalaman dasar untuk rider solo",
        "Penumpang belakang tidak perlu SIM",
      ],
      routes: [{ label: "Rute A" }, { label: "Rute B" }],
      places: [
        {
          title: "Kintamani Volcano Viewpoint",
          description:
            "Berdiri di bibir kaldera Mount Batur: danau, lereng, dan awan pagi — finale kedua rute.",
        },
        {
          title: "Tegalalang Rice Terraces",
          description: "Jalan di teras ikonik, salah satu lanskap paling difoto di Bali.",
        },
        {
          title: "Ubud & Sukawati Cultural Corridor",
          description: "Rute A melewati pasar Sukawati dan istana Ubud — jantung seni Bali tengah.",
        },
        {
          title: "Penglipuran Traditional Village",
          description: "Rute B singgah di desa adat yang rapi, lorong bambu, dan hidup dataran tinggi.",
        },
        {
          title: "Traditional Coffee Plantation",
          description: "Berhenti di kebun kerja: kopi Bali, udara sejuk, dan opsional luwak.",
        },
        {
          title: "Scenic Highland Roads",
          description: "Pass gunung, kabut, dan tikungan yang membuat hari ini terasa utuh.",
        },
      ],
      faq: [
        {
          q: "Bisa naik Rute A dan B dalam sehari?",
          a: "Keduanya berbagi viewpoint Kintamani dan kebun kopi. Menggabungkan keduanya terlalu panjang. Pilih satu, atau Custom Tour.",
        },
        {
          q: "Seberapa dingin di Kintamani?",
          a: "Dataran sekitar 1.500 m. Suhu bisa 17–20°C pagi hari. Jaket ringan sangat disarankan.",
        },
        {
          q: "Tegalalang singgah utuh atau lewat saja?",
          a: "Singgah utuh 30–45 menit untuk jalan di teras dan foto.",
        },
        {
          q: "Tiket masuk sudah termasuk?",
          a: "Tiket dasar sebagian besar lokasi termasuk. Beberapa viewpoint dan pura memungut biaya kecil di tempat (biasanya IDR 20.000–50.000).",
        },
        {
          q: "Pemula bisa solo di rute ini?",
          a: "Rute B lebih ramah. Rute A lebih banyak lalu lintas Ubud. Baru kenal jalan Bali? Lebih aman jadi penumpang dulu.",
        },
      ],
    },
    "bedugul-pupuan-lush-ride": {
      tagline: "Koridor termudah Bali — kebun raya, danau kaldera, dan desa cengkih",
      description: [
        "Loop hijau paling utuh: pura kerajaan, kebun raya, dua danau vulkanik, dan Pupuan yang jarang dikunjungi.",
        "Sekitar 200 km, 8 jam, jauh dari keramaian pantai. Setelah koridor selatan, jalan lebar dan relatif sepi.",
        "Mulai di Taman Ayun, lalu naik ke Bedugul: kebun raya 150 hektare, Lake Bratan, dan pura di atas air.",
        "Dari Bedugul ke Lake Tamblingan yang lebih sunyi, lalu Pupuan: teras cengkih dan kopi tanpa antrean turis.",
        "Guide di motor gede premium. Solo, grup, atau penumpang belakang.",
      ],
      duration: "±8 Jam",
      highlights: [
        "Taman Ayun — pura kerajaan Mengwi dengan taman dan parit",
        "Kebun Raya Bedugul — 150+ hektare",
        "Pura Ulun Danu Bratan",
        "Lake Tamblingan — danau kaldera yang sunyi",
        "Pupuan — desa cengkih dan kopi",
        "Udara sejuk sepanjang hari",
      ],
      notIncluded: ["Tiket kebun raya", "Donasi pura", "Makanan dan minuman"],
      toBring: [
        "Jaket hujan ringan (Bedugul sering berkabut)",
        "Kamera",
        "Tunai tiket kebun raya (~IDR 30.000)",
        "Sepatu nyaman untuk jalan",
      ],
      safetyRequirements: ["SIM motor yang berlaku", "Usia minimal 18", "Naik dalam kondisi sadar"],
      riderRequirements: ["Cocok untuk hampir semua level; jalan terawat"],
      places: [
        {
          title: "Taman Ayun Temple",
          description: "Salah satu pura kerajaan terindah di Bali, dikelilingi parit dan taman.",
        },
        {
          title: "Bedugul Botanical Garden",
          description: "Kebun raya terbesar di Bali, cocok untuk touring motor.",
        },
        {
          title: "Lake Bratan & Ulun Danu Temple",
          description: "Pura seolah mengapung di danau, udara sejuk, pemandangan yang langsung dikenali.",
        },
        {
          title: "Lake Tamblingan",
          description: "Danau sunyi di hutan hujan — salah satu lanskap paling tenang di pulau ini.",
        },
        {
          title: "Pupuan Rice Terraces",
          description: "Hijau tanpa keramaian, jalan desa yang sepi.",
        },
        {
          title: "Scenic Mountain Roads",
          description: "Hutan, danau, dan pass gunung dalam satu hari yang utuh.",
        },
      ],
      faq: [
        {
          q: "Aman naik ke Bedugul setelah hujan?",
          a: "Jalan utama biasanya aman. Jalur opsional di Tamblingan bisa licin — guide putuskan di hari H.",
        },
        {
          q: "Cuaca di Bedugul seperti apa?",
          a: "Sekitar 1.200 m, 20–24°C, siang sering berkabut. Berangkat pagi agar danau masih jernih.",
        },
        {
          q: "Tiket kebun raya termasuk?",
          a: "Tidak. Sekitar IDR 30.000 dibayar di lokasi.",
        },
        {
          q: "Boleh berenang di Lake Tamblingan?",
          a: "Tidak. Danau suci. Fokus ke jejak hutan dan pemandangan.",
        },
        {
          q: "Pupuan worth the extra jarak?",
          a: "Worth. Sedikit turis, udara sejuk, teras cengkih — Bali dataran tinggi yang masih terasa utuh.",
        },
      ],
    },
    "tanah-lot-bedugul-explorer": {
      tagline: "Pura laut, teras UNESCO, dan danau kaldera dalam satu hari sinematik",
      description: [
        "Hit terbesar Bali di motor gede: pesisir, istana, teras UNESCO, dan danau dataran tinggi dalam loop sekitar 200 km.",
        "Fajar di Tanah Lot, lalu Puri Kerambitan yang sepi, lalu naik ke Jatiluwih.",
        "Penutup di Lake Bratan dan Pura Ulun Danu, turun lewat Taman Ayun, kembali ke selatan.",
        "Guide di motor sendiri. Solo, grup, atau penumpang belakang.",
      ],
      duration: "±8 Jam",
      highlights: [
        "Tanah Lot di cahaya keemasan",
        "Puri Kerambitan — istana hidup tanpa keramaian",
        "Jatiluwih — teras sawah UNESCO",
        "Lake Bratan dan Pura Ulun Danu",
        "Taman Ayun dengan parit yang memantul",
        "Irisan lanskap Bali dalam satu hari",
      ],
      notIncluded: ["Tiket Jatiluwih UNESCO", "Donasi pura", "Makanan dan minuman"],
      toBring: [
        "Tabir surya",
        "Kamera",
        "Tunai tiket UNESCO (~IDR 40.000)",
        "Sepatu nyaman untuk teras",
      ],
      safetyRequirements: ["SIM motor yang berlaku", "Usia minimal 18", "Naik dalam kondisi sadar"],
      riderRequirements: ["Cocok untuk hampir semua level"],
      places: [
        {
          title: "Tanah Lot Temple",
          description: "Pura laut paling terkenal di Bali, di atas batu menghadap Samudra Hindia.",
        },
        {
          title: "Puri Kerambitan",
          description: "Istana kerajaan yang masih hidup, arsitektur Bali yang utuh.",
        },
        {
          title: "Jatiluwih Rice Terraces",
          description: "Situs UNESCO: teras di seluruh lereng dan horizon gunung.",
        },
        {
          title: "Lake Bratan & Ulun Danu Temple",
          description: "Salah satu lokasi paling difoto di Bali — sejuk dan lapang.",
        },
        {
          title: "Taman Ayun Temple",
          description: "Kompleks pura kerajaan dengan taman dan air.",
        },
        {
          title: "Scenic Highland Roads",
          description: "Jalan gunung, desa, dan viewpoint sepanjang hari.",
        },
      ],
      faq: [
        {
          q: "Perlu sarung di Tanah Lot?",
          a: "Ya, untuk masuk area pura. Kami sediakan — tidak perlu bawa sendiri.",
        },
        {
          q: "Tiket Jatiluwih termasuk?",
          a: "Tidak. UNESCO memungut sekitar IDR 40.000 per orang di lokasi.",
        },
        {
          q: "Bisa sarapan di Tanah Lot?",
          a: "Bisa. Berangkat pagi sebelum ramai. Ada warung bagus di lokasi. Makanan tidak termasuk harga tur.",
        },
        {
          q: "Berapa lama di Jatiluwih?",
          a: "Biasanya 45–60 menit. Lebih lama bisa diatur di Custom Tour.",
        },
        {
          q: "Rute ini ramah pemula?",
          a: "Ya. Jalan terawat dan menghindari kota yang paling macet. Salah satu rute pertama yang kami rekomendasikan.",
        },
      ],
    },
    "denpasar-tanah-lot-nusa-dua": {
      tagline: "Ibu kota, pura paling ikonik, dan pesisir paling rapi — dalam empat jam",
      description: [
        "Tur setengah hari untuk yang waktunya terbatas, tapi tetap mau rasa motor gede, bukan macet tanpa arah.",
        "Sekitar 100 km, 4 jam — pengantar yang utuh ke sewa motor Bali dan tur berpemandu.",
        "Denpasar: Bajra Sandhi dan Puputan Square. Lanjut barat ke Tanah Lot. Tutup di promenade Nusa Dua.",
        "Guide di motor yang terawat. Solo, grup, atau penumpang. Mau lebih lama? Naik ke full day.",
      ],
      duration: "±4 Jam",
      priceNote: "Tur setengah hari — pas jika waktunya terbatas",
      highlights: [
        "Bajra Sandhi — monumen kemerdekaan Bali",
        "Puputan Square — jantung bersejarah Denpasar",
        "Tanah Lot di tepi laut",
        "Promenade Nusa Dua",
        "Jalan halus, tempo tenang",
        "Pengantar terbaik ke tur motor gede di Bali",
      ],
      notIncluded: ["Donasi pura", "Makanan dan minuman"],
      toBring: ["Tabir surya", "Sarung (kami sediakan)", "Kamera", "Uang tunai sedikit"],
      safetyRequirements: ["SIM motor yang berlaku", "Usia minimal 18", "Naik dalam kondisi sadar"],
      riderRequirements: ["Semua level, pemula bisa jadi penumpang"],
      places: [
        {
          title: "Denpasar City",
          description: "Denyut ibu kota: pasar, alun-alun, dan jalan yang hidup.",
        },
        {
          title: "Tanah Lot Temple",
          description: "Pura laut ikonik — salah satu landmark paling dikenali di Bali.",
        },
        {
          title: "Nusa Dua Coastline",
          description: "Pantai rapi, palem, dan jalan pesisir yang tenang.",
        },
        {
          title: "Coastal Scenic Roads",
          description: "Riding halus di pesisir selatan.",
        },
        {
          title: "Cultural Landmarks",
          description: "Bali modern, tradisi, dan titik ikonik dalam satu putaran ringkas.",
        },
      ],
      faq: [
        {
          q: "Cocok sebagai tur motor pertama di Bali?",
          a: "Sangat. Jalan terawat, jarak masuk akal, guide tidak terburu-buru.",
        },
        {
          q: "Bisa diperpanjang jadi sehari penuh?",
          a: "Bisa. Chat kami untuk upgrade ke Full Day atau Custom Tour.",
        },
        {
          q: "Tanah Lot singgah utuh?",
          a: "Ya, 30–45 menit: batu pura, area, foto.",
        },
        {
          q: "Waktu terbaik di Tanah Lot?",
          a: "Pagi lebih sepi dan cahayanya bagus. Berangkat 08:00 menempatkan kita di sana sebelum ramai.",
        },
        {
          q: "Harus bisa naik motor?",
          a: "Penumpang tidak. Solo wajib SIM motor. Ada briefing singkat sebelum berangkat.",
        },
      ],
    },
    "custom-tour": {
      tagline: "Rute kamu, tempo kamu, Bali kamu",
      description: [
        "Tur custom: kamu pilih titik, tempo, dan durasi. Format paling fleksibel di paket tur motor Bali.",
        "Pesisir, pass gunung, air terjun, gunung berapi, pura — guide merakit rute untuk kamu, bukan template.",
        "Dari 4 jam sampai loop 12 jam hingga 200 km. Jam berangkat dan jeda — keputusanmu.",
        "Guide di motor sendiri atau dari armada. Solo, bareng teman, atau tandem.",
        "Untuk inspirasi, lihat Half Day dan Full Day — atau cukup ceritakan apa yang ingin kamu lihat.",
      ],
      distance: "Hingga ±200 KM",
      duration: "Fleksibel (4–12 jam)",
      departureTime: "Sesuai kesepakatan",
      routes: [{ label: "Contoh itinerari" }],
      highlights: [
        "Kebebasan penuh memilih destinasi",
        "Pesisir, gunung — atau keduanya",
        "Tempo dan lama jeda sesuai kamu",
        "Pengalaman privat",
        "Hingga 200 km dalam sehari",
        "Itinerari custom dengan perencanaan lokal",
        "Semua level dan ukuran grup",
        "Pas untuk yang sudah pernah rute standar",
      ],
      notIncluded: [
        "Tiket masuk (berbeda per destinasi)",
        "Makanan dan minuman",
        "Upgrade asuransi pribadi",
      ],
      toBring: ["Tergantung rute — guide kasih tahu saat planning"],
      safetyRequirements: [
        "SIM motor yang berlaku untuk rider solo",
        "Usia minimal 18",
        "Naik dalam kondisi sadar",
      ],
      riderRequirements: ["Semua level; rute disesuaikan pengalaman"],
      places: [
        {
          title: "Destinasi Pilihanmu",
          description: "Bangun hari sesuai maumu — tanpa template orang lain.",
        },
        {
          title: "Hidden Gems",
          description: "Air terjun, viewpoint, pura, desa, dan pantai yang lebih sepi.",
        },
        {
          title: "Rute Pesisir",
          description: "Selatan dan barat Bali di jalan pantai.",
        },
        {
          title: "Petualangan Dataran Tinggi",
          description: "Wilayah vulkanik, pass, danau, dan udara lebih sejuk.",
        },
        {
          title: "Pengalaman Budaya",
          description: "Pura, desa adat, pasar, dan landmark.",
        },
        {
          title: "Riding yang Personal",
          description: "Rute mengikuti gaya naik dan daftar keinginanmu.",
        },
      ],
      faq: [
        {
          q: "Bagaimana merencanakan Custom Tour?",
          a: "Chat WhatsApp: tanggal, jumlah orang, pengalaman, dan ide destinasi. Kami usulkan rute dalam 24 jam dan revisi sampai pas.",
        },
        {
          q: "Ada minimum durasi?",
          a: "Minimal 4 jam / sekitar 80 km. Tidak ada batas atas — pernah 12 jam dan 250 km untuk grup berpengalaman.",
        },
        {
          q: "Rute bisa diubah di hari H?",
          a: "Bisa. Mau jeda lebih lama, skip lokasi, atau tambah titik — bilang ke guide.",
        },
        {
          q: "Booking berapa hari sebelumnya?",
          a: "Idealnya 48 jam. Untuk grup 6+ atau multi-hari, 5–7 hari lebih nyaman.",
        },
        {
          q: "Bisa digabung dengan sewa motor biasa?",
          a: "Bisa. Guide memimpin, kamu naik motor sewaan di tempo sendiri di sampingnya.",
        },
      ],
    },
  },
};

const ru = JSON.parse(readFileSync("messages/ru.json", "utf8"));
const id = JSON.parse(readFileSync("messages/id.json", "utf8"));
ru.tours = merge(ru.tours, ruTours);
id.tours = merge(id.tours, idTours);
translateReturnStops(ru.tours.packages, "Возврат");
translateReturnStops(id.tours.packages, "Kembali");
writeFileSync("messages/ru.json", JSON.stringify(ru, null, 2) + "\n");
writeFileSync("messages/id.json", JSON.stringify(id, null, 2) + "\n");
console.log("applied tour translations");
