import { createMemoryHistory, createRouter } from 'vue-router'

import Board from "@/components/Board.vue";
import Task from "@/components/Task.vue";

const routes = [
    {
        path: '/',
        name: 'board',
        component: Board,
        children: [
            {
                path:'task/:id',
                name:'task',
                component:Task,
                props:true,
            }
        ]
    },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router