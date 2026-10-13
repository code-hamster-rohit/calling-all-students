from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(
    title="Inter Dept Sports Meet 2026",
    description="Inter Dept Sports Meet 2026",
    version="1.0.0"
)

# Mount the static directory for assets
app.mount("/assests", StaticFiles(directory=BASE_DIR / "assests"), name="assests")

@app.get("/")
async def get_index():
    return FileResponse(BASE_DIR / "index.html")

@app.get("/style.css")
async def get_css():
    return FileResponse(BASE_DIR / "style.css", media_type="text/css")

@app.get("/script.js")
async def get_js():
    return FileResponse(BASE_DIR / "script.js", media_type="application/javascript")
