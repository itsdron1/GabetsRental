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

## Контакты

- WhatsApp: `lib/whatsapp.ts` → `WHATSAPP_NUMBER` (или `NEXT_PUBLIC_WHATSAPP_NUMBER` в `.env.local`)
- Email: `lib/whatsapp.ts` → `CONTACT_EMAIL`

## Дата бэкапа

2026-06-04 — `C:\Users\MSI\Desktop\g-drive-bike-rental-bali-backup-2026-06-03.zip` (~34 MB)

Исключено из архива: `node_modules`, `.next`, `*.zip`, `tmp-tour-packages`.

Предыдущий: 2026-05-19
