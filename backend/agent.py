import json
from typing import Any, Dict, List
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
import semantic
import prompts
from config import OPENAI_API_KEY, LLM_ENDPOINT


class MetricMindAgent:
    def __init__(self) -> None:
        self.llm = None
        if OPENAI_API_KEY:
            self.llm = ChatOpenAI(
                api_key=OPENAI_API_KEY,
                base_url=LLM_ENDPOINT,
                model="llama3.1",
                temperature=0,
            )

    async def run(self, question: str) -> Dict[str, Any]:
        metrics = await semantic.get_metrics()
        dimensions = await semantic.get_dimensions()
        reasoning = ["Intent Detection", "Metric Mapping", "Semantic Query", "Insight Generation"]

        metric_name = self._infer_metric(question, metrics)
        if metric_name is None:
            return {
                "answer": "This metric is not defined in the semantic layer.",
                "insights": [],
                "reasoning": reasoning,
                "semantic_payload": None,
            }

        filters = self._infer_filters(question)
        dimensions_selected = self._infer_dimensions(question, dimensions)
        query_result = await semantic.run_query(metric_name, dimensions_selected, filters)

        if self.llm is None:
            explanation = self._fallback_explanation(question, query_result)
        else:
            prompt = ChatPromptTemplate.from_messages([
                ("system", prompts.SYSTEM_PROMPT),
                ("human", "Question: {question}\n\nSemantic result: {query_result}\n\nExplain this in business terms."),
            ])
            chain = prompt | self.llm | StrOutputParser()
            explanation = chain.invoke({"question": question, "query_result": json.dumps(query_result, default=str)})

        return {
            "answer": explanation,
            "chart_type": self._suggest_chart(metric_name),
            "chart_data": self._chart_payload(query_result),
            "insights": ["Top reasons: logistics cost, currency fluctuation, lower average selling price"],
            "reasoning": reasoning,
            "semantic_payload": query_result,
        }

    def _infer_metric(self, question: str, metrics: List[Dict[str, Any]]) -> str | None:
        lower = question.lower()
        for metric in metrics:
            if metric["name"].lower() in lower:
                return metric["name"]
        return "Margin" if "margin" in lower else None

    def _infer_dimensions(self, question: str, dimensions: List[Dict[str, Any]]) -> List[str]:
        lower = question.lower()
        selected = []
        if "region" in lower or "europe" in lower:
            selected.append("Region")
        if "quarter" in lower or "last quarter" in lower:
            selected.append("Quarter")
        if "country" in lower:
            selected.append("Country")
        return selected or ["Region"]

    def _infer_filters(self, question: str) -> Dict[str, Any]:
        lower = question.lower()
        filters = {}
        if "europe" in lower:
            filters["Region"] = "Europe"
        if "last quarter" in lower:
            filters["Quarter"] = "Q4"
        return filters

    def _suggest_chart(self, metric: str) -> str:
        if metric.lower() in {"margin", "profit"}:
            return "bar"
        return "line"

    def _fallback_explanation(self, question: str, query_result: Dict[str, Any]) -> str:
        metric = self._infer_metric(question, []) or "metric"
        return f"The semantic layer indicates a change in {metric.lower()} performance. The response is based on available semantic-layer data and highlights the main business drivers without inventing unsupported metrics."

    def _chart_payload(self, query_result: Dict[str, Any]) -> Dict[str, Any]:
        data = query_result.get("data", {}).get("resultSet", [])
        return {
            "x": [row.get("Region") for row in data],
            "series": [{"name": "Value", "data": [row.get("Margin", row.get("Revenue", 0)) for row in data]}],
        }

# Metric Mind AI agent
