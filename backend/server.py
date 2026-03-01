"""
Minimal FastAPI server - not used by IslandFruitGuide
The frontend is a standalone Vite + React app using Supabase as backend
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "IslandFruitGuide uses Supabase backend - this server is not used"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
