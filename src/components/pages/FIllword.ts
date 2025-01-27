import {FatherComponent} from '../FatherComponent'
import {onAddFillwordAttempt} from '@/storage/storage'

export class Fillword extends FatherComponent {
    constructor() {
        super(window.location.pathname)
    }

    render() {
        const input = document.querySelector('.input-word')
        const btn = document.querySelector('.btn-check')
        const area = document.querySelector('.result-area')

        let content: string = ''

        input.addEventListener('input', e => {
            //@ts-ignore
            content = e.target.value
        })

        btn.addEventListener('click', () => {
            let attempt: any = onAddFillwordAttempt(content, content.length)
        
            area.textContent = `Результат: ${attempt.isCorrect ? 'Верно' : 'Неверно'} | Набарано баллов: ${attempt.points}`
        })
       
    }
}