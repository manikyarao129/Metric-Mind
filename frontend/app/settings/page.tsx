export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-2 text-sm text-slate-400">Configure semantic-layer endpoints, model access, and deployment preferences.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-lg font-medium">Environment configuration</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          <li>• OpenAI-compatible LLM endpoint</li>
          <li>• Cube semantic API URL and token</li>
          <li>• Snowflake warehouse credentials</li>
          <li>• Chroma vector database path</li>
        </ul>
      </div>
    </div>
  );
}
