import {ViewConstructor} from '../view/ViewConstructor'

export class FatherComponent {
    url: string

    constructor(url: string) {
        this.url = url
    
        this.init()
    }

    init() {
        const view = new ViewConstructor()

        view.init(this.url)
    }
}