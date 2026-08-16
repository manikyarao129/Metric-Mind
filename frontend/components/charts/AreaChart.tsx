'use client';

import dynamic from 'next/dynamic';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

interface AreaChartProps {
  title: string;
  xAxisData: string[];
  series: Array<{
    name: string;
    data: number[];
    color?: string;
  }>;
}

export default function AreaChart({ title, xAxisData, series }: AreaChartProps) {
  const option = {
    title: {
      text: title,
      textStyle: {
        color: '#e2e8f0',
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: '#334155',
      textStyle: {
        color: '#e2e8f0',
      },
    },
    legend: {
      data: series.map(s => s.name),
      textStyle: { color: '#94a3b8' },
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '10%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: { lineStyle: { color: '#475569' } },
      axisLabel: { color: '#94a3b8' },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#475569' } },
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series: series.map((s, idx) => ({
      name: s.name,
      data: s.data,
      type: 'line',
      smooth: true,
      areaStyle: {
        color: s.color || ['#3b82f6', '#10b981', '#f59e0b'][idx],
        opacity: 0.3,
      },
      itemStyle: {
        color: s.color || ['#3b82f6', '#10b981', '#f59e0b'][idx],
      },
      lineStyle: {
        color: s.color || ['#3b82f6', '#10b981', '#f59e0b'][idx],
        width: 2,
      },
    })),
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}

// Area chart visualization
