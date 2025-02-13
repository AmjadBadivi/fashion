
import styles from './welcome.module.css'

import paris from '../assets/paris.jpg'

const Item: React.FC = () => {

    return <>
        <div className={styles.item}>
            <img src={paris} alt="paris" width={'350px'} height={'350px'} />
            <h3>blue shirt</h3>
            <h4>price 20$</h4>
            <div className={styles.buttons}>
                <button>-</button>
                <button>+</button>
            </div>
        </div>

    </>
}


export default Item