"use server"
import { supabase } from '@/utils/supabase/client';
import { createCheckout, APPLICATION_FEE_VARIANT_ID } from '@/lib/lemonsqueezy';
import type { z } from 'zod';
import type { applicationSchema } from '@/lib/validations/application';

type ApplicationInput = z.infer<typeof applicationSchema> & {
  requirementId: string;
  email: string;
};

export async function createApplication(data: ApplicationInput) {
  // Create checkout session
  return createCheckout(APPLICATION_FEE_VARIANT_ID, data.email);
}

export async function getApplications(requirementId: string) {
  const { data: applications, error } = await supabase
    .from('applications')
    .select('*')
    .eq('requirementId', requirementId)
    .eq('status', 'pending')
    .order('createdAt', { ascending: false });

  if (error) throw error;
  return applications;
}
