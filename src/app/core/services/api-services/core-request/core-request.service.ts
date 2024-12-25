import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreRequestService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  /**
   * post
   * @function
   * @param {Object} formData [data form]
   * @param {String} path [url to post to] optional
   * @param {Object} dataSearch [data search params]
   * @return Observable request
   */
  public post(
    formData: object,
    path?: string,
    dataSearch?: any,
    reqHeaders?: any,
    responseCustomType?: string
  ): Observable<any> {
    const url = `${this.baseUrl}${path}`;

    const options: any = {
      headers: reqHeaders,
      observe: 'body',
      params: new HttpParams({ fromObject: dataSearch }),
      reportProgress: false,
      responseType: responseCustomType ? responseCustomType : 'json',
      withCredentials: false,
    };

    return this.http.post(url, formData, options);
  }

  /**
   * get
   * @function [get http request]
   * @param {String} path [Optional path to get from]
   * @param {Any} data [Optional data search params]
   * @return outPut request
   */
  public get(
    path?: string,
    data?: any,
    reqHeaders?: any,
    responseCustomType?: string
  ): Observable<any> {
    const url = `${this.baseUrl}${path}`;
    const options: any = {
      headers: reqHeaders,
      observe: responseCustomType ? 'response' : 'body',
      params: new HttpParams({ fromObject: data }),
      responseType: responseCustomType ? responseCustomType : 'json',
      withCredentials: false,
    };

    return this.http.get(url, options);
  }

  /**
   * put
   * @function [put http request]
   * @param {Any} formData [form data]
   * @param {String} path [Optional path to put]
   * @param {Object} data [Optional data to put by]
   * @return outPut request
   */
  public put(
    formData: any,
    path?: string,
    dataSearch?: any,
    reqHeaders?: any,
    responseCustomType?: string
  ): Observable<any> {
    const url = `${this.baseUrl}${path}`;

    const options: any = {
      headers: reqHeaders,
      observe: 'body',
      params: new HttpParams({ fromObject: dataSearch }),
      reportProgress: false,
      responseType: responseCustomType ? responseCustomType : 'json',
      withCredentials: false,
    };

    return this.http.put(url, formData, options);
  }

  public patch(
    formData: any,
    path?: string,
    dataSearch?: any,
    reqHeaders?: any,
    responseCustomType?: string
  ): Observable<any> {
    const url = `${this.baseUrl}${path}`;
    const options: any = {
      headers: reqHeaders,
      observe: 'body',
      params: new HttpParams({ fromObject: dataSearch }),
      reportProgress: false,
      responseType: responseCustomType ? responseCustomType : 'json',
      withCredentials: false,
    };

    return this.http.patch(url, formData, options);
  }

  /**
   * delete
   * @function [delete http request]
   * @param {Object} path [Optional path to delete request]
   * @param {Any} data [Optional data to deleted by]
   * @return outPut request
   */
  public delete(path?: string, dataSearch?: any) {
    const url = `${this.baseUrl}${path}`;

    const options: any = {
      observe: 'body',
      params: new HttpParams({ fromObject: dataSearch }),
      reportProgress: false,
      responseType: 'json',
      withCredentials: false,
    };

    return this.http.delete(url, options);
  }
}
