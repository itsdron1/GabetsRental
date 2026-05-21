# G-BIKE Rental Bali — восстановление сайта

## Что в архиве

Исходный код Next.js: компоненты, стили, данные, конфигурация.  
**Не включено:** `node_modules`, `.next` (собираются заново).

## Восстановление

1. Распакуйте архив в папку, например `moto-rental`.
2. В терминале:

```bash
cd moto-rental
npm install
npm run dev
```

3. Откройте http://localhost:3000

## Продакшен-сборка

```bash
npm run build
npm start
```

## WhatsApp

Номер задаётся в `lib/constants.ts` → `WHATSAPP_NUMBER`.

## Дата бэкапа

2026-05-19
