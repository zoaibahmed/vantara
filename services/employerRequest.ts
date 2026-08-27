import { EmployerEnquiry } from '@/types';

export interface ServiceResponse {
  success: boolean;
  message: string;
}

/**
 * Dispatches Employer Requests directly to the backend mailer API route
 */
export async function submitEmployerRequest(enquiry: EmployerEnquiry): Promise<ServiceResponse> {
  if (!enquiry.companyName || !enquiry.contactEmail || !enquiry.rolesRequired) {
    return {
      success: false,
      message: 'Please complete all required fields (Company Name, Email, and Roles Required).'
    };
  }

  try {
    const response = await fetch('/api/employer-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enquiry)
    });

    const data = await response.json();
    return {
      success: data.success ?? response.ok,
      message: data.message || (response.ok ? 'Your workforce requirement has been received.' : 'Failed to deliver request.')
    };
  } catch (error: any) {
    console.error('[Vantara Service] Error submitting employer request:', error);
    return {
      success: false,
      message: 'Network error communicating with the server. Please email admin@britsync.co.uk directly.'
    };
  }
}
