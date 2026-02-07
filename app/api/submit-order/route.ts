// app/api/submit-order/route.ts
import { NextResponse } from "next/server";

// --- НАСТРОЙКИ (ЗАПОЛНИ ПРЯМО ЗДЕСЬ) ---

// 1. Вставь токен, который дал BotFather (в кавычках)
const BOT_TOKEN = "8558395435:AAE0C3RepZTA52wMYeXRgmDebJoljDjfh2w"; 

// 2. Вставь ТВОЙ цифровой ID (который ты узнал у @userinfobot). 
// Это нужно, чтобы бот знал, что @wozol - это именно этот ID.
const MY_ID = "5573599832"; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, telegram, course } = body;

    // Сообщение, которое придет тебе
    const message = `
🇨🇳 НОВАЯ ЗАЯВКА НА ОПЛАТУ

👤 Имя: ${name}
📱 Телефон: ${phone}
✈️ Telegram: ${telegram}
📚 Курс: ${course}

Счет нужно выставить на этот номер.
    `;

    // Отправка запроса в Telegram
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const tgResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: MY_ID, // Отправляем именно тебе
        text: message
      }),
    });

    if (!tgResponse.ok) {
        throw new Error('Telegram API Error');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка отправки:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}