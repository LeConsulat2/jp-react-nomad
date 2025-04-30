import { useState } from 'react';
import type { Route } from './+types/features/products/pages/promote-page';
import type { MetaFunction } from 'react-router';
import { Form } from 'react-router';
import { Hero } from '~/common/components/Hero';
import SelectPair from '~/common/components/select-pair';
import { Button } from '~/common/components/ui/button';
import { Calendar } from '~/common/components/ui/calendar';
import { Label } from '~/common/components/ui/label';
import { Select } from '~/common/components/ui/select';
import type { DateRange } from 'react-day-picker';
import { DateTime } from 'luxon';

export const meta: Route.MetaFunction = () => [
  { title: 'Promote Your Product | ProductHunt Clone' },
  {
    name: 'description',
    content: 'Promote your Portfolio',
  },
];

export default function PromotePage() {
  const [promotionPeriod, setPromotionPeriod] = useState<
    DateRange | undefined
  >();
  const totalDays =
    promotionPeriod?.from && promotionPeriod.to
      ? DateTime.fromJSDate(promotionPeriod.to).diff(
          DateTime.fromJSDate(promotionPeriod.from),
          'days',
        ).days
      : 0;
  return (
    <div>
      <Hero title="Promote your Portfolio" subtitle="Promote your Portfolio" />
      <Form className="max-w-sm-mx-auto flex flex-col gap-10 items-center">
        <SelectPair
          label="Select a portfolio"
          name="portfolio"
          description="Select a portfolio you would like to promote"
          placeholder="Select your portfolio"
          options={[
            {
              label: 'Portfolio 1',
              value: 'portfolio-1',
            },
            {
              label: 'Portfolio 2',
              value: 'portfolio-2',
            },
          ]}
        />
        <div className="flex flex-col gap-2 items-center w-full">
          <Label className="flex flex-col gap-1">
            Select a range of dates for your portfolio promotion
            <small className="text-muted-foreground text-center">
              Minium duration is for 3 days
            </small>
          </Label>
          <Calendar
            mode="range"
            selected={promotionPeriod}
            onSelect={setPromotionPeriod}
            min={3}
            disabled={{ before: new Date() }}
          />
          <Button disabled={totalDays === 0}>
            Go to Checkout! (${totalDays * 20})
          </Button>
        </div>
      </Form>
    </div>
  );
}
