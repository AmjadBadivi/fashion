
import { useQuery } from "@tanstack/react-query"
import fetchItems from "../backendItems/supabaseData"
import Item from "./Item"
import styles from './WomenItems.module.css'


function WomenItems() {

    const { data, isPending } = useQuery({
        queryKey: ['men'],
        queryFn: () => fetchItems({ itemsInfo: 'women' }),
        gcTime: 1000 * 60 * 10,

    })

    let content

    if (isPending) { content = <h2>Loading Data...</h2> }
    if (data) {
        content = data.map(e => <Item key={e.id} fashionData={e}></Item>)
    }


    return <>
        <div className={styles.womenCollection}>
            <h2>New WOMEN Collections</h2>
            <div className={styles.itemsBox}>{content}</div>
        </div>
    </>


}

export default WomenItems