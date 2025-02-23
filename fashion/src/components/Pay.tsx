

import { useState, useRef } from 'react';
import styles from './Pay.module.css';
import { RootState, AppDispatch, clearCart } from "../backendItems/reduxItems";
import { useDispatch, useSelector } from "react-redux";

import { useMutation } from '@tanstack/react-query';
import { sendPayment } from '../backendItems/supabaseData';
import { Link, useNavigate } from 'react-router-dom';




function PayMethod() {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const [text, setText] = useState("");
    const [numberValue, setNumberValue] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [cvv, setCvv] = useState("");
    const [rotate, setRotate] = useState(false);
    const [cash, setCash] = useState(false);

    const nameholder = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const filteredValue = inputValue.replace(/^[\s]+/, "").replace(/[^a-zA-Z\s]/g, "");
        setText(filteredValue);
    };

    const numberholder = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const cleanedValue = value.replace(/\D/g, "").slice(0, 16);
        const formattedValue = cleanedValue.replace(/(\d{4})/g, "$1 ").trim();

        setNumberValue(formattedValue);
    };

    const filterMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value === '00') return;
        if (value === "") {
            setMonth("");
            return;
        }
        if (parseInt(value) > 12) value = "12";
        setMonth(value);
    };

    const filterYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value === "") {
            setYear("");
            return;
        }
        if (parseInt(value) > 30) value = "30";
        else if (parseInt(value) < 25 && value.length === 2) value = "25";
        setYear(value);
    };

    const filterThreeNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const clearcvv = value.replace(/[^0-9]|(?<=\d{3})\d+/g, "");
        setCvv(clearcvv);
    };

    function rotateCard() {
        setRotate(true);
    }

    const handleBlur = () => {
        setRotate(false);
    };

    function handleCash(x: string) {
        setCash(x !== 'card');
    }

    const [fields, setFields] = useState('')

    const items = useSelector((state: RootState) => state.array.items);
    const dispatch = useDispatch<AppDispatch>();

    const totalSum = items.reduce((acc, item) => acc + item.total, 0);

    const navigate = useNavigate()

    const { mutate, isPending, isError } = useMutation({
        mutationFn: sendPayment,
        onSuccess: () => {
            setText('')
            setMonth('')
            setCvv('')
            setYear('')
            setNumberValue('')
            setFields('')
            modalRef.current?.showModal();
        },

    })

    function handleFormCredit(x: FormData) {
        const cardholderName = x.get("cardholderName") as string;
        const cardNumber = x.get("cardNumber") as string;
        const month = x.get("month") as string;
        const year = x.get("year") as string;
        const cvv = x.get("cvv") as string;

        if ((cardholderName && cardNumber && month && year && cvv) == '') {
            setFields('Please enter ALL required field properly')
            return
        }
        if (cardNumber.length < 19) {
            setFields('Please enter ALL required field properly')
            return
        }
        if ((month.length || year.length) < 2) {
            setFields('Please enter ALL required field properly')
            return
        }
        if (cvv.length < 3) {
            setFields('Please enter ALL required field properly')
            return
        }
        mutate({
            cardholderName,
            cardNumber,
            month,
            year,
            cvv,
        })


    }

    function resetValues() {
        setText('')
        setMonth('')
        setCvv('')
        setYear('')
        setNumberValue('')
    }
    function closeModal() {
        dispatch(clearCart())
        navigate('/')
    }
    function handleModalClose() {
        dispatch(clearCart())
        navigate('/')
    }

    return (

        <>
            <dialog className={styles.dialogBox} ref={modalRef} onCancel={handleModalClose}>
                <div className={styles.successfulPayment}>
                    <h2>Your Payment has been Accepted</h2>
                    <button onClick={closeModal}>Back to Main Page</button>
                </div>
            </dialog>

            <div className={styles.payBox}>
                <div className={styles.creditCashButtons}>
                    <button className={!cash ? styles.activeButton : styles.inactiveButton} onClick={() => handleCash('card')}>Credit Card</button>
                    <button className={!cash ? styles.inactiveButton : styles.activeButton} onClick={() => handleCash('cash')}>Cash</button>
                </div>
                {!cash ? (
                    <>
                        <h2> Total {totalSum} $</h2>
                        <div className={`${styles.card} ${rotate ? styles.cardRotate : ''}`}>
                            <div className={styles.cardFront}>
                                <div className={styles.cardInfo}>
                                    <div className={styles.scan}></div>
                                    <div className={styles.serialNumber}>
                                        {numberValue === '' ? "•••• •••• •••• ••••" : numberValue}
                                    </div>
                                    <div className={styles.nameCvv}>
                                        <div className={styles.cvv}>
                                            {text === '' ? 'Holder Name' : text}
                                        </div>
                                        <div className={styles.monthYear}>
                                            {!month ? '00' : month}/{!year ? '00' : year}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cardBack}>
                                <div className={styles.firstLine}></div>
                                <div className={styles.secondBox}>
                                    <div className={styles.secondLine}></div>
                                    <p>CVV: {cvv}</p>
                                </div>
                            </div>
                        </div>

                        <form action={handleFormCredit}>
                            <div className={styles.nameNumber}>
                                <label htmlFor="cardholderName">Cardholder Name</label>
                                <input
                                    required
                                    id="cardholderName"
                                    placeholder="Cardholder Name"
                                    type="text"
                                    name="cardholderName"
                                    maxLength={20}
                                    value={text}
                                    onChange={nameholder}
                                />
                            </div>

                            <div className={styles.nameNumber}>
                                <label htmlFor="cardNumber">Card Number</label>
                                <input
                                    required
                                    id="cardNumber"
                                    placeholder="•••• •••• •••• ••••"
                                    type="text"
                                    name="cardNumber"
                                    maxLength={19}
                                    value={numberValue}
                                    onChange={numberholder}
                                />
                            </div>

                            <div className={styles.monthYearCvv}>
                                <div><label htmlFor="month">Month</label>
                                    <input
                                        required
                                        type="text"
                                        id="month"
                                        placeholder="Month"
                                        name="month"
                                        value={month}
                                        onChange={filterMonth}
                                        maxLength={2}
                                    />
                                </div>
                                <div> <label htmlFor="year">Year </label>
                                    <input
                                        required
                                        type="text"
                                        id="year"
                                        placeholder="Year"
                                        name="year"
                                        onChange={filterYear}
                                        value={year}
                                        maxLength={2}
                                    /></div>

                                <div>  <label htmlFor="cvv">CVV</label>
                                    <input
                                        required
                                        type="text"
                                        id="cvv"
                                        placeholder="CVV"
                                        name="cvv"
                                        value={cvv}
                                        onChange={filterThreeNumbers}
                                        onFocus={rotateCard}
                                        onBlur={handleBlur}
                                    /></div>
                            </div>
                            {!fields ? null : <h3 style={{ textAlign: 'center', color: 'red' }}>{fields}</h3>}
                            {isError && <h2 style={{ textAlign: 'center', color: 'red' }}>Your Payment has failed, please try again!</h2>}

                            <div className={styles.resetPayBox}>
                                <Link className={styles.resetPay} to={'/cart'}>Back to Cart</Link>
                                <button className={styles.resetPay} type='reset' onClick={resetValues}>Reset</button>
                                <button className={`${styles.resetPay} ${isPending ? styles.pay : ''}`} type='submit' disabled={isPending}>{!isPending ? 'Pay' : 'Submitting'}</button>
                            </div>
                        </form>
                    </>
                ) : (<>
                    <h2 style={{ marginBottom: '250px' }}>This payment method is not available right now, try again later!</h2>
                    {/* <h2> Total {totalSum} $</h2>
                    <form>
                        <div className={styles.nameNumber}>
                            <label htmlFor="clientName" title="Enter client name">
                                Client Name
                            </label>
                            <input required type="text" id="clientName" name="clientName" />
                        </div>

                        <div className={styles.nameNumber}>
                            <label htmlFor="address" title="Enter your address">
                                Address
                            </label>
                            <input required type="text" id="address" name="address" />
                        </div>

                        <div className={styles.nameNumber}>
                            <label htmlFor="phoneNumber" title="Enter your phone number">
                                Phone Number
                            </label>
                            <input required type="text" id="phoneNumber" name="phoneNumber" />
                        </div>
                    </form> */}
                </>
                )
                }
            </div >
        </>);
}

export default PayMethod;
