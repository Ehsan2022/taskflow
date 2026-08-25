// app/actions/task-actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title cannot exceed 100 characters."),
});

export type FormState = {
  success: boolean;
  errors: {
    title?: string[];
    form?: string[];
  };
};

export async function createTask(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();

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

  const validatedFields = taskSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

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

  revalidatePath("/tasks");

  return {
    success: true,
    errors: {},
  };
}

export type DeleteState = {
  success: boolean;
  error?: string;
};

export async function deleteTask(
  previousState: DeleteState,
  formData: FormData
): Promise<DeleteState> {
  const id = Number(formData.get("id"));

  if (Number.isNaN(id)) {
    return {
      success: false,
      error: "Invalid task ID.",
    };
  }

  if (!id) {
    return {
      success: false,
      error: "Task ID is required.",
    };
  }

  try {
    await prisma.task.delete({
      where: {
        id,
      },
    });

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

export async function toggleTask(formData: FormData) {
  const id = Number(formData.get("id"));

  const completed = formData.get("completed") === "true";

  if (Number.isNaN(id)) {
    throw new Error("Invalid task ID.");
  }

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      completed: !completed,
    },
  });

  revalidatePath("/tasks");
}

export async function updateTask(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = Number(formData.get("id"));

  const rawData = {
    title: formData.get("title"),
  };

  // Validate title
  const validatedFields = taskSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Update database
  await prisma.task.update({
    where: {
      id,
    },
    data: {
      title: validatedFields.data.title,
    },
  });

  revalidatePath("/tasks");

  return {
    success: true,
    errors: {},
  };
}