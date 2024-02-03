import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {

        if (sort){
            console.log('sp')

            return [...posts].sort((a,b) => a[sort].localeCompare(b[sort]))
        }
        return posts
    }, [sort, posts])

    return sortedPosts;

}

export const usePosts = (posts, sort, query) => {

    const sortedPosts = useSortedPosts(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {

            // console.log(sortedPosts)

            return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))

        },
        [posts, posts, query]
    )

    return sortedAndSearchedPosts;
}

