import { supabase } from '@/utils/supabase/client';

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