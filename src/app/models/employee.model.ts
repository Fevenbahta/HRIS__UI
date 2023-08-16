export interface Employee{
     pId: Number;
     createdBy: string;
     createdDate: string | null; // Make createdDate nullabel
     updatedDate: string| null;
    updatedBy: String, 
    empId: string, 
    ecxId: String, 
    adId: String, 
    firstName: string, 
    middleName: string, 
    lastName: string, 
    joinDate: String, 
    sex: String, 
    dateOfBityh: String,
    placeOfBith: String, 
    martialStatus: String, 
    salutation: String, 
    nationality: String, 
    pensionNo: String, 
    imageData: String, 
    crime: Boolean, 
    crimeDescription: String ,
  
    status:number;
}
export interface Supervisor{

    createdBy: String, 
    createdDate:String, 
    updatedDate: String, 
    updatedBy: String, 
    id: string, 
    pId: number;
  positionId: string,
  supervisorLevel: string;
  status:number;

}

  