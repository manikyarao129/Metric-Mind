'use client';

import dynamic from 'next/dynamic';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

interface PieChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
  }>;
}

export default function PieChart({ title, data }: PieChartProps) {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

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
      trigger: 'item',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: '#334155',
      textStyle: {
        color: '#e2e8f0',
      },
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      data: data.map(d => d.name),
      textStyle: { color: '#94a3b8' },
      bottom: 0,
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: '60%',
        center: ['50%', '45%'],
        data,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#1e293b',
          borderWidth: 2,
        },
        label: {
          color: '#e2e8f0',
        },
        color: colors,
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}

// Pie chart visualization
