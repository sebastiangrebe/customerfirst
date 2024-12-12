import { supabase } from '@/lib/supabase';
import type { Winner } from '@/types';

interface CreateWinnerInput {
  requirementId: string;
  applicationId: string;
  websiteUrl: string;
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
    .eq('id', data.requirementId);

  return winner;
}

export async function getWinners() {
  const { data: winners, error } = await supabase
    .from('winners')
    .select('*')
    .order('selected_at', { ascending: false })
    .limit(12);

  if (error) throw error;
  return winners as Winner[];
}