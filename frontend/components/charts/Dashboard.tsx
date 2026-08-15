'use client';

import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import AreaChart from './AreaChart';

interface KPICard {
  label: string;
  value: string;
  change: string;
  color: 'emerald' | 'blue' | 'purple' | 'orange';
}

interface DashboardProps {
  kpis: KPICard[];
  charts: Array<{
    type: 'bar' | 'line' | 'pie' | 'area';
    title: string;
    categories?: string[];
    data?: number[];
    xAxisData?: string[];
    series?: any;
    color?: string;
  }>;
}

const colorMap = {
  emerald: 'text-emerald-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400',
};

const changeColorMap = {
  emerald: 'text-emerald-300',
  blue: 'text-blue-300',
  purple: 'text-purple-300',
  orange: 'text-orange-300',
};

export default function Dashboard({ kpis, charts }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
            <p className="text-sm text-slate-400">{kpi.label}</p>
            <p className={`mt-2 text-2xl font-bold ${colorMap[kpi.color]}`}>{kpi.value}</p>
            <p className={`mt-1 text-xs ${changeColorMap[kpi.color]}`}>{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className={`grid gap-6 ${charts.length <= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-2 xl:grid-cols-3'}`}>
        {charts.map((chart, idx) => (
          <div key={idx} className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
            {chart.type === 'bar' && (
              <BarChart
                title={chart.title}
                categories={chart.categories!}
                data={chart.data!}
                color={chart.color}
              />
            )}
            {chart.type === 'line' && (
              <LineChart
                title={chart.title}
                xAxisData={chart.xAxisData!}
                series={chart.series}
              />
            )}
            {chart.type === 'pie' && (
              <PieChart title={chart.title} data={chart.series} />
            )}
            {chart.type === 'area' && (
              <AreaChart
                title={chart.title}
                xAxisData={chart.xAxisData!}
                series={chart.series}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
