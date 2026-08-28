"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-red-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-red-400"
    >
      Logout
    </button>
  );
}