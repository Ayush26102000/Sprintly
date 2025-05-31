import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

    getEmailFromToken(token: string | null): string | null {
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    return email ?? null;
  }

}
