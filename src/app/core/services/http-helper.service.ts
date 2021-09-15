import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpHelper {
  public constructParams(obj: object): HttpParams {
    let params = new HttpParams();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        if (val != null && val !== '' && typeof val !== 'undefined') {
          params = params.append(key, val ? val.toString() : val);
        }
      }
    }

    return params;
  }
}
