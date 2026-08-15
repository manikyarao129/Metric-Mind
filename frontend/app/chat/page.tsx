"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

export default function ChatPage() {
  const [question, setQuestion] = useState('Why did our European margins drop last quarter?');
  const [answer, setAnswer] = useState('Ask a business question to begin.');
  const [insights, setInsights] = useState<string[]>([]);
  const [chartData, setChartData] = useState({ x: ['Europe'], series: [{ name: 'Margin', data: [88] }] });
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await response.json();
    setAnswer(data.answer || 'No answer');
    setInsights(data.insights || []);
    if (data.chart_data) {
      setChartData(data.chart_data);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h1 className="text-2xl font-semibold">Executive Chat</h1>
        <p className="mt-2 text-sm text-slate-400">Ask questions in natural language and let the semantic layer guide the response.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <textarea
            className="min-h-32 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Analyzing…' : 'Ask MetricMind'}
          </button>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">Answer</h2>
            <p className="text-sm leading-7 text-slate-300">{answer}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="mb-4 text-xl font-medium">Resulting visualization</h2>
          <ReactECharts
            option={{
              tooltip: { trigger: 'axis' },
              xAxis: { type: 'category', data: chartData.x },
              yAxis: { type: 'value' },
              series: chartData.series,
            }}
            style={{ height: 260 }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="mb-4 text-xl font-medium">Insights</h2>
        <ul className="space-y-2 text-sm text-slate-300">
          {insights.length > 0 ? insights.map((item) => <li key={item} className="rounded-lg bg-slate-950/70 p-3">{item}</li>) : <li className="rounded-lg bg-slate-950/70 p-3">The explanation and recommendations will appear here.</li>}
        </ul>
      </div>
    </div>
  );
}
