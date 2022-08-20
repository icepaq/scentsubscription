import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/GetStarted.module.css'
import Header from '../components/header'
import BudgetSelector from '../components/budgetselector'
import Link from 'next/link'
import { useEffect } from 'react'
import { RunFadeIn } from '../../scripts/scripts'
import White from '../components/loader/white'
import { useRouter } from 'next/router'
import { RunFadeOut } from '../../scripts/scripts'

const Home: NextPage = ({options}: any) => {

  useEffect(() => {
    RunFadeIn()
  }, [])

  const router = useRouter();

  return (
    <>
      <White />
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.title}>
            Let&apos;s Get Started
        </div>
        <div className={styles.subtitle}>
            Answer a few questions to get a suggested custom scent package
        </div>
        <div className={styles.buttonRow}>
            <div className={styles.button} onClick={() => {RunFadeOut(router, '/getstarted/2')}}>Back</div>
            <div className={styles.button} onClick={() => {RunFadeOut(router, '/getstarted/final')}}>Next</div>
            </div>
        <BudgetSelector />
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
