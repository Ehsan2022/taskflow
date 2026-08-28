// app/actions/task-actions.ts

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

// Validate task input
const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title cannot exceed 100 characters."),
});

// Shared form state for create/update actions
export type FormState = {
  success: boolean;
  errors: {
    title?: string[];
    form?: string[];
  };
};

// Create a new task for the logged-in user
export async function createTask(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();

  // Make sure the user is authenticated
  if (!session?.user?.id) {
    return {
      success: false,
      errors: {
        form: ["You must be logged in to create a task."],
      },
    };
  }

  const rawData = {
    title: formData.get("title"),
  };

  // Validate form data
  const validatedFields = taskSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Create task and connect it to the current user
  await prisma.task.create({
    data: {
      title: validatedFields.data.title,

      user: {
        connect: {
          id: Number(session.user.id),
        },
      },
    },
  });

  // Refresh the task list
  revalidatePath("/tasks");

  return {
    success: true,
    errors: {},
  };
}

// State returned by the delete action
export type DeleteState = {
  success: boolean;
  error?: string;
};

// Delete a task owned by the logged-in user
export async function deleteTask(
  previousState: DeleteState,
  formData: FormData
): Promise<DeleteState> {
  const id = Number(formData.get("id"));

  // Make sure the user is authenticated
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const userId = Number(session.user.id);

  // Validate task ID
  if (Number.isNaN(id) || !id) {
    return {
      success: false,
      error: "Invalid task ID.",
    };
  }

  try {
    // Delete only if the task belongs to the current user
    const result = await prisma.task.deleteMany({
      where: {
        id,
        userId,
      },
    });

    // No task was found for this user
    if (result.count === 0) {
      return {
        success: false,
        error: "Task not found.",
      };
    }

    revalidatePath("/tasks");

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Failed to delete the task.",
    };
  }
}

// Toggle the completion status of a user's task
export async function toggleTask(formData: FormData) {
  const id = Number(formData.get("id"));

  // Validate task ID
  if (Number.isNaN(id) || !id) {
    throw new Error("Invalid task ID.");
  }

  // Make sure the user is authenticated
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const userId = Number(session.user.id);

  // Find the task only if it belongs to the current user
  const task = await prisma.task.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!task) {
    throw new Error("Task not found.");
  }

  // Toggle the actual database value
  await prisma.task.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      completed: !task.completed,
    },
  });

  revalidatePath("/tasks");
}

// Update the title of a user's task
export async function updateTask(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = Number(formData.get("id"));

  // Validate task ID
  if (Number.isNaN(id) || !id) {
    return {
      success: false,
      errors: {
        form: ["Invalid task ID."],
      },
    };
  }

  // Make sure the user is authenticated
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const userId = Number(session.user.id);

  const rawData = {
    title: formData.get("title"),
  };

  // Validate form data
  const validatedFields = taskSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Update only if the task belongs to the current user
  const result = await prisma.task.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      title: validatedFields.data.title,
    },
  });

  // Make sure a task was actually updated
  if (result.count === 0) {
    return {
      success: false,
      errors: {
        form: ["Task not found."],
      },
    };
  }

  revalidatePath("/tasks");

  return {
    success: true,
    errors: {},
  };
}