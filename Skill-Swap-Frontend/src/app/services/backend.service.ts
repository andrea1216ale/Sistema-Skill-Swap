import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BackendService {
  private base = environment.apiUrl;
  constructor(private http: HttpClient) {}

  register(payload: any) {
    return this.http.post(`${this.base}/registro`, payload);
  }

  // Add more methods for login, fetch, etc.
}
