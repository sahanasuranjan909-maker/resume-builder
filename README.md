# ResumeForge

An ATS-friendly resume builder made with Django, JavaScript, and CSS.

## Run locally

```powershell
python manage.py migrate
python manage.py runserver
```

Open `http://127.0.0.1:8000/`. Use **Print / Save PDF** to create a PDF from the clean, single-column resume preview.

## Production note

Set `DEBUG=False`, replace `SECRET_KEY`, configure `ALLOWED_HOSTS`, and use a production WSGI/ASGI server before deploying.
