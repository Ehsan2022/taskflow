"use client";

import { useState } from "react";
import { deleteTask, toggleTask } from "@/app/actions/task-actions";
import { EditTaskForm } from "./edit-task-form";
import { DeleteConfirmation } from "./delete-confirmation";
import Link from "next/link";

type Task = {
  id: number;
  title: string;
  priority: string;
  completed: boolean;
};

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

export function TaskItem({
  task,
}: {
  task: Task;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isEditing) {
    return (
      <div className="card-hover rounded-2xl border border-indigo-200/80 bg-indigo-50/40 p-5 backdrop-blur dark:border-indigo-800/60 dark:bg-indigo-950/20">
        <EditTaskForm
          taskId={task.id}
          title={task.title}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />
      </div>
    );
  }

  const priorityStyles = getPriorityStyles(task.priority);

  return (
    <>
      <div
        className={`card-hover rounded-2xl border p-5 shadow-sm backdrop-blur ${task.completed
          ? "border-emerald-200/80 bg-emerald-50/40 dark:border-emerald-800/60 dark:bg-emerald-950/20"
          : "border-slate-200/80 bg-white/80 dark:border-slate-800 dark:bg-slate-900/60"
          }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <h3
                className={`truncate text-base font-semibold ${task.completed
                  ? "text-slate-400 line-through dark:text-slate-500"
                  : "text-slate-900 dark:text-white"
                  }`}
              >
                <Link href={`/tasks/${task.id}`}>
                  {task.title}
                </Link>
              </h3>
            </div>

            <div className="mt-2 flex items-center gap-2">
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
                <span
                  className={`h-1.5 w-1.5 rounded-full ${task.completed ? "bg-emerald-500" : "bg-slate-400"
                    }`}
                />
                {task.completed ? "Completed" : "In Progress"}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <form action={toggleTask}>
              <input type="hidden" name="id" value={task.id} />
              <input
                type="hidden"
                name="completed"
                value={String(task.completed)}
              />
              <button
                type="submit"
                title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition ${task.completed
                  ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-400 dark:hover:bg-emerald-900"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                  }`}
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {task.completed ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
              </button>
            </form>

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              title="Edit task"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-400 dark:hover:bg-indigo-900/60"
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a1.875 1.875 0 112.651 2.651L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setIsDeleteOpen(true)}
              title="Delete task"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/60"
            >
              <svg
                className="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>

        </div>

      </div>
      {isDeleteOpen && (
        <DeleteConfirmation
          taskId={task.id}
          taskTitle={task.title}
          onCancel={() => setIsDeleteOpen(false)}
        />
      )}
    </>
  );
}