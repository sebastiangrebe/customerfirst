"use client";

import { AuthCheck } from '@/components/auth/auth-check';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { requirementSchema } from '@/lib/validations/requirement';
import { createRequirement } from '@/lib/actions/requirements';

type FormData = z.infer<typeof requirementSchema>;

export default function NewRequirementPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(requirementSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await createRequirement(data);
      toast({
        title: "Success",
        description: "Your requirement has been posted.",
      });
      setTimeout(function() {
        window.location.href = '/dashboard';
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post requirement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCheck>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Post a New Requirement</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              {...register("title")}
              placeholder="Title"
              className="w-full"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Textarea
              {...register("description")}
              placeholder="Detailed description"
              className="w-full min-h-[200px]"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register("category")}
              placeholder="Category"
              className="w-full"
            />
            {errors.category && (
              <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register("tags")}
              placeholder="Tags (comma separated)"
              className="w-full"
            />
            {errors.tags && (
              <p className="text-sm text-red-500 mt-1">{errors.tags.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Posting..." : "Post Requirement"}
          </Button>
        </form>
      </div>
    </AuthCheck>
  );
}