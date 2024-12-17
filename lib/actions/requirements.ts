import { supabase } from '@/utils/supabase/client';
import { requirementSchema } from '@/lib/validations/requirement';
import type { z } from 'zod';
import type { RequirementWithApplications } from '@/types';

type RequirementInput = z.infer<typeof requirementSchema>;

export async function createRequirement(data: RequirementInput) {

  const { data: requirement, error } = await supabase
    .from('requirements')
    .insert([{
      ...data,
      tags: data.tags ? data.tags : [],
      status: 'open',
    }])
    .select()
    .single();

  if (error) throw error;

  return requirement;
}

export async function getUserRequirements(userId: number): Promise<RequirementWithApplications[]> {
  const { data: requirements, error: requirementsError } = await supabase
    .from('requirements')
    .select(`
      *,
      applications (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (requirementsError) throw requirementsError;

  return requirements as RequirementWithApplications[];
}

export async function getRequirement(id: string) {
  const { data: requirement, error } = await supabase
    .from('requirements')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return requirement;
}