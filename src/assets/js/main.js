(() => {
  const goal = (name) => { try { window.SITE.ym && window.ym && ym(window.SITE.ym, 'reachGoal', name); } catch (e) {} };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || location.hash === '#static';

  // Шапка: фон после прокрутки
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 10);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Мобильное меню
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('nav');
  burger?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  nav?.addEventListener('click', (e) => { if (e.target.closest('a')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

  // Появление блоков при прокрутке
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // Подсветка карточек за курсором
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });

  // Терминал в hero: печатаем команды, остальные строки появляются по очереди
  const term = document.querySelector('[data-terminal]');
  if (term) {
    const lines = [...term.querySelectorAll('[data-line]')];
    if (reduce) { lines.forEach((l) => l.classList.add('show')); }
    else {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const typeLine = async (el) => {
        const path = el.querySelector('.t-path');
        const text = [...el.childNodes].filter((n) => n !== path).map((n) => n.textContent).join('');
        [...el.childNodes].forEach((n) => { if (n !== path) n.remove(); });
        const out = document.createTextNode('');
        const caret = document.createElement('span');
        caret.className = 'caret';
        el.append(out, caret);
        el.classList.add('show');
        await sleep(350);
        for (const ch of text) { out.textContent += ch; await sleep(28 + Math.random() * 40); }
        await sleep(250);
        caret.remove();
      };
      (async () => {
        await sleep(400);
        for (const l of lines) {
          if (l.hasAttribute('data-type')) await typeLine(l);
          else { l.classList.add('show'); await sleep(l.classList.contains('t-dim') ? 700 : 170); }
        }
      })();
    }
  }

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
    setTimeout(() => { cookie.hidden = false; }, 2500);
    cookie.querySelector('button').addEventListener('click', () => {
      cookie.hidden = true;
      try { localStorage.setItem('cookie-ok', '1'); } catch (e) {}
    });
  }

  // Форма заявки → Google Apps Script → Telegram
  document.querySelectorAll('[data-lead-form]').forEach((form) => {
    const status = form.querySelector('.form-status');
    const btn = form.querySelector('button[type=submit]');
    const btnHtml = btn.innerHTML;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = 'form-status';
      let ok = true;
      form.querySelectorAll('[required]').forEach((f) => {
        const bad = f.type === 'checkbox' ? !f.checked : !f.value.trim();
        f.setAttribute('aria-invalid', bad);
        if (bad) ok = false;
      });
      if (!ok) { status.textContent = '✗ заполните имя, контакт и согласие'; status.classList.add('err'); return; }
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
        status.textContent = '✓ заявка отправлена — свяжусь с вами в ближайшее время';
        status.classList.add('ok');
        goal('lead_form');
      } catch (err) {
        status.innerHTML = `✗ не удалось отправить. Напишите мне в <a href="${window.SITE.tg}" target="_blank" rel="noopener">Telegram</a>`;
        status.classList.add('err');
      } finally {
        btn.disabled = false;
        btn.innerHTML = btnHtml;
      }
    });
  });
})();
