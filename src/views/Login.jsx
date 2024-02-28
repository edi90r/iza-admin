import { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import Logo from '../components/Atoms/Logo/Logo';
import FormInput from '../components/Molecules/FormInput/FormInput';
import Button from '../components/Atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [userType, setUserType] = useState(null);
    const [fields, setFields] = useState({});
    const { error, setError, signIn, isAuthenticated, userRole } = useAuth();
    const navigate = useNavigate();

    const handleSetTypeOfUser = (e) => {
        setUserType(e.currentTarget.dataset.type);
    };

    const handleUserChange = (event) => {
        const { name, value } = event.currentTarget;
        setFields((fields) => ({ ...fields, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!fields.email || !fields.password) {
            return setError({ message: 'Email i hasło są wymagane aby się zalogować' });
        }

        signIn(fields.email, fields.password);
        setFields({});
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (isAuthenticated && userRole === 'admin') {
                if (userRole !== userType) {
                    setError({
                        message: 'Nie możesz zalogować się do aplikacji jako administrator',
                    });
                    return;
                }

                return navigate('/');
            } else if (isAuthenticated && userRole === 'user') {
                if (userRole !== userType) {
                    setError({ message: 'Nie masz uprawnień do panelu administratora' });
                    return;
                }
                return navigate('/pwa');
            }
        }
        return () => {
            isMounted = false;
        };
    }, [isAuthenticated, userRole, userType, navigate, setError]);

    return (
        <div className=' bg-gradient-to-r flex h-screen w-full items-center justify-center from-slate-900 to-slate-700'>
            <div className='card relative flex flex-col items-center justify-center bg-pureWhite px-8 py-12 shadow-2xl lg:min-w-160'>
                <Logo className='w-24' />
                <div className='mt-8 w-full text-center'>
                    <h2 className='font-hind font-700'>Wybierz jako kto chcesz się zalogować</h2>
                    <div className='my-8 flex w-full flex-col lg:flex-row'>
                        <div
                            className={`card grid h-32 flex-1 flex-grow place-items-center rounded-box border font-700 hover:cursor-pointer  hover:bg-base-300 hover:shadow-lg ${
                                userType === 'admin' ? 'bg-base-300' : 'bg-pureWhite'
                            }`}
                            data-type='admin'
                            onClick={(e) => handleSetTypeOfUser(e)}
                        >
                            admin
                        </div>
                        <div className='divider lg:divider-horizontal'>lub</div>
                        <div
                            className={`card grid h-32 flex-1 flex-grow place-items-center rounded-box border font-700 hover:cursor-pointer hover:bg-base-300 hover:shadow-lg ${
                                userType === 'user' ? 'bg-base-300' : 'bg-pureWhite'
                            }`}
                            data-type='user'
                            onClick={(e) => handleSetTypeOfUser(e)}
                        >
                            użytkownik
                        </div>
                    </div>
                </div>
                {userType && (
                    <form onSubmit={onSubmit} className='flex w-full flex-col'>
                        <FormInput
                            label='Email'
                            name='email'
                            type='email'
                            placeholder='Podaj email'
                            register={() => {}}
                            required
                            className={{ container: 'w-full' }}
                            onChange={(e) => handleUserChange(e)}
                            error={error}
                        />
                        <FormInput
                            label='Hasło'
                            name='password'
                            type='password'
                            placeholder='Podaj hasło'
                            register={() => {}}
                            required
                            onChange={(e) => handleUserChange(e)}
                        />

                        <Link to={'/forget-password'} className='self-end pt-2'>
                            Nie pamiętam hasła
                        </Link>

                        <Button type='submit' variant='primary' className='mt-8 w-full'>
                            Zaloguj
                        </Button>
                    </form>
                )}
                <div className='my-4 w-full border-b border-primary'></div>

                <Link to={'/'} className='pt-2 font-hind font-700'>
                    powrót do strony głównej
                </Link>
            </div>
        </div>
    );
};

export default Login;