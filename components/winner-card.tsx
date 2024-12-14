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
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader className="hover:underline">
      <a href={winner.website_url} target="_blank" rel="noopener noreferrer" >
        <CardTitle className="text-lg flex justify-between">
          {url.hostname}
          <Badge className="bg-green-500"><PartyPopperIcon size="20" className="mr-2"/> Winner</Badge>
        </CardTitle>
      </a>
      </CardHeader>
      <Link href={`/requirements/${winner.requirement_id}`}>
        <CardContent>
          <p className="text-sm mb-1">{(winner as any).applications.product_description}</p>
          <p className="text-sm mt-2 text-muted-foreground">
            Selected {formatDistanceToNow(new Date(winner.selected_at))} ago
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}