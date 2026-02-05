import Link from "next/link";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 text-center">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Оплата прошла успешно! 🎉</h1>
      <p className="text-xl text-slate-700 mb-8">Спасибо за покупку. Доступ к курсу отправлен на вашу почту.</p>
      <Link href="/" className="text-green-700 underline">Вернуться на главную</Link>
    </div>
  );
}