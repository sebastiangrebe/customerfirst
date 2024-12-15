import { supabase } from '@/utils/supabase/client';
import type { Winner } from '@/types';

interface CreateWinnerInput {
  requirement_id: string;
  application_id: string;
  website_url: string;
}

export async function createWinner(data: CreateWinnerInput) {
  const { data: winner, error } = await supabase
    .from('winners')
    .insert([{
      ...data,
      selected_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) throw error;

  // Update requirement status to closed
  await supabase
    .from('requirements')
    .update({ status: 'closed' })
    .eq('id', data.requirement_id);

  return winner;
}

export async function getWinners() {
  const { data: winners, error } = await supabase
    .from('winners')
    .select(`
      *,
      applications(*)
    `)
    .order('selected_at', { ascending: false })
    .limit(12);

  if (error) throw error;
  return winners as Winner[];
}