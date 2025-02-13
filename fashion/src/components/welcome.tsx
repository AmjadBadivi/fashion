

import styles from './welcome.module.css'

import fashionlogo from '../assets/fashionlogo.jpg'
import rightPhoto from '../assets/rigthphoto.jpg'
import leftPhoto from '../assets/leftphoto.jpg'

function WelcomingSection() {


    return <>
        <div className={styles.welcomingSection}>
            <div className={styles.fashiologoBox}>
                <h3 className={styles.describeText}>Welcome to FASHION STORE, SINCE 2015 with you! </h3>
                <img src={fashionlogo} alt="fashionlogo" className={styles.fashionlogo} />
            </div>
            <div className={styles.rightPhotos}>
                <img src={leftPhoto} alt="welcoming photo" className={styles.rightPhoto} />
                <img src={rightPhoto} alt="welcoming photo" className={styles.leftPhoto} />
            </div>
        </div>
        <h1 className={styles.newCollections}>NEW COLLECTIONS</h1>
        <div></div>
    </>
}


export default WelcomingSection
