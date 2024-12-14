import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import type { Winner } from '@/types';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { PartyPopperIcon } from 'lucide-react';

interface WinnerCardProps {
  winner: Winner;
}

export function WinnerCard({ winner }: WinnerCardProps) {
  const url = new URL(winner.website_url);

  return (
    <Link href={`/requirements/${winner.requirement_id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex justify-between">
            <a href={winner.website_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {url.hostname}
            </a>
            <Badge className="bg-green-500"><PartyPopperIcon size="20" className="mr-2"/> Winner</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-1">{(winner as any).applications.product_description}</p>
          <p className="text-sm mt-2 text-muted-foreground">
            Selected {formatDistanceToNow(new Date(winner.selected_at))} ago
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}