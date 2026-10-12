import { site } from './config.js';
import { services, groups } from './data/services.js';
import { cases } from './data/cases.js';
import { posts } from './data/posts.js';
import { layout, esc, links, icons, contactButtons, leadForm, breadcrumbs, faqBlock } from './layout.js';

const c = site.contacts;
const rub = (n) => n.toLocaleString('ru-RU');

const business = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': site.url + '/#business',
  name: site.name,
  url: site.url,
  image: site.url + '/assets/img/og.png',
  telephone: c.phoneRaw,
  email: c.email,
  priceRange: '₽₽',
  address: { '@type': 'PostalAddress', addressLocality: 'Москва', addressCountry: 'RU' },
  areaServed: [{ '@type': 'City', name: 'Москва' }, { '@type': 'Country', name: 'Россия' }],
  founder: { '@type': 'Person', name: site.person, jobTitle: 'Веб-разработчик', sameAs: [c.github, links.tg] },
  sameAs: [links.tg, c.github],
};

// Порядок и «широкие» карточки в bento-сетке услуг (4 колонки → ровно 4 ряда).
const bentoOrder = ['razrabotka-lendinga', 'verstka-po-maketu', 'sajt-na-wordpress', 'internet-magazin', 'sajt-na-tilda', 'telegram-bot', 'kartochki-marketplace', 'dorabotka-sajta', 'uskorenie-sajta', 'perenos-sajta', 'tehpodderzhka-sajta', 'integracii', 'dorabotka-bitrix'];
const bentoWide = ['razrabotka-lendinga', 'telegram-bot', 'dorabotka-sajta'];

const serviceCard = (s, i, wide = false) => `
<a class="card svc${wide ? ' wide' : ''}" href="/uslugi/${s.slug}/" data-reveal style="--d:${(i % 4) * 0.06}s">
  <span class="svc-n">${String(i + 1).padStart(2, '0')} / ${groups[s.group].toLowerCase()}</span>
  <h3>${s.name}</h3>
  <p>${s.short}</p>
  <span class="svc-price">${s.price} <small>${s.priceNote}</small></span>
  <span class="card-arrow">${icons.arrow}</span>
</a>`;

const bento = () => `<div class="bento">${bentoOrder.map((slug, i) => serviceCard(services.find(s => s.slug === slug), i, bentoWide.includes(slug))).join('')}</div>`;

const caseRow = (k) => `
<a class="case-row" href="/portfolio/${k.slug}/" data-reveal>
  <div class="browser"><div class="browser-in">
    <div class="browser-bar"><i></i><i></i><i></i><span>${k.url.replace('https://', '')}</span></div>
    <img src="/assets/img/cases/${k.img}.webp" alt="Сайт ${esc(k.title)}" width="1440" height="900" loading="lazy">
  </div></div>
  <div class="case-info">
    <p class="case-type">${k.type}</p>
    <h3>${k.title}</h3>
    <p>${k.summary}</p>
    <div class="tags">${k.tags.map(t => `<span>${t}</span>`).join('')}</div>
    <span class="link">Смотреть кейс ${icons.arrow}</span>
  </div>
</a>`;

const caseRows = (list) => `<div class="case-rows">${list.map(caseRow).join('')}</div>`;

const postCard = (p, i = 0) => `
<a class="card post" href="/blog/${p.slug}/" data-reveal style="--d:${i * 0.08}s">
  <p class="svc-n"><time datetime="${p.date}">${p.date.split('-').reverse().join('.')}</time> · блог</p>
  <h3>${p.title}</h3>
  <p>${p.excerpt}</p>
  <span class="link">Читать ${icons.arrow}</span>
</a>`;

const steps = (list) => `<ol class="steps" data-reveal>${list.map(([t, d], i) => `<li><span class="step-n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>`;

const priceTable = (list) => `
<div class="prices" data-reveal>${list.map(s => `
  <a class="price-row" href="/uslugi/${s.slug}/">
    <span><span class="price-name">${s.name}</span><br><span class="price-term">срок: ${s.term}</span></span>
    <span class="price-val">${s.price}<small>${s.priceNote}</small></span>
    <span class="price-go">${icons.arrow}</span>
  </a>`).join('')}
</div>`;

