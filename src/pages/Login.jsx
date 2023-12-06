// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../services/requests';
import { saveLogin } from '../services/handleStorage';
import ChatContext from '../context/ChatContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const { getUser } = useContext(ChatContext);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyLoginData = () => {
      const lengthVerification = 6;
      const errors = [
        !email || !email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
        !password || password.length < lengthVerification,
      ];
      const hasErrors = errors.some((error) => error);
      setDisableButton(hasErrors);
    };
    verifyLoginData();
  }, [email, password]);

  const login = async (event) => {
    event.preventDefault();
    setFailedTryLogin(false);
    try {
      const response = await requestLogin('/login', { email, password });
      saveLogin(response);
      await getUser();
      navigate('/chat')
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="https://play.foracause.com.br/wp-content/uploads/2023/10/cropped-PFAC_Logo-5_page-0003.jpg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={ email }
                onChange={ ({ target: { value } }) => setEmail(value) }
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={ password }
                onChange={ ({ target: { value } }) => setPassword(value) }
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={ disableButton }
              onClick={ (event) => login(event) }
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
          <div>
            <button
              type="submit"
              onClick={ () => navigate('/register') }
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cadastrar
            </button>
          </div>
        </form>
        <div>
         {
          failedTryLogin
            ? (
              <p>
                {
                  `O endereço de e-mail ou a senha não estão corretos.
                Por favor, tente novamente.`
                }
              </p>
            )
            : null
         }
      </div>
      </div>
    </div>
  </>
  );
}
