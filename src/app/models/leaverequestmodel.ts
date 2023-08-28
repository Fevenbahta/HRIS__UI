export interface LeaveRequest{
    pId:number;
    leaveRequestId?: string;
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
startDate:string,
endDate: string,
isExpired:number,
annualDefaultBalance: number,
annualRemainingBalance: number,
previousYearAnnualBalance: number,
sickDefaultBalance: number,
sickRemainingBalance: number,
maternityDefaultBalance: number,
maternityRemainingBalance: number,
paternityDefaultBalance: number,
paternityRemainingBalance: number,
compassinateDefaultBalance: number,
compassinateRemainingBalance: number,
educationDefaultBalance: number,
educationRemainingBalance: number,
marriageDefaultBalance: number,
marraiageRemainingBalance: number,
leaveWotPayDefaultBalance: number,
leaveWotPayRemainingBalance: number,
courtLeaveDefaultBalance: number,
courtLeaveRemainingBalance: number,
sickEndDate: string,



}

