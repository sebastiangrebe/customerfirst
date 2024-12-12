export interface Requirement {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  user_id: string;
  created_at: string;
  status: 'open' | 'closed';
  ideal_price: number;
}

export interface Application {
  id: string;
  requirementId: string;
  user_id: string;
  website_url: string;
  pricing: number;
  contact_details: string;
  product_description: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface Winner {
  id: string;
  requirement_id: string;
  application_id: string;
  user_id: string;
  website_url: string;
  selected_at: string;
}

export interface RequirementWithApplications extends Requirement {
  applications: Application[];
}