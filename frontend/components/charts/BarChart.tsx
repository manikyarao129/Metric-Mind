'use client';

import dynamic from 'next/dynamic';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

interface BarChartProps {
  title: string;
  categories: string[];
  data: number[];
  color?: string;
}

export default function BarChart({ title, categories, data, color = '#3b82f6' }: BarChartProps) {
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
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: '#475569' } },
      axisLabel: { color: '#94a3b8' },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#475569' } },
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    series: [
      {
        data,
        type: 'bar',
        itemStyle: { color },
        borderRadius: [8, 8, 0, 0],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}

// Bar chart visualization
