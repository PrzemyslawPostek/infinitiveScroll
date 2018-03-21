import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

private apiURL: string = 'https://pixabay.com/api/?key=8292855-37b60a4ae32a433705ba8fe6e&q=tree&pretty=true';

private configUrl = 'assets/config.json';

result: any = {};

  constructor(private _http: Http){
  }
  
 getData(){
   return this._http.get(this.apiURL);
  //  .map(result => this.result = result.json());

   /*
   var ids:string = [];

  for(let result of this.results){
   ids.push(result.Id);
}
   */
 }
}
