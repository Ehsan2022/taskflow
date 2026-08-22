import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type TaskPageProps = {
  params: Promise<{
    id: string;
  }>;
};
async function getTask(id: number) {
  return prisma.task.findUnique({
    where: {
      id,
    },
  });
}
export async function generateMetadata({
  params,
}: TaskPageProps): Promise<Metadata> {
  const { id } = await params;

  const taskId = Number(id);

  if (Number.isNaN(taskId)) {
    return {
      title: "Task Not Found",
    };
  }

  const task = await getTask(taskId);

  return {
    title: task
      ? `${task.title} | TaskFlow`
      : "Task Not Found | TaskFlow",
  };
}
function getPriorityStyles(priority: string) {
  switch (priority) {
    case "HIGH":
      return {
        badge: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800",
        dot: "bg-red-500",
      };
    case "LOW":
      return {
        badge: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800",
        dot: "bg-emerald-500",
      };
    default:
      return {
        badge: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
        dot: "bg-amber-500",
      };
  }
}

export default async function TaskPage({
  params,
}: TaskPageProps) {
  const { id } = await params;

  const taskId = Number(id);

  if (Number.isNaN(taskId)) {
    notFound();
  }

  const task = await getTask(taskId);

  if (!task) {
    notFound();
  }

  const priorityStyles = getPriorityStyles(task.priority);

  return (
    <main className="relative mx-auto max-w-3xl px-6 py-12">
      {/* Back link */}
      <Link
        href="/tasks"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Tasks
      </Link>

      {/* Page header */}
      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-300">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500" />
          Task Details
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {task.title}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          View the details of this task.
        </p>
      </div>

      {/* Task details card */}
      <div
        className={`rounded-2xl border p-6 shadow-sm backdrop-blur ${task.completed
          ? "border-emerald-200/80 bg-emerald-50/40 dark:border-emerald-800/60 dark:bg-emerald-950/20"
          : "border-slate-200/80 bg-white/80 dark:border-slate-800 dark:bg-slate-900/60"
          }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${priorityStyles.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${priorityStyles.dot}`} />
            {task.priority} Priority
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${task.completed
              ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
              : "border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
              }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${task.completed ? "bg-emerald-500" : "bg-slate-400 dark:bg-slate-500"}`} />
            {task.completed ? "Completed" : "In Progress"}
          </span>
        </div>

        <p className={`mt-4 ${task.completed ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"}`}>
          {task.completed
            ? "This task has been completed."
            : "This task is still in progress."}
        </p>
      </div>
    </main>
  );
}