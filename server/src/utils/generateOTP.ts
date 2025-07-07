export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
export const generateOTPExpiry = (time: number = 10) => new Date(Date.now() + time * 60 * 1000); 