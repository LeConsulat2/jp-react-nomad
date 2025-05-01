import { Button } from '~/common/components/ui/button';
import { ReviewCard } from '../components/review-card';

export function meta() {
  return [
    { title: 'Portfolio Feedback | WeCreate' },
    {
      name: 'description',
      content: 'Celebrate and support professional portfolios',
    },
  ];
}

export default function ProductReviewsPage() {
  const reviewers = [
    {
      username: 'Emily Watson',
      handle: 'Occupational Therapist',
      avatarUrl: 'https://placehold.co/80x80?text=OT',
      content:
        "Such a thoughtful approach to therapy activities. These materials will really support children's sensory needs!",
    },
    {
      username: 'Sophie Kim',
      handle: 'School Counsellor',
      avatarUrl: 'https://placehold.co/80x80?text=SC',
      content:
        'I love how safe and welcoming your portfolio feels. This would be a great resource for our students seeking emotional support.',
    },
    {
      username: 'James Lee',
      handle: 'Registered Nurse',
      avatarUrl: 'https://placehold.co/80x80?text=RN',
      content:
        'Practical and compassionate materials. This aligns well with holistic patient care in pediatric settings.',
    },
    {
      username: 'Dr. Maria Gonzalez',
      handle: 'Pediatrician',
      avatarUrl: 'https://placehold.co/80x80?text=Dr',
      content:
        "Excellent tools that complement therapeutic goals. I'd be happy to recommend this to families.",
    },
    {
      username: 'Rachel Adams',
      handle: 'School Administrator',
      avatarUrl: 'https://placehold.co/80x80?text=Admin',
      content:
        'Impressive work that bridges care and education. I appreciate how accessible and organized everything is.',
    },
  ];

  return (
    <div className="space-y-12 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Feedback from Professionals
        </h2>
        <Button variant="secondary" className="rounded-lg shadow-sm">
          Share your appreciation
        </Button>
      </div>

      <div className="space-y-16">
        {reviewers.map((reviewer, i) => (
          <div
            key={i}
            className="bg-muted rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={reviewer.avatarUrl}
                alt={reviewer.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  {reviewer.username}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {reviewer.handle}
                </p>
              </div>
            </div>

            <p className="text-foreground leading-relaxed text-sm">
              {reviewer.content}
            </p>

            <div className="flex gap-4 text-sm text-pink-500 mt-4">
              <span>👏 12</span>
              <span>❤️ 8</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
