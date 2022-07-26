import { NextRouter } from "next/router";

export async function RunFadeIn() {
    const white = document.getElementById('white_background') as HTMLElement;
    
    for(let i = 25; i >= 0; i--) {
      white.setAttribute('style', `display: block; opacity: ${(i*4) / 100}`);
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    white.setAttribute('style', 'display: none;');
}

export async function RunFadeOut(router: NextRouter, url: string) {
    const white = document.getElementById('white_background') as HTMLElement;
    
    for(let i = 0; i <= 25; i++) {
      white.setAttribute('style', `display: block; opacity: ${(i*4) / 100}`);
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    white.setAttribute('style', 'display: block;');

    router.push(url);
}
