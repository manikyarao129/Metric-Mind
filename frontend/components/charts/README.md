# Data Visualization Components

This directory contains reusable chart components for the MetricMind frontend using ECharts and echarts-for-react.

## Available Components

### 1. **BarChart**
Displays categorical data as vertical bars.

```tsx
import BarChart from '@/components/charts/BarChart';

<BarChart
  title="Revenue by Region"
  categories={['North America', 'Europe', 'APAC', 'LATAM']}
  data={[245000, 189000, 156000, 98000]}
  color="#3b82f6"
/>
```

**Props:**
- `title` (string): Chart title
- `categories` (string[]): X-axis labels
- `data` (number[]): Data values
- `color` (string, optional): Bar color (default: #3b82f6)

---

### 2. **LineChart**
Displays trends and comparisons over time.

```tsx
import LineChart from '@/components/charts/LineChart';

<LineChart
  title="Revenue Trend"
  xAxisData={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
  series={[
    {
      name: 'Revenue',
      data: [120000, 132000, 145000, 138000, 150000, 175000],
      color: '#10b981',
    },
    {
      name: 'Target',
      data: [150000, 150000, 150000, 150000, 150000, 150000],
      color: '#ef4444',
    },
  ]}
/>
```

**Props:**
- `title` (string): Chart title
- `xAxisData` (string[]): X-axis labels
- `series` (object[]): Array of data series with name, data, and optional color

---

### 3. **PieChart**
Shows composition and proportions.

```tsx
import PieChart from '@/components/charts/PieChart';

<PieChart
  title="Market Share by Product"
  data={[
    { name: 'Product A', value: 35 },
    { name: 'Product B', value: 28 },
    { name: 'Product C', value: 22 },
    { name: 'Product D', value: 15 },
  ]}
/>
```

**Props:**
- `title` (string): Chart title
- `data` (object[]): Array with name and value properties

---

### 4. **AreaChart**
Displays stacked area data for cumulative trends.

```tsx
import AreaChart from '@/components/charts/AreaChart';

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
```

**Props:**
- `title` (string): Chart title
- `xAxisData` (string[]): X-axis labels
- `series` (object[]): Array of data series with name, data, and optional color

---

### 5. **Dashboard**
Comprehensive layout combining KPI cards and multiple charts.

```tsx
import Dashboard from '@/components/charts/Dashboard';

<Dashboard
  kpis={[
    { label: 'Total Revenue', value: '$688K', change: '↑ 12.5% vs last month', color: 'emerald' },
    { label: 'Gross Margin', value: '72%', change: '↑ 2.3% vs last quarter', color: 'blue' },
  ]}
  charts={[
    {
      type: 'bar',
      title: 'Revenue by Region',
      categories: ['North America', 'Europe', 'APAC', 'LATAM'],
      data: [245000, 189000, 156000, 98000],
      color: '#3b82f6',
    },
    {
      type: 'line',
      title: 'Revenue Trend',
      xAxisData: ['Jan', 'Feb', 'Mar'],
      series: [{ name: 'Revenue', data: [120000, 132000, 145000], color: '#10b981' }],
    },
  ]}
/>
```

---

## Styling

All components use:
- **Dark theme** (slate-950, slate-900, slate-800) for professional appearance
- **Tailwind CSS** for consistent styling
- **ECharts** for interactive, responsive visualizations
- **Color palette**: Blue, Green, Amber, Red, Purple, Pink (brand-aligned)

## Features

✅ Fully responsive design  
✅ Dark mode by default  
✅ Tooltip hover information  
✅ Legend support for multi-series charts  
✅ Dynamic color customization  
✅ Interactive drill-down ready  

## Installation

Components require:
- `echarts` (^6.1.0)
- `echarts-for-react` (^3.0.0)
- `next` (^16.3.0)
- `react` (^18.3.0)

These are already configured in `package.json`.

## Dashboard Charts
Charts provide visual summaries of Metric Mind analytics.
