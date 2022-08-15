import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Header.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Cookie from 'js-cookie'
import { ethers } from "ethers";
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'



const oauthClientID = process.env.NEXT_PUBLIC_CLIENT_ID;
const Header: NextPage = () => {

    const [windowRatio, setWindowRatio] = useState(0);
    const [greeting, setGreeting] = useState('Login');
    const [showLogOut, setShowLogout] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setWindowRatio(window.innerWidth / window.innerHeight);
        window.addEventListener('resize', updateSize);
    }, [])

    function updateSize() {
        setWindowRatio(window.innerWidth / window.innerHeight);
    }

    const openMenu = () => {
        const menu = document.getElementsByClassName(styles.mobileheader)[0] as HTMLElement;
        menu.style.width = '60%';
        menu.style.padding = '10px 10px';
    }  

    const closeMenu = () => {
        const menu = document.getElementsByClassName(styles.mobileheader)[0] as HTMLElement;
        menu.style.width = '0';
        menu.style.padding = '10px 0px';
    }

    const deskTopHeader = 
    <>
        <div className={styles.desktopheader}> 
            <Image src="/logo.png" alt="logo" width={137} height={30} /> 
            <div className={styles.desktopmenuitem}><Link href="/">Get Started</Link></div>
            <div className={styles.desktopmenuitem}><Link href="/">Home</Link></div>
            <div className={styles.desktopmenuitem}><Link href="/">About</Link></div>
            <div className={styles.desktopmenuitem}><Link href="/">Contact Us</Link></div>

            
        </div>
    </>

    const mobileHeader = 
    <>
        <div className={styles.menuButton} onClick={openMenu}>
            <Image src='/menu.png' alt='menu' width={20} height={20} />
        </div>
        <div className={styles.mobileheader}>
            <span className={styles.imagewrapper}>
                <Image src="/logo.png" alt="logo" width={127} height={30} />
            </span>
            <div className={styles.mobileX} onClick={closeMenu}>x</div>
            <div className={styles.mobilemenuitem}><Link href="/">Get Started</Link></div>
            <div className={styles.mobilemenuitem}><Link href="/">Home</Link></div>
            <div className={styles.mobilemenuitem}><Link href="/">About</Link></div>
            <div className={styles.mobilemenuitem}><Link href="/">Contact Us</Link></div>
        </div>
    </>

    if(windowRatio == 0) {
        return <></>
    }

    return windowRatio > 1.3 ? deskTopHeader : mobileHeader;
}

export default Header