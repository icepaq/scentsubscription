import type { NextPage } from 'next'
import styles from '../../styles/GetStarted.module.css'
import Header from '../components/header'
import FormSlider from '../components/formslider'
import White from '../components/loader/white'
import { useRouter } from 'next/router'
import { RunFadeIn, RunFadeOut } from '../components/scripts'
import { useEffect } from 'react'

const Home: NextPage = ({options}: any) => {

  useEffect(() => {
    RunFadeIn()
  }, [])

  const router = useRouter()

  return (
    <>
      <White />
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.title}>
            Let's Get Started
        </div>
        <div className={styles.subtitle}>
            Answer a few questions to get a suggested custom scent package
        </div>
        <div className={styles.buttonRow}>
          <div className={styles.button}>Back</div>
          <div className={styles.button}>Skip, I know what I want</div>
          {/* <Link href="/getstarted/2"> */}
            <div className={styles.button} onClick={() => {RunFadeOut(router, '/getstarted/2')}}>Next</div>
          {/* </Link> */}
        </div>
        <FormSlider options={options} question={'What is your Gender'} step={'Step 1 of 4'} filter={'GENDER'}/>
      </div>
    </>
  )
}

export function getServerSideProps(context: any) {
  const optionData = [
      {
          id: 1,
          text: 'Male',
          icon: '/man.png',
          width: '150px',
          height: '150px',
      },

      {
          id: 2,
          text: 'Female',
          icon: '/woman.png',
          width: '150px',
          height: '150px',
      }
  ];
  return { props: {options: optionData, selectMany: false} }
}
export default Home
