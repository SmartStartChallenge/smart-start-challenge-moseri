export interface Classroom {
  id: number;
  name: string;
  capacity: number;
  teacherId: string;
  learners?: User[];
}

export interface User {
  id: string;
  email: string;
  role: string;
}