import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/GetStarted.module.css'
import Header from '../components/header'
import FormSlider from '../components/formslider'
import Link from 'next/link'
import White from '../components/loader/white'
import { useEffect } from 'react'
import { RunFadeIn, RunFadeOut } from '../components/scripts'
import { useRouter } from 'next/router'

const Home: NextPage = ({options}: any) => {
  useEffect(() => {
    RunFadeIn()
  }, [])

  const router = useRouter();

  return (
    <>
      <Header />
      <White />
      <div className={styles.wrapper}>
        <div className={styles.title}>
            Let's Get Started
        </div>
        <div className={styles.subtitle}>
            Answer a few questions to get a suggested custom scent package
        </div>
        <div className={styles.buttonRow}>
            <div className={styles.button} onClick={() => {RunFadeOut(router, '/getstarted/1')}}>Back</div>
            <div className={styles.button}>Skip, I know what I want</div>
            <div className={styles.button} onClick={() => {RunFadeOut(router, '/getstarted/4')}}>Next</div>
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
          text: 'Fragrance',
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
          text: 'Car Refreshener',
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
