export interface User {
  role: string;
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth?: string;
  address?: string;
  specialization?: string;
  email: string;
  image: string;
  active: boolean;
}
