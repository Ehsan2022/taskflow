import "./globals.css";
import Link from "next/link";
import { Geist } from "next/font/google";
import { LogoutButton } from "./components/logout-button";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "TaskFlow — Smart Task Management",
  description:
    "A modern, lightweight task management application to organize and track your work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.variable}>
        <header className="glass sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/80">
          <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <Link
              href="/"
              className="group flex items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 font-bold text-white shadow-lg shadow-indigo-500/25 transition group-hover:shadow-indigo-500/40">
                T
              </span>
              <span className="text-lg font-bold tracking-tight">
                TaskFlow
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/tasks"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Tasks
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                href="/tasks"
                className="ml-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-600/30"
              >
                Get Started
              </Link>
              <LogoutButton/>
            </div>
          </nav>
        </header>

        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>

        <footer className="border-t border-slate-200/60 bg-white/60 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/60">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row dark:text-slate-400">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                TaskFlow
              </span>
              . All rights reserved.
            </p>
            <p className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Crafted with care for productivity
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}