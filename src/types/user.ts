// types/user.ts
export interface User {
  email: string;
  phone: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  user_type: string;
  transactions: { [key: string]: number };
}
