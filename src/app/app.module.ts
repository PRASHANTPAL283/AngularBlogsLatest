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


@NgModule({
  declarations: [
    AppComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component,
    DescriptionLimiterPipe,
    BlogDetailsCompComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:DataInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
