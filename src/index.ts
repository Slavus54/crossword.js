import {Router} from './router/Router'
import {onInitWords, onInitCrossword, onInitLongestWord} from './storage/storage'

import './style.css'

const router = new Router(window.location.pathname)

router.init()

onInitWords()
onInitCrossword()
onInitLongestWord()