import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private urlApi = environment.url;
constructor(private http: HttpClient) { 
  
}
  buyProducts(url: string, body?: any): Observable<any>{
    return this.http.put(`${this.urlApi}${url}`, body)
  }


  // getСourseUSD(url: string, method: string): Observable<any>{
  //   // const headers = new HttpHeaders()
  //   // headers.append("Content-Type", "application/json");
  //   // headers.append('Access-Control-Allow-Origin', '*');
  //   // headers.append('Access-Control-Allow-Credentials', 'true');
  //   // headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  //   // headers.append('Access-Control-Allow-Headers', 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,Origin,Accept,Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin');


    // return this.http.get(url, {headers: headers})
    //return this.http.get(url)
    // let req = new XMLHttpRequest();
    // req.open(method, url, false);
    // req.overrideMimeType('text/json');
    // req.send();
    // if (req.status != 200) {
    //   alert('Ошибка ' + req.status + ': ' + req.statusText);
    // } else {
    //    console.log(JSON.parse(req.response));
        
    // }  
  // }

}
