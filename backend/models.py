from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1)


class SemanticQueryRequest(BaseModel):
    metric: str
    dimensions: Optional[List[str]] = None
    filters: Optional[dict] = None


class ChatResponse(BaseModel):
    answer: str
    chart_type: Optional[str] = None
    chart_data: Optional[dict] = None
    insights: List[str] = []
    reasoning: List[str] = []
    semantic_payload: Optional[dict] = None
