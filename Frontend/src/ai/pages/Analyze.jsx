import React from 'react'
import { useState } from 'react';
import useAi from '../hooks/useAi'
import { useNavigate } from 'react-router';

function Analyze() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("technical");
  const {loading, setLoading, report, setReport, allReports, setAllreports, handleGenerateReport, handleGetReportById, handleGetAllReportsOfAUser, handleDownload} = useAi(); 
  
const handleDownloadPdf = async () => {
    try {
        setLoading(true);
        await handleDownload(report._id);
    } catch (error) {
        console.error("Download failed:", error);
        alert("Failed to download PDF. Check the console and server logs.");
    } finally {
        setLoading(false);
    }
};


  if(loading) {
    return(
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400 text-xl">
        Generating....
        </div>
    )
  }
  const data = report;
    if(!report) {
      return (
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400 text-xl">
      Loading interview report...
      </div>
    )
        }

  const sevColor = (s) => {
    return s === "high"
      ? "bg-red-500/15 text-red-300 border-red-500/40"
      : s === "medium"
      ? "bg-yellow-400/15 text-yellow-200 border-yellow-400/40"
      : "bg-emerald-500/15 text-emerald-300 border-emerald-500/40";
  }

  const card = "rounded-2xl border-2 border-yellow-400/30 bg-zinc-950 p-6 shadow-2xl shadow-yellow-400/5";
  const tabBtn = (active) => {
    return `rounded-lg px-4 py-2 text-sm font-semibold transition cursor-pointer ${
      active ? "bg-yellow-400 text-black" : "border border-yellow-400/30 text-yellow-100 hover:bg-yellow-400/10"
    }`;
    }

  const questions = tab === "technical" ? data.technicalQuestions : data.behaviouralQuestions;

  return (
    <div className="min-h-screen bg-black text-yellow-50 font-sans">
      <main className="mx-auto max-w-6xl space-y-8 px-6 py-12">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-yellow-200">
              ✦ Interview Report
            </span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Your interview analysis</h1>
            <p className="mt-1 text-yellow-100/60">
              Personalized questions, skill-gap insights, and a 5-day prep plan.
            </p>
          </div>
          <div className="btn flex gap-5">
            <button className="cursor-pointer rounded-lg border border-yellow-400/30 px-4 py-2 text-sm font-medium hover:bg-yellow-400/10"
                    onClick={() => navigate('/')}
            >
              ← New Analysis
            </button>
            <button className='cursor-pointer bg-yellow-400 text-black rounded-lg px-9 py-2 text-sm font-semibold transition'
            onClick={() => navigate('/history')}
            >
              Back
            </button>
          </div>
        </header>

        <section className={card}>
          <div className="flex flex-wrap items-center gap-8">
            <div className="relative h-32 w-32 shrink-0">
              <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(250,204,21,0.15)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="3"
                  strokeDasharray={`${data.matchScore}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-yellow-300">{data.matchScore}</span>
                <span className="text-xs text-yellow-100/60">/ 100</span>
              </div>
            </div>
            <div className="min-w-50 flex-1">
              <h2 className="text-xl font-semibold">Match score</h2>
              <p className="mt-1 text-sm text-yellow-100/70">
                Your profile is a strong fit for this role. Close the highlighted skill gaps to push above 90.
              </p>
            </div>
          </div>
        </section>

        <section className={card}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Interview questions</h2>
            <div className="flex gap-2">
              <button onClick={() => setTab("technical")} className={tabBtn(tab === "technical")}>
                <i class="fa-solid fa-laptop-code"></i> Technical ({data.technicalQuestions.length})
              </button>
              <button onClick={() => setTab("behavioural")} className={tabBtn(tab === "behavioural")}>
                <i class="fa-solid fa-brain"></i> Behavioural ({data.behaviouralQuestions.length})
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="rounded-xl border border-yellow-400/20 bg-zinc-900/60 p-5">
                <p className="font-semibold text-yellow-100">
                  Q{i + 1}.{q.question}
                </p>
                <p className="mt-3 text-xs uppercase tracking-wider text-yellow-300/80">Intention</p>
                <p className="text-sm text-yellow-100/70">{q.intention}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-yellow-300/80">Suggested answer</p>
                <p className="text-sm text-yellow-50/90">{q.answer}</p>
              </div>
            ))}
          </div>
        </section>
        <section className={card}>
          <h2 className="flex items-center gap-2 text-xl font-semibold"><i class="fa-solid fa-triangle-exclamation"></i> Skill gap</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.skillGap.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-yellow-400/20 bg-zinc-900/60 p-4"
              >
                <span className="font-medium">{s.skill}</span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase ${sevColor(s.severity)}`}
                >
                  {s.severity}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className={card}>
          <h2 className="flex items-center gap-2 text-xl font-semibold"><i class="fa-regular fa-calendar-days"></i> Preparation plan</h2>
          <div className="mt-4 space-y-4">
            {data.preparationPlan.map((p) => (
              <div key={p.day} className="flex gap-4 rounded-xl border border-yellow-400/20 bg-zinc-900/60 p-5">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-yellow-400 text-black">
                  <span className="text-[10px] font-semibold uppercase">Day</span>
                  <span className="text-xl font-bold leading-none">{p.day}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-yellow-100">{p.focus}</p>
                  <ul className="mt-2 space-y-1">
                    {p.tasks.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-yellow-100/80">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="div flex justify-center">
          <button 
          className='cursor-pointer bg-yellow-400 text-black rounded-lg px-4 py-2 text-sm font-semibold transition'
          onClick={handleDownloadPdf}
          >Download AI Generate Resume</button>
        </div>
      </main>
    </div>
  );
}



export default Analyze;
