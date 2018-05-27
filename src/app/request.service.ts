import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

@Injectable()
export class RequestService {

    constructor(
        private _http: Http
    ) {}

    get(url: string) {
        return this._http.get(url)
            .timeout(20000)
            .map(res => res.json())
            .toPromise()
    }

    post(url: string, data?: object) {
        return this._http.post(url, data)
            .timeout(20000)
            .map(res => res.json())
            .toPromise()
    }

}

// @Injectable()
// export class Request {

//     private _domain: string = "https://app.ticketphone.com.br/webrun/";
//     private _urlEnd: string = ".rule?sys=EVS";

//     constructor(private _http: Http){}

//     // CALL REQUEST (POST)
//     public call(webservice: string, data?: any, toJson?: boolean) {
//         return this._http
//                     .post(this._domain + webservice + this._urlEnd, this._queryData(data), this._getOptions())
//                     .timeout(60000)
//                     .map(response => toJson === false ? response.text() : this._encodeJson(response))
//                     .toPromise();
//     }
    
//     // UPLOAD REQUEST (POST)
//     public upload(webservice: string, data: any) {
//         return this._http
//                     .post(this._domain + webservice + this._urlEnd, this._formData(data))
//                     .map(response => this._encodeJson(response))
//                     .toPromise();
//     }

//     // HEADER / OPTIONS
//     private _getOptions(file: boolean = false) {
//         let headers = new Headers();
//         headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
//         return new RequestOptions({headers: (headers)});
//     }

//     // REQUEST STANDART DATA FORMAT
//     private _queryData(data: any) {
//         var str = [];
//         for(var d in data) {
//             str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
//         }
//         return str.join("&");
//     }

//     // REQUEST FILE DATA FORMAT
//     private _formData(data: any) {
//         let fileData = new FormData();
//         for(var d in data) {
//             fileData.append(d, data[d]);
//         }
//         return fileData;
//     }

//     //  GET FILE EXTENSION
//     private _ext(s: string) {
//         return s.substr(s.lastIndexOf(".") + 1, s.length);
//     }

//     // RESPONSE DATA ENCODE JSON
//     private _encodeJson = function (data) {
//         return JSON.parse(
//             data.text()
//                 .replace(/\n/g, "")
//                 .replace(/\r/g, "")
//                 .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
//         );
//     }

// }