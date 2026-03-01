import { Component, signal,  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginForm } from "../../components/login-form/login-form";

type tab='login'|'register'

@Component({
  selector: 'app-login',
  imports: [LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

hasEimzo = signal<boolean>(false);


readonly eriControl = new FormControl('');

currentTab=signal<tab>('login')

switchTab(tab:tab):void{
   this.currentTab.set(tab)
}

  

}
