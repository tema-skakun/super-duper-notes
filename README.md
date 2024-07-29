# Приложение "Заметки"

## Описание
Приложение для управления заметками, разработанное с использованием Next.js и TypeScript. Приложение позволяет создавать, редактировать, удалять и просматривать заметки. Поддерживает фильтрацию и сортировку заметок.

## Основные функции
- **Список заметок**: отображение всех заметок с возможностью фильтрации и сортировки.
- **Просмотр заметки**: страница с детальной информацией о заметке.
- **Создание/Редактирование заметки**: страница с формой для создания новой заметки или редактирования существующей.

## Технологии
- **Next.js**: использован для серверного рендеринга (app/\[id]/page.tsx) и генерации статических страниц (app/about/page.tsx).
- **TypeScript**: язык программирования, использованный для разработки.
- **React**: функциональные компоненты и хуки.
- **CSS Modules и Bootstrap**: для стилизации компонентов и общего стиля приложения.
- **Redux ToolKit**: для управления состоянием приложения.
- **json-server**: для создания мока API.

## Установка и запуск

### Клонирование репозитория
```bash
git clone https://github.com/yourusername/notes-app.git
cd notes-app
```
### Установка зависимостей
```bash
npm install
```
### Настройка окружения
Создайте файл .env.local в корне проекта и добавьте следующую строку:
```
NEXT_PUBLIC_JSON_SERVER_PORT=5001
```
Запуск json-server
```bash
npm run server
```
Запуск приложения
```bash
npm run dev
```
Откройте http://localhost:3000 в вашем браузере для просмотра приложения.
