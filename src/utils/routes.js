export const routes = [
    { path: '/', breadcrumb: 'dashboard' },
    { path: '/add-user/personal-data', breadcrumb: 'dane osobowe' },
    { path: '/add-user/contact-data', breadcrumb: 'dane kontaktowe' },
    { path: '/add-user/register', breadcrumb: 'zarejestruj użytkownika' },
    { path: '/add-user/summary', breadcrumb: 'podsumowanie' },
    { path: '/user-details/:id', breadcrumb: 'użytkownik' },
    { path: '/user-details/:id/edit', breadcrumb: 'edytuj użytkownika' },
    { path: '/user-details/:id/edit-credentials', breadcrumb: 'przywróć hasło' },
];
