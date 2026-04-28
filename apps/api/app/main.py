import logging
import time
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
from pythonjsonlogger import jsonlogger

# Logger setup
logger = logging.getLogger("classification-api")
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

app = FastAPI(title="Data Classification Engine API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Path: {request.url.path} Duration: {duration:.4f}s Status: {response.status_code}")
    return response

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/classifications/summary")
def get_classification_summary():
    return [
        {"type": "PII", "matches": 1420, "risk_level": "Critical"},
        {"type": "PHI", "matches": 320, "risk_level": "High"},
        {"type": "PCI", "matches": 85, "risk_level": "Critical"},
        {"type": "Confidential", "matches": 12400, "risk_level": "Medium"}
    ]

@app.get("/assets/discovered")
def get_discovered_assets():
    return {
        "total_assets": 45000,
        "scanned_assets": 42000,
        "sensitive_assets": 3200,
        "unlabeled_assets": 450
    }

@app.get("/dashboard/summary")
def get_dashboard_summary():
    return {
        "global_risk_score": 74.5,
        "active_scans": 3,
        "total_findings": 14225,
        "remediation_progress": "62%"
    }
