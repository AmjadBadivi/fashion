

import { RootState, AppDispatch, addItem, removeItem, clearCart } from "../backendItems/reduxItems";
import { useDispatch, useSelector } from "react-redux";
import styles from './CartItems.module.css'
import { Link } from "react-router-dom";
import { useState } from "react";

type Item = {
    id: number;
    itemName: string;
    price: string;
    photo: string;
    count: number;
    total: number
};


function CartItems() {
    let [displayBox, setDisplayBox] = useState(false)

    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.array.items);

    const handleAddItem = (x: Item) => {
        dispatch(addItem(x))
    };

    const removeHandler = (x: number) => {
        dispatch(removeItem(x))
    }

    const clearHandler = () => {
        setDisplayBox(true)
    }
    const removeBox = () => {
        setDisplayBox(false)
    }
    const totalSum = items.reduce((acc, item) => acc + item.total, 0);

    return <>
        {items.length == 0 ? <h2 className={styles.emptyCart}>Cart Is Empty</h2> :
            <div className={styles.totalSummary}>
                <div className={styles.cartItems}>
                    {items.map(e =>
                        <div key={e.id} className={styles.signleItem}>
                            <img src={e.photo} alt={e.photo} width={'200px'} height={'200px'} />
                            <h4>{e.itemName} {e.price} $</h4>
                            <h4>{e.count}x</h4>
                            <h4>{e.total}</h4>
                            <div className={styles.buttonsBox}>
                                <button className={styles.addRemoveButtons} onClick={removeHandler.bind(null, e.id)}>-</button>
                                <button className={styles.addRemoveButtons} onClick={handleAddItem.bind(null, e)}>+</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.totalSum}>
                    <h5>Summary</h5>
                    <p>{items.length > 0 ? `Total ${totalSum} $` : null}</p>
                    <div className={styles.checkoutBox}>
                        <button onClick={clearHandler}>Clear Cart</button>
                        <Link to={'/checkout'}><button>Checkout</button></Link>
                    </div>
                    {displayBox && <div className={styles.emptyCartBox}>
                        <h4>are you sure you want to empty the cart?</h4>
                        <button onClick={removeBox}>No</button>
                        <button onClick={() => dispatch(clearCart())}>Yes</button>
                    </div>}
                </div>
            </div>}
    </>
}


export default CartItems

