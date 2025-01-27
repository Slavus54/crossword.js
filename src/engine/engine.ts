//@ts-ignore
import {Codus} from 'codus.js' 
import {LEVELS, INCLUDE_MULTIPLIER, abc} from "@/env/env"
import {EstimateTaskType} from "@/env/types"

const codus = new Codus()

export const onEstimateTask: EstimateTaskType = (length = 1e1, isIncludeLetter = true, level = LEVELS[0]) => {
    let result = 0
    let index = LEVELS.indexOf(level) + 1

    result = length * index

    if (isIncludeLetter) {
        result *= INCLUDE_MULTIPLIER
    }

    result = codus.round(result)

    return result
}

export const onGetRandomTask = (items: any[]) => {
    let result = items[Math.floor(items.length * Math.random())]

    return result
}

export const onChooseRandomLetter = () => {
    let result = abc[Math.floor(abc.length * Math.random())]

    return result
}