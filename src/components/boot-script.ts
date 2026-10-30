// Runs before first paint: resolves the theme (stored choice, else system) and
// only opts into entrance motion when reduced motion is not requested.
export const bootScript = `try{var d=document.documentElement,t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ok')}}catch(e){}`;
