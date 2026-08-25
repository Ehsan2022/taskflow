"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  registerUser,
  type RegisterState,
} from "@/app/actions/auth-actions";

const initialState: RegisterState = {
  success: false,
  errors: {},
};

export default function RegisterPage() {
  const [state, formAction] = useActionState(
    registerUser,
    initialState
  );

  return (
    <main className="mx-auto max-w-md p-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Create your TaskFlow account.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              className="w-full rounded-lg border px-3 py-2"
            />

            {state.errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border px-3 py-2"
            />

            {state.errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="w-full rounded-lg border px-3 py-2"
            />

            {state.errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {state.errors.password[0]}
              </p>
            )}
          </div>

          {/* General error */}
          {state.errors.form && (
            <p className="text-sm text-red-600">
              {state.errors.form[0]}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}