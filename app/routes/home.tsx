import { Button } from '~/components/ui/button';
import type { Route } from './+types/home';

export default function Home() {
  return (
    <div className="p-10 space-y-4 bg-background text-foreground">
      <h1 className="text-4xl font-bold text-primary">home</h1>
      <p className="text-muted-foreground">Muted text here</p>
      <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
        Plain Tailwind Button
      </button>
      <Button>Shadcn Button</Button>
    </div>
  );
}
