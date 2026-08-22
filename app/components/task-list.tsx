import { prisma } from "@/lib/prisma";
import { TaskItem } from "./task-item";

type TaskListProps = {
  search: string;
  page: number;
};

const PAGE_SIZE = 5;

export async function TaskList({
  search,
  page,
}: TaskListProps) {
  const where = search
    ? {
        title: {
          contains: search,
          mode: "insensitive" as const,
        },
      }
    : undefined;

  const tasks = await prisma.task.findMany({
    where,

    skip: (page - 1) * PAGE_SIZE,

    take: PAGE_SIZE,

    orderBy: {
      createdAt: "desc",
    },
  });

  const totalTasks = await prisma.task.count({
    where,
  });

  const totalPages = Math.ceil(
    totalTasks / PAGE_SIZE
  );

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900/30">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
          <svg
            className="h-8 w-8 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">
          {search ? "No results found" : "No tasks yet"}
        </h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          {search
            ? `No tasks found for "${search}". Try a different search term.`
            : "Create your first task to get started with TaskFlow."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200/80 bg-white/60 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/40">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Page <span className="font-semibold text-slate-700 dark:text-slate-300">{page}</span> of{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-300">{totalPages}</span>
        </p>

        <div className="flex gap-2">
          {page > 1 && (
            <a
              href={`/tasks?search=${encodeURIComponent(
                search
              )}&page=${page - 1}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </a>
          )}

          {page < totalPages && (
            <a
              href={`/tasks?search=${encodeURIComponent(
                search
              )}&page=${page + 1}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Next
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </>
  );
}