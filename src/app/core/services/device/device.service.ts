import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

export interface DeviceSession {
  id: string;
  deviceName: string;
  deviceType: 'laptop' | 'mobile' | string;
  lastActiveDate: string;
  isCurrentSession: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DeviceSessionService {
  http = inject(HttpClient);
  apiUrl = `${environment.apiUrl}/device`;

  getAllSessions(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}.all-sessions?userId=${userId}`);
  }
  getActiveSessions(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/active-sessions?userId=${userId}'`);
  }

  deactivateSession(userId: string, deviceId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/deactivate`, { userId, deviceId });
  }
}
