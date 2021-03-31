import { EntitySchema } from 'typeorm';

export interface User { 
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}

export const UserEntity = new EntitySchema<User>({
    name: 'user',
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        age: {
            type: Number
        }
    }
});