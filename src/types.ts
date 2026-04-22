export type Gender = 'male' | 'female' | 'other';

export interface Location {
  state: string;
  lga: string;
  ward: string;
  pollingUnit: string;
}

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface UserProfile {
  id: string;
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  dob: string;
  occupation: string;
  location: Location;
  nin?: string;
  passportUrl?: string;
  voterId?: string;
  membershipId: string;
  status: RegistrationStatus;
  createdAt: number;
  updatedAt: number;
}
