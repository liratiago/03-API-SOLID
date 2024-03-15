import { CheckIn, Prisma, User } from "@prisma/client";

export interface CheckinsRepository{
    create (data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    //findByGym(email: String): Promise<CheckIn | null> 
    findByUserOnDate(userId: String, date:Date): Promise<CheckIn | null> 
}

