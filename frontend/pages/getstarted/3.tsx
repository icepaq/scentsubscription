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
            <Link href="/getstarted/2">
              <div className={styles.button}>Back</div>
            </Link>
            <div className={styles.button}>Skip, I know what I want</div>
            <Link href="/getstarted/4">
              <div className={styles.button}>Next</div>
            </Link>
          </div>
        <FormSlider options={options} question={'What are your favorite brands'} step={'Step 3 of 4'} filter={'BRANDS'} />
      </div>
    </>
  )
}

export function getServerSideProps(context: any) {
    const optionData = [
        {
            id: 0,
            text: 'I am flexible',
            icon: '/brands/axe.png',
            width: '0px',
            height: '0px',
            imageMarginTop: '50px'
        },
        {
            id: 1,
            text: 'Axe',
            icon: '/brands/axe.png',
            width: '150px',
            height: '50px',
            imageMarginTop: '50px',
            textMarginTop: '50px',
        },

        {
            id: 2,
            text: 'Chanel',
            icon: '/brands/chanel.png',
            width: '150px',
            height: '120px',
            imageMarginTop: '10px',
            textMarginTop: '20px',
        },

        {
            id: 3,
            text: 'Degree',
            icon: '/brands/degree.png',
            width: '150px',
            height: '150px',
        },

        {
            id: 4,
            text: 'Dior',
            icon: '/brands/dior.png',
            width: '175px',
            height: '70px',
            imageMarginTop: '40px',
            textMarginTop: '40px',
        },

        {
            id: 5,
            text: 'Dolce',
            icon: '/brands/dolce.png',
            width: '150px',
            height: '80px',
            imageMarginTop: '35px',
            textMarginTop: '35px',
        },

        {
            id: 6,
            text: 'Febreeze',
            icon: '/brands/febreeze.png',
            width: '210px',
            height: '150px',
        },

        {
            id: 7,
            text: 'Glade',
            icon: '/brands/glade.png',
            width: '150px',
            height: '150px',
        },

        {
            id: 8,
            text: 'Versace',
            icon: '/brands/versace.png',
            width: '300px',
            height: '164px',
            imageMarginTop: '20px',
            textMarginTop: '20px',
        },
    
  ];
  return { props: {options: optionData, selectMany: false} }
}
export default Home
