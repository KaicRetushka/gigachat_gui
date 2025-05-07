# 🚀 GigaChat GUI - Графический интерфейс для GigaChat

<div align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-blue?logo=python" alt="Python Version">
  <img src="https://img.shields.io/badge/FastAPI-0.95+-green?logo=fastapi" alt="FastAPI Version">
</div>

**GigaChat GUI** - это современный и удобный графический интерфейс для взаимодействия с нейросетью GigaChat от SberAI. Проект предоставляет простой способ интеграции с API GigaChat через интуитивно понятный веб-интерфейс.

## 🛠 Технологии

### Frontend
- **TailwindCSS** - утилитарный CSS-фреймворк для создания адаптивного дизайна

### Backend
- **FastAPI** - современный, быстрый веб-фреймворк для построения API
- **Jinja2** - мощный шаблонизатор для Python
- **SQLAlchemy** - ORM для работы с базами данных
- **AuthX** - система аутентификации и авторизации

### База данных
- **SQLite** - легковесная файловая СУБД

## ⚙️ Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone https://github.com/KaicRetushka/gigachat_gui.git
```

2. Перейдите в директорию проекта:
```bash
cd gigachat_gui
```

3. Установите зависимости:

**Для Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

**Для Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

## 🔑 Получение API ключа для GigaChat

Для работы с API GigaChat необходимо получить ключ:
1. Перейдите по [ссылке](https://developers.sber.ru/studio/workspaces/50d6ffd9-e7f2-42e9-9f3a-3414cd5f47a1/gigachat-api/projects/88258f40-3d2f-4cf6-9176-f723a80256aa/settings)
2. Зарегистрируйтесь и создайте новый проект
3. Скопируйте ваш API ключ

## ⚠️ Настройка перед запуском

1. В файле `backend/ai_router.py` замените `<YOUR_API_KEY>` на ваш API ключ от GigaChat
2. (Опционально) Для запуска на сервере в файле `main.py` измените `host="localhost"` на `host="0.0.0.0"`

## 🚀 Запуск приложения

**Для Linux:**
```bash
python3 main.py
```

**Для Windows:**
```bash
python main.py
```

После успешного запуска откройте в браузере:
```
http://localhost:8000
```
Если вы изменили на 0.0.0.0
```
http://<your_host>:8000
```
