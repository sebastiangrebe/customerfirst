import { supabase } from '@/lib/supabase';
import { requirementSchema } from '@/lib/validations/requirement';
import type { z } from 'zod';
import type { RequirementWithApplications } from '@/types';
import { getSession } from 'next-auth/react';

type RequirementInput = z.infer<typeof requirementSchema>;

export async function createRequirement(data: RequirementInput) {
  const session = await getSession() as any;

  if (!session) throw new Error('Unauthorized');
  supabase.auth.setSession({ access_token: session.accessToken, refresh_token: session.refreshToken });
  const { data: requirement, error } = await supabase
    .from('requirements')
    .insert([{
      ...data,
      status: 'open',
    }])
    .select()
    .single();

  if (error) throw error;

  return requirement;
}

export async function getUserRequirements(): Promise<RequirementWithApplications[]> {
  const session = await getSession() as any;

  if (!session) throw new Error('Unauthorized');
  supabase.auth.setSession({ access_token: session.accessToken, refresh_token: session.refreshToken });
  const { data: requirements, error: requirementsError } = await supabase
    .from('requirements')
    .select(`
      *,
      applications (*)
    `)
    .order('created_at', { ascending: false });

  if (requirementsError) throw requirementsError;

  return requirements as RequirementWithApplications[];
}

export async function getRequirement(id: string) {
  const session = await getSession() as any;

  if (!session) throw new Error('Unauthorized');
  supabase.auth.setSession({ access_token: session.accessToken, refresh_token: session.refreshToken });
  const { data: requirement, error } = await supabase
    .from('requirements')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return requirement;
}