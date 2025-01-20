interface UserPreferences {
  language: string;
  theme: string;
  notifications: boolean;
}

// Address information
interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Individual user data
export interface TUser {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone: string;
  dateOfBirth: string; // ISO date format YYYY-MM-DD
  address: Address;
  occupation: string;
  company: string;
  accountCreated: string; // ISO date format YYYY-MM-DD
  lastLogin: string; // ISO date format YYYY-MM-DD
  preferences: UserPreferences;
}
