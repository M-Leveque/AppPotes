import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantService } from 'src/app/constant.service';

@Injectable()
export class AlbumService {
  
  httpOptions = {};
  url:string= "http://127.0.0.1:8000/api/albums";
  private album = {};
  private error;

  public constructor(
    private http : HttpClient,
    private constant: ConstantService
  )
  {
    if( localStorage.getItem('token') != undefined){
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      };
    }
  }

  public all(){
    return this.http.get<any>(this.url, this.httpOptions);
  }

  public get(id : Number) : Observable<any>{
    return this.http.get<any>(this.url+"/infos/"+id, this.httpOptions);
  }

  public getPhotos(id : Number) : Observable<any>{
    return this.http.get<any>(this.url+"/"+id, this.httpOptions);
  }

  public storeAlbum(album: any) : Observable<any>{
    return this.http.post<any>(this.url, album, this.httpOptions);
  }

  public delete(id: Number) : Observable<any>{
    return this.http.delete<any>(this.url+"/"+id, this.httpOptions);
  }
}