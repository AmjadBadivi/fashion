import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, addItem, removeItem } from "../backendItems/reduxItems";

import styles from './Item.module.css'

type Item = {
    id: number;
    itemName: string;
    price: string;
    photo: string;
    count: number;
    total: number
};


const Item: React.FC<{ fashionData: Item }> = ({ fashionData }) => {
    const dispatch = useDispatch<AppDispatch>();

    const itemInCart = useSelector((state: RootState) =>
        state.array.items.find((item) => item.id === fashionData.id)
    );
    const count = itemInCart?.count || 0;

    const handleAddItem = (x: Item) => {
        dispatch(addItem(x))
    };
    const removeHandler = (x: number) => {
        dispatch(removeItem(x))
    }
    return <>
        <div className={styles.item}>
            <img src={fashionData.photo} alt={fashionData.itemName} width={'427px'} height={'640px'} />
            <h3 className={styles.itemNameBorder}>{fashionData.itemName}</h3>
            <h4 >price {fashionData.price} $</h4>
            <div className={styles.buttons}>
                {!count ? <button className={styles.disabledButton} disabled={true}>-</button> : <button className={styles.addRemoveButtons} onClick={removeHandler.bind(null, fashionData.id)}>-</button>}
                <h4 className={styles.countItem}>{count}</h4>
                <button className={styles.addRemoveButtons} onClick={() => handleAddItem(fashionData)}>+</button>
            </div>
        </div>
    </>
}


export default Item