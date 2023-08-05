import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  newEmployeeArray= new Subject<any>()

  constructor(private _httpClient: HttpClient) { }
  private readonly apiUrl = 'http://localhost:3000/employees';

  
  getEmployeeArray():Observable<any>{
    return this._httpClient.get(this.apiUrl)
  }
  postEmployee(data:any):Observable<any>{
    // this.getNewArray()
    return this._httpClient.post(this.apiUrl,data);
  }
  editEmployee(index:number,data:any){
    return this._httpClient.put(`http://localhost:3000/employees/${index}`,data)
  }
  deleteEmployee(index:number):Observable<any>{
    return this._httpClient.delete(`http://localhost:3000/employees/${index}`)
  }


  updateArray(){
    this.newEmployeeArray.next(this._httpClient.get(this.apiUrl))
  }

  

}