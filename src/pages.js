import { site } from './config.js';
import { services, groups } from './data/services.js';
import { cases } from './data/cases.js';
import { posts } from './data/posts.js';
import { layout, esc, links, icons, contactButtons, leadForm, breadcrumbs, faqBlock } from './layout.js';

const c = site.contacts;

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

const serviceCard = (s) => `
<a class="card svc" href="/uslugi/${s.slug}/">
  <h3>${s.name}</h3>
  <p>${s.short}</p>
  <span class="svc-price">${s.price} <small>${s.priceNote}</small></span>
  <span class="card-arrow">${icons.arrow}</span>
</a>`;

const caseCard = (k) => `
<a class="case" href="/portfolio/${k.slug}/">
  <div class="case-img"><img src="/assets/img/cases/${k.img}.webp" alt="Сайт ${esc(k.title)}" width="1440" height="900" loading="lazy"></div>
  <div class="case-body">
    <p class="case-type">${k.type}</p>
    <h3>${k.title}</h3>
    <div class="tags">${k.tags.map(t => `<span>${t}</span>`).join('')}</div>
  </div>
</a>`;

const postCard = (p) => `
<a class="card post" href="/blog/${p.slug}/">
  <time datetime="${p.date}">${new Date(p.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
  <h3>${p.title}</h3>
  <p>${p.excerpt}</p>
</a>`;

const steps = (list) => `<ol class="steps">${list.map(([t, d], i) => `<li><span class="step-n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>`;

const generalFaq = [
  ['Как вы работаете с оплатой?', 'Для доработок — оплата по факту после проверки. Для крупных проектов — предоплата 30–50% и оплата этапами. Работаю официально, выдаю чеки.'],
  ['Работаете только с Москвой?', 'Нет, работаю удалённо с клиентами по всей России и СНГ. С московскими клиентами при необходимости могу встретиться лично.'],
  ['Почему у вас дешевле, чем в студии?', 'Нет офиса, менеджеров и наценок. Вы общаетесь напрямую с тем, кто делает работу, — это и дешевле, и быстрее.'],
  ['Что если вы пропадёте?', 'Все доступы, домен и хостинг оформляются на вас, код — у вас. Но пропадать я не собираюсь: для меня каждый клиент — это рекомендации.'],
  ['Можно ли начать с маленькой задачи?', 'Конечно. Многие клиенты начинают с одной правки на 1–2 часа, чтобы посмотреть, как я работаю.'],
];

