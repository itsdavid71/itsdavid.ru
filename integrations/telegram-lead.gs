/**
 * Приём заявок с сайта и отправка в Telegram. Бесплатно, без сервера.
 *
 * Установка (5 минут):
 * 1. В Telegram напиши @BotFather → /newbot → получи токен.
 * 2. Напиши своему новому боту любое сообщение (иначе он не сможет тебе писать).
 * 3. Узнай свой chat_id: напиши @userinfobot — он пришлёт твой Id.
 * 4. Открой https://script.google.com → «Новый проект» → вставь этот код.
 * 5. Слева «Настройки проекта» (шестерёнка) → «Свойства скрипта» → добавь:
 *      TG_TOKEN = токен от BotFather
 *      TG_CHAT  = твой chat_id
 *      SHEET_ID = (необязательно) ID Google-таблицы для архива заявок
 * 6. «Начать развертывание» → «Новое развертывание» → тип «Веб-приложение»,
 *    «Запуск от имени: Я», «У кого есть доступ: Все» → «Развернуть» → разреши доступ.
 * 7. Скопируй URL веб-приложения в src/config.js → formEndpoint и пересобери сайт.
 * 8. Проверка: в редакторе выбери функцию testLead → «Выполнить» — в Telegram придёт тестовая заявка.
 */

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (!d.name || !d.contact) return out({ ok: false });
    send(d);
    archive(d);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

function send(d) {
  const p = PropertiesService.getScriptProperties();
  const clip = (s, n) => String(s || '').slice(0, n);
  const text = [
    '🔥 <b>Новая заявка с сайта</b>',
    '',
    '<b>Имя:</b> ' + esc(clip(d.name, 100)),
    '<b>Контакт:</b> ' + esc(clip(d.contact, 100)),
    d.message ? '<b>Задача:</b> ' + esc(clip(d.message, 2000)) : '',
    '',
    '<b>Страница:</b> ' + esc(clip(d.page, 300)),
    d.utm ? '<b>UTM:</b> ' + esc(clip(d.utm, 300)) : '',
    d.ref ? '<b>Откуда:</b> ' + esc(clip(d.ref, 300)) : '',
  ].filter(function (l, i, a) { return l !== '' || a[i - 1] !== ''; }).join('\n');

  UrlFetchApp.fetch('https://api.telegram.org/bot' + p.getProperty('TG_TOKEN') + '/sendMessage', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ chat_id: p.getProperty('TG_CHAT'), text: text, parse_mode: 'HTML', disable_web_page_preview: true }),
    muteHttpExceptions: true,
  });
}

function archive(d) {
  const id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (!id) return;
  SpreadsheetApp.openById(id).getSheets()[0].appendRow([new Date(), d.name, d.contact, d.message, d.page, d.utm, d.ref]);
}

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function testLead() {
  send({ name: 'Тест', contact: '@test', message: 'Проверка формы', page: 'https://itsdavid.ru/' });
}
