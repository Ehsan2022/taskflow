"use client";

import {
    useActionState,
    useEffect,
    useRef,
} from "react";

import {
    updateTask,
    type FormState,
} from "@/app/actions/task-actions";
import { SubmitButton } from "./submit-button";

type EditTaskFormProps = {
    taskId: number;
    title: string;
    onCancel: () => void;
    onSuccess: () => void;
};

export function EditTaskForm({
    taskId,
    title,
    onCancel,
    onSuccess,
}: EditTaskFormProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const initialState: FormState = {
        success: false,
        errors: {},
    };

    const [state, formAction] = useActionState(
        updateTask,
        initialState
    );

    // Focus the title input when the edit form appears
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Close the form after successful update
    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state.success, onSuccess]);

    return (
        <form
            action={formAction}
            className="space-y-3"
        >
            <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a1.875 1.875 0 112.651 2.651L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                    </svg>
                </span>
                <h3 className="text-sm font-semibold">
                    Edit Task
                </h3>
            </div>

            <input
                type="hidden"
                name="id"
                value={taskId}
            />

            <input
                ref={inputRef}
                name="title"
                defaultValue={title}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950/50 dark:text-white"
            />

            {state.errors.title && (
                <p className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    {state.errors.title[0]}
                </p>
            )}

            <div className="flex gap-2">
                <SubmitButton label="Save Changes" />
                <button
                    type="button"
                    onClick={onCancel}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}