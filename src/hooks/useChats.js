import {useMemo} from "react";

export const useSortedChats = (chats, sort) => {
    const sortedChats = useMemo(() => {
        if (sort){

            return [...chats].sort((a,b) => a[sort].localeCompare(b[sort]))
        }
        return chats
    }, [sort, chats])
    return sortedChats;
}

export const useChats = (chats, sort, query) => {

    const sortedChats = useSortedChats(chats, sort);

    const sortedAndSearchedChats = useMemo(() => {

            return sortedChats.filter(chat => chat.title.toLowerCase().includes(query.toLowerCase()))

        },
        [chats, sort, query]
    )

    return sortedAndSearchedChats;
}

