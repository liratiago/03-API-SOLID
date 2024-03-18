import { CheckIn, Prisma, User } from "@prisma/client";

export interface CheckinsRepository{
    create (data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    findByUserOnDate(userId: string, date:Date): Promise<CheckIn | null> 
   
    findById(checkInId: string): Promise<CheckIn | null>
   
    countByUserId(userId: string): Promise<number>
    save(checkIn: CheckIn): Promise <CheckIn>
}

