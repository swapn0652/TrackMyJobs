import { Router } from 'express';
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken } from '../utils/auth';
import { prisma } from '../prisma';
import { sendOtpEmail } from '../utils/mail';
import { AuthErrors } from '../../constants/errorCodes';
import { sendError, sendSuccess } from '../utils/apiResponse';

const router = Router();

/**
 * Step 1: Signup → store email + OTP
 */
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return sendError(res, 400, AuthErrors.MISSING_FIELDS, "All fields required");

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser && existingUser.isVerified)
      return sendError(res, 400, AuthErrors.EMAIL_ALREADY_REGISTERED, "Email already registered");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    if (existingUser) {
      await prisma.user.update({
        where: { email },
        data: { otp, otpExpiresAt, passwordHash: await hashPassword(password), name },
      });
    } else {
      await prisma.user.create({
        data: { name, email, passwordHash: await hashPassword(password), otp, otpExpiresAt },
      });
    }

    await sendOtpEmail(email, otp);

    return sendSuccess(res, { message: "OTP sent to your email" });

  } catch (err) {
    return sendError(res, 500, AuthErrors.SERVER_ERROR, "Server error");
  }
});


/**
 * Step 2: Verify OTP → mark verified + login
 */
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return sendError(res, 400, AuthErrors.MISSING_FIELDS, "Email and OTP required");

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return sendError(res, 404, AuthErrors.USER_NOT_FOUND, "User not found");

    if (user.isVerified)
      return sendError(res, 400, AuthErrors.USER_ALREADY_VERIFIED, "User already verified");

    if (user.otp !== otp)
      return sendError(res, 400, AuthErrors.INVALID_OTP, "Invalid OTP");

    if (user.otpExpiresAt && new Date() > user.otpExpiresAt)
      return sendError(res, 400, AuthErrors.OTP_EXPIRED, "OTP expired");

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { isVerified: true, otp: null, otpExpiresAt: null },
    });

    const accessToken = generateAccessToken(updatedUser.id);
    const refreshToken = generateRefreshToken(updatedUser.id);

    await prisma.refreshToken.create({
      data: { userId: updatedUser.id, token: refreshToken, expiresAt: new Date(Date.now() + 7*24*60*60*1000) },
    });

    return sendSuccess(res, {
      message: "Signup successful",
      user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email },
      accessToken,
      refreshToken,
    });

  } catch (err) {
    return sendError(res, 500, AuthErrors.SERVER_ERROR, "Server error");
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return sendError(res, 401, AuthErrors.INVALID_CREDENTIALS, "Invalid email or password");

    if (!user.isVerified) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

      await prisma.user.update({ where: { email }, data: { otp, otpExpiresAt } });
      await sendOtpEmail(email, otp);

      return sendError(res, 403, AuthErrors.EMAIL_NOT_VERIFIED, "Email not verified. OTP sent again.");
    }

    if (!user.passwordHash)
      return sendError(res, 401, AuthErrors.INVALID_CREDENTIALS, "Invalid email or password");

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid)
      return sendError(res, 401, AuthErrors.INVALID_CREDENTIALS, "Invalid email or password");

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.create({
      data: { userId: user.id, token: refreshToken, expiresAt: new Date(Date.now() + 7*24*60*60*1000) },
    });

    return sendSuccess(res, {
      user: { id: user.id, name: user.name, email: user.email },
      accessToken,
      refreshToken,
    });

  } catch (err) {
    return sendError(res, 500, AuthErrors.SERVER_ERROR, "Server error");
  }
});


export default router;
