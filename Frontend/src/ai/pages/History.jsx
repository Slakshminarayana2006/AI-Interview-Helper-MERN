import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAi from '../hooks/useAi';

function History() {
  const { allReports, handleGetAllReportsOfAUser, handleGetReportById } = useAi();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllReportsOfAUser();
  }, []);

  useEffect(() => {
      console.log("allReports:", allReports);
  }, [allReports]);

  const dominantSeverity = (gaps) => {
    if (gaps?.some(g => g.severity === 'high')) return 'high';
    if (gaps?.some(g => g.severity === 'medium')) return 'medium';
    return 'low';
  };

  const sevColor = (s) =>
    s === 'high'
      ? 'bg-red-500/15 text-red-300 border-red-500/40'
      : s === 'medium'
      ? 'bg-yellow-400/15 text-yellow-200 border-yellow-400/40'
      : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';

  const scoreColor = (s) =>
    s >= 80 ? '#4ade80' : s >= 60 ? '#facc15' : '#f87171';

  const timeAgo = (dateStr) => {
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  let filtered = allReports || [];

  if (sort === 'newest') filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (sort === 'oldest') filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  if (sort === 'score-high') filtered.sort((a, b) => b.matchScore - a.matchScore);
  if (sort === 'score-low') filtered.sort((a, b) => a.matchScore - b.matchScore);

  const card = 'rounded-2xl border-2 border-yellow-400/25 bg-zinc-950 p-5 cursor-pointer hover:border-yellow-400/55 hover:bg-yellow-400/[0.03] transition-all';

  return (
    <div className="min-h-screen bg-black text-yellow-50 font-sans px-6 py-12">
      <div className="mx-auto max-w-6xl space-y-8">

        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-yellow-200">
              ✦ Interview History
            </span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">Your past analyses</h1>
            <p className="mt-1 text-yellow-100/55">Review reports, revisit questions, and track your prep progress.</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer rounded-lg border border-yellow-400/30 px-4 py-2 text-sm font-medium hover:bg-yellow-400/10"
          >
            ← New analysis
          </button>
        </header>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search by role or company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-45 bg-zinc-900 border border-yellow-400/20 text-yellow-50 rounded-lg px-4 py-2 text-sm placeholder:text-yellow-100/35 focus:border-yellow-400/50 focus:outline-none"
          />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-zinc-900 border border-yellow-400/20 text-yellow-50 rounded-lg px-4 py-2 text-sm focus:outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="score-high">Highest score</option>
            <option value="score-low">Lowest score</option>
          </select>
          <span className="text-xs text-yellow-100/45 ml-auto">{filtered.length} report{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-yellow-100/35 py-16">No reports found.</p>
          )}
          {filtered.map(r => {
            const sev = dominantSeverity(r.skillGap);
            const sc = r.matchScore;
            const dash = sc;
            return (
              <div key={r._id} className={card} onClick={async () => {
                await  handleGetReportById(r._id);
                navigate(`/analyze`);
                }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-yellow-100">{r.role || 'Untitled role'}</p>
                    <p className="text-xs text-yellow-100/45 mt-0.5">{r.company || '—'}</p>
                  </div>
                  <div className="relative h-12 w-12 shrink-0">
                    <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(250,204,21,0.12)" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke={scoreColor(sc)} strokeWidth="3"
                        strokeDasharray={`${dash}, 100`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-sm font-bold text-yellow-300 leading-none">{sc}</span>
                      <span className="text-[9px] text-yellow-100/45">/100</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase ${sevColor(sev)}`}>
                    {sev === 'high' ? 'High risk' : sev === 'medium' ? 'Medium risk' : 'Low risk'}
                  </span>
                  <span className="rounded-full border border-yellow-400/20 bg-yellow-400/8 text-yellow-100/60 px-2.5 py-0.5 text-[11px] font-semibold">
                    {r.skillGap?.length || 0} gaps
                  </span>
                  <span className="ml-auto text-[11px] text-yellow-100/40">{timeAgo(r.createdAt)}</span>
                </div>

                <div className="border-t border-yellow-400/12 pt-3 flex items-center justify-between">
                  <div className="flex gap-4 text-xs text-yellow-100/55">
                    <span><span className="text-yellow-300 font-semibold">{r.technicalQuestions?.length || 0}</span> technical</span>
                    <span><span className="text-yellow-300 font-semibold">{r.behaviouralQuestions?.length || 0}</span> behavioural</span>
                  </div>
                  <span className="text-xs font-semibold text-yellow-400">View report →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default History;