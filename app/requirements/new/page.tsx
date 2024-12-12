"use client";

import { AuthCheck } from '@/components/auth/auth-check';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { requirementSchema } from '@/lib/validations/requirement';
import { createRequirement } from '@/lib/actions/requirements';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories } from '@/constants/categories';
import { Tag, TagInput } from 'emblor';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

type FormData = z.infer<typeof requirementSchema>;

export default function NewRequirementPage() {
  const [tags, setTags] = useState<Tag[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(requirementSchema),
  });

  const { register, handleSubmit, control, formState: { errors }, setValue } = form;

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
      <Form {...form}>
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
                {...register("ideal_price")}
                placeholder="Ideal Price"
                type="number"
                className="w-full"
              />
              {errors.ideal_price && (
                <p className="text-sm text-red-500 mt-1">{errors.ideal_price.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (<SelectItem key={category.value} value={category.value}>{category.name}</SelectItem>))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
              )}
            </div>

            <FormField
              control={control}
              name="tags"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormControl>
                    {/** @ts-ignore */}
                    <TagInput
                      {...field}
                      placeholder="Enter some tags"
                      tags={tags}
                      setActiveTagIndex={() => {}}
                      setTags={(newTags) => {
                        setTags(newTags);
                        setValue('tags', newTags as any);
                      }}
                      styleClasses={{
                        inlineTagsContainer:  "w-full min-h-[50px] p-2"
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Posting..." : "Post Requirement"}
            </Button>
          </form>
        </div>
      </Form>
    </AuthCheck>
  );
}