import './globals.css';
import type { Metadata } from 'next';
import Sidebar from '../components/sidebar';

export const metadata: Metadata = {
  title: 'MetricMind AI',
  description: 'Agentic semantic BI platform with AI reasoning and future-ready analytics',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-slate-950 text-slate-100">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
