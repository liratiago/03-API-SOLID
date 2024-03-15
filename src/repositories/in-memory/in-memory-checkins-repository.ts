import { User, Prisma, CheckIn } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { CheckinsRepository } from "../checkins-repository";
import { randomUUID } from "node:crypto";
import dayjs from 'dayjs';

export class InMemoryCheckinsRepository implements CheckinsRepository{
  
    public items: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        }

        this.items.push(checkIn)
        return checkIn
    }
    
    async findByUserOnDate(userId: String, date: Date) {
        
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkInOnSameDay = this.items.find ( (checkIn) => {
            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
            
            return checkIn.user_id === userId &&  isOnSameDate
        })
            
    
        if (!checkInOnSameDay){
            return null
        }

        return checkInOnSameDay
    }

}