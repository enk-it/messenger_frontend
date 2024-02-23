import {useMemo} from "react";



const sortByDatetime = (a, b) => {
    if (b.messages.length === 0){
        return -1
    }
    if (a.messages.length === 0){
        return 1
    }
    return b.messages[0].datetime - a.messages[0].datetime
}



export const useSortedChats = (chats) => {
    // console.log('useChats hook: ',chats)
    if (chats.length === 0){
        return chats
    }
    else{
        const sortedChats = [...chats].sort(
        (a,b) => {return sortByDatetime(a, b) }
        )
        return sortedChats;
    }
    
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

