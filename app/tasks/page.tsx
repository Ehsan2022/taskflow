// app/tasks/page.tsx
import { TaskForm } from "@/app/components/task-form";
import { TaskList } from "@/app/components/task-list";
import { TaskSearch } from "@/app/components/task-search";

type TasksPageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

export default async function TasksPage({
  searchParams,
}: TasksPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";

  const page = Math.max(
    1,
    Number(params.page) || 1
  );

  return (
    <div className="relative mx-auto max-w-3xl px-6 py-12">
      {/* Page header */}
      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-300">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500" />
          Task Management
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Your Tasks
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Create, search, and manage your tasks all in one place.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <TaskSearch />
      </div>

      {/* Create task form */}
      <div className="mb-8">
        <TaskForm />
      </div>

      {/* Task list */}
      <TaskList search={search} page={page} />
    </div>
  );
}