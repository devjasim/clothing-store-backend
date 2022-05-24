import random from 'random';

const generateOtp = () => {
  const otp = random.int(100000, 999999) 
  return otp;
}
export default generateOtp;