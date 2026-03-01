import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

export const routes: Routes = [
    {
        path:'',
        component:AuthLayout,
        children:[
            {
            path:'',
            redirectTo:'login',
            pathMatch:'full'
            },
            {
                path:'login',
                loadComponent:()=>import('../app/features/auth/pages/login/login').then(m=>m.Login)
            }
        ]
    }
];
