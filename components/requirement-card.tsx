import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import type { Requirement } from '@/types';
import { findCategory } from '@/helpers/findCategory';

interface RequirementCardProps {
  requirement: Requirement;
}

export function RequirementCard({ requirement }: RequirementCardProps) {
  const category = findCategory(requirement.category);

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{requirement.title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge>{category.name}</Badge>
          <Badge variant="outline">{requirement.status === 'open' ? 'Open' : 'Closed'}</Badge>
          <Badge variant="outline">{requirement.ideal_price} USD</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {requirement.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {requirement.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Posted {formatDistanceToNow(new Date(requirement.created_at))} ago
        </p>
      </CardContent>
    </Card>
  );
}