import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { UserBoardComponent } from './user-board/user-board.component';
import { ManagerBoardComponent } from './manager-board/manager-board.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { HomeComponent } from './home/home.component';
import { RoleGuard } from './_helpers/role.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'signup',component: SignupComponent },
    { path: 'login',component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { 
        path: 'user', component: UserBoardComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user','manager','admin']} // All roles can access
    },
    { 
        path: 'manager', component: ManagerBoardComponent,
        canActivate: [RoleGuard],
        data: { roles: ['manager','admin']} // Manager and admin can access
    },
    { 
        path: 'admin', component: AdminBoardComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin']}  // Only admin role can access
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent, // A component to show unauthorized access message
    },
    { path: '',redirectTo:'/home',pathMatch:'full' },
    { path:'**',component:PageNotfoundComponent }

];
