import type { Route } from '~/+types/community';

export const meta: Route.MetaFunction = ({ params }) => {
  return [{ title: `Post ${params.postId} | Community` }];
};

export default function PostPage() {
  return (
    <div className="container py-8">
      <div className="space-y-6">{/* Post content will go here */}</div>
    </div>
  );
}
