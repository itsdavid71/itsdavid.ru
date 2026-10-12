// Все настройки сайта в одном месте. Поменял здесь — пересобрал — всё обновилось.
export const site = {
  domain: 'itsdavid.ru',
  url: 'https://itsdavid.ru',
  name: 'Давид — веб-разработчик',
  brand: 'itsdavid',
  person: 'Давид',
  personFull: 'Давид', // для политики ПДн лучше указать ФИО полностью
  city: 'Москва',
  experienceYears: 7, // TODO: поправь на свой реальный стаж
  hourRate: 1000,
  photo: '', // положи фото в src/assets/img/ и укажи путь, например '/assets/img/david.jpg'

  contacts: {
    telegram: 'itsdavid21',
    whatsapp: '79168321578',
    phone: '+7 916 832-15-78',
    phoneRaw: '+79168321578',
    email: 'itsdavid71@gmail.com',
    github: 'https://github.com/itsdavid71',
  },

  // Заполняется после регистрации в сервисах (см. README).
  yandexMetrikaId: '',        // например '98765432'
  yandexVerification: '',     // код из Яндекс.Вебмастера (meta name="yandex-verification")
  googleVerification: '',     // код из Google Search Console
  formEndpoint: '',           // URL веб-приложения Google Apps Script (integrations/telegram-lead.gs)
};
