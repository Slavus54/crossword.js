//@ts-ignore
import {Codus} from 'codus.js'
//@ts-ignore
import {Datus} from 'datus.js'

import {onGetWords} from '@/http/http' 
import {CROSSWORD_STORAGE_KEY, CROSSWORD_WORDS_STORAGE_LIMIT, ID_LENGTH, WORDS_STORAGE_KEY, LONGEST_WORD_KEY, FILLWORD_STORAGE_KEY} from "@/env/env"

const codus = new Codus()
const datus = new Datus()
const data = localStorage.getItem(CROSSWORD_STORAGE_KEY) 

export const onInitCrossword = (): any => {
    let result = data

    if (data === null) {
        localStorage.setItem(CROSSWORD_STORAGE_KEY, JSON.stringify({words: [], total: 0, mainword: '', width: 0, dateUp: datus.now('date')}))
    } else {
        result = JSON.parse(result)
    }

    return result
}

export const onAddCrosswordWord = (text: string, category: string, type: string, points: number, position: number = 0) => {
    let result: any = JSON.parse(data)
    let flag: boolean = true

    if (result.length >= CROSSWORD_WORDS_STORAGE_LIMIT) {
        flag = false
    }

    let word = result.words.find((el: any) => el.text === text)

    if (word !== undefined) {
        flag = false
    }

    if (flag) {
        localStorage.setItem(CROSSWORD_STORAGE_KEY, 
            JSON.stringify(
                {
                    words: [...result.words, {id: codus.id(ID_LENGTH), text, category, type, points, position}], 
                    total: result.total + points, 
                    mainword: result.mainword + text[position],
                    width: result.width < text.length ? text.length : result.width,
                    dateUp: datus.now('date')
                }
        ))
    }
}

export const onUpdateCrosswordWordPosition = (index = 1, position = 1) => {
    let result: any = JSON.parse(data)
    let text: string = ''

    result.words = result.words.map((el: any, idx: number) => {
        let flag: boolean = idx === index
        
        if (flag) {
            el.position = position
        } 
        
        text += el.text[flag ? position : el.position]

        return el
    })

    result.mainword = text

    localStorage.setItem(CROSSWORD_STORAGE_KEY, JSON.stringify(result))

    return result.mainword
}

export const onDeleteCrosswordWord = (id: string) => {
    let result: any = JSON.stringify(data)
    let word = result.words.find((el: any) => el.id === id)
    
    if (word !== undefined) {
        let length: number = word.text.length
        let difference: number = length

        if (length === result.width) {

            result.words.map((el: any) => {
                let value: number = el.text.length
                let size: number = Math.abs(value - result.width)

                if (size < difference) {
                    difference = size
                    length = value
                } 
            })
        }

        localStorage.setItem(CROSSWORD_STORAGE_KEY, JSON.stringify({words: result.words.filter((el: any) => el.id !== id), total: result.total - word.points, width: length, dateUp: datus.now('date')}))
    }
}

export const onDeleteAllCrosswordWords = () => localStorage.setItem(CROSSWORD_STORAGE_KEY, JSON.stringify({words: [], total: 0, mainword: '', width: 0, dateUp: datus.now('date')}))

// Longest word

export const onInitLongestWord = () => {
    let data = localStorage.getItem(LONGEST_WORD_KEY)

    if (data === null) {
        localStorage.setItem(LONGEST_WORD_KEY, JSON.stringify({title: '', category: '', size: 0}))
    } else {
        data = JSON.parse(data)
    }

    return data
}

export const onUpdateLongestWord = (title: string, category: string, size: number) => localStorage.setItem(LONGEST_WORD_KEY, JSON.stringify({title, category, size}))

// Fillword

export const onInitFillword = (word = '') => {
    let data: any = localStorage.getItem(FILLWORD_STORAGE_KEY)

    if (data !== null) {
        data = JSON.parse(data)
    }

    if (word !== '') {
        localStorage.setItem(FILLWORD_STORAGE_KEY, JSON.stringify({word, attempts: [], total: 0}))

        data = {word, attempts: [], total: 0}
    }

    return data
}

export const onAddFillwordAttempt = (content: string = '', points: number = 0) => {
    let data: any = localStorage.getItem(FILLWORD_STORAGE_KEY)
    let attempt = {}

    if (data) {
        data = JSON.parse(data)

        let isCorrect: boolean = data.word.includes(content)

        attempt = {content, isCorrect, points: isCorrect ? points : 0}
       
        data.attempts = [...data.attempts, attempt]

        if (isCorrect) {
            data.total += points
        }

        localStorage.setItem(FILLWORD_STORAGE_KEY, JSON.stringify(data))
    }

    return attempt
}

export const onResetFillword = () => localStorage.setItem(FILLWORD_STORAGE_KEY, JSON.stringify({word: '', attempts: [], total: 0}))

// Words API

export const onInitWords = () => {
    let data = localStorage.getItem(WORDS_STORAGE_KEY)

    if (data === null) {
        onGetWords().then(res => localStorage.setItem(WORDS_STORAGE_KEY, JSON.stringify(res)))
    } else {
        data = JSON.parse(data)
    }

    return data
}