const guarantees = () => `
<div class="guar">
  <div class="card" data-reveal><h3><span>01</span>Фиксированная цена</h3><p>Называю стоимость до начала работы. Она не вырастет, если не изменится сама задача.</p></div>
  <div class="card" data-reveal style="--d:.08s"><h3><span>02</span>Оплата по факту</h3><p>Доработки оплачиваются после того, как вы проверили результат. Проекты — по этапам.</p></div>
  <div class="card" data-reveal style="--d:.16s"><h3><span>03</span>30 дней правок</h3><p>Месяц после запуска бесплатно исправляю мелочи и отвечаю на вопросы.</p></div>
</div>`;

const generalFaq = [
  ['Как вы работаете с оплатой?', 'Для доработок — оплата по факту после проверки. Для крупных проектов — предоплата 30–50% и оплата этапами. Работаю официально, выдаю чеки.'],
  ['Работаете только с Москвой?', 'Нет, работаю удалённо с клиентами по всей России и СНГ. С московскими клиентами при необходимости могу встретиться лично.'],
  ['Почему у вас дешевле, чем в студии?', 'Нет офиса, менеджеров и наценок. Вы общаетесь напрямую с тем, кто делает работу, — это и дешевле, и быстрее.'],
  ['Что если вы пропадёте?', 'Все доступы, домен и хостинг оформляются на вас, код — у вас. Но пропадать я не собираюсь: для меня каждый клиент — это рекомендации.'],
  ['Можно ли начать с маленькой задачи?', 'Конечно. Многие клиенты начинают с одной правки на 1–2 часа, чтобы посмотреть, как я работаю.'],
];

const stack = ['JavaScript', 'TypeScript', 'React', 'Vue', 'HTML / CSS', 'PHP', 'WordPress', 'WooCommerce', 'Tilda', '1С-Битрикс', 'Node.js', 'Telegram Bot API', 'Figma', 'Яндекс.Метрика'];

