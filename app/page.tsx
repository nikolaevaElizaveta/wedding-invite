"use client";

import { useState, useEffect, useRef } from "react";
import { playfair, greatVibes, cormorant, cormorantInfant, calmeExtra, yesevaOne, comfortaa } from "./fonts";

const WEDDING_DATE = new Date("2026-08-14T16:30:00");
const TELEGRAM_USERNAME = "flowntwisty";
const WHATSAPP_NUMBER = "79372797872";

function getCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { weeks: 0, days: 0, hours: 0, minutes: 0, isPast: true };
  }

  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 7);
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

  return { weeks, days, hours, minutes, isPast: false };
}

function Countdown() {
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (countdown.isPast) {
    return (
      <section className="mt-12 text-center px-6 pb-16 font-sans">
        <p className="text-lg text-black">Свадьба состоялась!</p>
      </section>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="mt-12 text-center px-6 pb-16 font-sans">
      <div className="grid grid-cols-4 gap-4 text-lg justify-items-center max-w-xs mx-auto">
        <div>
          <div className={`${calmeExtra.className} text-2xl font-bold text-black`}>{pad(countdown.weeks)}</div>
          <div className="text-sm text-neutral-500 font-light">недель</div>
        </div>
        <div>
          <div className={`${calmeExtra.className} text-2xl font-bold text-black`}>{pad(countdown.days)}</div>
          <div className="text-sm text-neutral-500 font-light">дней</div>
        </div>
        <div>
          <div className={`${calmeExtra.className} text-2xl font-bold text-black`}>{pad(countdown.hours)}</div>
          <div className="text-sm text-neutral-500 font-light">часов</div>
        </div>
        <div>
          <div className={`${calmeExtra.className} text-2xl font-bold text-black`}>{pad(countdown.minutes)}</div>
          <div className="text-sm text-neutral-500 font-light">минут</div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- RSVPForm (обновлённый) ----------------- */
function RSVPForm() {
  const [confirmed, setConfirmed] = useState(false);
  const [includeGift, setIncludeGift] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Текст по-умолчанию
  const baseText = "Мы будем рады разделить с вами этот день!";

  const handleConfirm = () => {
    setConfirmed(true);
    setMessage(baseText);
    // фокус в textarea после открытия формы
    setTimeout(() => textareaRef.current?.focus(), 80);
  };

  const handleGiftChange = (checked: boolean) => {
    setIncludeGift(checked);

    if (checked) {
      setMessage(baseText + " Мы также планируем денежный подарок.");
    } else {
      setMessage(baseText);
    }
  };

  const handleTelegramClick = async () => {
    try {
      // копируем текст
      await navigator.clipboard.writeText(message || baseText);
      setCopied(true);

      // через короткое время открыть профиль
      setTimeout(() => {
        // откроется профиль в новом окне/вкладке
        window.open(`https://t.me/${TELEGRAM_USERNAME}`, "_blank");
        // оставить сообщение видимым ещё немного, затем скрыть
        setTimeout(() => setCopied(false), 1000);
      }, 900);
    } catch (err) {
      alert("Не удалось скопировать текст в буфер обмена. Попробуйте вручную скопировать сообщение.");
    }
  };

  const encoded = encodeURIComponent(message || baseText);

  return (
    <section className={`${yesevaOne.className} px-6 pb-8 text-center`}>
      {/* До подтверждения — только большая кнопка (минимальный отступ вверх) */}
      {!confirmed && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#2B2B2B] text-white py-4 rounded-full text-normal tracking-wide hover:opacity-90 transition"
          >
            ✔ Подтвердить
          </button>
        </div>
      )}

      {/* После — форма (используем yesevaOne для заголовков и cormorantInfant для текста внутри формы) */}
      {confirmed && (
        <div className="mt-4 bg-[#F5F5F5] rounded-3xl p-5 shadow-sm">
          <div className={`${yesevaOne.className} text-base font-light text-black mb-4 tracking-wide`}>Добавить сообщение для жениха и невесты</div>

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Мы будем рады разделить с вами этот день..."
            className={`${cormorantInfant.className}
              w-full h-28
              rounded-2xl
              border border-gray-300
              bg-white
              p-4
              text-sm
              text-[#2B2B2B]
              placeholder:text-gray-400
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-gray-300`}

            // className={`${cormorantInfant.className} w-full h-28 rounded-2xl border border-gray-300 bg-white p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-300`}
          />

          <div className="flex items-center justify-start mt-0.5">
            <label className={`${cormorantInfant.className} flex items-center gap-2 text-sm text-gray-700`}>
              <input
                type="checkbox"
                checked={includeGift}
                onChange={(e) => handleGiftChange(e.target.checked)}
                className="w-4 h-4 accent-black"
              />
              денежный подарок
            </label>
          </div>

          {/* Кнопки */}
          <div className="flex flex-col gap-4 mt-6">
            {/* Telegram */}
            <div>
              <button
                onClick={handleTelegramClick}
                className="w-full bg-[#229ED9] text-white py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
              >
                Отправить в Telegram
              </button>
              <p className={`${cormorantInfant.className} text-xs text-gray-500 mt-2`}>
                Сообщение скопируется автоматически — вставьте его в чат с Элиной 💛
              </p>
            </div>

            {copied && (
              <div className="text-green-600 text-sm">
                Текст скопирован — открою профиль...
              </div>
            )}

            {/* WhatsApp */}
            <div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#25D366] text-white py-3 rounded-full text-sm font-medium hover:opacity-90 transition text-center"
              >
                Отправить в WhatsApp
              </a>
              <p className={`${cormorantInfant.className} text-xs text-gray-500 mt-2`}>
                Сообщение подставится автоматически в WhatsApp
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ----------------- Footer ----------------- */
function Footer() {
  return (
    <footer className="mt-16 bg-neutral-900 text-neutral-100 pt-8 pb-6 text-center">

      <div className={`${calmeExtra.className} text-lg`}>
        Элина & Евгений
      </div>

      <div className={`${cormorantInfant.className} text-sm mt-1 text-neutral-500`}>
        14.08.2026
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 text-sm">
        <a
          href={`https://t.me/${TELEGRAM_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-70 transition"

        >
          Telegram
        </a>

        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          className="underline hover:opacity-70 transition"

        >
          +{WHATSAPP_NUMBER}
        </a>
      </div>
    </footer>
  );
}


/* ----------------- Main page ----------------- */
export default function Home() {
  return (
    <main className="w-full max-w-md min-h-screen bg-white shadow-sm ">

      <div className="pt-20 pb-4 px-10">
        <div className="flex">
          <div className="flex flex-col items-center w-16 shrink-0">
            <div className={`${yesevaOne.className} text-[23px] leading-[1.25] tracking-[0.1em] text-black`}>
              <div>14</div>
              <div>08</div>
              <div>26</div>
            </div>
            <div className="w-px h-110 bg-black mt-6"></div>
          </div>

          <div className="flex-1 ml-8 flex flex-col text-left">
            <div className="h-[12rem]"></div>

            <h1 className={`${calmeExtra.className} mt-1 text-4xl sm:text-5xl tracking-wide font-light uppercase text-black`}>
              Элина
            </h1>
            <div className={`${greatVibes.className} text-[60px] -my-5 text-black`}>and</div>
            <h1 className={`${calmeExtra.className} -mt-1 text-4xl sm:text-5xl tracking-wide font-light uppercase text-black`}>
              Евгений
            </h1>

            <p className={`${cormorant.className} mt-5 text-xs sm:text-sm font-light uppercase tracking-tight leading-tight text-black`}>
              Приглашаем Вас разделить с нами радость
              главного события в нашей жизни
            </p>

            <p className="font-sans font-semibold text-sm tracking-wide text-black my-2">
              пятница, 14 августа 2026
            </p>

            <div className={`${cormorantInfant.className} mt-1 text-[14px] font-light text-black leading-[1.25] mb-3`}>
              Миллэт<br />
              Проточная улица, 6
            </div>

            <p className={`${greatVibes.className} mt-1 text-[44px] md:text-[60px] text-black leading-[0.8]`}>Ждём Вас на нашей свадьбе</p>
          </div>
        </div>
      </div>

      <Countdown />

      {/* Dear guest (уменьшил вертикальные отступы) */}
      <section className="px-8 py-8 text-center">
        <h2 className={`${yesevaOne.className} text-[23px] text-black text-center tracking-snug leading-[1.4] mb-6`}>
          Дорогие<br /> Гости!
        </h2>

        <p className={`${cormorantInfant.className} mt-0.5 text-[18px] font-light text-black leading-[1.5] px-[18px]`}>
          Мы рады сообщить Вам, что 14.08.2026 состоится самое
          главное торжество в нашей жизни — день нашей свадьбы!
          Приглашаем Вас разделить с нами радость этого
          незабываемого дня.
        </p>

        <p className="font-sans font-semibold text-[14px] tracking-wide text-black my-6 leading-normal">
          14.08.2026 в 17:00<br />
          Миллэт<br />
          Проточная улица, 6
        </p>

        {/* изображения — отступы немного уменьшены */}
        <div className="mt-8 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center">
            <img src="/images/celebration.jpg" alt="Celebration" className="w-68 max-w-xs rounded-lg shadow-md" />
            <p className={`${greatVibes.className} mt-4 text-[60px] text-black leading-[0.8]`}>Там, где посеяна любовь, растёт радость! </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center">
              <img src="/images/bride.jpg" alt="Невеста" className="w-44 h-44 rounded-full object-cover" />
              <p className={`${greatVibes.className} mt-2 text-[60px] text-black`}>Невеста</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/groom.jpg" alt="Жених" className="w-44 h-44 rounded-full object-cover" />
              <p className={`${greatVibes.className} mt-2 text-[60px] text-black`}>Жених</p>
            </div>
          </div>
        </div>
      </section>

      {/* Меню (уменьшил отступы) */}
      <section className="px-8 py-6 text-center">
        <h2 className={`${yesevaOne.className} text-[23px] text-black text-center tracking-snug leading-[1.4] mb-6`}>
          МЕНЮ
        </h2>
        <p className={`${cormorantInfant.className} mt-0.5 text-[18px] font-light text-black leading-[1.5] px-[18px]`}>
          Меню разнообразно, поэтому сообщите нам заранее, если у вас есть какие-либо предпочтения или диетические ограничения. 
          После подтверждения вы сможете пройти опрос о своих вкусовых предпочтениях и напитках.
        </p>
      </section>

      {/* Пожелания по подаркам */}
      <section className="px-8 py-12 text-center">
        <h2 className={`${yesevaOne.className} text-[23px] text-black text-center tracking-snug leading-[1.4] mb-6`}>
          ПОЖЕЛАНИЯ ПО ПОДАРКАМ
        </h2>
        <p className={`${cormorantInfant.className} mt-0.5 text-[18px] font-light text-black leading-[1.5] px-[18px]`}>
          Ваше присутствие в день нашей свадьбы — самый значимый подарок для нас!<br /><br />
          Мы понимаем, что дарить цветы на свадьбу — это традиция, но мы не сможем насладиться их красотой в полной мере... 
          Будем рады любой другой альтернативе (вино или в денежном эквиваленте).
        </p>
      </section>

      {/* Примечание */}
      <section className="px-8 py-12 text-center">
        <h2 className={`${yesevaOne.className} text-[23px] text-black text-center tracking-snug leading-[1.4] mb-6`}>
          ПРИМЕЧАНИЕ
        </h2>
        <p className={`${cormorantInfant.className} mt-0.5 text-[18px] font-light text-black leading-[1.5] px-[18px]`}>
          Будем благодарны, если вы воздержитесь от криков "Горько" на празднике, ведь поцелуй — это знак выражения чувств, 
          он не может быть по заказу.<br /><br />
          Просим учесть, что формат торжества предполагает присутствие только взрослых гостей
        </p>
      </section>

      {/* Подтверждение (поменял py, чтобы между ним и формой было ближе) */}
      <section className="px-8 py-8 text-center">
        <h2 className={`${yesevaOne.className} text-[23px] text-black text-center tracking-snug leading-[1.4] mb-4`}>
          ПОДТВЕРЖДЕНИЕ
        </h2>
        <p className={`${cormorantInfant.className} mt-0.5 text-[16px] font-light text-black leading-[1.5] px-[18px]`}>
          Пожалуйста, подтвердите свое присутствие до 06.06.2026
        </p>
        <div className="flex flex-col items-center">
          <p className={`${greatVibes.className} mt-3 text-[50px] text-black leading-[0.8]`}>Ждем вас на свадьбе!</p>
        </div>
      </section>

      {/* RSVP форма (сниженный pb чтобы не было лишнего отступа) */}
      <RSVPForm />

      {/* Палитра */}
      <section className="px-8 py-14 text-center bg-[#F7F7F7] rounded-3xl mx-4">
        <p className={`${cormorantInfant.className} text-[18px] font-light text-black leading-[1.6]`}>
          Будем благодарны, если при выборе нарядов
          на наше торжество вы придержитесь следующей палитры
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <div className="w-16 h-13 rounded-full bg-[#E7D8A4] shadow-sm transition hover:scale-105" />
          <div className="w-16 h-13 rounded-full bg-[#B8C6A8] shadow-sm transition hover:scale-105" />
          <div className="w-16 h-13 rounded-full bg-[#8FA79A] shadow-sm transition hover:scale-105" />
          <div className="w-16 h-13 rounded-full bg-[#AFC1D6] shadow-sm transition hover:scale-105" />
          <div className="w-16 h-13 rounded-full bg-[#C9B6C8] shadow-sm transition hover:scale-105" />
        </div>
      </section>

      {/* Свадебное расписание */}
      <section className="bg-white pt-12 pb-16 px-8">
        <h2 className={`${yesevaOne.className} text-[23px] text-black text-center leading-[1.75] mb-10`}>
          Свадебное расписание
        </h2>

        <div className="space-y-8">
          {/* 16:30 Сбор гостей */}
          <div className="flex gap-4">
            {/* Время — используем класс из вашего примера (font-sans font-semibold text-sm ...) */}
            <div className={`shrink-0 w-14 ${"font-sans font-semibold text-xl tracking-wide text-black"}`}>
              16:30
            </div>

            <div className="min-w-0">
              <div className={`${cormorant.className} text-[16px] font-medium text-black`}>
                Сбор гостей
              </div>
              <div className={`${cormorantInfant.className} text-[14px] font-light text-neutral-500 leading-tight mt-0.5`}>
                улица Проточная, 6
              </div>
              <div className={`${comfortaa.className} text-[12px] text-[#594e42] leading-tight mt-2`}>
                Приглашаем вас разделить вместе с нами радость создания новой семьи.
              </div>
            </div>
          </div>

          {/* 17:00 Банкет */}
          <div className="flex gap-4">
            <div className={`shrink-0 w-14 ${"font-sans font-semibold text-xl tracking-wide text-black"}`}>
              17:00<br />
              {/* <span className="text-[11px]">14.08.2026</span> */}
            </div>

            <div className="min-w-0">
              <div className={`${cormorant.className} text-[16px] font-medium text-black`}>
                Банкет
              </div>
              <div className={`${cormorantInfant.className} text-[14px] font-light text-neutral-500 leading-tight mt-0.5`}>
                улица Проточная, 6
              </div>
              <div className={`${comfortaa.className} text-[12px] text-[#594e42] leading-tight mt-2`}>
                От души посмеёмся, повеселимся и сделаем этот вечер незабываемым
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Яндекс-карта */}
      <section className="px-8 py-10">
      <h3 className={`${yesevaOne.className} text-[20px] text-black text-center mb-6`}>
        Где будет банкет
      </h3>

      <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-100">
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=49.085043%2C55.813602&z=16&pt=49.085043,55.813602,pm2grm"
          width="100%"
          height="320"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      <p className={`${cormorantInfant.className} text-xs text-gray-500 mt-3 text-center`}>
        Миллэт, Проточная улица, 6
      </p>
    </section>


      <Footer />
    </main>
  );
}
