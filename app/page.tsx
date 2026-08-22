import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            TaskFlow
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">
          A simple, lightweight way to manage your tasks — create, search,
          and track your work in one place.
        </p>
        <Link
          href="/tasks"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition hover:bg-indigo-700"
        >
          Go to Tasks
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5-5 5M6 12h12"
            />
          </svg>
        </Link>
      </section>

      {/* Features */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <h3 className="text-sm font-semibold">Create Tasks</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Add tasks quickly and easily.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <h3 className="text-sm font-semibold">Search Instantly</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Find tasks as you type.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </span>
          <h3 className="text-sm font-semibold">Track Progress</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Mark tasks complete.
          </p>
        </div>
      </section>
    </main>
  );
}