export interface UserRecord {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
  createdAt: Date;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  token: string;
}
