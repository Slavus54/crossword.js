// word

export const WORD_TYPES = ['Существительное', 'Прилагательное', 'Глагол']
export const THEMES = ['Наука', 'Искусство', 'Семья']
export const LEVELS = ['Легкий', 'Средний', 'Сложный', 'Ультра']
export const INCLUDE_MULTIPLIER = 1.25

export const MIN_WORD_LENGTH = 3
export const MAX_WORD_LENGTH = 1e1

// storage

export const CROSSWORD_STORAGE_KEY = 'crossword'
export const WORDS_STORAGE_KEY = 'words'
export const LONGEST_WORD_KEY = 'longest-word'
export const FILLWORD_STORAGE_KEY = 'fillword'
export const CROSSWORD_WORDS_STORAGE_LIMIT = 1e1
export const ID_LENGTH = 4
export const MAX_VERTICAL_INDENT = 4
export const MAX_HORIZONTAL_INDENT = 2

// API

export const FILE_IMG = 'https://img.icons8.com/wired/64/file--v2.png'

export const SERVER_DEFAULT_URL = 'https://crossword-server-blond.vercel.app' 
export const WORDS_API_ROUTE = '/words'
export const STREAM_API_ROUTE = '/stream'
export const CREATE_WORD_ROUTE = '/create-word'
export const GET_WORD_ROUTE = '/get-word'

export const abc = [
    'а', 'б', 'в', 'г', 'д', 'ж', 'и', 'к',
    'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т',
    'у', 'е', 'и'
]