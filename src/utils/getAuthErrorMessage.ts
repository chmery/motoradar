/**
 * Returns user friendly error message from auth form.
 *
 * @returns Error message.
 */
export const getAuthErrorMessage = (error: string) => {
  switch (error) {
    case 'auth/invalid-email':
      return 'Invalid e-mail!';
    case 'auth/email-already-in-use':
      return 'E-mail already in use!';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters!';
    case 'auth/wrong-password':
      return 'Wrong password!';
    case 'auth/too-many-requests':
      return 'Too many requests! Try again later.';
    case 'auth/user-not-found':
      return 'User not found!';
    case 'auth/internal-error':
      return 'No password provided!';
    case 'auth/user-token-expired':
      return 'User token expired!';
    default:
      return 'Unknown auth error.';
  }
};
