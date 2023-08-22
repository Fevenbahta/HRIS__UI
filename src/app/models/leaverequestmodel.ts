export interface LeaveRequest{
    pId:number;
    id?: string;
  createdBy: string,
  createdDate: string,
  updatedDate: string,
  updatedBy: string,
  status:number,
  empId: string,
  leaveTypeId: string,
  startDate:string,
  endDate: string,
  approvedBy: string,
  approvedDate:string,
  leaveStatus:string,

}
export interface LeaveBalance{
  pId:number;
  id?: string;
createdBy: string,
createdDate: string,
updatedDate: string,
updatedBy: string,
status:number,
empId: string,
leaveTypeId: string,
startDate:string,
endDate: string,
defaultBalance:number,
remainingBalance:number,
isExpired:number

}

