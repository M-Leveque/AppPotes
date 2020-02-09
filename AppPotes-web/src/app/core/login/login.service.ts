import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantService } from 'src/app/constant.service';

@Injectable()
export class LoginService {
  
  url:string= "http://127.0.0.1:8000/api/login";

  public constructor(private http : HttpClient,
    private constant: ConstantService){}

  public login(data: any) : Observable<any>{
    return this.http.post<any>(this.url, data);
  }
}