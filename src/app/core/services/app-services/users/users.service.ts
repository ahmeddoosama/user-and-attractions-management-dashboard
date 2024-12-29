import { Injectable } from '@angular/core';
import { User } from '@core/models/user/user.clss';
import { IUser, IUsersResponse } from '@core/interfaces/auth.interface';
import { CoreRequestService } from '@core/services/api-services/core-request/core-request.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private coreRequest: CoreRequestService
  ) { }

  /**
   * Get users with pagination and filtering
   * @param params Query parameters for users
   * @returns Observable of user array
   */
  getUsers(page?: number, per_page?: number, search?: string, sort?: string, order?: string): Observable<IUsersResponse> {
    const data: { page?: number, per_page?: number, search?: string, sort?: string, order?: string } = {};

    data['page'] = page ?? 1;
    data['per_page'] = per_page ?? 10;

    if (search) {
      data['search'] = search;
    }

    if (sort) {
      data['sort'] = sort;
    }

    if (order) {
      data['order'] = order;
    }

    return this.coreRequest.get(User.BaseUrl, data);
  }

  /**
   * Get a single user by ID
   * @param id User ID
   * @returns Observable of single user
   */
  getUser(id: number): Observable<IUser> {
    return this.coreRequest.get(`${User.BaseUrl}/${id}`);
  }

  /**
   * Create a new user
   * @param user User data
   * @returns Observable of created user
   */
  createUser(user: IUser): Observable<IUser> {
    return this.coreRequest.post(user, User.CreateUrl);
  }

  /**
   * Update an existing user
   * @param user User data with ID
   * @returns Observable of updated user
   */
  updateUser(user: IUser): Observable<IUser> {
    return this.coreRequest.put(user, User.UpdateUrl);
  }

  /**
   * Delete a user by ID
   * @param id User ID
   * @returns Observable of deletion result
   */
  deleteUser(id: number): Observable<any> {
    const formData = { id: id };
    return this.coreRequest.delete(formData, User.DeleteUrl);
  }

}
