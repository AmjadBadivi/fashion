
import { useQuery } from "@tanstack/react-query"
import fetchItems from "../backendItems/supabaseData"
import Item from "./Item"
import styles from './Menitems.module.css'
import { RootState, AppDispatch } from "../backendItems/reduxItems";

import { useDispatch, useSelector } from "react-redux";

function MenItems() {

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['men'],
        queryFn: () => fetchItems({ itemsInfo: 'men' }),
        gcTime: 1000 * 60 * 10,

    })


    const items = useSelector((state: RootState) => state.array.items);



    let content

    if (isPending) { content = <h2>Loading Data...</h2> }
    if (data) {
        content = data.map(e => <Item key={e.id} fashionData={e}></Item>)


    }


    return <>
        <div className={styles.menCollection}>
            <h2>New MEN Collections</h2>
            <div className={styles.itemsBox}>{content}</div>
        </div>
    </>


}

export default MenItems