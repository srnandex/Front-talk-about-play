// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestRegister } from '../services/requests';
import { saveLogin } from '../services/handleStorage';

export default function Redister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [failedTryRegister, setFailedTryRegister] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyRegisterData = () => {
      const nameRule = 2;
      const passwordRule = 6;
      const errors = [
        !name || name.length < nameRule,
        !email || !email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
        !password || password.length < passwordRule,
      ];
      const hasErrors = errors.some((error) => error);
      setDisableButton(hasErrors);
    };
    verifyRegisterData();
  }, [name, email, password]);

  const register = async (event) => {
    event.preventDefault();
    setFailedTryRegister(false);
    try {
      const response = await requestRegister('/user', { email, password, name });
      saveLogin(response);
      return navigate('/login');
    } catch (error) {
      setFailedTryRegister(true);
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
            Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="name"
                onChange={ ({ target: { value } }) => { setName(value); } }
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={ ({ target: { value } }) => { setEmail(value); } }
                autoComplete="email"
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
                onChange={ ({ target: { value } }) => { setPassword(value); } }
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={ disableButton }
              onClick={ (event) => register(event) }
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
    // <main className="user-cadastro">
    //   <form>
    //     <label htmlFor="name-input">
    //       Nome:
    //       <input
    //         className="register__input-name"
    //         type="text"
    //         onChange={ ({ target: { value } }) => { setName(value); } }
    //         placeholder="Seu nome"
    //       />
    //     </label>
    //     <label htmlFor="email-input">
    //       Email:
    //       <input
    //         className="common_register__input-email"
    //         type="text"
    //         onChange={ ({ target: { value } }) => { setEmail(value); } }
    //         placeholder="seu-email@site.com.br"
    //       />
    //     </label>
    //     <label htmlFor="password-input">
    //       Senha:
    //       <input
    //         className="common_register__input-password"
    //         type="text"
    //         onChange={ ({ target: { value } }) => { setPassword(value); } }
    //         placeholder="**********"
    //       />
    //     </label>
    //     <button
    //       type="submit"
    //       disabled={ disableButton }
    //       onClick={ (event) => register(event) }
    //     >
    //       CADASTRAR
    //     </button>
    //   </form>
    //   <div>
    //     { (failedTryRegister)
    //       ? (
    //         <p>
    //           O email já está cadastrado em nosso banco de dados.
    //         </p>
    //       ) : null}
    //   </div>
    // </main>
  );
}
