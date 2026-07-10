const stats = [
  { label: 'Projects analyzed', value: '24', accent: 'text-cyan-300' },
  { label: 'Critical risks', value: '3', accent: 'text-rose-300' },
  { label: 'Upload queue', value: '1', accent: 'text-emerald-300' },
];

const findings = [
  { title: 'Outdated crypto lib', severity: 'High', detail: '2 packages still on vulnerable minors.' },
  { title: 'Unscanned entrypoint', severity: 'Medium', detail: 'One build manifest is waiting for review.' },
  { title: 'Suspicious transitive link', severity: 'Low', detail: 'Extra dependency chain detected in runtime bundle.' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(6,78,59,0.35),rgba(15,23,42,0.9))] p-8 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Threat posture
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Dependency health is stable, but three exposures need attention.
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Use DependLens to monitor application supply chains, prioritize risk,
              and keep every release aligned with secure engineering practices.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
            <p className="font-semibold">Last scan</p>
            <p className="mt-1 text-2xl font-semibold text-white">04:12 UTC</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className={`mt-3 text-3xl font-semibold ${item.accent}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Latest findings</h3>
            <span className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-rose-300">
              Priority
            </span>
          </div>
          <div className="space-y-3">
            {findings.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{item.title}</p>
                  <span className="text-xs uppercase tracking-[0.2em] text-cyan-300">{item.severity}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <h3 className="text-lg font-semibold text-white">Recommended next steps</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">Patch vulnerable dependencies before the next release window.</li>
            <li className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">Review the unscanned manifest to close coverage gaps.</li>
            <li className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">Inspect the transitive chain for unnecessary exposure.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
