
import { useQuery } from '@tanstack/react-query'
import fetchItems from '../backendItems/supabaseData'
import styles from './welcome.module.css'


import WelcomingSection from './welcome'
import Item from "../components/Items"


function WelcomingPage() {

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['homeItems'],
        queryFn: fetchItems,
        gcTime: 1000 * 60 * 10,

    })

    let content

    if (isPending) { content = <h2>Loading Data...</h2> }
    if (data) {
        content = data.map(e => <Item key={e.id} fashionData={e}></Item>)
    }


    return <>
        <WelcomingSection />
        <div className={styles.itemsBox}>{content}</div>

    </>
}


export default WelcomingPage




