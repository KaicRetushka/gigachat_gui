GigaChat GUI - Графический интерфейс для GigaChat
GigaChat GUI - это удобный графический интерфейс для взаимодействия с нейросетью GigaChat от SberAI.

Технологии
Frontend: TailwindCSS
Backed: FastAPI, jinja2, sqlalchemy, authx
Database: SQLite

Установка и запуск 
1. Клонируйте репозиторий
```git clone https://github.com/KaicRetushka/gigachat_gui.git```
2. Установите зависимоси
```cd gigachat_gui```
Для Linux
``` 
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
Для Windows
```
python -m venv .venv
source .venv\Scripts\activate
```

Получение API ключа для GigaChat
Перейдите по: 

Изменение файлов
В файл backend/ai_router.py вместо <YOUR_API_KEY> вставьте ваш API ключ от GigaChat
Если вы хотите запустить сайт на вашем сервере в файл main.pi поменяйте host="localhost" на host="0.0.0.0"

Запуск
Для Linux
```python3 main.py ```
Для Windows
```python main.py```
