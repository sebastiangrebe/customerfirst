"use server"
import { supabase } from '@/lib/supabase';
import { createCheckout, APPLICATION_FEE_VARIANT_ID } from '@/lib/lemonsqueezy';
import type { z } from 'zod';
import type { applicationSchema } from '@/lib/validations/application';

type ApplicationInput = z.infer<typeof applicationSchema> & {
  requirementId: string;
  email: string;
};

export async function createApplication(data: ApplicationInput) {
  // Create checkout session
  const checkout = await createCheckout(APPLICATION_FEE_VARIANT_ID, data.email);
  return checkout;

  // Store application in database
  const { data: application, error } = await supabase
    .from('applications')
    .insert([{
      ...data,
      status: 'pending',
      checkoutId: checkout.data.id,
      createdAt: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) throw error;

  return {
    ...application,
    checkoutUrl: checkout.data.url,
  };
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

export async function updateApplicationStatus(id: string, status: 'accepted' | 'rejected') {
  const { data: application, error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return application;
}