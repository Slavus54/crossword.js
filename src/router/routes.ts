import {Home} from '@/components/pages/Home'
import {Crossword} from '@/components/pages/Crossword'
import {Fillword} from '@/components/pages/FIllword'

import {RouteItemType} from '@/env/types'

export const routes: RouteItemType[] = [
    {
        title: 'Главная',
        url: '/',
        component: Home,
        isAuth: null
    },
    {
        title: 'Кроссворд',
        url: '/crossword',
        component: Crossword,
        isAuth: null
    },
    {
        title: 'Филворд',
        url: '/fillword',
        component: Fillword,
        isAuth: null
    }
]