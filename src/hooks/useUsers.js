import {useMemo} from "react";



const sortByOnline = (a, b) => {
    if (a.is_online && b.is_online){
        return 1
    }
    if (!a.is_online && b.is_online){
        return 1
    }
    if (a.is_online && !b.is_online){
        return -1
    }
    return -2
}



export const useSortedChats = (users) => {
    if (users.length === 0){
        return users
    }
    else{
        const sortedUsers = [...users].sort(
        (a,b) => {return sortByOnline(a, b) }
        )
        return sortedUsers;
    }
}

export const useUsers = (users, query) => {



    const sortedUsers = useSortedChats(users);

    const sortedAndSearchedChats = useMemo(() => {

            return sortedUsers.filter(user => user.username.toLowerCase().includes(query.toLowerCase()))

        },
        [users, query]
    )

    return sortedAndSearchedChats;
}

