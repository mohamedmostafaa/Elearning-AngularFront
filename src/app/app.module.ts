import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './login/login.component';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './login/forgotpassword/forgotpassword.component';

import { Error404Component } from './pages/error404/error404.component';
import { GestionCoursComponent } from './pages/gestion/gestion-cours/gestion-cours.component';
import { GestionCategoriesComponent } from './pages/gestion/gestion-categories/gestion-categories.component';
import { AddCoursComponent } from './pages/gestion/add-cours/add-cours.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { CourDetailsComponent } from './pages/cour-details/cour-details.component';
import { CertificationTestComponent } from './pages/certification-test/certification-test.component';
import { AddQcmComponent } from './pages/gestion/add-qcm/add-qcm.component';
import { ForumComponent } from './pages/forum/forum.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CertifRepComponent } from './pages/certif-rep/certif-rep.component';
import { SettingComponent } from './pages/setting/setting.component';
import { ContactUsComponent } from './information/contact-us/contact-us.component';
import { AboutComponent } from './information/about/about.component';
import { TeachersComponent } from './information/teachers/teachers.component';
import { LiveStrmingComponent } from './pages/live-strming/live-strming.component';
import { SavedCoursesComponent } from './pages/saved-courses/saved-courses.component';
import { MessageComponent } from './pages/message/message.component';
import { EditCoursTeacherComponent } from './pages/gestion/gestion-cours/edit-cours-teacher/edit-cours-teacher.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { LikeComponent } from './pages/like/like.component';
import { SearchComponent } from './pages/search/search.component';
import { AllCourComponent } from './pages/all/all-cour/all-cour.component';
import { DaysAgoPipe } from './pipes/days-ago.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
   SignupComponent,
   ForgotpasswordComponent,
  
   Error404Component,

  
   GestionCoursComponent,
  
   GestionCategoriesComponent,
  
   AddCoursComponent,
  
   CourDetailsComponent,
  
   CertificationTestComponent,
  
   AddQcmComponent,
  
   ForumComponent,
  
   ProfileComponent,
  
   CertifRepComponent,
  
   SettingComponent,
  
   ContactUsComponent,
  
   AboutComponent,
  
   TeachersComponent,
  
   LiveStrmingComponent,
  
   SavedCoursesComponent,
  
   MessageComponent,
  
   EditCoursTeacherComponent,
  
   NotificationComponent,
  
   LikeComponent,
  
   SearchComponent,
  
   AllCourComponent,
  
   DaysAgoPipe,
  
   

  

  
  
  
 


   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    }),
 
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot() ,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
