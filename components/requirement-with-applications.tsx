"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { createWinner } from '@/lib/actions/winners';
import { formatDistanceToNow } from 'date-fns';
import type { RequirementWithApplications } from '@/types';
import { updateApplicationStatus } from '@/lib/actions/application-client';
import { findCategory } from '@/helpers/findCategory';
import { deleteRequirement } from '@/lib/actions/requirements-client';

interface Props {
  requirement: RequirementWithApplications;
}

export function RequirementWithApplications({ requirement }: Props) {
  const category = findCategory(requirement.category);

  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAccept = async (applicationId: string) => {
    setIsProcessing(applicationId);
    try {
      await updateApplicationStatus(applicationId, 'accepted');
      await createWinner({
        requirement_id: requirement.id,
        application_id: applicationId,
        website_url: requirement.applications.find(a => a.id === applicationId)?.website_url || '',
      });
      toast({
        title: "Success",
        description: "Application accepted and winner selected.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process application.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
      setTimeout(function() {
        window.location.reload();
      }, 1000)
    }
  };

  const handleReject = async (applicationId: string) => {
    setIsProcessing(applicationId);
    try {
      await updateApplicationStatus(applicationId, 'rejected');
      toast({
        title: "Success",
        description: "Application rejected.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process application.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
      setTimeout(function() {
        window.location.reload();
      }, 1000)
    }
  };

  const handleDelete = async () => {
    setIsProcessing(requirement.id);
    try {
      await deleteRequirement(requirement.id);
      // Delete requirement
      toast({
        title: "Success",
        description: "Requirement deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete requirement.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
      setTimeout(function() {
        window.location.reload();
      }, 1000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between flex-row">
          {requirement.title}
          <Button
            size="sm"
            className="align-right bg-red-600 hover:bg-red-800"
            onClick={() => handleDelete()}
            disabled={requirement.status !== 'open'}
          >
            {isProcessing === requirement.id ? "Processing..." : "Delete"}
          </Button>
        </CardTitle>
        <div className="flex gap-2 mt-2">
          <Badge>{category.name}</Badge>
          {requirement.status === 'open' && <Badge variant="outline">{requirement.status === 'open' ? 'Open' : 'Closed'}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-6">{requirement.description}</p>

        <h3 className="font-semibold mb-4">Applications ({requirement.applications.length})</h3>
        <div className="space-y-4">
          {requirement.applications.map((application) => (
            <Card key={application.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <a
                      href={application.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {application.website_url}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Price: ${application.pricing}
                    </p>
                    <p className="text-md mt-4">
                      Product Description:
                    </p>
                    <p className="text-sm mt-1">
                      ${application.product_description}
                    </p>
                    <p className="text-md mt-4">
                      Contact Details:
                    </p>
                    <p className="text-sm mt-1">{application.contact_details}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Applied {formatDistanceToNow(new Date(application.created_at))} ago
                    </p>
                  </div>
                  {requirement.status === 'open' && application.status === 'pending' ? <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAccept(application.id)}
                      disabled={isProcessing === application.id}
                    >
                      {isProcessing === application.id ? "Processing..." : "Accept"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(application.id)}
                      disabled={isProcessing === application.id}
                    >
                      Reject
                    </Button>
                  </div> : null}
                </div>
              </CardContent>
            </Card>
          ))}
          {requirement.applications.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No applications yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}