import Link from "next/link";
import { CheckCircle, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

export default function Home() {
  // ВСТАВЬ СЮДА ССЫЛКУ ИЗ ШАГА 1
  const STRIPE_LINK = "https://buy.stripe.com/твоя_ссылка_здесь"; 

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-red-600 flex items-center gap-2">
            <GraduationCap /> CSCA Prep
          </div>
          <Link 
            href={STRIPE_LINK}
            className="bg-red-600 text-white px-5 py-2 rounded-full font-medium hover:bg-red-700 transition"
          >
            Купить курс
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Сдай китайский экзамен <span className="text-red-600">CSCA</span> с первой попытки
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Полный курс подготовки для студентов из СНГ. Грамматика, лексика и разбор реальных заданий. Доступ навсегда.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={STRIPE_LINK}
              className="flex items-center justify-center gap-2 bg-red-600 text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Начать обучение <ArrowRight size={20} />
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">Безопасная оплата через Stripe (Visa/MC)</p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Что внутри курса?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <BookOpen className="text-red-600 mb-4 h-8 w-8" />
              <h3 className="text-xl font-bold mb-2">Полная теория</h3>
              <p className="text-slate-600">Все необходимые иероглифы и грамматические конструкции, структурированные по уровням.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <CheckCircle className="text-red-600 mb-4 h-8 w-8" />
              <h3 className="text-xl font-bold mb-2">Тестовые задания</h3>
              <p className="text-slate-600">Реальные примеры экзаменационных билетов прошлых лет с разбором ошибок.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <GraduationCap className="text-red-600 mb-4 h-8 w-8" />
              <h3 className="text-xl font-bold mb-2">Сертификат</h3>
              <p className="text-slate-600">Пошаговый план, как зарегистрироваться на экзамен и получить сертификат.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-lg bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Полный доступ</h3>
          <div className="text-5xl font-extrabold text-red-600 my-6">$50</div>
          <ul className="text-left space-y-3 mb-8 text-slate-600">
            <li className="flex gap-2"><CheckCircle className="text-green-500 w-5 h-5"/> Доступ к 20+ видеоурокам</li>
            <li className="flex gap-2"><CheckCircle className="text-green-500 w-5 h-5"/> PDF методички и словари</li>
            <li className="flex gap-2"><CheckCircle className="text-green-500 w-5 h-5"/> Чат поддержки</li>
          </ul>
          <Link 
            href={STRIPE_LINK}
            className="block w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition"
          >
            Купить сейчас
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        © 2024 CSCA Prep. Все права защищены. <br/>
        ИП Бражке (или твое юр. лицо)
      </footer>
    </div>
  );
}