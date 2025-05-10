import type { Route } from './+types/categories-page';
import { Link } from 'react-router';
import { Hero } from '~/common/components/Hero';
import { Button } from '~/common/components/ui/button';
import {
  Code,
  Image,
  Layout,
  Palette,
  Music,
  Film,
  Book,
  Briefcase,
  HeartPulse,
} from 'lucide-react';
import { CategoryCard } from '../components/category-card';
import { getCategories } from '../queries';

export const meta: Route.MetaFunction = () => [
  { title: 'Categories | We-Create' },
  { name: 'description', content: 'Browse Portfolios by category' },
];

// Sample categories data
// const categories = [
//   { id: 'design', name: 'Design Tools', icon: Palette, count: 240 },
//   { id: 'dev', name: 'Developer Tools', icon: Code, count: 185 },
//   { id: 'photography', name: 'Photography', icon: Image, count: 156 },
//   { id: 'productivity', name: 'Productivity', icon: Briefcase, count: 132 },
//   { id: 'music', name: 'Music & Audio', icon: Music, count: 121 },
//   { id: 'video', name: 'Video & Film', icon: Film, count: 98 },
//   { id: 'books', name: 'Books & Writing', icon: Book, count: 87 },
//   { id: 'health', name: 'Health & Fitness', icon: HeartPulse, count: 76 },
//   { id: 'ui', name: 'UI Components', icon: Layout, count: 65 },
// ];

export const loader = async () => {
  const categories = await getCategories();
  return { categories };
};

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title="Explore Categories"
        subtitle="Discover products and portfolios organized by category"
        className="bg-gradient-to-r from-primary/20 to-secondary/20"
      />

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Popular Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {loaderData.categories.map((category) => (
            <CategoryCard
              key={category.category_id}
              id={category.category_id}
              name={category.name}
              description={category.description}
              icon={category.icon}
              count={category.count}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg" className="px-6">
            <Link to="/products/search">View All Categories</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
