import { LockClosedIcon } from '@heroicons/react/solid';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { URL_HOME, URL_PRODUCT, URL_PRODUCTS } from '../../constants/urls/urlFrontEnd';
import { signIn } from '../../redux-store/authenticationSlice';
import ErrorMessSmall from '../lib/form-and-error-components/ErrorMessSmall';
import Input from '../lib/form-and-error-components/Input';
import { Checkbox } from '../lib/form-and-error-components/InputChoices';
import { authenticate } from './../../api/backend/account';
import '../../css/login.css';

/**
 * @param {function} submit: submit Function
 * @param {object} initialValues: the initial values of the form
 * @param {boolean} errorLog: to display or not the message of login/mdp not valid
 * @param {object} validationSchema: validation's schema of the form
 */
const FormLogin = ({ submit, errorLog }) => {
    const defaulValuesLogin = {
        email: '',
        password: '',
        rememberMe: false,
    };
    const schemaFormLogin = Yup.object().shape({
        email: Yup.string().required('Email obligatoire'),
        password: Yup.string().required('Mot de passe obligatoire'),
    });

    return (
        <Formik
            initialValues={defaulValuesLogin}
            onSubmit={submit}
            validationSchema={schemaFormLogin}
        >
            <Form className="mt-8 space-y-6">
                <div className="-space-y-px rounded-md shadow-sm">
                    <Field
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        component={Input}
                        className="rounded-none rounded-t-md"
                        noError
                    />
                    <ErrorMessage
                        name="email"
                        component="small"
                        className="text-danger text-red-500"
                    />
                    <Field
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        autoComplete="current-password"
                        component={Input}
                        className="rounded-none rounded-b-md"
                        noError
                    />
                    <ErrorMessage
                        name="password"
                        component="small"
                        className="text-danger text-red-500"
                    />
                </div>

                    {/* <div className="flex items-center justify-between">
                        <Field
                            name="rememberMe"
                            label="Se souvenir de moi"
                            component={Checkbox}
                            value={true}
                        />
                        <div className="text-sm">
                            <Link to="/forgot-password">
                                <span className="cursor-pointer font-medium ">
                                    Mot de passe oublié ?
                                </span>
                            </Link>
                        </div>
                    </div> */}

                <div>
                    <button
                        type="submit"
                        className="connect-button bg-light-yellow text-dark-pink btn group relative w-full"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon
                                className="locker text-dark-pink h-5 w-5"
                                aria-hidden="true"
                            />
                        </span>
                        Se connecter
                    </button>
                </div>
                {errorLog ? (
                    <ErrorMessSmall middle message="Email ou mot de passe incorrect(s)" />
                ): ''}
            </Form>
        </Formik>
    );
};

const Login = () => {
    const [errorLog, setErrorLog] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogin = (values) => {

        authenticate(values)
            .then((res) => {
                if (res.status === 200 && res.data.token) {
                    //token passe ici !!!!
                    dispatch(signIn(res.data.token));
                    navigate(URL_HOME);
                }
            })
            .catch(()=>{
                setErrorLog(true)
            });
            
    };
    console.log(errorLog)


    return (
        <div className="connect-form w-full max-w-md space-y-8 rounded-md bg-light-pink p-4 py-12 px-4 shadow sm:px-6 lg:px-8">
            <div>
                <h2 className="connect-title mt-6 text-center text-3xl font-extrabold text-gray-800">
                    Se connecter
                </h2>
            </div>
            <hr/>
            <FormLogin errorLog={errorLog} submit={handleLogin} />
        </div>
    );
};

export default Login;
