import { StarIcon } from 'lucide-react';
import { useState } from 'react';
import { Form } from 'react-router';
import { Button } from '~/common/components/ui/button';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from '~/common/components/ui/dialog';
import InputPair from '~/common/components/ui/input-pair';
import { Label } from '~/common/components/ui/label';

export default function CreateReviewDialogue() {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<number>(0);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle> What do you think about this portfolio?</DialogTitle>
        <DialogDescription>
          Share your thoughts and experiences!
        </DialogDescription>
      </DialogHeader>
      <Form className="space-y-10">
        Rating
        <div>
          <Label>
            What would you rate?
            <small className="text-muted-foreground"></small>
          </Label>
          <div className="flex gap-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className="relative"
                onMouseEnter={() => setReview(star)}
                onMouseLeave={() => setReview(0)}
              >
                <StarIcon
                  className="size-4 text-yellow"
                  fill={
                    (review && review >= star) || rating >= star
                      ? 'currentColor'
                      : 'none'
                  }
                />
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  required
                  className="opacity-0 h-px w-px absolute"
                  onChange={() => setRating(star)}
                />
              </label>
            ))}
          </div>
        </div>
        <InputPair
          textArea
          label="Share your thought and also add your portfolio also!"
          description="Max 1000 characters"
          placeholder="Share your thought and also add your portfolio also!"
        />
        <DialogFooter>
          <Button type="submit">Submit your thoughts!</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
