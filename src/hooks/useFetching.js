import {useState} from "react";

export const useFetching = (callback, setError) => {

    const [isLoading, setIsLoading] = useState(false)

    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e){
            //console.log(e, 'Проблемная ошибка')
            setError(e.response.data.detail)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading]

}