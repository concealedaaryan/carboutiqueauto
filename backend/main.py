from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Crest Automotive Care API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4321", "http://127.0.0.1:4321"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "crest-automotive-care-api"}


@app.get("/api/config")
def config() -> dict[str, str]:
    return {
        "brand": "Crest Automotive Care",
        "frontend": "http://localhost:4321",
        "booking": "/estimate",
    }
