
import { useQuery } from "@tanstack/react-query"
import fetchItems from "../backendItems/supabaseData"
import Item from "./Item"
import styles from './Menitems.module.css'


function MenItems() {

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['men'],
        queryFn: () => fetchItems({ itemsInfo: 'men' }),
        gcTime: 1000 * 60 * 10,

    })
    let content

    if (isPending) { content = <h2>Loading Data...</h2> }
    if (data) {
        content = data.map(e => <Item key={e.id} fashionData={e}></Item>)
    }


    return <>

        <h2>New MEN Collections</h2>
        <div className={styles.itemsBox}>{content}</div>

    </>


}

export default MenItems