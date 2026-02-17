import { Router } from 'express';
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken } from '../utils/auth';
import { prisma } from '../prisma';
import { sendOtpEmail } from '../utils/mail';

const router = Router();

/**
 * Step 1: Signup → store email + OTP
 */
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name + " " + email + " " + password);
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    if (existingUser) {
      // Update OTP for existing unverified user
      await prisma.user.update({
        where: { email },
        data: { otp, otpExpiresAt, passwordHash: await hashPassword(password), name },
      });
    } else {
      // Create new user with OTP
      await prisma.user.create({
        data: { name, email, passwordHash: await hashPassword(password), otp, otpExpiresAt },
      });
    }

    await sendOtpEmail(email, otp);

    res.json({ message: 'OTP sent to your email' });
  } catch (err: any) {
    console.error("Signup error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Step 2: Verify OTP → mark verified + login
 */
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.isVerified) return res.status(400).json({ error: 'User already verified' });
    if (user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });
    if (user.otpExpiresAt && new Date() > user.otpExpiresAt) return res.status(400).json({ error: 'OTP expired' });

    // Mark verified + remove OTP
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { isVerified: true, otp: null, otpExpiresAt: null },
    });

    // Generate tokens
    const accessToken = generateAccessToken(updatedUser.id);
    const refreshToken = generateRefreshToken(updatedUser.id);

    await prisma.refreshToken.create({
      data: { userId: updatedUser.id, token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    });

    res.json({
      message: 'Signup successful',
      user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email },
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    // Check if user is verified
    if (!user.isVerified) {
      // Generate OTP again if needed
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

      await prisma.user.update({
        where: { email },
        data: { otp, otpExpiresAt },
      });

      await sendOtpEmail(email, otp);

      return res.status(403).json({
        error: 'Email not verified. OTP sent again.',
      });
    }

    // TypeScript safe check: passwordHash can be null
    if (!user.passwordHash) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.create({
      data: { userId: user.id, token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    });

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      accessToken,
      refreshToken,
    });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
