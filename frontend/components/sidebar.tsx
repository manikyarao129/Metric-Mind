"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Dashboard', icon: '◉' },
  { href: '/chat', label: 'Chat', icon: '✦' },
  { href: '/metrics', label: 'Metrics', icon: '▣' },
  { href: '/history', label: 'History', icon: '◌' },
  { href: '/settings', label: 'Settings', icon: '⚙' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 shrink-0 border-r border-slate-800 bg-slate-950/70 p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">MetricMind</h2>
        <p className="mt-1 text-sm text-slate-400">Agentic Semantic BI</p>
      </div>
      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${active ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Semantic layer</h3>
        <p className="mt-2 text-sm text-slate-300">Cube REST API • No direct SQL execution</p>
      </div>
    </aside>
  );
}
