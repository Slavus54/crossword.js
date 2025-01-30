import {routes} from "@/router/routes"
import {onInitCrossword, onInitFillword, onInitWords} from "@/storage/storage"
import {onGetRandomTask} from "@/engine/engine"
import {THEMES, WORD_TYPES, LEVELS, MAX_WORD_LENGTH, MAX_VERTICAL_INDENT, MAX_HORIZONTAL_INDENT, FILE_IMG, abc} from "@/env/env" 

export class ViewConstructor {
    create(text: string) {
        return document.createElement(text)
    }

    init(url: string) {
        let root = document.getElementById('app')
        let body = this.create('div')
        let navbar = this.create('nav')

        body.classList.add('main')

        routes.map(el => {
            let item = this.create('a')

            item.setAttribute('href', el.url)
            item.classList.add('nav-item')
            item.textContent = el.title

            navbar.appendChild(item)
        })

        body.appendChild(navbar)
        
        if (url === '/') {
            let headline = this.create('h2')
            let wordArea = this.create('h4')
            let image = this.create('img')

            headline.textContent = 'Добро пожаловать в CrosswordJS'
            wordArea.classList.add('word-area')

            image.setAttribute('src', FILE_IMG)

            body.appendChild(headline)
            body.appendChild(image)
            body.appendChild(wordArea)

        } else if (url === '/crossword') {
            const crossword = onInitCrossword()

            let headline = this.create('h2')
            let themesContainer = this.create('div')
            let wordsContainer = this.create('div')
            let btnReset = this.create('button')
            let levelSelect = this.create('select')
            let lengthContainer = this.create('div')
            let btnLess = this.create('button')
            let lengthLabel = this.create('h4')
            let btnMore = this.create('button')
            let pointsLabel = this.create('h4')
            let textLabel = this.create('p')
            let letterLabel = this.create('h4')
            let letterCheckbox = this.create('input')
            let btnGenerate = this.create('button')
            let text = this.create('textarea')
            let input = this.create('input')
            let btnContainer = this.create('div')
            let btnSend = this.create('button')
            let btnCheck = this.create('button')

            let cellsContainer = this.create('div')

            let wordLabel = this.create('h4')

            headline.textContent = 'Составьте собственный кроссворд'

            themesContainer.classList.add('items')
            themesContainer.classList.add('small')
            
            wordsContainer.classList.add('items')
            wordsContainer.classList.add('small')

            THEMES.map(el => {
                let item = this.create('div')

                item.classList.add('item')
                item.classList.add('label')
                item.id = 'theme-card'
                item.textContent = el

                themesContainer.appendChild(item)
            })

            WORD_TYPES.map(el => {
                let item = this.create('div')

                item.classList.add('item')
                item.classList.add('label')
                item.id = 'word-card'
                item.textContent = el

                wordsContainer.appendChild(item)
            })

            LEVELS.map(el => {
                let item = this.create('option')

                item.textContent = el

                levelSelect.appendChild(item)
            })

            levelSelect.classList.add('level-select')
            levelSelect.setAttribute('value', LEVELS[0])

            lengthContainer.classList.add('items')
            lengthContainer.classList.add('small')
            
            lengthLabel.classList.add('label-length')
            lengthLabel.textContent = `Количество символов: ${MAX_WORD_LENGTH / 2}`

            letterCheckbox.classList.add('letter-checkbox')
            letterCheckbox.setAttribute('type', 'checkbox')
            
            btnLess.classList.add('light')
            btnLess.id = 'btn-less'
            btnLess.textContent = '-'
            btnMore.classList.add('light')
            btnMore.id = 'btn-more'
            btnMore.textContent = '+'

            pointsLabel.classList.add('points-label')
            textLabel.classList.add('text-label')
            textLabel.textContent = 'Здесь будет отображено определение слова или вопрос...'
            letterLabel.classList.add('letter-label')

            btnGenerate.id = 'btn-generate'
            btnGenerate.textContent = 'Другое'

            text.classList.add('text-word')
            text.setAttribute('placeholder', 'Опишите слово для пополнения фонда')

            input.classList.add('input-word')
            input.setAttribute('placeholder', 'Введите слово')
            input.setAttribute('type', 'text')

            btnReset.id = 'btn-reset'
            btnReset.textContent = 'Сбросить'

            btnContainer.classList.add('items')
            btnContainer.classList.add('little')

            btnSend.id = 'btn-send'
            btnSend.textContent = 'В фонд'

            btnCheck.id = 'btn-check'
            btnCheck.textContent = 'В кроссворд'

            btnContainer.append(btnSend)
            btnContainer.append(btnCheck)

            cellsContainer.classList.add('cells')

            wordLabel.classList.add('word-label')
            
            for (let i = 0; i < crossword.words.length; i++) {
                let word = crossword.words[i]
                let item = this.create('div')

                item.classList.add('word')

                for (let j = 0; j < crossword.width; j++) {
                    let value = word.text.split('')[j]
                    let cell = this.create('div')

                    cell.classList.add('cell')

                    if (word.position === j) {
                        cell.classList.add('marked')
                    }

                    cell.textContent = j < crossword.width ? value : ''

                    item.appendChild(cell)
                }          

                cellsContainer.appendChild(item)
            }

            lengthContainer.appendChild(btnLess)
            lengthContainer.appendChild(lengthLabel)
            lengthContainer.appendChild(btnMore)

            body.appendChild(headline)

            body.appendChild(cellsContainer)
            body.appendChild(wordLabel)
            
            if (crossword.mainword !== '') {
                body.appendChild(btnReset)
            }

            body.appendChild(text)
            body.appendChild(themesContainer)
            body.appendChild(wordsContainer)
            body.appendChild(input)
            body.appendChild(textLabel)
            body.appendChild(btnGenerate)
            body.appendChild(levelSelect)
            body.appendChild(lengthContainer)
            body.appendChild(pointsLabel)
           
            body.appendChild(letterLabel)
            body.appendChild(letterCheckbox)
            body.appendChild(btnContainer)
         
        } else if (url = '/fillword') {
            
            const words: any = onInitWords()
            let word: any = onGetRandomTask(words)
            let size = 0

            if (word !== undefined) {
                word = word.word
                size = word.length

                onInitFillword(word)
            }           

            let headline = this.create('h2')
            let cellsContainer = this.create('div')
            let input = this.create('input')
            let btn = this.create('button')
            let area = this.create('p')

            headline.textContent = 'Угадайте слово, спрятанное в филворде'
            cellsContainer.classList.add('cells')

            input.classList.add('input-word')
            input.setAttribute('placeholder', 'Введите слово')
            input.setAttribute('type', 'text')

            btn.classList.add('btn-check')
            btn.textContent = 'Проверить'

            area.classList.add('result-area')
            area.textContent = 'Результат будет показан здесь'

            let vertical = Math.floor(size < MAX_VERTICAL_INDENT ? size : MAX_VERTICAL_INDENT * Math.random()) 
            let horizontal = Math.floor(size < MAX_HORIZONTAL_INDENT ? size : MAX_HORIZONTAL_INDENT * Math.random())  

            let positions: any = [{i: vertical, j: horizontal}]
           
            for (let g = 1; g < size; g++) {
                let isRight = Math.floor(Math.random() * 1e2) > 50

                if (isRight && horizontal < size) {
                    horizontal++
                } else {
                    vertical++
                }

                positions[g] = {i: vertical, j: horizontal}
            }

            let index = 0

            for (let i = 0; i < size; i++) {
                let item = this.create('div')

                item.classList.add('word')

                for (let j = 0; j < size; j++) {
                    let cell = this.create('div')
                    let position = positions[index]
                   
                    let flag = position.i === i && position.j === j

                    cell.classList.add('cell')
                    cell.textContent = flag ? word[index] : abc[Math.floor(abc.length * Math.random())]

                    if (flag && index + 1 < size) {
                        index++
                    }

                    item.appendChild(cell)
                } 

                cellsContainer.appendChild(item)
            }         

            body.appendChild(headline)
            body.appendChild(cellsContainer)
            body.appendChild(input)
            body.appendChild(btn)
            body.appendChild(area)
        }

        root?.append(body)        
    }
}