import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { toArray, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  configUrl = 'http://10.0.34.133:8081/api/';
  //configUrl = 'http://thserv207:8094/api/';
  constructor(private http: HttpClient) { }
  idService = 0;
  listService = [];
  getJsonWithParam(url: String, OBJ) {

    return this.http.get(this.configUrl + url, {
      withCredentials: true, params: OBJ,
      observe: 'response',
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    });
  }
  getJson(url: String) {
    this.idService = this.idService + 1;
    console.log("Id Service " + this.idService);
    let Service = this.http.get(this.configUrl + url, { withCredentials: true });
    this.listService.push(Service)
    return Service;
  }
  postJson(url: String, json: any) {
    const httpPostOptions =
    {
      headers:
        new HttpHeaders({
          "Content-Type": "application/json"
        }),
      withCredentials: true
    };
    return this.http.post(this.configUrl + url, json, httpPostOptions);
  }

  private getResponseData(resp: Response) {
    let data = resp.json();
    return data;
  }

  private handleError(err) {
    if (err instanceof Response) {
      let error = <Response>err;
      return Observable.throw(error.statusText + ': ' + error.json());
    }
    return Observable.throw(err);
  }
}

class top {
  TopType;
  TopCount;
  Duration;
  Sorting;
  OrderBy;
  GroupID;
  City;
}