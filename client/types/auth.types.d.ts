export type LoginProps = {
  onNeedVerification: (email: string) => void;
};

export type SignupProps = {
  onSignupSuccess: (email: string) => void;
};


export interface VerifyOtpProps {
  email?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
};
