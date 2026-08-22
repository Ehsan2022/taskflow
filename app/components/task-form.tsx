// app/components/task-form.tsx
"use client";

import { useActionState } from "react";
import { createTask, type FormState } from "@/app/actions/task-actions";
import { SubmitButton } from "./submit-button";

export function TaskForm() {
  const initialState: FormState = {
    success: true,
    errors: {},
  };
  const [state, formAction] = useActionState(createTask, initialState);

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <h2 className="text-lg font-semibold">Add New Task</h2>
      </div>

      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Enter task title..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950/50 dark:text-white"
        />
        {state.errors.title && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div className="mt-5">
        <SubmitButton label="Add Task" />
      </div>
    </form>
  );
}