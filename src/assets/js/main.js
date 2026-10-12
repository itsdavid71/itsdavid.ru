(() => {
  const goal = (name) => { try { window.SITE.ym && window.ym && ym(window.SITE.ym, 'reachGoal', name); } catch (e) {} };

  // Мобильное меню
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('nav');
  burger?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });

  // Цели Метрики на клики по контактам
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-goal]');
    if (a) goal(a.dataset.goal);
  });

  // Cookie-уведомление
  const cookie = document.querySelector('.cookie');
  let seen = false;
  try { seen = localStorage.getItem('cookie-ok') === '1'; } catch (e) {}
  if (cookie && !seen) {
    cookie.hidden = false;
    cookie.querySelector('button').addEventListener('click', () => {
      cookie.hidden = true;
      try { localStorage.setItem('cookie-ok', '1'); } catch (e) {}
    });
  }

  // Форма заявки → Google Apps Script → Telegram
  document.querySelectorAll('[data-lead-form]').forEach((form) => {
    const status = form.querySelector('.form-status');
    const btn = form.querySelector('button[type=submit]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = 'form-status';
      let ok = true;
      form.querySelectorAll('[required]').forEach((f) => {
        const bad = f.type === 'checkbox' ? !f.checked : !f.value.trim();
        f.setAttribute('aria-invalid', bad);
        if (bad) ok = false;
      });
      if (!ok) { status.textContent = 'Заполните имя, контакт и согласие.'; status.classList.add('err'); return; }
      const el = (n) => form.elements.namedItem(n);
      if (el('website').value) return; // бот

      const data = {
        name: el('name').value.trim(),
        contact: el('contact').value.trim(),
        message: el('message').value.trim(),
        page: location.href,
        ref: document.referrer,
        utm: location.search,
      };
      btn.disabled = true;
      btn.textContent = 'Отправляю…';
      try {
        if (!window.SITE.form) throw new Error('no endpoint');
        await fetch(window.SITE.form, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data) });
        form.reset();
        status.textContent = 'Спасибо! Заявка отправлена — свяжусь с вами в ближайшее время.';
        status.classList.add('ok');
        goal('lead_form');
      } catch (err) {
        status.innerHTML = 'Не удалось отправить. Напишите мне напрямую в <a href="https://t.me/itsdavid21" target="_blank" rel="noopener">Telegram</a>.';
        status.classList.add('err');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Отправить заявку';
      }
    });
  });
})();
