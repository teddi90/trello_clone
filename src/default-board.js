import { v4 as uuidv4 } from 'uuid';

export  default {
    name:'workshop',
    columns: [
        {
            name: 'todo',
            tasks: [
                {
                    description: '',
                    name: 'First task',
                    id: uuidv4(),
                    userAssigned: null
                },
                {
                    description: '',
                    name: 'Second task',
                    id: uuidv4(),
                    userAssigned: null
                },
            ]
        },
        {
            name: 'in-progress',
            tasks: [
                {
                    description: '',
                    name: 'Home work',
                    id: uuidv4(),
                    userAssigned: null
                },
                {
                    description: '',
                    name: 'Shopping',
                    id: uuidv4(),
                    userAssigned: null
                },
            ]
        },
        {
            name: 'done',
            tasks: [
                {
                    description: '',
                    name: 'Workout',
                    id: uuidv4(),
                    userAssigned: null
                },
                {
                    description: '',
                    name: 'Eat vegetables',
                    id: uuidv4(),
                    userAssigned: null
                },
            ]
        },
    ]
}