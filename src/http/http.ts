import {SERVER_DEFAULT_URL, WORDS_API_ROUTE, STREAM_API_ROUTE, CREATE_WORD_ROUTE, GET_WORD_ROUTE} from "@/env/env"
import {WordTableType} from "@/env/types"

export const onGetWords = async () => fetch(SERVER_DEFAULT_URL + WORDS_API_ROUTE).then(data => data.json())

export const onGetSSE = () => {
    const source = new EventSource(SERVER_DEFAULT_URL + STREAM_API_ROUTE)

    return source
}

export const onCreateWord = (data: WordTableType) => {
    fetch(SERVER_DEFAULT_URL + CREATE_WORD_ROUTE, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const onGetWord = async () => {
    let result = await fetch(SERVER_DEFAULT_URL + GET_WORD_ROUTE)

    result = await result.json() 

    return result
}