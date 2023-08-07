export interface Division{
  pid:number;
    divisionId: string;
departmentId:String
    description:string;
  createdBy: string,
  createdDate: string,
  updatedDate: string,
  updatedBy: string,

}
export interface Step{
  pId: number,
  id: string,
 salary: number,
salaryTypeId: String,
levelId: string;
 description:string;
createdBy: string,
createdDate: string,
updatedDate: string,
updatedBy: string,
status:0,

}
export interface Position{

  pId: number,
  divisionId: string;
  status:number;
positionId: string,
name: string,
description:string;
createdBy: string,
createdDate: string,
updatedDate: string,
updatedBy: string,

}
export interface EmployeePosition{
  pid:number;
  id: string,
  empId:string;
  divisionId:string,
  stepId: string,
  branchId: string,
  position: string,
  status:0,
  startDate: String,
  endDate: String
createdBy: string,
createdDate: string,
updatedDate: string,
updatedBy: string,

}
export interface Branch{
  pid:number;
  id: string,
  name: string,
  city: string,
createdBy: string,
createdDate: string,
updatedDate: string,
updatedBy: string,
status:number;

}

export interface Grade{
  levelId: string,
  positionId: string,
  description: string,
createdBy: string,
createdDate: string,
updatedDate: string,
updatedBy: string,
status:number;

}
export interface EducationLevel{

educationName:string;
pid:Number;
  id: string,
createdBy: string,
createdDate: string,
updatedDate: string,
updatedBy: string,
status:number;

}