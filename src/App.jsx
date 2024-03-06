import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import { AdminPanelStateProvider } from './store/StateProvider';
import { ProvideAuth } from './auth/UseProvideAuth';
import Layout from './Layout';
import Dashboard from './views/Dashboard';
import UserFormView from './views/UserFormView';
import UserDetails from './views/UserDetails';
import PersonalDataForm from './components/Organism/Forms/PersonalDataForm';
import ContactDataForm from './components/Organism/Forms/ContactDataForm';
import UserRegisterForm from './components/Organism/Forms/UserRegisterForm';
import SummaryForm from './components/Organism/Forms/SummaryForm';
import EditUserForm from './components/Organism/Forms/EditUserForm';
import ProtectedRoute from './authActions/ProtectedRoute';
import Login from './views/Login';
import ForgetPassword from './authActions/ForgetPassword';
import AuthActions from './authActions/AuthActions';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/login' element={<Login />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/auth/action' element={<AuthActions />} />
            <Route element={<ProtectedRoute role='admin' />}>
                <Route path='/' element={<Layout />}>
                    <Route element={<Dashboard />} index />
                    <Route path='add-user' element={<UserFormView />}>
                        <Route path='personal-data' element={<PersonalDataForm />} index />
                        <Route path='contact-data' element={<ContactDataForm />} />
                        <Route path='register' element={<UserRegisterForm />} />
                        <Route path='summary' element={<SummaryForm />} />
                    </Route>

                    <Route path='user-details'>
                        <Route path=':id' element={<UserDetails />} index />
                        <Route path=':id' element={<UserFormView />}>
                            <Route path='edit' element={<EditUserForm />} />
                            <Route path='edit-credentials' element={<UserRegisterForm edit />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </>,
    ),
);

function App() {
    return (
        <AdminPanelStateProvider>
            <ProvideAuth>
                <RouterProvider router={router} />
            </ProvideAuth>
        </AdminPanelStateProvider>
    );
}

export default App;
