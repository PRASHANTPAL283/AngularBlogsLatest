import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Comp1Component } from './comp1/comp1.component';
import { Comp2Component } from './comp2/comp2.component';
import { Comp3Component } from './comp3/comp3.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DescriptionLimiterPipe } from './description-limiter.pipe';
import { BlogDetailsCompComponent } from './blog-details-comp/blog-details-comp.component';
import { DataInterceptorInterceptor } from './data-interceptor.interceptor';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { DatePipeValuesConverterPipe } from './date-pipe-values-converter.pipe';
import { DateChangePipePipe } from './date-change-pipe.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FriendsComponent } from './ProfileFeatures/friends/friends.component';
import { AllPeoplesComponent } from './ProfileFeatures/all-peoples/all-peoples.component';
import { ChatsComponent } from './ProfileFeatures/chats/chats.component';
import { FollowersComponent } from './ProfileFeatures/followers/followers.component';
import { EditProfileComponent } from './ProfileFeatures/edit-profile/edit-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component,
    DescriptionLimiterPipe,
    BlogDetailsCompComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    DatePipeValuesConverterPipe,
    DateChangePipePipe,
    UserProfileComponent,
    FriendsComponent,
    AllPeoplesComponent,
    ChatsComponent,
    FollowersComponent,
    EditProfileComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
    }
    ),
    BrowserAnimationsModule,
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:DataInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
