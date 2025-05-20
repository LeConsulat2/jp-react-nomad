import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/supa-client';
import pkg from '@supabase/supabase-js';

export const createProductReview = async (
  client: pkg.SupabaseClient<Database>,
  {
    userId,
    productId,
    review,
    rating,
  }: { userId: string; productId: number; review: string; rating: number },
) => {
  const { error } = await client.from('reviews').insert({
    product_id: +productId,
    review: review,
    rating: rating,
    profile_id: userId,
  });

  if (error) {
    throw error;
  }
};
