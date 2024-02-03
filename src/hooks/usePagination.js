import {useMemo} from "react";

export const usePagination = (totalPages) => {

    return useMemo(() => {
        let tempPagesArray = []
        for (let i = 0; i < totalPages; i++) {
            tempPagesArray.push(i + 1)
        }
        console.log(tempPagesArray)

        return tempPagesArray
    }, [totalPages])

}