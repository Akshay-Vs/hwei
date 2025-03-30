import { ClerkAPIError } from "@clerk/types";

interface ClerkError {
  error: unknown;
  setFormError: (error: string | undefined) => void;
}

export const resolveClerkError = ({ error, setFormError }: ClerkError) => {
  if (error && typeof error === 'object' && 'errors' in error) {
    const clerkError = error as { errors: ClerkAPIError[] };

    if (clerkError.errors && clerkError.errors.length > 0) {
      setFormError(clerkError?.errors[0]?.message);
    } else {
      setFormError('An unknown error occurred');
    }
  } else {
    setFormError('An unexpected error occurred');
  }

}