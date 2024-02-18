import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Comp1Component } from './comp1/comp1.component';
import { Comp2Component } from './comp2/comp2.component';
import { Comp3Component } from './comp3/comp3.component';
import { BlogDetailsCompComponent } from './blog-details-comp/blog-details-comp.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { routerGuardGuard } from './router-guard.guard';

const routes: Routes = [
  {path:'blogs',component:Comp1Component},
  {path:'myblogs',component:Comp2Component,canActivate:[routerGuardGuard]},
  {path:'createBlogs',component:Comp3Component,canActivate:[routerGuardGuard]},
  {path:'createBlogs/:data',component:Comp3Component,canActivate:[routerGuardGuard]},
  {path:'details',component:BlogDetailsCompComponent},
  {path:'details/:id',component:BlogDetailsCompComponent,canActivate:[routerGuardGuard]},
  {path:'login',component:LoginComponentComponent},
  {path:'register',component:RegisterComponentComponent},
  {path:'',redirectTo:'blogs',pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
