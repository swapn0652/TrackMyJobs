export interface LoginProps {
  onNeedVerification: () => void;
};

export interface SignUpProps {
  onSignupSuccess: () => void;
};

export interface VerifyOtpProps {
  email?: string;
};
