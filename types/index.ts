export interface Requirement {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  userId: string;
  createdAt: string;
  status: 'open' | 'closed';
}

export interface Application {
  id: string;
  requirementId: string;
  userId: string;
  websiteUrl: string;
  pricing: number;
  contactDetails: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface Winner {
  id: string;
  requirementId: string;
  applicationId: string;
  userId: string;
  websiteUrl: string;
  selected_at: string;
}

export interface RequirementWithApplications extends Requirement {
  applications: Application[];
}