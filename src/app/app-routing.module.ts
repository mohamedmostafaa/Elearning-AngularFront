import { MessageComponent } from './pages/message/message.component';
import { AllCourComponent } from './pages/all/all-cour/all-cour.component';
import { SearchComponent } from './pages/search/search.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { EditCoursTeacherComponent } from './pages/gestion/gestion-cours/edit-cours-teacher/edit-cours-teacher.component';
import { SavedCoursesComponent } from './pages/saved-courses/saved-courses.component';
import { LiveStrmingComponent } from './pages/live-strming/live-strming.component';
import { TeachersComponent } from './information/teachers/teachers.component';
import { AboutComponent } from './information/about/about.component';
import { ContactUsComponent } from './information/contact-us/contact-us.component';
import { AuthGuard } from './services/auth-guard.service';
import { SettingComponent } from './pages/setting/setting.component';
import { CertifRepComponent } from './pages/certif-rep/certif-rep.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ForumComponent } from './pages/forum/forum.component';
import { AddQcmComponent } from './pages/gestion/add-qcm/add-qcm.component';
import { CertificationTestComponent } from './pages/certification-test/certification-test.component';
import { AddCoursComponent } from './pages/gestion/add-cours/add-cours.component';
import { GestionCoursComponent } from './pages/gestion/gestion-cours/gestion-cours.component';
import { Error404Component } from './pages/error404/error404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './login/forgotpassword/forgotpassword.component';
import { GestionCategoriesComponent } from './pages/gestion/gestion-categories/gestion-categories.component';
import { CourDetailsComponent } from './pages/cour-details/cour-details.component';
import { TeacherGuard } from './services/teacher-guard.service';



const routes: Routes = [

{path:'',component:LayoutComponent,

canActivate:[AuthGuard],
children:[
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent},
  {path:'gestion-cours',component:GestionCoursComponent},
  {path:'editCoursTeacher/:id',component:EditCoursTeacherComponent},
  
  {path:'gestion-categories',component:GestionCategoriesComponent},
  {path:'add-cours',component:AddCoursComponent,canActivate:[ TeacherGuard ]},
  {path:'cour-detail/:id',component:CourDetailsComponent},
  {path:'certification-test/:id',component:CertificationTestComponent},
  {path:'add-qcm/:id',component:AddQcmComponent,canActivate:[ TeacherGuard ]},
  {path:'forum',component:ForumComponent},
  {path:'profil/:user_id',component:ProfileComponent},
 
  {path:'certifRep/:score/:idcour',component:CertifRepComponent},
  {path:'setting',component:SettingComponent},
  {path:'live-stream',component:LiveStrmingComponent},
  {path:'saved',component:SavedCoursesComponent},
  {path:'search/:query',component:SearchComponent},
  {path:'message',component:MessageComponent},
  {path:'notification',component:NotificationComponent},
  
  {path:'contact-us',component:ContactUsComponent},
  {path:'about',component:AboutComponent},
  {path:'list-teachers',component:TeachersComponent},
  {path:'all-cour',component:AllCourComponent},
]},
{path:'login',component:LoginComponent},
{path:'forgot_password',component:ForgotpasswordComponent},
{path:'signup',component:SignupComponent},
{path:'**',component:Error404Component},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
