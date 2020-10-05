import React from 'react';
import {useSetRecoilState} from 'recoil';
import SignInState from 'state/common/SignInState';

const NoAuth = () => {

  const setIsOpen = useSetRecoilState(SignInState);
  setIsOpen(true);

  return (
    <div>
      로그인 해주세요
    </div>
  );
}

export default NoAuth;