// ---------- Главная ----------
function home() {
  const faq = faqBlock(generalFaq);
  const body = `
<section class="hero">
  <div class="container hero-grid">
    <div>
      <p class="eyebrow"><span class="dot"></span>Принимаю новые проекты</p>
      <h1 class="h1">Сайты, боты и доработки для бизнеса — <em>напрямую у разработчика</em></h1>
      <p class="lead">Меня зовут ${site.person}, я веб-разработчик из Москвы. Делаю лендинги, сайты на WordPress и Tilda, интернет-магазины, Telegram-ботов и инфографику для маркетплейсов. Без студийных наценок и «испорченного телефона».</p>
      <div class="hero-cta">
        <a class="btn btn-primary btn-lg" href="#contact">Рассчитать стоимость${icons.arrow}</a>
        <a class="btn btn-ghost btn-lg" href="/portfolio/">Смотреть работы</a>
      </div>
      <ul class="hero-facts">
        <li><b>1 час</b><span>среднее время ответа</span></li>
        <li><b>${site.hourRate.toLocaleString('ru-RU')} ₽</b><span>час работы</span></li>
        <li><b>по факту</b><span>оплата доработок</span></li>
      </ul>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <div class="code-card">
        <div class="code-top"><i></i><i></i><i></i><span>itsdavid.ru</span></div>
<pre><code><span class="k">const</span> project = {
  client: <span class="s">'ваш бизнес'</span>,
  task:   <span class="s">'больше заявок'</span>,
  stack:  [<span class="s">'JS'</span>, <span class="s">'PHP'</span>, <span class="s">'WordPress'</span>],
  speed:  <span class="n">98</span>, <span class="c">// PageSpeed</span>
};

<span class="k">await</span> launch(project); <span class="c">// ✓ готово</span></code></pre>
      </div>
      <div class="hero-badge"><b>+ заявки</b><span>прямо в ваш Telegram</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><h2 class="h2">Чем могу помочь</h2><a class="link" href="/uslugi/">Все услуги ${icons.arrow}</a></div>
    ${Object.entries(groups).map(([g, t]) => `<h3 class="group-h">${t}</h3><div class="grid-3">${services.filter(s => s.group === g).map(serviceCard).join('')}</div>`).join('')}
  </div>
</section>

<section class="section alt">
  <div class="container">
    <h2 class="h2">Почему со мной удобно</h2>
    <div class="grid-3 why">
      <div><h3>Напрямую, без посредников</h3><p>Вы общаетесь с тем, кто пишет код. Не нужно объяснять задачу менеджеру, который потом перескажет её программисту.</p></div>
      <div><h3>Цены честные и заранее</h3><p>Называю фиксированную стоимость до начала работы. Доработки — оплата после того, как вы проверили результат.</p></div>
      <div><h3>Быстро отвечаю</h3><p>Telegram и WhatsApp — в рабочее время отвечаю в течение часа. Срочные правки делаю в день обращения.</p></div>
      <div><h3>Сайт остаётся вашим</h3><p>Домен, хостинг и доступы оформляются на вас. Никакой привязки к исполнителю.</p></div>
      <div><h3>Думаю о заявках, а не только о коде</h3><p>Настраиваю аналитику, формы в Telegram и CRM, скорость и SEO — чтобы сайт приносил клиентов.</p></div>
      <div><h3>Беру и маленькие задачи</h3><p>Поправить кнопку или форму — тоже работа. Минимальный заказ — всего 1 час.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><h2 class="h2">Работы</h2><a class="link" href="/portfolio/">Все работы ${icons.arrow}</a></div>
    <div class="cases">${cases.map(caseCard).join('')}</div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <h2 class="h2">Как мы работаем</h2>
    ${steps([
      ['Пишете задачу', 'В Telegram, WhatsApp или через форму. Можно голосовым, можно ссылкой на пример.'],
      ['Получаете оценку', 'В тот же день: стоимость, срок и что именно будет сделано.'],
      ['Я делаю', 'Показываю промежуточный результат, вы видите прогресс, а не ждёте вслепую.'],
      ['Принимаете и платите', 'Проверяете результат и оплачиваете. Месяц мелких правок — бесплатно.'],
    ])}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><h2 class="h2">Цены</h2><a class="link" href="/ceny/">Полный прайс ${icons.arrow}</a></div>
    ${priceTable(services.slice(0, 8))}
  </div>
</section>

<section class="section alt">
  <div class="container about">
    <div class="about-photo">${site.photo ? `<img src="${site.photo}" alt="${site.person}, веб-разработчик" width="600" height="750" loading="lazy">` : '<span aria-hidden="true">Д</span>'}</div>
    <div>
      <h2 class="h2">Обо мне</h2>
      <p class="lead">Привет! Я ${site.person}, веб-разработчик из Москвы. Больше ${site.experienceYears} лет делаю сайты: от лендингов до интернет-магазинов и личных кабинетов.</p>
      <p>Моя сильная сторона — фронтенд: аккуратная вёрстка, быстрые и удобные интерфейсы. Также уверенно работаю с бэкендом на PHP, WordPress и WooCommerce, делаю интеграции и Telegram-ботов. Клиенты приходят ко мне по рекомендациям, а теперь — и через этот сайт.</p>
      <div class="stack">${['JavaScript', 'TypeScript', 'React', 'Vue', 'HTML/CSS', 'PHP', 'WordPress', 'WooCommerce', 'Tilda', '1С-Битрикс', 'Node.js', 'Telegram API', 'Figma'].map(t => `<span>${t}</span>`).join('')}</div>
    </div>
  </div>
</section>

${faq.html}

<section class="section">
  <div class="container">
    <div class="section-head"><h2 class="h2">Полезное</h2><a class="link" href="/blog/">Блог ${icons.arrow}</a></div>
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

const priceTable = (list) => `
<div class="prices">${list.map(s => `
  <a class="price-row" href="/uslugi/${s.slug}/">
    <span class="price-name">${s.name}<small>${s.term}</small></span>
    <span class="price-val">${s.price} <small>${s.priceNote}</small></span>
  </a>`).join('')}
</div>`;

// ---------- Услуги ----------
function servicesIndex() {
  const bc = breadcrumbs([['/uslugi/', 'Услуги']]);
  return {
    path: '/uslugi/',
    title: 'Услуги веб-разработчика в Москве — цены | Давид',
    description: 'Разработка лендингов и сайтов, вёрстка, интернет-магазины, Telegram-боты, карточки для маркетплейсов, доработка, ускорение и поддержка сайтов. Цены и сроки.',
    body: `
<section class="page-head"><div class="container">${bc.html}<h1 class="h1">Услуги</h1><p class="lead">От правки одной кнопки до интернет-магазина под ключ. Цены указаны «от» — точную стоимость назову после короткого обсуждения задачи.</p></div></section>
<section class="section"><div class="container">
${Object.entries(groups).map(([g, t]) => `<h2 class="group-h">${t}</h2><div class="grid-3">${services.filter(s => s.group === g).map(serviceCard).join('')}</div>`).join('')}
</div></section>
${leadForm('Не нашли свою задачу?', 'Напишите, что нужно сделать. Если это не мой профиль — честно скажу и посоветую, к кому обратиться.')}`,
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
      <h1 class="h1">${s.h1}</h1>
      <p class="lead">${s.lead}</p>
      <div class="hero-cta"><a class="btn btn-primary btn-lg" href="#contact">Обсудить задачу${icons.arrow}</a>${contactButtons('inline')}</div>
    </div>
    <aside class="price-box">
      <p class="muted">Стоимость</p><p class="price-big">${s.price}</p><p class="muted">${s.priceNote}</p>
      <hr><p class="muted">Срок</p><p class="price-term">${s.term}</p>
    </aside>
  </div>
</div></section>
<section class="section"><div class="container">
  <h2 class="h2">Что входит</h2>
  <ul class="checklist">${s.includes.map(i => `<li>${icons.check}<span>${i}</span></li>`).join('')}</ul>
</div></section>
<section class="section alt"><div class="container"><h2 class="h2">Как работаем</h2>${steps(s.steps)}</div></section>
<section class="section"><div class="container">
  <div class="section-head"><h2 class="h2">Примеры работ</h2><a class="link" href="/portfolio/">Все работы ${icons.arrow}</a></div>
  <div class="cases">${cases.map(caseCard).join('')}</div>
</div></section>
${faq.html}
${relatedPosts.length ? `<section class="section"><div class="container"><h2 class="h2">Статьи по теме</h2><div class="grid-3">${relatedPosts.map(postCard).join('')}</div></div></section>` : ''}
${related.length ? `<section class="section alt"><div class="container"><h2 class="h2">Также делаю</h2><div class="grid-3">${related.map(serviceCard).join('')}</div></div></section>` : ''}
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
<section class="page-head"><div class="container">${bc.html}<h1 class="h1">Цены</h1><p class="lead">Средние цены на рынке Москвы — без студийных наценок. Час работы — ${site.hourRate.toLocaleString('ru-RU')} ₽. Оценка задачи — бесплатно.</p></div></section>
<section class="section"><div class="container">
${Object.entries(groups).map(([g, t]) => `<h2 class="group-h">${t}</h2>${priceTable(services.filter(s => s.group === g))}`).join('')}
<h2 class="group-h">Пакеты техподдержки</h2>
<div class="grid-3 packs">
  <div class="card"><h3>Старт</h3><p class="price-big">5 000 ₽</p><p class="muted">5 часов в месяц · 1 000 ₽/ч</p></div>
  <div class="card featured"><h3>Бизнес</h3><p class="price-big">9 000 ₽</p><p class="muted">10 часов в месяц · 900 ₽/ч</p></div>
  <div class="card"><h3>Партнёр</h3><p class="price-big">16 000 ₽</p><p class="muted">20 часов в месяц · 800 ₽/ч</p></div>
</div>
</div></section>
${faq.html}
${leadForm('Рассчитаю стоимость вашей задачи', 'Опишите задачу в двух словах — назову точную цену и срок в течение часа.')}`,
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
<section class="page-head"><div class="container">${bc.html}<h1 class="h1">Работы</h1><p class="lead">Живые проекты, которые работают и приносят клиентам заявки и продажи.</p></div></section>
<section class="section"><div class="container"><div class="cases">${cases.map(caseCard).join('')}</div></div></section>
${leadForm('Хотите так же?')}`,
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
  <p class="case-type">${k.type}</p><h1 class="h1">${k.title}</h1><p class="lead">${k.summary}</p>
  <div class="tags">${k.tags.map(t => `<span>${t}</span>`).join('')}</div>
  <p><a class="btn btn-ghost" href="${k.url}" target="_blank" rel="noopener">Открыть сайт ${icons.arrow}</a></p>
</div></section>
<section class="section"><div class="container">
  <div class="case-shots">
    <img src="/assets/img/cases/${k.img}.webp" alt="${esc(k.title)} — десктопная версия" width="1440" height="900">
    <img src="/assets/img/cases/${k.img}-m.webp" alt="${esc(k.title)} — мобильная версия" width="390" height="844" loading="lazy">
  </div>
</div></section>
<section class="section"><div class="container narrow">
  <h2 class="h2">Задача</h2><p class="lead">${k.task}</p>
  <h2 class="h2">Что сделано</h2>
  <ul class="checklist">${k.done.map(i => `<li>${icons.check}<span>${i}</span></li>`).join('')}</ul>
</div></section>
<section class="section alt"><div class="container"><h2 class="h2">Другие работы</h2><div class="cases">${others.map(caseCard).join('')}</div></div></section>
${leadForm('Нужен похожий проект?')}`,
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
<section class="page-head"><div class="container">${bc.html}<h1 class="h1">Блог</h1><p class="lead">Отвечаю на вопросы, которые чаще всего задают клиенты, — простым языком и без воды.</p></div></section>
<section class="section"><div class="container"><div class="grid-3">${posts.map(postCard).join('')}</div></div></section>`,
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
<section class="page-head"><div class="container narrow">${bc.html}<h1 class="h1">${p.title}</h1><p class="muted">${site.person}, веб-разработчик · <time datetime="${p.date}">${new Date(p.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</time></p></div></section>
<section class="section"><div class="container narrow prose">${p.body}
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
<section class="page-head"><div class="container">${bc.html}<h1 class="h1">Контакты</h1><p class="lead">Самый быстрый способ — Telegram или WhatsApp. Отвечаю в течение часа, ежедневно с 10:00 до 21:00.</p></div></section>
<section class="section"><div class="container grid-3 contacts">
  <a class="card" href="${links.tg}" target="_blank" rel="noopener" data-goal="click_tg">${icons.tg}<h3>Telegram</h3><p>@${c.telegram}</p></a>
  <a class="card" href="${links.wa}" target="_blank" rel="noopener" data-goal="click_wa">${icons.wa}<h3>WhatsApp</h3><p>${c.phone}</p></a>
  <a class="card" href="${links.email}" data-goal="click_email">${icons.mail}<h3>Email</h3><p>${c.email}</p></a>
</div></section>
${leadForm('Или оставьте заявку')}`,
    schema: [business, bc.schema],
  };
}

function privacy() {
  return {
    path: '/privacy/',
    title: 'Политика обработки персональных данных',
    description: 'Политика обработки персональных данных и использования cookie на сайте.',
    body: `
<section class="page-head"><div class="container narrow"><h1 class="h1">Политика обработки персональных данных</h1></div></section>
<section class="section"><div class="container narrow prose">
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
<section class="page-head"><div class="container narrow"><h1 class="h1">404 — страница не найдена</h1><p class="lead">Похоже, ссылка устарела. Зато на сайте есть много полезного:</p>
<div class="hero-cta"><a class="btn btn-primary" href="/">На главную</a><a class="btn btn-ghost" href="/uslugi/">Услуги</a></div></div></section>`,
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