// ---------- Главная ----------
function home() {
  const faq = faqBlock(generalFaq);
  const body = `
<section class="hero">
  <div class="container hero-grid">
    <div>
      <p class="status"><span class="dot"></span>online · беру новые проекты</p>
      <h1 class="h1">Сайты и боты, которые <em>приносят заявки</em></h1>
      <p class="lead">Я ${site.person} — веб-разработчик из Москвы. Делаю лендинги, сайты на WordPress и Tilda, интернет-магазины, Telegram-ботов и инфографику для маркетплейсов. Напрямую, без студийных наценок и посредников.</p>
      <div class="hero-cta">
        <a class="btn btn-primary btn-lg" href="#contact">Рассчитать стоимость ${icons.arrow}</a>
        <a class="btn btn-ghost btn-lg" href="#audit">Бесплатный разбор сайта</a>
      </div>
    </div>
    <div class="terminal" aria-label="Как я работаю: от задачи до запуска">
      <div class="term-top"><i></i><i></i><i></i><span>david@itsdavid: ~/projects</span></div>
      <div class="term-body" data-terminal>
        <p class="t-cmd" data-line data-type><span class="t-path">~/projects</span> david new "сайт для вашего бизнеса"</p>
        <p class="t-ok" data-line>структура и тексты под вашу нишу</p>
        <p class="t-ok" data-line>дизайн + адаптивная вёрстка</p>
        <p class="t-ok" data-line>SEO, микроразметка, скорость</p>
        <p class="t-ok" data-line>Яндекс.Метрика и цели</p>
        <p class="t-ok" data-line>заявки → Telegram / CRM</p>
        <p data-line>&nbsp;</p>
        <p class="t-cmd" data-line data-type><span class="t-path">~/projects</span> david deploy --prod</p>
        <p class="t-dim" data-line>building... ██████████ 100%</p>
        <p class="t-res" data-line>live: https://ваш-сайт.ru</p>
        <p class="t-cmd" data-line><span class="t-path">~/projects</span> <span class="caret"></span></p>
      </div>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true"><div class="marquee-track">${[...stack, ...stack].map(t => `<span>${t}</span>`).join('')}</div></div>

<section class="section" style="padding-bottom:0">
  <div class="container">
    <div class="stats" data-reveal>
      <div><b>${rub(site.hourRate)}<i>₽</i></b><span>час работы — без студийной наценки</span></div>
      <div><b><i>~</i>1 ч</b><span>среднее время ответа в мессенджере</span></div>
      <div><b>0<i>₽</i></b><span>предоплаты за доработки — оплата по факту</span></div>
      <div><b>30<i>дн</i></b><span>бесплатных правок после запуска</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="tag">debug</p>
    <h2 class="h2" data-reveal>Узнаёте <em>себя?</em></h2>
    <p class="lead" data-reveal style="margin-bottom:48px">Типичные «баги» в работе с подрядчиками — и как я их исправляю.</p>
    <div class="bugs">
      <div class="bug" data-reveal><p class="bug-err">слишком долгое ожидание</p><h3>Менеджер студии обещал «передать программисту» и пропал на неделю</h3><p class="bug-fix">пишете мне в Telegram — отвечаю в течение часа. Вы говорите напрямую с тем, кто пишет код.</p></div>
      <div class="bug" data-reveal style="--d:.08s"><p class="bug-err">0 заявок</p><h3>Сайт есть, деньги потрачены, а клиентов с него нет</h3><p class="bug-fix">настраиваю Метрику с целями и заявки в Telegram, проверяю путь клиента до кнопки. Видно, где теряются люди.</p></div>
      <div class="bug" data-reveal><p class="bug-err">timeout 8000ms</p><h3>Сайт грузится вечность на телефоне, и посетители уходят</h3><p class="bug-fix">оптимизирую изображения, скрипты и кеш. Каждая секунда загрузки — это ваши клиенты.</p></div>
      <div class="bug" data-reveal style="--d:.08s"><p class="bug-err">access denied</p><h3>Прошлый фрилансер исчез вместе с доступами к сайту</h3><p class="bug-fix">домен, хостинг и код всегда оформлены на вас. Документирую всё, что сделал.</p></div>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-head"><div><p class="tag">services</p><h2 class="h2" data-reveal>Что я <em>делаю</em></h2></div><a class="link" href="/ceny/">Полный прайс ${icons.arrow}</a></div>
    ${bento()}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><div><p class="tag">portfolio</p><h2 class="h2" data-reveal>Живые <em>проекты</em></h2></div><a class="link" href="/portfolio/">Все работы ${icons.arrow}</a></div>
    ${caseRows(cases)}
  </div>
</section>

<section class="section alt">
  <div class="container">
    <p class="tag">compare</p>
    <h2 class="h2" data-reveal>Студия, биржа <em>или я?</em></h2>
    <p class="lead" data-reveal style="margin-bottom:48px">Честное сравнение — чтобы вы выбрали то, что подходит именно вам.</p>
    <div class="compare-wrap" data-reveal><div class="compare">
      <div class="ch"></div><div class="ch">Студия</div><div class="ch">Фрилансер с биржи</div><div class="ch me">${site.person}</div>
      <div class="rl">Лендинг</div><div class="m">от 100 000 ₽</div><div class="m">5–10 тыс. ₽, качество — лотерея</div><div class="me y">от 20 000 ₽</div>
      <div class="rl">Общение</div><div class="m">через менеджера</div><div class="m">как повезёт</div><div class="me y">напрямую с разработчиком</div>
      <div class="rl">Скорость ответа</div><div class="n">1–2 дня</div><div class="n">непредсказуемо</div><div class="me y">в течение часа</div>
      <div class="rl">Код и доступы</div><div class="m">часто у студии</div><div class="m">как договоритесь</div><div class="me y">всегда ваши</div>
      <div class="rl">Аналитика и заявки в Telegram</div><div class="m">за доплату</div><div class="n">редко</div><div class="me y">входит в работу</div>
      <div class="rl">После запуска</div><div class="m">платный договор</div><div class="n">не гарантируется</div><div class="me y">30 дней правок бесплатно</div>
    </div></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="tag">workflow</p>
    <h2 class="h2" data-reveal style="margin-bottom:56px">Как мы <em>работаем</em></h2>
    ${steps([
      ['Пишете задачу', 'В Telegram, WhatsApp или через форму. Можно голосовым, можно ссылкой на пример.'],
      ['Получаете оценку', 'В тот же день: стоимость, срок и что именно будет сделано.'],
      ['Я делаю', 'Показываю промежуточный результат — вы видите прогресс, а не ждёте вслепую.'],
      ['Принимаете', 'Проверяете и оплачиваете. Ещё 30 дней мелких правок — бесплатно.'],
    ])}
    <div style="margin-top:64px">${guarantees()}</div>
  </div>
</section>

<section class="section" id="audit" style="padding-top:0">
  <div class="container">
    <div class="magnet" data-reveal>
      <div>
        <p class="tag">free audit</p>
        <h2 class="h2">Бесплатный <em>разбор</em> вашего сайта</h2>
        <p class="lead">Пришлите ссылку — за 15 минут посмотрю сайт глазами разработчика и клиента и пришлю список того, что мешает получать заявки. Без обязательств и навязывания услуг.</p>
        <div class="hero-cta"><a class="btn btn-primary btn-lg" href="${links.tg}" target="_blank" rel="noopener" data-goal="click_tg">${icons.tg}Прислать ссылку</a><a class="btn btn-wa btn-lg" href="${links.wa}?text=${encodeURIComponent('Здравствуйте! Хочу бесплатный разбор сайта: ')}" target="_blank" rel="noopener" data-goal="click_wa">${icons.wa}WhatsApp</a></div>
      </div>
      <ul>
        <li>скорость загрузки на телефоне</li>
        <li>ошибки вёрстки и адаптива</li>
        <li>путь клиента до заявки</li>
        <li>заголовки, мета-теги, индексация</li>
        <li>аналитика и цели</li>
        <li>быстрые победы на 1–2 часа</li>
      </ul>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container about">
    <div class="about-photo" data-reveal>${site.photo ? `<img src="${site.photo}" alt="${site.person}, веб-разработчик" width="600" height="750" loading="lazy">` : '<span aria-hidden="true">Д_</span>'}</div>
    <div data-reveal style="--d:.1s">
      <p class="tag">about</p>
      <h2 class="h2">Привет, я <em>${site.person}</em></h2>
      <p class="lead">Веб-разработчик из Москвы. Больше ${site.experienceYears} лет делаю сайты: от лендингов до интернет-магазинов и личных кабинетов.</p>
      <p class="muted">Моя сильная сторона — фронтенд: аккуратная вёрстка, быстрые и удобные интерфейсы. Уверенно работаю с PHP, WordPress и WooCommerce, делаю интеграции и Telegram-ботов. До сих пор клиенты приходили ко мне только по рекомендациям — теперь можно и напрямую.</p>
      <div class="stack">${stack.map(t => `<span>${t}</span>`).join('')}</div>
    </div>
  </div>
</section>

${faq.html}

<section class="section alt">
  <div class="container">
    <div class="section-head"><div><p class="tag">blog</p><h2 class="h2" data-reveal>Полезное</h2></div><a class="link" href="/blog/">Все статьи ${icons.arrow}</a></div>
    <div class="grid-3">${posts.slice(0, 3).map(postCard).join('')}</div>
  </div>
</section>

${leadForm()}`;
  return {
    path: '/',
    title: 'Веб-разработчик в Москве — сайты, боты, доработки | Давид',
    description: `Частный веб-разработчик в Москве: лендинги, сайты на WordPress и Tilda, интернет-магазины, Telegram-боты, доработка сайтов от ${site.hourRate} ₽/час. Напрямую, без студийных наценок.`,
    body,
    schema: [business, faq.schema],
  };
}

