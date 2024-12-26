import { Injectable } from '@angular/core';
import { IAuthModel, IAuthResponse } from '@core/interfaces/auth/auth.interface';
import { Auth } from '@core/models/auth/auth.class';
import { CoreRequestService } from '@core/services/api-services/core-request/core-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private coreRequest: CoreRequestService
  ) { }

  signIn(formData: IAuthModel): Observable<IAuthResponse> {
    return this.coreRequest.post(formData, Auth.BaseUrl);
  }
}
