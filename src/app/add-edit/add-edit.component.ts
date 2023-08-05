import { Component, Inject, OnInit } from '@angular/core';
import { education } from '../education.model';
import {  FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent  implements OnInit{
  
  formGroup!:FormGroup;

  educationArray:education[]=[
    new education('1','SSC'),
    new education('2','HSC'),
    new education('3','Graduate'),
    new education('4','Post Graduate'),
  ]

  constructor(private formBuilder: FormBuilder,
              private _employee:EmployeeService,
              private _dailogRef:DialogRef<AddEditComponent> ,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience :'',
      package:''
    })
    
    this.formGroup.patchValue(this.data)
  }
  onSubmit(){
    let formValue=this.formGroup.value;

    if(!this.data){
    if(this.formGroup.valid){
      this._employee.postEmployee(formValue).subscribe({
        next:()=>{
          // alert('employee added succsessfully ')
          this._dailogRef.close()
          this._employee.updateArray()
        },
        error:(error)=>{
          console.log(error)
        }
      })
    }
  }
  else{
    this._employee.editEmployee(this.data.id,formValue).subscribe({
      next:(res)=>{
        alert('your new emp data is updated')
        this._dailogRef.close()
        this._employee.updateArray()
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
    
  }
  
  closeDailog(){
    this._dailogRef.close()
  }

}
