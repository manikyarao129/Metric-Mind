'use client';

import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';
import AreaChart from '@/components/charts/AreaChart';

export default function MetricsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h1 className="text-2xl font-semibold">Metrics Explorer</h1>
        <p className="mt-2 text-sm text-slate-400">Browse semantic metrics and their business definitions.</p>
      </div>

      {/* Revenue Metrics */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="mb-6 text-xl font-semibold">Revenue Analytics</h2>
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
              title="Revenue Trend (YTD)"
              xAxisData={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
              series={[
                {
                  name: 'Total Revenue',
                  data: [120000, 132000, 145000, 138000, 150000, 175000],
                  color: '#3b82f6',
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Margin Metrics */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="mb-6 text-xl font-semibold">Margin Analysis</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
            <AreaChart
              title="Margin Trend"
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
          <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
            <PieChart
              title="Margin Breakdown"
              data={[
                { name: 'Gross Margin', value: 75 },
                { name: 'Operating Expenses', value: 15 },
                { name: 'Other Costs', value: 10 },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Profit Metrics */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="mb-6 text-xl font-semibold">Profitability Insights</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
            <BarChart
              title="Profit by Product Line"
              categories={['Product A', 'Product B', 'Product C', 'Product D']}
              data={[85000, 72000, 64000, 51000]}
              color="#10b981"
            />
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
            <LineChart
              title="Year-over-Year Profit Growth"
              xAxisData={['2022', '2023', '2024', '2025E']}
              series={[
                {
                  name: '2024',
                  data: [145000, 156000, 168000, 175000],
                  color: '#8b5cf6',
                },
                {
                  name: '2023',
                  data: [120000, 128000, 135000, 142000],
                  color: '#94a3b8',
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Cost Metrics */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="mb-6 text-xl font-semibold">Cost Analysis</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
            <PieChart
              title="Cost Distribution"
              data={[
                { name: 'COGS', value: 45 },
                { name: 'R&D', value: 20 },
                { name: 'Sales & Marketing', value: 18 },
                { name: 'G&A', value: 12 },
                { name: 'Other', value: 5 },
              ]}
            />
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
            <AreaChart
              title="Cost Trends"
              xAxisData={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
              series={[
                {
                  name: 'Variable Costs',
                  data: [45000, 48000, 50000, 52000, 51000, 53000],
                  color: '#ef4444',
                },
                {
                  name: 'Fixed Costs',
                  data: [25000, 25000, 25000, 25000, 25000, 25000],
                  color: '#f97316',
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Sales Metrics */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="mb-6 text-xl font-semibold">Sales Performance</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
            <BarChart
              title="Sales by Team"
              categories={['Sales 1', 'Sales 2', 'Sales 3', 'Sales 4', 'Sales 5']}
              data={[89000, 76000, 82000, 71000, 85000]}
              color="#ec4899"
            />
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
            <LineChart
              title="Sales Pipeline (MTD)"
              xAxisData={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
              series={[
                {
                  name: 'New Leads',
                  data: [120, 156, 142, 175],
                  color: '#3b82f6',
                },
                {
                  name: 'Closed Deals',
                  data: [45, 52, 58, 68],
                  color: '#10b981',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
