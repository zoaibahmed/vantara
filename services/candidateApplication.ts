import { CandidateApplication } from '@/types';
import { ServiceResponse } from './employerRequest';

/**
 * Dispatches Candidate Applications to backend mailer API route
 */
export async function submitCandidateApplication(
  application: CandidateApplication,
  cvFile?: File | null
): Promise<ServiceResponse> {
  if (!application.fullName || !application.email || !application.profession) {
    return {
      success: false,
      message: 'Please complete all required fields (Full Name, Email, and Profession).'
    };
  }

  try {
    let response: Response;

    if (cvFile) {
      const formData = new FormData();
      formData.append('fullName', application.fullName);
      formData.append('country', application.country);
      formData.append('phone', application.phone);
      formData.append('email', application.email);
      formData.append('profession', application.profession);
      formData.append('experienceYears', application.experienceYears);
      if (application.preferredDestination) {
        formData.append('preferredDestination', application.preferredDestination);
      }
      formData.append('cv', cvFile);

      response = await fetch('/api/candidate-application', {
        method: 'POST',
        body: formData
      });
    } else {
      response = await fetch('/api/candidate-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(application)
      });
    }

    const data = await response.json();
    return {
      success: data.success ?? response.ok,
      message: data.message || (response.ok ? 'Your candidate profile has been registered.' : 'Submission failed.')
    };
  } catch (error: any) {
    console.error('[Vantara Service] Error submitting candidate application:', error);
    return {
      success: false,
      message: 'Network error communicating with the server. Please email admin@britsync.co.uk directly.'
    };
  }
}