// ---------- Услуги ----------
function servicesIndex() {
  const bc = breadcrumbs([['/uslugi/', 'Услуги']]);
  return {
    path: '/uslugi/',
    title: 'Услуги веб-разработчика в Москве — цены | Давид',
    description: 'Разработка лендингов и сайтов, вёрстка, интернет-магазины, Telegram-боты, карточки для маркетплейсов, доработка, ускорение и поддержка сайтов. Цены и сроки.',
    body: `
<section class="page-head"><div class="container">${bc.html}<p class="tag">services</p><h1 class="h1">Услуги</h1><p class="lead">От правки одной кнопки до интернет-магазина под ключ. Цены указаны «от» — точную стоимость назову после короткого обсуждения задачи.</p></div></section>
<section class="section" style="padding-top:24px"><div class="container">${bento()}</div></section>
${leadForm('Не нашли свою <em>задачу?</em>', 'Напишите, что нужно сделать. Если это не мой профиль — честно скажу и посоветую, к кому обратиться.')}`,
    schema: [bc.schema],
  };
}

function servicePage(s) {
  const bc = breadcrumbs([['/uslugi/', 'Услуги'], [`/uslugi/${s.slug}/`, s.name]]);
  const faq = faqBlock(s.faq);
  const related = services.filter(x => x.slug !== s.slug && x.group === s.group).slice(0, 3);
  const relatedPosts = posts.filter(p => p.service === s.slug);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.h1,
    description: s.metaDesc,
    provider: { '@id': site.url + '/#business' },
    areaServed: 'RU',
    offers: { '@type': 'Offer', priceCurrency: 'RUB', price: s.price.replace(/\D/g, ''), description: `${s.price} ${s.priceNote}` },
  };
  return {
    path: `/uslugi/${s.slug}/`,
    title: s.metaTitle,
    description: s.metaDesc,
    body: `
<section class="page-head"><div class="container">${bc.html}
  <div class="svc-head">
    <div>
      <p class="tag">${groups[s.group].toLowerCase()}</p>
      <h1 class="h1" style="font-size:clamp(36px,5vw,72px)">${s.h1}</h1>
      <p class="lead">${s.lead}</p>
      <div class="hero-cta"><a class="btn btn-primary btn-lg" href="#contact">Обсудить задачу ${icons.arrow}</a>${contactButtons('inline')}</div>
    </div>
    <aside class="price-box" data-reveal>
      <p class="lbl">// стоимость</p><p class="price-big">${s.price}</p><p class="muted">${s.priceNote}</p>
      <hr><p class="lbl">// срок</p><p class="term">${s.term}</p>
    </aside>
  </div>
</div></section>
<section class="section"><div class="container">
  <p class="tag">scope</p>
  <h2 class="h2" data-reveal>Что <em>входит</em></h2>
  <ul class="checklist" data-reveal>${s.includes.map(i => `<li>${icons.check}<span>${i}</span></li>`).join('')}</ul>
</div></section>
<section class="section alt"><div class="container"><p class="tag">workflow</p><h2 class="h2" data-reveal style="margin-bottom:56px">Как <em>работаем</em></h2>${steps(s.steps)}<div style="margin-top:64px">${guarantees()}</div></div></section>
<section class="section"><div class="container">
  <div class="section-head"><div><p class="tag">portfolio</p><h2 class="h2" data-reveal>Примеры <em>работ</em></h2></div><a class="link" href="/portfolio/">Все работы ${icons.arrow}</a></div>
  ${caseRows(cases.slice(0, 2))}
</div></section>
${faq.html}
${relatedPosts.length ? `<section class="section alt"><div class="container"><p class="tag">blog</p><h2 class="h2" data-reveal>Статьи по <em>теме</em></h2><div class="grid-3" style="margin-top:40px">${relatedPosts.map(postCard).join('')}</div></div></section>` : ''}
${related.length ? `<section class="section"><div class="container"><p class="tag">more</p><h2 class="h2" data-reveal style="margin-bottom:40px">Также <em>делаю</em></h2><div class="grid-3">${related.map((x, i) => serviceCard(x, i)).join('')}</div></div></section>` : ''}
${leadForm()}`,
    schema: [schema, bc.schema, faq.schema],
  };
}

