import { atom } from 'recoil';
import ISignIn from 'interfaces/User/ISignInUser';

export const SignInState = atom({
  key: "OpenSignInState",
  default: false
});