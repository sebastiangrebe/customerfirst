import { supabase } from '@/lib/supabase';

export async function deleteRequirement(id: string) {
    const { data: requirement, error } = await supabase
      .from('requirements')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return requirement;
  }