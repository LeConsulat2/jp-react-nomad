import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';
import type { MergeDeep, SetNonNullable, SetFieldType } from 'type-fest';
import type { Database as SupabaseDatabase } from 'database.types';
import { createClient } from '@supabase/supabase-js';

export type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {
        messages_view: {
          Row: SetNonNullable<
            SupabaseDatabase['public']['Views']['messages_view']['Row']
          >;
        };
        community_post_list_view: {
          Row: SetFieldType<
            SetNonNullable<
              SupabaseDatabase['public']['Views']['community_post_list_view']['Row']
            >,
            'author_avatar',
            string | null
          >;
        };
        product_overview_view: {
          Row: SetNonNullable<
            SupabaseDatabase['public']['Views']['product_overview_view']['Row']
          >;
        };
        community_post_detail: {
          Row: SetNonNullable<
            SupabaseDatabase['public']['Views']['community_post_detail']['Row']
          >;
        };
        gpt_ideas_view: {
          Row: SetNonNullable<
            SupabaseDatabase['public']['Views']['gpt_ideas_view']['Row']
          >;
        };
      };
    };
  }
>;

export const browserClient = createBrowserClient<Database>(
  'https://ggvmvazxrsvgwehfyqto.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdndm12YXp4cnN2Z3dlaGZ5cXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMzYyMTgsImV4cCI6MjA2MTkxMjIxOH0.jaIPK4xmAVYZvFgE-L5zSQ45E-BDGInS2Dyl-VJNkGI',
);

export const makeSSRClient = (request: Request) => {
  const headers = new Headers();
  const serverSideClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append(
              'Set-Cookie',
              serializeCookieHeader(name, value, options),
            );
          });
        },
      },
    },
  );
  return {
    client: serverSideClient,
    headers,
  };
};

// adminClient는 서비스 롤 키를 이용한 서버 관리자용
export const adminClient = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);
