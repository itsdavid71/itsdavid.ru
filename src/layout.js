import { site } from './config.js';
import { services } from './data/services.js';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const c = site.contacts;
export const links = {
  tg: `https://t.me/${c.telegram}`,
  wa: `https://wa.me/${c.whatsapp}`,
  phone: `tel:${c.phoneRaw}`,
  email: `mailto:${c.email}`,
};

export const icons = {
  tg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.5 13.2l-4.7-1.5c-1-.3-1-1 .2-1.5L20.5 3c.9-.3 1.6.2 1.4 1.3z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
};

// Ссылки с data-goal считаются целями в Метрике (см. main.js).
export const contactButtons = (cls = '') => `
<div class="contact-btns ${cls}">
  <a class="btn btn-tg" href="${links.tg}" target="_blank" rel="noopener" data-goal="click_tg">${icons.tg}<span>Telegram</span></a>
  <a class="btn btn-wa" href="${links.wa}" target="_blank" rel="noopener" data-goal="click_wa">${icons.wa}<span>WhatsApp</span></a>
</div>`;

export const leadForm = (title = 'Обсудим ваш проект?', sub = 'Опишите задачу — отвечу в течение часа в рабочее время и назову цену и сроки. Бесплатно и без обязательств.') => `
<section class="section cta" id="contact">
  <div class="container cta-grid">
    <div>
      <h2 class="h2">${title}</h2>
      <p class="lead">${sub}</p>
      <p class="muted">Быстрее всего — написать в мессенджер:</p>
      ${contactButtons()}
      <p class="cta-alt">
        <a href="${links.phone}" data-goal="click_phone">${icons.phone}${c.phone}</a>
        <a href="${links.email}" data-goal="click_email">${icons.mail}${c.email}</a>
      </p>
    </div>
    <form class="form" data-lead-form novalidate>
      <label class="field"><span>Как к вам обращаться</span><input name="name" autocomplete="name" required></label>
      <label class="field"><span>Telegram, WhatsApp или телефон</span><input name="contact" required placeholder="@username или +7…"></label>
      <label class="field"><span>Что нужно сделать</span><textarea name="message" rows="4" placeholder="Например: лендинг для салона, ссылка на пример…"></textarea></label>
      <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <label class="check"><input type="checkbox" name="agree" required checked><span>Согласен на <a href="/privacy/">обработку персональных данных</a></span></label>
      <button class="btn btn-primary btn-lg" type="submit">Отправить заявку</button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>`;

const nav = [
  ['/uslugi/', 'Услуги'],
  ['/ceny/', 'Цены'],
  ['/portfolio/', 'Работы'],
  ['/blog/', 'Блог'],
  ['/kontakty/', 'Контакты'],
];

const header = (path) => `
<header class="header">
  <div class="container header-in">
    <a class="logo" href="/" aria-label="${esc(site.name)} — на главную"><span class="logo-mark">Д</span><span class="logo-txt">${site.person}<small>веб-разработчик</small></span></a>
    <nav class="nav" id="nav" aria-label="Главное меню">
      ${nav.map(([h, t]) => `<a href="${h}"${path.startsWith(h) ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
      <a class="btn btn-primary nav-cta" href="${links.tg}" target="_blank" rel="noopener" data-goal="click_tg">${icons.tg}Написать</a>
    </nav>
    <button class="burger" aria-label="Меню" aria-controls="nav" aria-expanded="false"><span></span><span></span></button>
  </div>
</header>`;

const footer = () => `
<footer class="footer">
  <div class="container footer-grid">
    <div>
      <a class="logo" href="/"><span class="logo-mark">Д</span><span class="logo-txt">${site.person}<small>веб-разработчик</small></span></a>
      <p class="muted">Сайты, боты и доработки для малого бизнеса. ${site.city} и удалённо по всей России.</p>
      ${contactButtons('sm')}
    </div>
    <div>
      <p class="footer-h">Разработка</p>
      ${services.filter(s => ['dev', 'bots', 'design'].includes(s.group)).map(s => `<a href="/uslugi/${s.slug}/">${s.name}</a>`).join('')}
    </div>
    <div>
      <p class="footer-h">Доработка и поддержка</p>
      ${services.filter(s => s.group === 'support').map(s => `<a href="/uslugi/${s.slug}/">${s.name}</a>`).join('')}
    </div>
    <div>
      <p class="footer-h">Контакты</p>
      <a href="${links.phone}" data-goal="click_phone">${c.phone}</a>
      <a href="${links.email}" data-goal="click_email">${c.email}</a>
      <a href="${links.tg}" target="_blank" rel="noopener" data-goal="click_tg">@${c.telegram}</a>
      <a href="${c.github}" target="_blank" rel="noopener">GitHub</a>
      <a href="/privacy/">Политика конфиденциальности</a>
    </div>
  </div>
  <div class="container footer-bottom muted">© ${new Date().getFullYear()} ${site.person}, веб-разработчик · ${site.city}</div>
</footer>
<div class="cookie" hidden><p>Сайт использует cookie и Яндекс.Метрику для анализа посещаемости. <a href="/privacy/">Подробнее</a></p><button class="btn btn-sm" type="button">Понятно</button></div>
<a class="float-tg" href="${links.tg}" target="_blank" rel="noopener" data-goal="click_tg" aria-label="Написать в Telegram">${icons.tg}</a>`;

const metrika = () => site.yandexMetrikaId ? `
<script>(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${site.yandexMetrikaId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});</script>
<noscript><div><img src="https://mc.yandex.ru/watch/${site.yandexMetrikaId}" style="position:absolute;left:-9999px" alt=""></div></noscript>` : '';

export function layout({ path, title, description, body, schema = [], ogImage = '/assets/img/og.png', type = 'website', noindex = false }) {
  const url = site.url + path;
  const ld = schema.length ? `<script type="application/ld+json">${JSON.stringify(schema.length === 1 ? schema[0] : schema)}</script>` : '';
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${url}">
<meta property="og:type" content="${type}">
<meta property="og:locale" content="ru_RU">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#14141a">
${site.yandexVerification ? `<meta name="yandex-verification" content="${site.yandexVerification}">` : ''}
${site.googleVerification ? `<meta name="google-site-verification" content="${site.googleVerification}">` : ''}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/manrope-cyr.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/style.css?v=${BUILD_ID}">
${ld}
</head>
<body>
${header(path)}
<main>
${body}
</main>
${footer()}
<script>window.SITE={form:${JSON.stringify(site.formEndpoint)},ym:${JSON.stringify(site.yandexMetrikaId)}};</script>
<script src="/assets/js/main.js?v=${BUILD_ID}" defer></script>
${metrika()}
</body>
</html>`;
}

export const BUILD_ID = Date.now().toString(36);

export const breadcrumbs = (items) => ({
  html: `<nav class="crumbs" aria-label="Хлебные крошки"><a href="/">Главная</a>${items.map(([h, t], i) => i === items.length - 1 ? `<span>${esc(t)}</span>` : `<a href="${h}">${esc(t)}</a>`).join('')}</nav>`,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [['/', 'Главная'], ...items].map(([h, t], i) => ({ '@type': 'ListItem', position: i + 1, name: t, item: site.url + h })),
  },
});

export const faqBlock = (faq, title = 'Частые вопросы') => ({
  html: `<section class="section"><div class="container narrow"><h2 class="h2">${title}</h2><div class="faq">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></div></section>`,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  },
});
