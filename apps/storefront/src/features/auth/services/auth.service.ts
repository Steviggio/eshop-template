import axios from "axios";
import type { LoginRequest, RegisterRequest, AuthResponse, User } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function loginApi(data: LoginRequest): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(`${API_URL}/api/auth/login`, data);
  return response.data;
}

export async function registerApi(data: RegisterRequest): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(`${API_URL}/api/auth/register`, data);
  return response.data;
}

export async function getMeApi(token: string): Promise<{ user: User }> {
  const response = await axios.get<{ user: User }>(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
