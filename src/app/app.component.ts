import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _departments = '../assets/department.json';
  private _subDepartments = '../assets/subdepartment.json';
  private _categories = '../assets/category.json';

  departments: any;
  subDepartments: any;
  categories: any;

  constructor(private http: HttpClient) {
    this.getDepartment().subscribe(data => {
      this.departments = data;
    });
    this.getSubDepartment().subscribe(data => {
      this.subDepartments = data;
    });
    this.getCategory().subscribe(data => {
      this.categories = data;
    });

  }

  ngOnInit(): void {

  }
selectedSubDepartments:any[]=[];
selectedDepartmentName:string='';
  filterSubDepartments(selectedDepName:string, departmentId: string) {
    window.scrollTo(0,0);
    this.selectedSubDepartments=[];
    this.selectedDepartmentName=selectedDepName;
    for(const subDep of this.subDepartments.rows){
      if (subDep?.department_id==departmentId){
        this.selectedSubDepartments.push(subDep);
      }
    }
  }

  selectedCategories:any[]=[];
  selectedSubDepartmentName:string='';

  filterCategory(selectedSubDepartmentName:string, subDepartmentId: string) {
    console.log(selectedSubDepartmentName);
    console.log(subDepartmentId);
    window.scrollTo(0,0);
    this.selectedSubDepartments=[];
    this.selectedCategories=[];
    this.selectedSubDepartmentName=selectedSubDepartmentName;
    for(const cat of this.categories.rows){
      if (cat.sub_department_id==subDepartmentId){
        this.selectedCategories.push(cat);
      }
    }
  }

  public getDepartment(): Observable<any> {
    return this.http.get(this._departments);
  }

  public getSubDepartment(): Observable<any> {
    return this.http.get(this._subDepartments);
  }

  public getCategory(): Observable<any> {
    return this.http.get(this._categories);
  }

}
