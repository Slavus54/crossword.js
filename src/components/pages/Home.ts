import {FatherComponent} from '../FatherComponent'
import {onGetSSE, onGetWord} from '@/http/http'

export class Home extends FatherComponent {
    constructor() {
        super(window.location.pathname)
    }

    render() {
        let headline = document.querySelector('h2')
        let area = document.querySelector('.word-area')

        onGetSSE().onmessage = msg => {
            headline.textContent = msg.data
        }

        onGetWord().then((data: any) => {
            area.textContent = `Термин, полученный из файла: ${data.text.replace('\n', '')}`
        })
    }
}