import {Component, OnInit, signal} from '@angular/core';
import {FormControl} from '@angular/forms';
import {LoginForm} from '../../components/login-form/login-form';
import {RegisterForm} from '../../components/register-form/register-form';

type tab = 'login' | 'register';

@Component({
  selector: 'app-login',
  imports: [LoginForm, RegisterForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  hasEimzo = signal<boolean>(false);

  readonly eriControl = new FormControl('');

  currentTab = signal<tab>('login');

  switchTab(tab: tab): void {
    this.currentTab.set(tab);
  }

}
