import { supabase } from '@/lib/supabase';

export async function deleteRequirement(id: string) {
  const { data: requirement, error } = await supabase
    .from('requirements')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return requirement;
}

export async function getRequirement(id: string): Promise<any> {

  const { data: requirements, error: requirementsError } = await supabase
    .from('requirements')
    .select(`
      *,
      applications (*),
      winners(*)
    `)
    .eq('id', id)
    .single();

  if (requirementsError) throw requirementsError;

  return requirements;
}
