"use client";
import { useState } from "react";
import {
  useForm as useRHF,
  type DefaultValues,
  type FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodSchema } from "zod";

interface UseFormOptions<T extends FieldValues> {
  schema: ZodSchema<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => Promise<void>;
}

export function useForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
}: UseFormOptions<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useRHF<T>({ resolver: zodResolver(schema), defaultValues });

  const submit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      setIsSuccess(true);
      reset();
    } finally {
      setIsLoading(false);
    }
  });

  return { register, handleSubmit: submit, errors, isLoading, isSuccess };
}
