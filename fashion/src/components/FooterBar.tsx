
import styles from './FooterBar.module.css'
import masterCard from '../assets/mastercard.png'
import visa from '../assets/visa.png'


function FooterBar() {


    return <>
        <div className={styles.footerFonts}>

            <div className={styles.firstBox}>
                <h2>OUR FUTURE PRODUCTS AND Collections</h2>
                <div className={styles.future}>
                    <h5>CLASSIC</h5>
                    <h5>SPORTS</h5>
                    <h5>KIDS</h5>
                </div>

            </div>
            <div className={styles.secondBox}>
                <h5>Support</h5>
                <h5>Contact Us: + (380) 121 212 12 12</h5>
                <div className={styles.visa}>
                    <img src={visa} alt="mastercard" width={'60px'} height={'38px'} style={{ backgroundColor: 'black' }} />
                    <img src={masterCard} alt="mastercard" width={'60px'} height={'38px'} />
                </div>
                <h5>All rights reserved&copy;</h5>
            </div>
        </div>



    </>

}

export default FooterBar