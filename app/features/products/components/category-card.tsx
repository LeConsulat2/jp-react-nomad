import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';

export interface CategoryCardProps {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon;
  count: number;
}

export function CategoryCard({
  id,
  name,
  description,

  count,
}: CategoryCardProps) {
  return (
    <Link
      to={`/products/categories/${id}`}
      className="block transform transition-all hover:scale-105"
    >
      <Card className="h-full border-2 hover:border-primary overflow-hidden">
        <CardHeader className="bg-muted/30 pb-4">
          <div className="flex justify-center p-4"></div>
        </CardHeader>

        <CardContent className="pt-4 text-center">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <p className="text-sm text-muted-foreground mt-1">{count} products</p>
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
}
