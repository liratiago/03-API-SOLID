import { CheckIn, Prisma, User } from "@prisma/client";

export interface CheckinsRepository{
    create (data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    findByUserOnDate(userId: String, date:Date): Promise<CheckIn | null> 
}

