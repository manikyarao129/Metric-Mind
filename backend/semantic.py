import httpx
from typing import Any, Dict, List, Optional
from config import CUBE_API_URL, CUBE_API_TOKEN


DEFAULT_METRICS = [
    {"name": "Revenue", "description": "Revenue by region and quarter"},
    {"name": "Margin", "description": "Gross margin percentage"},
    {"name": "Profit", "description": "Net profit"},
    {"name": "Cost", "description": "Operational cost"},
    {"name": "Sales", "description": "Total sales volume"},
]

DEFAULT_DIMENSIONS = [
    {"name": "Region", "description": "Sales region"},
    {"name": "Quarter", "description": "Reporting quarter"},
    {"name": "Country", "description": "Country"},
]


async def get_metrics() -> List[Dict[str, Any]]:
    return DEFAULT_METRICS


async def get_dimensions() -> List[Dict[str, Any]]:
    return DEFAULT_DIMENSIONS


async def build_cube_payload(metric: str, dimensions: Optional[List[str]] = None, filters: Optional[dict] = None) -> Dict[str, Any]:
    payload = {
        "query": {
            "measures": [metric.lower()],
            "dimensions": dimensions or ["Region"],
            "filters": filters or {},
        }
    }
    return payload


async def run_query(metric: str, dimensions: Optional[List[str]] = None, filters: Optional[dict] = None) -> Dict[str, Any]:
    payload = await build_cube_payload(metric, dimensions, filters)
    try:
        headers = {"Authorization": f"Bearer {CUBE_API_TOKEN}"} if CUBE_API_TOKEN else {}
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(f"{CUBE_API_URL}/api/v1/load", json=payload, headers=headers)
            response.raise_for_status()
            return {"status": "ok", "payload": payload, "data": response.json()}
    except Exception:
        return {
            "status": "mocked",
            "payload": payload,
            "data": {
                "resultSet": [
                    {"Region": "Europe", "Margin": 88.0},
                    {"Region": "North America", "Margin": 92.0},
                ]
            },
        }
