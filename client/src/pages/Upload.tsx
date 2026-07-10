import FileUpload from '../components/FileUpload';

export default function Upload() {
  return (
    <div className="space-y-6 rounded-3xl border border-cyan-400/20 bg-[linear-gradient(135deg,rgba(8,47,73,0.35),rgba(15,23,42,0.95))] p-8 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
          Project upload
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Bring a project into the secure analysis pipeline.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-slate-300">
          Upload package manifest files to begin parsing dependency data and
          preparing security insights.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <FileUpload />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-lg font-semibold text-white">What happens next</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">Project metadata is captured and normalized.</li>
            <li className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">Dependency graphs are scanned for known risk patterns.</li>
            <li className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">Insights are surfaced in the dashboard for review.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