// ---------- Цены ----------
function prices() {
  const bc = breadcrumbs([['/ceny/', 'Цены']]);
  const faq = faqBlock([
    ['Почему цены «от»?', 'Стоимость зависит от объёма и сложности. После короткого обсуждения называю фиксированную цену, и она не меняется, если не меняется задача.'],
    ['Как происходит оплата?', 'Доработки — по факту после проверки. Проекты — предоплата 30–50% и оплата этапами. Перевод на карту или по счёту, выдаю чек.'],
    ['Есть ли скидки?', 'Да: на пакеты часов техподдержки, серии карточек для маркетплейсов и при постоянной загрузке для агентств.'],
  ]);
  return {
    path: '/ceny/',
    title: 'Цены на разработку и доработку сайтов в Москве — прайс 2026 | Давид',
    description: `Прайс веб-разработчика: доработка сайта от ${site.hourRate} ₽/час, лендинг от 20 000 ₽, сайт на WordPress от 30 000 ₽, Telegram-бот от 10 000 ₽, карточки для маркетплейсов от 600 ₽.`,
    body: `
<section class="page-head"><div class="container">${bc.html}<p class="tag">pricing</p><h1 class="h1">Цены</h1><p class="lead">Средние цены рынка Москвы — без студийных наценок. Час работы — ${rub(site.hourRate)} ₽. Оценка задачи — бесплатно.</p></div></section>
<section class="section" style="padding-top:24px"><div class="container">
${Object.entries(groups).map(([g, t]) => `<h2 class="group-h">${t}</h2>${priceTable(services.filter(s => s.group === g))}`).join('')}
<h2 class="group-h">Пакеты техподдержки</h2>
<div class="grid-3 packs">
  <div class="card" data-reveal><p class="svc-n">start</p><h3>Старт</h3><p class="price-big">5 000 ₽</p><p>5 часов в месяц · 1 000 ₽/ч</p></div>
  <div class="card featured" data-reveal style="--d:.08s"><p class="svc-n">business · популярный</p><h3>Бизнес</h3><p class="price-big">9 000 ₽</p><p>10 часов в месяц · 900 ₽/ч</p></div>
  <div class="card" data-reveal style="--d:.16s"><p class="svc-n">partner</p><h3>Партнёр</h3><p class="price-big">16 000 ₽</p><p>20 часов в месяц · 800 ₽/ч</p></div>
</div>
<div style="margin-top:64px">${guarantees()}</div>
</div></section>
${faq.html}
${leadForm('Рассчитаю стоимость <em>вашей задачи</em>', 'Опишите задачу в двух словах — назову точную цену и срок в течение часа.')}`,
    schema: [bc.schema, faq.schema],
  };
}

