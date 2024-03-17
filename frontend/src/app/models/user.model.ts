export interface User {
  id: string;
  userId: string;
  role: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
  isActive: boolean;
  password: string;
}

export interface Student extends User {
  dateOfBirth?: string;
  address?: string;
}

export interface Trainer extends User {
  specializationId: string;
}

interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface StudentRegister extends UserRegister {
  dateOfBirth?: string;
  address?: string;
}

export interface TrainerRegister extends UserRegister {
  specializationId: string;
}
