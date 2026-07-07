import React, { useContext, useState, useRef } from 'react'
import useAuth from '../../auth/hooks/useAuth'
import Analyze from './Analyze';
import useAi from '../hooks/useAi'
import { useNavigate } from 'react-router';

function Home() {
  const {loading, setLoading, report, setReport, allReports, setAllreports, handleGenerateReport, handleGetReportById, handleGetAllReportsOfAUser} = useAi(); 
  const {user, handleLogout} = useAuth();
  const[resume, setResume] = useState(null);
  const[jobDescription, setJobDescription] = useState("");
  const[selfDescription, setSelfDescription] = useState("");
  const[menuOpen, setMenuOpen] = useState("");
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response  = await handleGenerateReport({resume, jobDescription, selfDescription});
      console.log("Generated Response:", response);
      console.log("Report ID:", response._id);
      await handleGetReportById(response._id);
      console.log(report);
      alert('Report Generated Successfully')
      navigate('/analyze');
    } catch (error) {
      console.error(error);
      alert("Failed to generate report");
    }
    finally {
      setLoading(false);
    }
  }

  if(loading) {
    return(
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400 text-xl">
        Analyzing....
        </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-black text-yellow-50 font-sans">
     <header className="sticky top-0 z-40 border-b border-yellow-400/20 bg-black/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <button className="flex items-center gap-2 font-bold text-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400 text-black">
              ✦
            </span>
            <span>AI Interview Helper</span>
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {user ? (
              <>
                <p>Hi, {user.username}</p>

                <button
                  className="cursor-pointer rounded-lg border border-yellow-400/30 px-4 py-2 text-sm hover:bg-yellow-400/10"
                  onClick={() => navigate("/history")}
                >
                  History
                </button>

                <button
                  onClick={handleLogout}
                  className="cursor-pointer rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="rounded-lg border border-yellow-400/30 px-4 py-2 text-sm">
                  Login
                </button>

                <button className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black">
                  Sign Up
                </button>
              </>
            )}
          </nav>
          <button
            className="md:hidden text-2xl text-yellow-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-yellow-400/20 bg-zinc-950">
            {user ? (
              <div className="flex flex-col p-4 gap-3">

                <p className="text-yellow-100">
                  Hi, {user.username}
                </p>

                <button
                  onClick={() => {
                    navigate("/history");
                    setMenuOpen(false);
                  }}
                  className=" rounded-lg border border-yellow-400/30 px-4 py-3 hover:bg-yellow-400/10"
                >
                  History
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="rounded-lg bg-yellow-400 px-4 py-3 text-black font-semibold"
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex flex-col p-4 gap-3">

                <button className="rounded-lg border border-yellow-400/30 px-4 py-3">
                  Login
                </button>

                <button className="rounded-lg bg-yellow-400 px-4 py-3 text-black font-semibold">
                  Sign Up
                </button>

              </div>
            )}
          </div>
        )}
      </header>
      {(
        <main className="mx-auto max-w-5xl px-6 py-16 ">
          <section className="text-center flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-xs font-medium uppercase tracking-wider text-yellow-200">
              ✦ AI Interview Helper
            </span>
            <h1 className=" text-5xl font-bold tracking-tight md:text-6xl">
              Ace your next interview with
            </h1>
            <span className="rounded-lg bg-yellow-400 px-3 py-1 text-black font-bold">AI Interview Helper</span>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-yellow-100/70">
              Upload your resume, paste the job description, and tell us about yourself.
              We'll generate sharp, personalized interview questions and feedback.
            </p>
          </section>

          <div className="mt-12 rounded-2xl border-2 border-yellow-400/30 bg-zinc-950 p-8 shadow-2xl shadow-yellow-400/5">
            <div className="grid gap-6">
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold"><i class="fa-solid fa-file"></i> Your Resume</label>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setResume(e.target.files[0])}
                />
                {resume ? (
                  <div className="flex items-center justify-between rounded-lg border-2 border-yellow-400/40 bg-yellow-400/10 px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="text-xl"><i class="fa-solid fa-file"></i></span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{resume.name}</p>
                        <p className="text-xs text-yellow-100/60">{(resume.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setResume(null); if (fileRef.current) fileRef.current.value = ""; }}
                      className="rounded p-1 hover:bg-yellow-400/20"
                      aria-label="Remove file"
                    >✕</button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="cursor-pointer flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-yellow-400/30 bg-zinc-900/50 px-6 py-10 text-center transition-colors hover:border-yellow-400/60 hover:bg-yellow-400/5"
                  >
                    <span className="text-2xl"><span class="material-symbols-outlined">upload_file</span></span>
                    <p className="text-sm font-medium">Click to upload your resume</p>
                    <p className="text-xs text-yellow-100/50">PDF, DOC, DOCX or TXT</p>
                  </button>
                )}
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold"><i class="fa-solid fa-briefcase"></i> Job Description</label>
                <textarea
                  rows={5}
                  placeholder="Paste the job description you're targeting..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className={"w-full resize-none rounded-lg border border-yellow-400/20 bg-zinc-900 px-4 py-3 text-sm text-yellow-50 placeholder:text-yellow-100/40 focus:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"}
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold"><i class="fa-solid fa-circle-user"></i>About You</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your background, strengths, and what you're aiming for..."
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  className={"w-full resize-none rounded-lg border border-yellow-400/20 bg-zinc-900 px-4 py-3 text-sm text-yellow-50 placeholder:text-yellow-100/40 focus:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"}
                />
              </div>

              <button
                onClick={handleAnalyze}
                className="cursor-pointer mt-2 flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-base font-semibold text-black transition hover:bg-yellow-300"
              >
                {user ? "Analyze" : "Sign up to continue"} →
              </button>
              {!user && (
                <p className="text-center text-sm text-yellow-100/60">
                  You'll need an account to save your prep sessions.
                </p>
              )}
            </div>
          </div>
        </main>
      )}
      </div>
    </>
  )
}

export default Home