// ---------- Портфолио ----------
function portfolio() {
  const bc = breadcrumbs([['/portfolio/', 'Работы']]);
  return {
    path: '/portfolio/',
    title: 'Портфолио веб-разработчика — примеры сайтов | Давид',
    description: 'Примеры моих работ: сайты для образования и детского отдыха, интернет-магазин на WooCommerce, личные кабинеты. Ссылки на живые проекты.',
    body: `
<section class="page-head"><div class="container">${bc.html}<p class="tag">portfolio</p><h1 class="h1">Работы</h1><p class="lead">Живые проекты, которые работают и приносят клиентам заявки и продажи.</p></div></section>
<section class="section" style="padding-top:24px"><div class="container">${caseRows(cases)}</div></section>
${leadForm('Хотите <em>так же?</em>')}`,
    schema: [bc.schema],
  };
}

function casePage(k) {
  const bc = breadcrumbs([['/portfolio/', 'Работы'], [`/portfolio/${k.slug}/`, k.title]]);
  const others = cases.filter(x => x.slug !== k.slug);
  return {
    path: `/portfolio/${k.slug}/`,
    title: `${k.title} — ${k.type.toLowerCase()} | Портфолио Давида`,
    description: k.summary,
    ogImage: `/assets/img/cases/${k.img}.webp`,
    body: `
<section class="page-head"><div class="container">${bc.html}
  <p class="tag">${k.type.toLowerCase()}</p><h1 class="h1">${k.title}</h1><p class="lead">${k.summary}</p>
  <div class="tags">${k.tags.map(t => `<span>${t}</span>`).join('')}</div>
  <p><a class="btn btn-ghost" href="${k.url}" target="_blank" rel="noopener">Открыть сайт ${icons.arrow}</a></p>
</div></section>
<section class="section" style="padding-top:24px"><div class="container">
  <div class="case-shots" data-reveal>
    <img src="/assets/img/cases/${k.img}.webp" alt="${esc(k.title)} — десктопная версия" width="1440" height="900">
    <img src="/assets/img/cases/${k.img}-m.webp" alt="${esc(k.title)} — мобильная версия" width="390" height="844" loading="lazy">
  </div>
</div></section>
<section class="section" style="padding-top:0"><div class="container narrow">
  <p class="tag">task</p><h2 class="h2">Задача</h2><p class="lead">${k.task}</p>
  <h2 class="h2">Что <em>сделано</em></h2>
  <ul class="checklist">${k.done.map(i => `<li>${icons.check}<span>${i}</span></li>`).join('')}</ul>
</div></section>
<section class="section alt"><div class="container"><p class="tag">more</p><h2 class="h2" style="margin-bottom:48px">Другие <em>работы</em></h2>${caseRows(others)}</div></section>
${leadForm('Нужен похожий <em>проект?</em>')}`,
    schema: [bc.schema],
  };
}

