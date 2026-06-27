import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }
];

@NgModule({
  declarations: [AppComponent, LoginComponent, RegistroComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
