import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '~/supa-client';
import type { z } from 'zod';
import type { formSchema } from './pages/submit-team-page';

export const createTeam = async (
  client: SupabaseClient<Database>,
  userId: string,
  team: z.infer<typeof formSchema>,
) => {
  const { data, error } = await client
    .from('team')
    .insert({
      team_leader_id: userId,
      team_size: team.size,
      product_name: team.name,
      product_stage: team.stage as 'idea' | 'prototype' | 'mvp' | 'product',
      equity_split: team.equity,
      product_description: team.description,
      roles: team.roles,
    })
    .select('team_id')
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const sendMessage = async (
  client: pkg.SupabaseClient<Database>,
  {
    fromUserId,
    toUserId,
    content,
  }: {
    fromUserId: string;
    toUserId: string;
    content: string;
  },
) => {
  const { data, error } = await client
    .rpc('get_room', {
      from_user_ud: fromUserId,
      to_user_id: toUserId,
    })
    .maybeSingle();
  if (error) {
    throw error;
  }
  if (data?.message_room_id) {
    await client.from('messages').insert({
      message_room_id: data.message_room_id,
      sender_id: fromUserId,
      content,
    });
    return data.message_room_id;
  } else {
    const { data: roomData, error: roomError } = await client
      .from('message_rooms')
      .insert({})
      .select('message_room_id')
      .single();
    if (roomError) {
      throw roomError;
    }
    await client.from('message_room_members').insert([
      {
        message_room_id: roomData.message_room_id,
        profile_id: toUserId,
      },
    ]);
    await client.from('messages').insert({
      message_room_id: roomData.message_room_id,
      sender_id: fromUserId,
      content,
    });
    return roomData.message_room_id;
  }
};
