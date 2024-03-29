import React, { useState } from 'react';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import { Link } from 'react-router-dom';
import CreateAccountSequence from './CreateAccountSequence';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
type ValidityObject = {
  password: boolean;
  email: boolean;
  confirmPassword: boolean;
};
function Register() {
  const [registerStatus, setRegisterStatus] = useState(0);
  const [attemptingRegister, setAttemptingRegister] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [userId, setUserId] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const registerUser = async () => {
    const jsonBody = {
      email: email,
      password: password,
      gender: 'm',
      preferences: { unit: 'kg', standard: 'percentile' },
      weight: { unit: 'kg', value: 70 },
      age: 21,
      username: 'User',
    };
    const res = await fetch(`${apiURL}auth/register`, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonBody),
    });
    setRegisterStatus(res.status);
    const data = await res.json();
    setUserId(data.data.user.id);
  };
  const handleRegister = () => {
    if (email && password && confirmPassword) {
      registerUser();
    }
    // if register returns 200, redirect to the sign up questionaire
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const validityCheck = (
    e: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => {
    const button = e.target as HTMLButtonElement;
    button.setCustomValidity('');
    let invalidStr = '';
    if (validObj.email && validObj.password && validObj.confirmPassword) {
      button.setCustomValidity('');
      setAttemptingRegister(true);
      handleRegister();
    } else {
      if (!validObj.email) {
        invalidStr += 'email';
      }
      if (!validObj.confirmPassword) {
        if (!validObj.email) {
          invalidStr += ' and ';
        }
        invalidStr += 'password';
      }
      button.setCustomValidity(`Please correct invalid ${invalidStr}.`);
      button.reportValidity();
    }
  };

  const [validObj, setValidObj] = useState<ValidityObject>({
    password: false,
    email: false,
    confirmPassword: false,
  });

  function validatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const password = e.target;
    password.setCustomValidity('');
    setPasswordInvalid(false);
    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    if (pattern.test(password.value)) {
      password.setCustomValidity('');
      handlePassword(e);
      setButtonDisabled(false);
      setValidObj({ ...validObj, password: true });
      setPasswordInvalid(false);
    } else {
      password.setCustomValidity(
        'Minimum six characters, at least one uppercase letter, one lowercase letter, and one number.'
      );
      setPasswordInvalid(true);
      setValidObj({ ...validObj, password: false });
      setButtonDisabled(true);
      password.reportValidity();
    }
  }
  function matchPasswords(e: React.ChangeEvent<HTMLInputElement>) {
    const firstPassword = password;
    const confirmPassword = e.target;
    confirmPassword.setCustomValidity('');
    if (firstPassword === confirmPassword.value) {
      confirmPassword.setCustomValidity('');
      handleConfirmPassword(e);
      setButtonDisabled(false);
      setValidObj({ ...validObj, confirmPassword: true });
    } else {
      confirmPassword.setCustomValidity('Passwords do not match.');
      setButtonDisabled(true);
      setValidObj({ ...validObj, confirmPassword: false });

      confirmPassword.reportValidity();
    }
  }
  const checkUnique = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target;
    email.setCustomValidity('');
    setEmailTaken(false);
    const res = await fetch(`${apiURL}api/users/emailcheck`, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({ email: e.target.value }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.status === 200) {
      setEmailTaken(false);
      email.setCustomValidity('');
      handleEmail(e);
      setValidObj({ ...validObj, email: true });
    } else if (res.status === 409) {
      setEmailTaken(true);
      email.setCustomValidity('This email is already in use.');
      setValidObj({ ...validObj, email: false });
      email.reportValidity();
    } else {
    }
  };

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target;
    email.setCustomValidity('');
    setEmailInvalid(false);
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (pattern.test(email.value)) {
      setEmailInvalid(false);
      email.setCustomValidity('');
      handleEmail(e);
      setValidObj({ ...validObj, email: true });
    } else {
      setEmailInvalid(true);
      email.setCustomValidity('Please enter a valid email address.');
      setValidObj({ ...validObj, email: false });
    }
  };

  // email 'giffordjacob0@gmail.com'
  // passcode 'cat0both'
  return (
    <div className='flex h-screen bg-[rgb(86,94,101)] justify-center items-center'>
      {!email || !password || !userId || registerStatus !== 201 ? (
        <div className='flex flex-col pt-6 pb-6 rounded-md justify-center items-center bg-[rgb(47,49,54)] shadow-lg'>
          <div className='flex flex-wrap flex-col gap-2 justify-center items-center'>
            <h2 className='text-white'>Register Account</h2>
            <div className='flex flex-col justify-center items-center p-6 gap-5'>
              <h2 className='text-4xl text-white'>Gradient Fitness</h2>
              <img className='h-14' src='gradient-icon.png' alt='brand logo' />
            </div>
          </div>
          <div className='flex flex-col gap-5 justify-center items-center'>
            <div className='flex flex-col gap-1'>
              <label className='text-white' htmlFor='email'>
                Email<em className='not-italic text-red-600 text-lg'> *</em>
              </label>
              <input
                onBlur={(e) => {
                  validateEmail(e);
                }}
                onChange={(e) => {
                  checkUnique(e);
                }}
                className='p-2 text-white rounded-md bg-[rgb(34,37,39)]'
                id='email'
                type='email'
                name='email'
                required
                placeholder='Type your email'
              />
              {emailTaken ? (
                <p className='text-sm text-red-500 pl-2'>
                  Email already in use
                </p>
              ) : (
                <></>
              )}
              {emailInvalid ? (
                <p className='text-sm text-red-500 pl-2'>
                  Invalid email format
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className='flex flex-col'>
              <label className='text-white' htmlFor='password'>
                Password<em className='not-italic text-red-600 text-lg'> *</em>
              </label>
              <input
                onChange={(e) => {
                  validatePassword(e);
                }}
                className='p-2 rounded-md text-white bg-[rgb(34,37,39)]'
                id='password'
                name='password'
                type='password'
                required
                placeholder='Type your password'
              />
              {passwordInvalid && (
                <p className='text-sm text-red-500 pl-2'>Invalid password</p>
              )}
            </div>
            <div className='flex flex-col'>
              <label className='text-white' htmlFor='confirm password'>
                Confirm Password
                <em className='not-italic text-red-600 text-lg'> *</em>
              </label>
              <input
                onChange={(e) => {
                  matchPasswords(e);
                }}
                className='p-2 rounded-md text-white bg-[rgb(34,37,39)]'
                id='confirm password'
                name='confirm password'
                type='password'
                required
              />
            </div>
            <div className='w-full'>
              <button
                type='submit'
                className='w-full flex justify-center items-center text-lg bg-blue-600 text-white p-3 rounded-md shadow-md'
                onClick={(e) => {
                  validityCheck(e);
                }}
              >
                {attemptingRegister ? (
                  <TailSpin className='h-7' stroke='#FFFFFF' />
                ) : (
                  'Create Account'
                )}
              </button>
              {/*           <p>or</p>
          <div>
            <button>Google</button>
            <button>Github</button>
          </div> */}
            </div>
            <span className='w-full'>
              <em className='not-italic'>
                <p className='text-white'>Already have an account?</p>
                <Link to={'/login'} replace>
                  <p className='text-blue-400'>Login</p>
                </Link>
              </em>
            </span>
          </div>
        </div>
      ) : (
        <CreateAccountSequence
          email={email!}
          password={password!}
          userId={userId!}
        />
      )}
    </div>
  );
}

export default Register;
