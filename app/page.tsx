"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, BookOpen, GraduationCap, ArrowRight, 
  AlertTriangle, X, Loader2, MapPin 
} from "lucide-react";

// --- КОМПОНЕНТЫ UI ---

// Анимированная секция
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Полный курс CSCA");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [formData, setFormData] = useState({
    name: "",
    phone: "+7",
    telegram: "",
  });

  const pricingRef = useRef<HTMLDivElement | null>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenModal = (courseName: string) => {
    setSelectedCourse(courseName);
    setIsModalOpen(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Разрешаем только цифры и плюс
    if (/^[\d+]*$/.test(val)) {
        setFormData({ ...formData, phone: val });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    // Простая проверка на Казахстанский номер (+77... или 87...)
    const isKazakh = /^(\+77|87)\d{9}$/.test(formData.phone.replace(/\s/g, ''));
    
    if (!isKazakh) {
      alert("Пожалуйста, введите корректный мобильный номер Казахстана (+77... или 87...)");
      setFormStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, course: selectedCourse }),
      });

      if (res.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-red-100">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-stone-100 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-red-700 flex items-center gap-2 tracking-tighter">
            <GraduationCap className="w-8 h-8" /> CSCA<span className="text-stone-800">Prep</span>
          </div>
          <button 
            onClick={scrollToPricing}
            className="hidden md:block bg-red-700 text-white px-6 py-2.5 rounded-full font-medium hover:bg-red-800 transition shadow-red-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Купить курс
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        {/* Декоративный фон */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-50 z-0"></div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-700 text-sm font-semibold mb-8">
              <MapPin size={16} /> Доступно только для граждан Казахстана 🇰🇿
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight text-stone-900">
            Сдай CSCA <br/> и поступи в китайский университет <span className="text-red-700 inline-block decoration-4 underline decoration-red-200 underline-offset-4">с первого раза</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-stone-500 mb-10 max-w-3xl mx-auto leading-relaxed">
              Единственная платформа подготовки, адаптированная под менталитет и образование СНГ. 
              <span className="hidden md:inline"> Забудь про скучные учебники.</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button 
                onClick={scrollToPricing}
                className="group flex items-center justify-center gap-3 bg-red-700 text-white text-lg px-10 py-5 rounded-2xl font-bold hover:bg-red-800 transition shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto"
              >
                Начать обучение <ArrowRight className="group-hover:translate-x-1 transition" />
              </button>
              <div className="text-stone-400 text-sm font-medium">
                Для оплаты из других стран<br />
                свяжитесь с нами в Telegram: <a href="https://t.me/slav728" target="_blank" rel="noopener noreferrer" className="font-semibold text-red-700">@slav728</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ALERT BANNER */}
      <section className="bg-amber-50 border-y border-amber-100 py-4">
        <div className="container mx-auto px-6 flex justify-center items-center gap-3 text-amber-800 font-medium text-center">
          <AlertTriangle size={20} />
          <span>Важно: Для оплаты требуется номер телефона оператора Казахстана (+7...).</span>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn>
            <h2 className="text-4xl font-bold text-center mb-16 text-stone-900">Всё для высокого балла</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: BookOpen, 
                title: "Без воды", 
                desc: "Подготовка строго по структуре экзамена: математика, физика и химия." 
              },
              { 
                icon: CheckCircle, 
                title: "Разбор ошибок", 
                desc: "Разбираем типичные ошибки абитуриентов и учим, как набирать максимум баллов даже в сложных заданиях." 
              },
              { 
                icon: GraduationCap, 
                title: "Поступление", 
                desc: "Бонус-модуль: как использовать результат CSCA для подачи документов в китайские университеты и на стипендии." 
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={0.2 + (i * 0.1)}>
                <div className="p-8 bg-stone-50 rounded-3xl border border-stone-100 hover:border-red-200 hover:bg-red-50/30 transition duration-300 h-full">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-red-700">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-stone-900">{item.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CARD */}
      <section ref={pricingRef} className="py-24 px-6 bg-stone-50">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden grid md:grid-cols-2">
            
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <div className="uppercase tracking-widest text-red-600 font-bold text-sm mb-4">Тариф "Поступление"</div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6">Полная <br/> подготовка</h3>
              <p className="text-stone-500 mb-8 text-lg">Доступ ко всем материалам навсегда. Идеально для старта.</p>
              
              <ul className="space-y-4 mb-10">
                {["25 видеоуроков по всем разделам CSCA", "Экзаменационные задания нового образца", "PDF-материалы, формулы и стратегии решения", "Личный куратор и ответы на вопросы", "Проверка и оценка ответов по критериям CSCA"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-stone-700">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={14} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleOpenModal("Тариф Максимальный")}
                className="w-full bg-stone-900 text-white py-5 rounded-xl font-bold text-lg hover:bg-stone-800 transition flex justify-center items-center gap-2"
              >
                Купить за 11 990 ₸
              </button>
              <p className="mt-4 text-center text-sm text-stone-400">Счет придет на Kaspi</p>
            </div>

            <div className="bg-red-700 p-12 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-4 opacity-90">Важная информация по оплате:</h4>
                <p className="opacity-80 mb-8 leading-relaxed">
                  Оплата через сайт доступна для карт Казахстана. Если вы находитесь в другой стране,
                  мы поможем подобрать удобный способ оплаты индивидуально.
                </p>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                  <div className="font-bold mb-2 flex items-center gap-2">💬 Оплата из других стран</div>
                  <p className="text-sm opacity-80">
                    Напишите нам в Telegram: <a href="https://t.me/slav728" target="_blank" rel="noopener noreferrer" className="underline font-semibold">@slav728</a>,
                    мы подскажем доступные варианты оплаты.
                  </p>
                </div>
              </div>
              
              {/* Декор */}
              <GraduationCap className="absolute -bottom-10 -right-10 w-64 h-64 text-red-800 opacity-50 rotate-12" />
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-12 text-center">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2 text-xl font-bold text-white mb-6">
             CSCA Prep
          </div>
          <p className="text-xs opacity-50">© 2026 Все права защищены. ИП (Алексей)</p>
          <div className="mt-4 text-sm">
            <span className="opacity-70">Контакты для связи:</span>{" "}
            <a
              href="https://t.me/slav728"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:underline"
            >
              @slav728
            </a>
          </div>
        </div>
      </footer>

      {/* --- PAYMENT MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 transition"
              >
                <X size={24} />
              </button>

              {formStatus === "success" ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">Заявка принята!</h3>
                  <p className="text-stone-600 mb-6">
                    В течение часа на номер <span className="font-bold text-stone-900">{formData.phone}</span> придет счет на оплату (Kaspi/Банковская карта).
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="bg-stone-900 text-white px-8 py-3 rounded-xl font-bold"
                  >
                    Понятно
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">Оформление курса</h3>
                  <p className="text-stone-500 mb-6 text-sm">
                    Вы выбрали: <span className="text-red-700 font-semibold">{selectedCourse}</span>
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Ваше имя</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Иван Иванов"
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Телефон (Казахстан 🇰🇿)</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+7 777 123 45 67"
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                      />
                      <p className="text-xs text-stone-400 mt-1">Только номера, начинающиеся на +77 или 87</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Telegram (для связи)</label>
                      <input 
                        required
                        type="text" 
                        placeholder="@username"
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition"
                        value={formData.telegram}
                        onChange={(e) => setFormData({...formData, telegram: e.target.value})}
                      />
                    </div>

                    <div className="pt-2">
                      <button 
                        disabled={formStatus === "loading"}
                        type="submit"
                        className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition flex justify-center items-center gap-2 disabled:opacity-70"
                      >
                        {formStatus === "loading" ? <Loader2 className="animate-spin" /> : "Получить счет на оплату"}
                      </button>
                      <p className="text-xs text-center text-stone-400 mt-3">
                      </p>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}








        
      </AnimatePresence>

    </div>
  );
}