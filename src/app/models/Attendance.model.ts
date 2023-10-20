export interface Attendance {
  createdBy: string;
  createdDate: Date;
  updatedDate: Date;
  updatedBy: string;
  attendanceId: string;
  empId: string;
  date: Date;
  timeTable: string;
  onDuty: string;
  offDuty: string;
  clockIn: string;
  clockOut:string;
  department: string;
  normall: number;
  realTime: number;
  late: number;
  earl: number;
  status: number;
  attendanceStatus: string;
  absentDays: number;
  leaveType: string;
}
