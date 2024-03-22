export interface Training {
  id: string;
  name: string;
  description: string;
  duration: number;
  date: string;
  type: string;
  studentId: string;
  trainerId: string;
}

export interface AddTraining {
  name: string;
  description: string;
  duration: number;
  date: string;
  type: string;
  studentId: string;
  trainerId: string;
}
