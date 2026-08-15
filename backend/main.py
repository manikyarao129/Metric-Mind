from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ChatRequest, SemanticQueryRequest, ChatResponse
from agent import MetricMindAgent
import semantic

app = FastAPI(title="MetricMind", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = MetricMindAgent()
chat_history: list[dict] = []


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question is required")

    result = await agent.run(request.question)
    chat_history.append({"question": request.question, "answer": result.get("answer", "")})
    return ChatResponse(**result)


@app.post("/semantic/query")
async def semantic_query(request: SemanticQueryRequest) -> dict:
    if not request.metric:
        raise HTTPException(status_code=400, detail="Metric is required")
    return await semantic.run_query(request.metric, request.dimensions, request.filters)


@app.get("/metrics")
async def get_metrics() -> list:
    return await semantic.get_metrics()


@app.get("/dimensions")
async def get_dimensions() -> list:
    return await semantic.get_dimensions()


@app.get("/history")
async def history() -> list:
    return chat_history
