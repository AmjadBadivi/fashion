
import styles from './welcome.module.css'


type User = {
    id: number;
    itemName: string;
    price: string;
    photo: string
}
const Item: React.FC<{ fashionData: User }> = ({ fashionData }) => {


    return <>
        <div className={styles.item}>
            <img src={fashionData.photo} alt={fashionData.itemName} width={'427px'} height={'640px'} />
            <h3 className={styles.itemNameBorder}>{fashionData.itemName}</h3>
            <h4 >price {fashionData.price} $</h4>
            <div className={styles.buttons}>
                <button className={styles.addRemoveButtons}>-</button>
                <h4 className={styles.countItem}>0</h4>
                <button className={styles.addRemoveButtons}>+</button>
            </div>
        </div>

    </>
}


export default Item