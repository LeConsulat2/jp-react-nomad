import type { SupabaseClient } from '@supabase/supabase-js';
import type { format } from 'path';
import type { z } from 'zod';
import type { Database } from '~/supa-client';
import type { formSchema } from './pages/submit-job-page';

export const createJob = async (
  client: SupabaseClient<Database>,
  data: z.infer<typeof formSchema>,
) => {
  const { data: jobData, error } = await client
    .from('jobs')
    .insert({
      position: data.position,
      overview: data.overview,
      responsibilities: data.responsibilities,
      qualifications: data.qualifications,
      benefits: data.benefits,
      skills: data.skills,
      company_name: data.companyName,
      company_location: data.companyLocation,
      apply_url: data.applyUrl,
      job_type: data.jobType as
        | 'full-time'
        | 'part-time'
        | 'contract'
        | 'freelance',
      location: data.jobLocation as 'remote' | 'on-site' | 'hybrid',
      salary_range: data.salaryRange,
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  return jobData;
};
