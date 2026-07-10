import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/upload', label: 'Upload' },
];

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#060816_45%,_#0f172a_100%)] text-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
          <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_20px_80px_rgba(2,8,23,0.55)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
                DependLens
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-white">
                Secure dependency intelligence
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-emerald-300">
                Live monitoring
              </span>
              <nav className="flex gap-2 rounded-full border border-slate-800 bg-slate-950/70 p-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </header>

          <main className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-4 shadow-[0_20px_80px_rgba(2,8,23,0.45)] backdrop-blur-xl sm:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
