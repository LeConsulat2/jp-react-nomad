import type { Route } from './+types/categories-page';
import { Link } from 'react-router';
import { Hero } from '~/common/components/Hero';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';
import {
  ArrowRight,
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

export const meta: Route.MetaFunction = () => [
  { title: 'Categories | We-Create' },
  { name: 'description', content: 'Browse Portfolios by category' },
];

// Sample categories data
const categories = [
  { id: 'design', name: 'Design Tools', icon: Palette, count: 240 },
  { id: 'dev', name: 'Developer Tools', icon: Code, count: 185 },
  { id: 'photography', name: 'Photography', icon: Image, count: 156 },
  { id: 'productivity', name: 'Productivity', icon: Briefcase, count: 132 },
  { id: 'music', name: 'Music & Audio', icon: Music, count: 121 },
  { id: 'video', name: 'Video & Film', icon: Film, count: 98 },
  { id: 'books', name: 'Books & Writing', icon: Book, count: 87 },
  { id: 'health', name: 'Health & Fitness', icon: HeartPulse, count: 76 },
  { id: 'ui', name: 'UI Components', icon: Layout, count: 65 },
];

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories, // Now returning our sample data
  };
}

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
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                to={`/products/categories/${category.id}`}
                key={category.id}
                className="block transform transition-all hover:scale-105"
              >
                <Card className="h-full border-2 hover:border-primary overflow-hidden">
                  <CardHeader className="bg-muted/30 pb-4">
                    <div className="flex justify-center p-4">
                      <div className="rounded-full bg-gradient-to-tr from-primary/20 to-background/30 p-6">
                        <Icon className="size-8 text-primary" />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4 text-center">
                    <h2 className="text-xl font-semibold">{category.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.count} products
                    </p>
                  </CardContent>

                  <CardFooter className="flex justify-center pb-4">
                    <Button variant="ghost" size="sm" className="group">
                      Browse{' '}
                      <ArrowRight className="ml-1 size-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
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
