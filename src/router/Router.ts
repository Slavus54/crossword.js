import {routes} from './routes'

export class Router {

    url: string
    
    constructor(url: string) {
        this.url = url
    }

    init() {
        routes.map(el => {
         
            if (el.url === this.url) {
                const instance = new el.component()
                
                instance.render()
            }
        })
    }
}