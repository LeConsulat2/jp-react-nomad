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

export const createProduct = async (
  client: SupabaseClient<Database>,
  {
    name,
    tagline,
    description,
    howItWorks,
    url,
    iconUrl,
    categoryId,
    userId,
  }: {
    name: string;
    tagline: string;
    description: string;
    howItWorks: string;
    url: string;
    iconUrl: string;
    categoryId: number;
    userId: string;
  },
) => {
  const { data, error } = await client
    .from('products')
    .insert({
      name,
      tagline,
      description,
      how_it_works: howItWorks,
      url,
      icon: iconUrl,
      category_id: categoryId,
      profile_id: userId,
    })
    .select('product_id')
    .single();
  if (error) throw error;
  return data.product_id;
};
