export interface Promotion{
  vacancyId: string,
  positionId: string,
  levelId: string,
  branchId: string,
  empId: string,
  startDate: string,
    status:Number,
    pId:number,
    id: string,
  createdBy?: String, 
    createdDate?: String, 
    updatedDate: String, 
    updatedBy: String, 
}
export interface PromotionRelation{
  vacancyId: string,
  approvedDate: string,
  promotionStatus:string,
  File:string,
  empId: string,
    status:Number,
    evaluation:string,
    pId:number,
    id: string,
  createdBy?: String, 
    createdDate?: String, 
    updatedDate: String, 
    updatedBy: String, 
    
}