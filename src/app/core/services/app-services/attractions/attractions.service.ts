import { Injectable } from '@angular/core';
import { IAttraction, IAttractionsResponse } from '@core/interfaces/attraction.interface';
import { Attraction } from '@core/models/attraction/attraction.class';
import { CoreRequestService } from '@core/services/api-services/core-request/core-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {

  constructor(
    private coreRequest: CoreRequestService
  ) { }

  /**
   * Get attractions with pagination and filtering
   * @param params Query parameters for attractions
   * @returns Observable of attraction array
   */
  getAttractions(page?: number, per_page?: number, search?: string, sort?: string, order?: string): Observable<IAttractionsResponse> {
    const data: { page?: number, per_page?: number, search?: string, sort_column?: string, sort_order?: string } = {};

    data['page'] = page ?? 1;
    data['per_page'] = per_page ?? 10;

    if (search) {
      data['search'] = search;
    }

    if (sort) {
      data['sort_column'] = sort;
    }

    if (order) {
      data['sort_order'] = order;
    }

    return this.coreRequest.get(Attraction.BaseUrl, data);
  }

  /**
   * Get a single attraction by ID
   * @param id Attraction ID
   * @returns Observable of single attraction
   */
  getAttraction(id: number): Observable<IAttraction> {
    return this.coreRequest.get(`${Attraction.BaseUrl}/${id}`);
  }

  /**
   * Create a new attraction
   * @param attraction Attraction data
   * @returns Observable of created attraction
   */
  createAttraction(attraction: IAttraction): Observable<IAttraction> {
    return this.coreRequest.post(attraction, Attraction.CreateUrl);
  }

  /**
   * Update an existing attraction
   * @param attraction Attraction data with ID
   * @returns Observable of updated attraction
   */
  updateAttraction(attraction: IAttraction): Observable<IAttraction> {
    return this.coreRequest.put(attraction, Attraction.UpdateUrl);
  }

  /**
   * Delete a attraction by ID
   * @param id Attraction ID
   * @returns Observable of deletion result
   */
  deleteAttraction(id: number): Observable<any> {
    const formData = { id: id };
    return this.coreRequest.delete(formData, Attraction.DeleteUrl);
  }
}
