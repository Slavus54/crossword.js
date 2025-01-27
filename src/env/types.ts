export type RouteItemType = {
    title: string
    url: string
    component: any
    isAuth: boolean | null
}

// engine

export type EstimateTaskType = (length: number, isIncludeLetter?: boolean, level?: string) => number

export type WordTableType = {
    text: string
    word: string
    category: string
    type: string
    level: string
    length: number
}