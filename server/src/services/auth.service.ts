
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken } from "../utils/auth";
import { sendOtpEmail } from "../utils/mail";
import { AuthErrors } from "../../constants/errorCodes";
import { prisma } from "../prisma";

export const authService = {
  signupUser: async (name: string, email: string, password: string) => {
    if (!name || !email || !password)
      throw { status: 400, code: AuthErrors.MISSING_FIELDS, message: "All fields required" };

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser && existingUser.isVerified)
      throw { status: 400, code: AuthErrors.EMAIL_ALREADY_REGISTERED, message: "Email already registered" };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    if (existingUser) {
      await prisma.user.update({
        where: { email },
        data: { name, passwordHash: await hashPassword(password), otp, otpExpiresAt },
      });
    } else {
      await prisma.user.create({
        data: { name, email, passwordHash: await hashPassword(password), otp, otpExpiresAt },
      });
    }

    await sendOtpEmail(email, otp);
    return { message: "OTP sent to your email" };
  },

  verifyOtp: async (email: string, otp: string) => {
    if (!email || !otp)
      throw { status: 400, code: AuthErrors.MISSING_FIELDS, message: "Email and OTP required" };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw { status: 404, code: AuthErrors.USER_NOT_FOUND, message: "User not found" };
    if (user.isVerified) throw { status: 400, code: AuthErrors.USER_ALREADY_VERIFIED, message: "User already verified" };
    if (user.otp !== otp) throw { status: 400, code: AuthErrors.INVALID_OTP, message: "Invalid OTP" };
    if (user.otpExpiresAt && new Date() > user.otpExpiresAt) throw { status: 400, code: AuthErrors.OTP_EXPIRED, message: "OTP expired" };

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { isVerified: true, otp: null, otpExpiresAt: null },
    });

    const accessToken = generateAccessToken(updatedUser.id);
    const refreshToken = generateRefreshToken(updatedUser.id);

    await prisma.refreshToken.create({
      data: { userId: updatedUser.id, token: refreshToken, expiresAt: new Date(Date.now() + 7*24*60*60*1000) },
    });

    return {
      message: "Signup successful",
      user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email },
      accessToken,
      refreshToken,
    };
  },

  loginUser: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw { status: 401, code: AuthErrors.INVALID_CREDENTIALS, message: "Invalid email or password" };

    if (!user.isVerified) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

      await prisma.user.update({ where: { email }, data: { otp, otpExpiresAt } });
      await sendOtpEmail(email, otp);

      throw { status: 403, code: AuthErrors.EMAIL_NOT_VERIFIED, message: "Email not verified. OTP sent again." };
    }

    const valid = await comparePassword(password, user.passwordHash || "");
    if (!valid) throw { status: 401, code: AuthErrors.INVALID_CREDENTIALS, message: "Invalid email or password" };

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.create({
      data: { userId: user.id, token: refreshToken, expiresAt: new Date(Date.now() + 7*24*60*60*1000) },
    });

    return {
      user: { id: user.id, name: user.name, email: user.email },
      accessToken,
      refreshToken,
    };
  },
};
