import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { insertIdeas } from '../mutations';
import { adminClient } from '~/supa-client';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Zod schema
const IdeaSchema = z.object({
  title: z.string(),
  description: z.string(),
  problem: z.string(),
  solution: z.string(),
  category: z.enum([
    'technology',
    'business',
    'health',
    'education',
    'environment',
    'other',
  ]),
});

const ResponseSchema = z.object({
  potentialIdeas: z.array(IdeaSchema),
});

export const loader = async () => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content:
          'Generate 5 innovative ideas for occupations that traditionally operate outside the sphere of AI, such as nurses, occupational therapists, and teachers. Each idea should identify a current gap and propose how AI could offer meaningful improvement—ideally in ways that are not yet common practice.',
      },
      {
        role: 'user',
        content:
          'For example: A counselling session summariser that generates a therapeutic summary and rehabilitation plan instantly post-session—providing both the client and the system with a record that is actionable, professional, and archived.',
      },
      {
        role: 'user',
        content:
          'Also include: Generate 5 structural formats that counsellors might use in their practice (e.g., narrative-driven, trauma-informed, somatic-processing etc.).',
      },
    ],
    // Use response_format instead of tools for structured outputs
    response_format: zodResponseFormat(ResponseSchema, 'potentialIdeas'),
  });

  // Access the structured output directly from the message content
  const content = completion.choices[0].message.content;

  if (!content) {
    return Response.json({ error: 'No content returned' }, { status: 400 });
  }

  let parsedIdeas: z.infer<typeof ResponseSchema> | null = null;

  try {
    parsedIdeas = JSON.parse(content);
  } catch (e) {
    return Response.json(
      { error: 'Failed to parse structured output' },
      { status: 500 },
    );
  }

  const descriptions = parsedIdeas?.potentialIdeas.map(
    (idea) => idea.description,
  );

  // Debug: Log the generated ideas
  console.log(
    'Generated ideas:',
    JSON.stringify(parsedIdeas.potentialIdeas, null, 2),
  );

  if (!descriptions || descriptions.length === 0) {
    return Response.json(
      { error: 'No ideas were generated. Please refine your input.' },
      { status: 400 },
    );
  }

  await insertIdeas(adminClient, descriptions);

  return Response.json({
    success: 'Ideas successfully generated and inserted.',
    ideas: parsedIdeas.potentialIdeas, // Return the actual generated ideas
    count: parsedIdeas.potentialIdeas.length,
  });
};
