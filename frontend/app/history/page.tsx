export default function HistoryPage() {
  const history = [
    { question: 'Why did our European margins drop last quarter?', answer: 'Margin decreased by 12% due to logistics cost and currency pressure.' },
    { question: 'What drove profit in North America?', answer: 'Pricing stability and lower service cost improved profit.' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h1 className="text-2xl font-semibold">Chat History</h1>
        <p className="mt-2 text-sm text-slate-400">Review semantic BI conversations and the outcomes the agent produced.</p>
      </div>

      <div className="space-y-3">
        {history.map((item, index) => (
          <div key={`${item.question}-${index}`} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <p className="font-medium text-slate-100">{item.question}</p>
            <p className="mt-2 text-sm text-slate-400">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