// ---------- Блог ----------
function blogIndex() {
  const bc = breadcrumbs([['/blog/', 'Блог']]);
  return {
    path: '/blog/',
    title: 'Блог о сайтах, ботах и продвижении для бизнеса | Давид',
    description: 'Простым языком о том, сколько стоит сайт, как ускорить WordPress, зачем бизнесу Telegram-бот, и о других вопросах, которые задают мне клиенты.',
    body: `
<section class="page-head"><div class="container">${bc.html}<p class="tag">blog</p><h1 class="h1">Блог</h1><p class="lead">Отвечаю на вопросы, которые чаще всего задают клиенты, — простым языком и без воды.</p></div></section>
<section class="section" style="padding-top:24px"><div class="container"><div class="grid-3">${posts.map(postCard).join('')}</div></div></section>`,
    schema: [bc.schema],
  };
}

function postPage(p) {
  const bc = breadcrumbs([['/blog/', 'Блог'], [`/blog/${p.slug}/`, p.title]]);
  const s = services.find(x => x.slug === p.service);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.metaDesc,
    datePublished: p.date,
    dateModified: p.updated || p.date,
    author: { '@type': 'Person', name: site.person, url: site.url },
    publisher: { '@id': site.url + '/#business' },
    mainEntityOfPage: site.url + `/blog/${p.slug}/`,
    image: site.url + '/assets/img/og.png',
  };
  return {
    path: `/blog/${p.slug}/`,
    title: `${p.title} | Блог Давида`,
    description: p.metaDesc,
    type: 'article',
    body: `
<article>
<section class="page-head"><div class="container narrow">${bc.html}<h1 class="h1" style="font-size:clamp(34px,4.6vw,60px)">${p.title}</h1><p class="muted mono" style="font-size:14px">${site.person}, веб-разработчик · <time datetime="${p.date}">${new Date(p.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</time></p></div></section>
<section class="section" style="padding-top:24px"><div class="container narrow prose">${p.body}
${s ? `<aside class="post-cta"><p><b>${s.name}</b> — ${s.short}</p><a class="btn btn-primary" href="/uslugi/${s.slug}/">Подробнее и цены ${icons.arrow}</a></aside>` : ''}
</div></section>
</article>
${leadForm()}`,
    schema: [schema, bc.schema],
  };
}

// ---------- Контакты, политика, 404 ----------
function contacts() {
  const bc = breadcrumbs([['/kontakty/', 'Контакты']]);
  return {
    path: '/kontakty/',
    title: 'Контакты — Давид, веб-разработчик в Москве',
    description: `Telegram @${c.telegram}, WhatsApp и телефон ${c.phone}, email ${c.email}. Отвечаю в течение часа в рабочее время.`,
    body: `
<section class="page-head"><div class="container">${bc.html}<p class="tag">contact</p><h1 class="h1">Контакты</h1><p class="lead">Самый быстрый способ — Telegram или WhatsApp. Отвечаю в течение часа, ежедневно с 10:00 до 21:00.</p></div></section>
<section class="section" style="padding-top:24px"><div class="container grid-3">
  <a class="card" href="${links.tg}" target="_blank" rel="noopener" data-goal="click_tg" data-reveal><p class="svc-n">telegram</p><h3>@${c.telegram}</h3><span class="link">Написать ${icons.arrow}</span></a>
  <a class="card" href="${links.wa}" target="_blank" rel="noopener" data-goal="click_wa" data-reveal style="--d:.08s"><p class="svc-n">whatsapp</p><h3>${c.phone}</h3><span class="link">Написать ${icons.arrow}</span></a>
  <a class="card" href="${links.email}" data-goal="click_email" data-reveal style="--d:.16s"><p class="svc-n">email</p><h3>${c.email}</h3><span class="link">Написать ${icons.arrow}</span></a>
</div></section>
${leadForm('Или оставьте <em>заявку</em>')}`,
    schema: [business, bc.schema],
  };
}

