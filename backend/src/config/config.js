
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', 
  sameSite: 'Lax',
  maxAge: 100 * 60 * 60,
};
