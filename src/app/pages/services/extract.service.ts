import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExtractService {

  constructor(public httpClient: HttpClient) {
  }

  launchExtraction(body : string): Observable<any> {
    return this.httpClient.post<any>(`${environment.API_URL}/extractFromIdCard`, {'Image': body})
  }

  getData(): Observable<any> {
    return this.httpClient.get<any>(`${environment.API_URL}/getdata`)
  }

  refactorData(data: string){
    let bodyContent = [];
    let refactorData : any = {}
    bodyContent = data.split(',');
    bodyContent[0] = bodyContent[0].substring(1, bodyContent[0].length)
    bodyContent[bodyContent.length-1] = bodyContent[bodyContent.length-1].substring(0, bodyContent[bodyContent.length-1].length-1)
    for (let bodyContentElement of bodyContent) {
      const inter = bodyContentElement.split(':');
      refactorData[inter[0]] = inter[1];
    }

    return refactorData;
  }
}
