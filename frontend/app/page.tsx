"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';
import AreaChart from '@/components/charts/AreaChart';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

const initialQuestion = 'Why did our European margins drop last quarter?';

export default function HomePage() {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState('Ask a business question to start.');
  const [chartData, setChartData] = useState({ x: ['Europe'], series: [{ name: 'Margin', data: [88] }] });
  const [insights, setInsights] = useState<string[]>([]);
  const [history, setHistory] = useState<Array<{ question: string; answer: string }>>([]);
  const [metrics, setMetrics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMeta() {
      const [metricsRes, historyRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/metrics`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/history`),
      ]);
      const metricsData = await metricsRes.json();
      const historyData = await historyRes.json();
      setMetrics(metricsData.map((m: any) => m.name));
      setHistory(historyData);
    }
    loadMeta();
  }, []);

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
    const historyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/history`);
    const historyData = await historyResponse.json();
    setHistory(historyData);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold">MetricMind AI</h1>
            <p className="mt-2 text-sm text-slate-400">Agentic semantic BI for executives, combining AI reasoning, semantic-layer orchestration, and future-ready decision support.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">Semantic-layer-first</div>
            <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">AI reasoning</div>
            <div className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-400">Forecasting-ready</div>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-medium">AI capabilities and future roadmap</h2>
              <p className="mt-1 text-sm text-slate-400">Built for natural-language BI, insight generation, and next-wave autonomous analysis.</p>
            </div>
            <div className="text-sm text-slate-400">Executive decisions • Semantic trust • AI growth</div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <h3 className="font-medium text-slate-100">Current AI features</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li>• Natural-language intent detection</li>
                <li>• Semantic-layer query orchestration</li>
                <li>• Explanation and recommendation generation</li>
                <li>• Executive-ready visual insight delivery</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <h3 className="font-medium text-slate-100">Future AI features</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li>• Forecasting and anomaly detection</li>
                <li>• Root-cause analysis agents</li>
                <li>• Multi-agent collaboration workflows</li>
                <li>• Voice queries and role-based access</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="mb-6 text-xl font-medium">Executive Dashboard</h2>
          
          {/* KPI Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Total Revenue</p>
              <p className="mt-2 text-2xl font-bold text-emerald-400">$688K</p>
              <p className="mt-1 text-xs text-emerald-300">↑ 12.5% vs last month</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Gross Margin</p>
              <p className="mt-2 text-2xl font-bold text-blue-400">72%</p>
              <p className="mt-1 text-xs text-blue-300">↑ 2.3% vs last quarter</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Operating Profit</p>
              <p className="mt-2 text-2xl font-bold text-purple-400">$156K</p>
              <p className="mt-1 text-xs text-purple-300">↑ 8.7% vs last month</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Cost per Unit</p>
              <p className="mt-2 text-2xl font-bold text-orange-400">$24.50</p>
              <p className="mt-1 text-xs text-orange-300">↓ 3.2% vs last quarter</p>
            </div>
          </div>

          {/* Dashboard Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
              <BarChart
                title="Revenue by Region"
                categories={['North America', 'Europe', 'APAC', 'LATAM']}
                data={[245000, 189000, 156000, 98000]}
                color="#3b82f6"
              />
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
              <LineChart
                title="Revenue Trend (6M)"
                xAxisData={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
                series={[
                  {
                    name: 'Revenue',
                    data: [120000, 132000, 145000, 138000, 150000, 175000],
                    color: '#10b981',
                  },
                ]}
              />
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
              <PieChart
                title="Market Share by Product"
                data={[
                  { name: 'Product A', value: 35 },
                  { name: 'Product B', value: 28 },
                  { name: 'Product C', value: 22 },
                  { name: 'Product D', value: 15 },
                ]}
              />
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
              <AreaChart
                title="Margin Trend (YTD)"
                xAxisData={['Q1', 'Q2', 'Q3', 'Q4']}
                series={[
                  {
                    name: 'Gross Margin',
                    data: [68, 72, 70, 75],
                    color: '#10b981',
                  },
                  {
                    name: 'Operating Margin',
                    data: [42, 45, 43, 48],
                    color: '#f59e0b',
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-medium">Executive Chat</h2>
              <span className="text-sm text-slate-400">Ask in plain English</span>
            </div>
            <textarea
              className="min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500"
              disabled={loading}
            >
              {loading ? 'Analyzing…' : 'Ask MetricMind'}
            </button>
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">Answer</h3>
              <p className="text-sm leading-7 text-slate-300">{answer}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="mb-4 text-xl font-medium">Semantic metrics</h2>
              <div className="flex flex-wrap gap-2">
                {metrics.length > 0 ? metrics.map((metric) => (
                  <span key={metric} className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-sm text-slate-300">{metric}</span>
                )) : <span className="text-sm text-slate-400">No metrics loaded yet</span>}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="mb-4 text-xl font-medium">Visualization</h2>
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
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="mb-4 text-xl font-medium">Insights</h2>
            <ul className="space-y-2 text-sm text-slate-300">
              {insights.length > 0 ? insights.map((item) => <li key={item} className="rounded-lg bg-slate-950/70 p-3">{item}</li>) : <li className="rounded-lg bg-slate-950/70 p-3">Insights will appear here after a query.</li>}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="mb-4 text-xl font-medium">Chat history</h2>
            <div className="space-y-2 text-sm text-slate-300">
              {history.length > 0 ? history.slice(-4).reverse().map((item, index) => (
                <div key={`${item.question}-${index}`} className="rounded-lg bg-slate-950/70 p-3">
                  <p className="font-medium text-slate-100">{item.question}</p>
                  <p className="mt-1 text-slate-400">{item.answer}</p>
                </div>
              )) : <div className="rounded-lg bg-slate-950/70 p-3">No history yet.</div>}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
