import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/supa-client';

export const createPost = async (
  client: SupabaseClient<Database>,
  {
    title,
    category,
    content,
    userId,
  }: {
    title: string;
    category: string;
    content: string;
    userId: string;
  },
) => {
  // createPost 내부
  const { data: topics, error: topicsError } = await client
    .from('topics')
    .select('topic_id, slug')
    .eq('slug', category);

  if (topicsError) throw topicsError;
  if (!topics || topics.length === 0)
    throw new Error('No topic found for slug: ' + category);
  if (topics.length > 1)
    throw new Error('Multiple topics found for slug: ' + category);

  const categoryData = topics[0];
  const { data, error } = await client
    .from('posts')
    .insert({
      title,
      content,
      profile_id: userId,
      topic_id: categoryData.topic_id,
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  return data;
};
