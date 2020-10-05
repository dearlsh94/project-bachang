import { atom } from 'recoil';

const SignInState = atom({
  key: "OpenSignInState",
  default: false
});

export default SignInState;