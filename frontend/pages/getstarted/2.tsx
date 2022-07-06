import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/GetStarted.module.css'
import Header from '../components/header'
import FormSlider from '../components/formslider'
import Link from 'next/link'

const Home: NextPage = ({options}: any) => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.title}>
            Let's Get Started
        </div>
        <div className={styles.subtitle}>
            Answer a few questions to get a suggested custom scent package
        </div>
        <div className={styles.buttonRow}>
            <Link href="/getstarted/1">
              <div className={styles.button}>Back</div>
            </Link>
            <div className={styles.button}>Skip, I know what I want</div>
            <Link href="/getstarted/3">
              <div className={styles.button}>Next</div>
            </Link>
          </div>
        <FormSlider options={options} question={'What products would you like'} step={'Step 2 of 4'} filter={'PRODUCTS'}/>
      </div>
    </>
  )
}

export function getServerSideProps(context: any) {
  const optionData = [
      {
          id: 1,
          text: 'Fragrances',
          icon: '/chanel.jpg',
          width: '150px',
          height: '150px',
      },

      {
          id: 2,
          text: 'Air Refreshener',
          icon: '/febreeze.webp',
          width: '150px',
          height: '150px',
      },

      {
          id: 3,
          text: 'Car Refresheners',
          icon: '/carrefresheners.jpg',
          width: '100px',
          height: '150px',
      },

      {
        id: 4,
        text: 'Scented Candles',
        icon: '/candle.png',
        width: '100px',
        height: '150px',
    }
  ];
  return { props: {options: optionData, selectMany: false} }
}
export default Home
