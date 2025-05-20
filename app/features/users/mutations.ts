import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/supa-client';
import pkg from '@supabase/supabase-js';

export const updateUser = async (
  client: pkg.SupabaseClient<Database>,
  {
    id,
    name,
    role,
    headline,
    bio,
  }: {
    id: string;
    name: string;
    role: 'developer' | 'designer' | 'marketer' | 'founder' | 'product-manager';
    headline: string;
    bio: string;
  },
) => {
  const { data, error } = await client
    .from('profiles')
    .update({ name, role, headline, bio })
    .eq('profile_id', id);
  if (error) {
    throw error;
  }
};
