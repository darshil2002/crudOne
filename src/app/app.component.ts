import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { education } from './education.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from './services/employee.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 
                                'firstName',
                                'lastName',
                                'email',
                                'dob',
                                'gender',
                                'education',
                                'company',
                                'experience',
                                'package',
                                'action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator; 
  @ViewChild(MatSort) sort !: MatSort;

  constructor (private _matDailog:MatDialog, private _employeeService:EmployeeService) {}

  ngOnInit(): void {
    this._employeeService.getEmployeeArray().subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource=new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error:(error)=>{
        alert('can not fetch the data')
      },
      complete:()=>{
        console.log('this main get api observable is completed')
      }
    })
    this._employeeService.newEmployeeArray.subscribe((res)=>{
      this.dataSource=res
    })

  }

  openDailog(){
    // console.log('working')
    this._matDailog.open(AddEditComponent)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmpoyee(index:number){
    // console.log('delete works : )')
    this._employeeService.deleteEmployee(index).subscribe(
      {
        next:(res)=>{
          alert('your data is deleted')
          this._employeeService.updateArray()
        },
        error:(error)=>{
          alert(error)
        }
      }
    )
  }
  editEmployee(data:any){
    this._matDailog.open(AddEditComponent,{data})
  }

  openEditDailog(){
    // console.log('working')
    this._matDailog.open(AddEditComponent)
  }

}
