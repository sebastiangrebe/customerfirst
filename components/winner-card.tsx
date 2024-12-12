import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import type { Winner } from '@/types';

interface WinnerCardProps {
  winner: Winner;
}

export function WinnerCard({ winner }: WinnerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          <a href={winner.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {winner.websiteUrl}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Selected {formatDistanceToNow(new Date(winner.selected_at))} ago
        </p>
      </CardContent>
    </Card>
  );
}