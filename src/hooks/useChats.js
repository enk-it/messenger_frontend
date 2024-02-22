import {useMemo} from "react";




export const useSortedChats = (chats) => {
    const sortedChats = [...chats].sort(
        (a,b) => {return b.messages[0].datetime - a.messages[0].datetime }
        )

    return sortedChats;
}

export const useChats = (chats, query) => {

    const sortedChats = useSortedChats(chats);

    const sortedAndSearchedChats = useMemo(() => {

            return sortedChats.filter(chat => chat.title.toLowerCase().includes(query.toLowerCase()))

        },
        [chats, query]
    )

    return sortedAndSearchedChats;
}

