export interface SendOtpResponse {
  message: string;
}

export interface VerifyOtpResponse {
  success: boolean;
}

export interface AuthResponse {
  data: {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      onboardingCompleted: boolean;
      role: string;
    };
  };
}
