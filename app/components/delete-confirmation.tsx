"use client";

import { deleteTask, type DeleteState } from "@/app/actions/task-actions";
import { useActionState, useEffect } from "react";

type DeleteConfirmationProps = {
    taskId: number;
    taskTitle: string;
    onCancel: () => void;
};

export function DeleteConfirmation({
    taskId,
    taskTitle,
    onCancel,
}: DeleteConfirmationProps) {
    const initialState: DeleteState = {
        success: false,
    };

    const [state, formAction, isPending] =
        useActionState(
            deleteTask,
            initialState
        );

    useEffect(() => {
        if (state.success) {
            onCancel();
        }
    }, [state.success, onCancel]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">

                <div className="mb-5">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376L10.697 4.5a1.5 1.5 0 012.606 0l8 11.626A1.5 1.5 0 0120 18.5H4a1.5 1.5 0 01-1.303-2.374z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5h.008v.008H12V16.5z"
                            />
                        </svg>
                    </div>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Do you want to delete{" "}
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                            ( {taskTitle} )
                        </span>
                        ? This action cannot be undone.
                    </p>
                </div>

                {state.error && (
                    <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
                        {state.error}
                    </p>
                )}

                <form action={formAction}>
                    <input
                        type="hidden"
                        name="id"
                        value={taskId}
                    />

                    <div className="flex justify-end gap-2">

                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isPending}
                            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending
                                ? "Deleting..."
                                : "Delete"}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}