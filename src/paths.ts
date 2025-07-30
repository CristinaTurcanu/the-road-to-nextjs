export const ticketsPath = () => '/tickets';  
export const ticketPath = (ticketId: string | number) => `/tickets/${ticketId}`;
export const ticketEditPath = (ticketId: string | number) => `/tickets/${ticketId}/edit`;
export const homePath = () => '/';  // Home page path

export const signInPath = () => '/sign-in';
export const signUpPath = () => '/sign-up';
export const passwordForgotPath = () => '/password-forgot';

export const accountProfilePath = () => '/account/profile';
export const accountPasswordPath = () => '/account/password';