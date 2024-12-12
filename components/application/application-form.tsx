"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { applicationSchema } from '@/lib/validations/application';
import { createCheckout } from '@/lib/lemonsqueezy/checkout';
import type { z } from 'zod';

type FormData = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  requirementId: string;
}

export function ApplicationForm({ requirementId }: ApplicationFormProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (!session?.user?.email) {
      toast({
        title: "Error",
        description: "Please sign in to apply",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Create checkout with application data
      const checkout = await createCheckout({
        email: session.user.email,
        checkoutData: {
          requirementId,
          ...data,
        },
      });

      if (checkout && checkout.data) {
        // Initialize embedded checkout
        (window as any).LemonSqueezy.Url.Open(checkout.data.data.attributes.url);
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to create checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          {...register("websiteUrl")}
          placeholder="Your Website URL"
          className="w-full"
        />
        {errors.websiteUrl && (
          <p className="text-sm text-red-500 mt-1">{errors.websiteUrl.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register("pricing")}
          type="number"
          placeholder="Your Price Estimate ($)"
          className="w-full"
        />
        {errors.pricing && (
          <p className="text-sm text-red-500 mt-1">{errors.pricing.message}</p>
        )}
      </div>

      <div>
        <Textarea
          {...register("contactDetails")}
          placeholder="Your Contact Details"
          className="w-full"
        />
        {errors.contactDetails && (
          <p className="text-sm text-red-500 mt-1">{errors.contactDetails.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Processing..." : "Apply ($10 fee)"}
      </Button>
    </form>
  );
}