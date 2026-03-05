import { Component } from '@angular/core';
import { GCard } from '../../../../shared/components/g-card/g-card';
import { NoData } from '../../../../shared/ui/no-data/no-data';

@Component({
  selector: 'app-login-history',
  imports: [GCard, NoData],
  templateUrl: './login-history.html',
  styleUrl: './login-history.scss',
})
export class LoginHistory {}