function privacy() {
  return {
    path: '/privacy/',
    title: 'Политика обработки персональных данных',
    description: 'Политика обработки персональных данных и использования cookie на сайте.',
    body: `
<section class="page-head"><div class="container narrow"><h1 class="h1" style="font-size:clamp(32px,4vw,52px)">Политика обработки персональных данных</h1></div></section>
<section class="section" style="padding-top:24px"><div class="container narrow prose">
<p>Настоящая политика составлена в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных пользователей сайта ${site.domain} (далее — Сайт).</p>
<h2>1. Оператор</h2>
<p>Оператор персональных данных — ${site.personFull} (далее — Оператор). Контакты для обращений: ${c.email}.</p>
<h2>2. Какие данные обрабатываются</h2>
<p>Имя, номер телефона, имя пользователя в мессенджере, адрес электронной почты и текст сообщения, которые пользователь добровольно указывает в форме заявки, а также обезличенные данные о посещениях (cookie, IP-адрес, сведения о браузере и устройстве), собираемые сервисом Яндекс.Метрика.</p>
<h2>3. Цели обработки</h2>
<p>Связь с пользователем для обсуждения и оказания услуг; анализ посещаемости и улучшение работы Сайта.</p>
<h2>4. Правовые основания</h2>
<p>Согласие пользователя, выраженное при отправке формы; заключение и исполнение договора, стороной которого является пользователь.</p>
<h2>5. Порядок и сроки обработки</h2>
<p>Данные из формы передаются Оператору через защищённые каналы и хранятся не дольше, чем этого требуют цели обработки, но не более 3 лет с момента последнего обращения, если иное не предусмотрено законом. Оператор не передаёт персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ.</p>
<h2>6. Cookie</h2>
<p>Сайт использует cookie и Яндекс.Метрику для сбора статистики. Пользователь может отключить cookie в настройках браузера.</p>
<h2>7. Права пользователя</h2>
<p>Пользователь вправе получить сведения об обработке своих данных, потребовать их уточнения, блокирования или удаления, а также отозвать согласие, направив запрос на ${c.email}. Оператор рассматривает запрос в течение 10 рабочих дней.</p>
<h2>8. Изменения политики</h2>
<p>Оператор вправе вносить изменения в политику. Актуальная версия всегда доступна на этой странице.</p>
</div></section>`,
    schema: [],
  };
}

function notFound() {
  return {
    path: '/404.html',
    title: 'Страница не найдена',
    description: 'Такой страницы нет.',
    noindex: true,
    body: `
<section class="page-head"><div class="container narrow"><p class="tag">error 404</p><h1 class="h1">Страница <em>не найдена</em></h1><p class="lead mono">GET ${'{'}url{'}'} → 404 Not Found. Похоже, ссылка устарела.</p>
<div class="hero-cta"><a class="btn btn-primary" href="/">cd ~ ${icons.arrow}</a><a class="btn btn-ghost" href="/uslugi/">Услуги</a></div></div></section>`,
    schema: [],
  };
}

export function allPages() {
  return [
    home(),
    servicesIndex(),
    ...services.map(servicePage),
    prices(),
    portfolio(),
    ...cases.map(casePage),
    blogIndex(),
    ...posts.map(postPage),
    contacts(),
    privacy(),
    notFound(),
  ].map(p => ({ ...p, html: layout(p) }));
}
