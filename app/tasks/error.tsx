"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: ErrorProps) {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          We could not load your tasks.
        </p>

        <button
          onClick={() => reset()}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    </main>
  );
}