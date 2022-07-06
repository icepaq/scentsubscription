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
            <Link href="/getstarted/3">
              <div className={styles.button}>Back</div>
            </Link>
            <div className={styles.button}>Skip, I know what I want</div>
            <Link href="/getstarted/final">
              <div className={styles.button}>Next</div>
            </Link>
          </div>
        <FormSlider options={options} question={'What is your budget'} step={'Step 4 of 4'} filter={'BUDGET'}/>
      </div>
    </>
  )
}

export function getServerSideProps(context: any) {
    const optionData = [
        {
            id: 1,
            text: '$5 / month',
            icon: '/brands/axe.png',
            width: '0px',
            height: '0px',
            imageMarginTop: '50px'
        },

        {
            id: 2,
            text: '$10 / month',
            icon: '/brands/axe.png',
            width: '0px',
            height: '0px',
            imageMarginTop: '50px'
        },

        {
            id: 3,
            text: '$20 / month',
            icon: '/brands/axe.png',
            width: '0px',
            height: '0px',
            imageMarginTop: '50px'
        },

        {
            id: 4,
            text: '$30 / month',
            icon: '/brands/axe.png',
            width: '0px',
            height: '0px',
            imageMarginTop: '50px'
        },
    ]

    return { props: {options: optionData, selectMany: false} }
}
export default Home
