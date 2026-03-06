import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/user`;

  changePhone(id: string, newPhone: string): Observable<any> {
    const body = {
      id: id,
      'new-phone': newPhone,
    };

    return this.http.put(`${this.apiUrl}/change-phone`, body);
  }

  changePassword(data: {
    user_id: string;
    old_password: string;
    new_password: string;
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/save`, data);
  }

  saveUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, userData);
  }

  getPersonInfo(pnfl: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/person-info`, { pnfl });
  }
  getUserById(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.get(`${this.apiUrl}/id`, { params });
  }
}
