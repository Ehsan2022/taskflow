export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export const tasks: Task[] = [
  {
    id: 1,
    title: "Learn React",
    description: "Understand components, props and state.",
    completed: true,
  },
  {
    id: 2,
    title: "Learn Next.js",
    description: "Study App Router and Server Components.",
    completed: false,
  },
  {
    id: 3,
    title: "Build TaskFlow",
    description: "Create the first version of TaskFlow.",
    completed: false,
  },
];