import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserbookListComponent } from './userbook-list/userbook-list.component';
//import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
    
      {path:'book',component:BookListComponent},
      {path:'add-Book',component:AddBookComponent},
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'update-book/:id',component:UpdateBookComponent},
      {path:'book-details/:id',component:BookDetailsComponent},
      {path:'home',component:HomeComponent},
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'userbook',component:UserbookListComponent},



    
];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutes { }
