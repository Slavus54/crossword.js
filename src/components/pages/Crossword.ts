import {FatherComponent} from '../FatherComponent'
import {onCreateWord} from '@/http/http'
import {onInitCrossword, onInitWords, onAddCrosswordWord, onUpdateCrosswordWordPosition, onDeleteAllCrosswordWords, onInitLongestWord, onUpdateLongestWord} from '@/storage/storage'
import {onEstimateTask, onGetRandomTask, onChooseRandomLetter} from '@/engine/engine'

import {MAX_WORD_LENGTH, MIN_WORD_LENGTH} from '@/env/env'

export class Crossword extends FatherComponent {
    constructor() {
        super(window.location.pathname)
    }

    render() {
        const headline = document.querySelector('h2')
        const themes = document.querySelectorAll('#theme-card')
        const wordTypes = document.querySelectorAll('#word-card')
        const levelSelect = document.querySelector('.level-select')

        const btnReset = document.getElementById('btn-reset')

        const lengthLabel = document.querySelector('.label-length')
        const btnLengthLess = document.getElementById('btn-less')
        const btnLengthMore = document.getElementById('btn-more')

        const pointsLabel = document.querySelector('.points-label')
        const letterLabel = document.querySelector('.letter-label')
        const letterCheckbox = document.querySelector('.letter-checkbox')
        const textLabel = document.querySelector('.text-label')
        const textWord = document.querySelector('.text-word')
        const input = document.querySelector('.input-word')
        const btnSend = document.getElementById('btn-send')
        const btnCheck = document.getElementById('btn-check')
        const btnGenerate = document.getElementById('btn-generate')
        const keywordLabel = document.querySelector('.word-label')

        const apiItems: any = onInitWords()
        const words = document.querySelectorAll('.word')
        const crossword = onInitCrossword() 
        
        let theme: string = themes[0].textContent
        let word: string = wordTypes[0].textContent
        let item: any = onGetRandomTask(apiItems)
        let letter: string = onChooseRandomLetter()
        let level: string = levelSelect.getAttribute('value')
        let length: number = MAX_WORD_LENGTH / 2
        let isNotEmpty: boolean = crossword.mainword !== ''
        let value: string = ''
        let isIncludeLetter: boolean = false
        let text: string = ''
        let points: number = 0
        let total: number = crossword.total

        const onUpdatePoints = () => {
            let flag: boolean = item?.word === value

            points = onEstimateTask(flag ? item.length : length, flag ? (isIncludeLetter ? value.includes(letter) : !value.includes(letter)) : true, flag ? item.level : level)
            pointsLabel.textContent = `Итоговая оценка: ${points} баллов`

            return flag
        }

        const onUpdateLengthLabel = () => lengthLabel.textContent = `Количество символов: ${length}`

        onUpdatePoints()

        headline.textContent = `Составьте собственный кроссворд (${total} баллов)`
        keywordLabel.textContent = `Ключевое слово - ${isNotEmpty ? crossword.mainword : '?'}`
        pointsLabel.textContent = `Итоговая оценка: ${points} баллов`
        letterLabel.textContent = `Есть ли в слове буква ${letter}?`
        
        if (item) {
            textLabel.textContent = 'Определение: ' + item.content
        }

        btnReset?.addEventListener('click', () => onDeleteAllCrosswordWords())

        themes.forEach(el => {
            let value = el.textContent

            el.addEventListener('click', () => {
                theme = value
            })
        })

        wordTypes.forEach(el => {
            let value = el.textContent

            el.addEventListener('click', () => {
                word = value
            })
        })

        levelSelect.addEventListener('change', e => {
            //@ts-ignore
            level = e.target.value
            onUpdatePoints()
        })

        textWord.addEventListener('input', e => {
            //@ts-ignore
            text = e.target.value
        })

        input.addEventListener('input', (e) => {
            //@ts-ignore
            value = e.target.value 
        })

        btnLengthLess.addEventListener('click', () => {
            if (length > MIN_WORD_LENGTH) {
                length--
                
                onUpdateLengthLabel()
                onUpdatePoints()
            }
        })

        btnLengthMore.addEventListener('click', () => {
            if (length < MAX_WORD_LENGTH) {
                length++

                onUpdateLengthLabel()
                onUpdatePoints()
            }
        })

        btnSend.addEventListener('click', () => {
            let data: any = onInitLongestWord()

            if (data.title.length < value.length) {
                onUpdateLongestWord(value, theme, value.length)
            }

            onCreateWord({text, word: value, category: theme, type: word, level, length: value.length})
        })

        btnCheck.addEventListener('click', () => {
            let flag: boolean = onUpdatePoints()

            total += points
    
            onAddCrosswordWord(value, flag ? item.category : theme, flag ? item.type : word, points)
            window.location.reload()
        })

        letterCheckbox.addEventListener('change', e => {
            //@ts-ignore
            isIncludeLetter = e.target.checked
        })

        btnGenerate.addEventListener('click', () => {
            item = onGetRandomTask(apiItems)
            textLabel.textContent = 'Определение: ' + item.content
        })

        words.forEach((el, index) => {
            el.childNodes.forEach((node, idx) => {
                node.addEventListener('click', () => {
                    let mainword = onUpdateCrosswordWordPosition(index, idx)

                    //@ts-ignore
                    node.classList.add('marked')

                    keywordLabel.textContent = 'Ключевое слово:  ' + mainword

                    el.childNodes.forEach((item, index) => {
                        if (index !== idx) {
                            //@ts-ignore
                            item.classList.remove('marked')
                        }
                    })
                })
            })
        })
    }
}