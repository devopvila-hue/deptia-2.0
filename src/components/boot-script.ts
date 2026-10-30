// Runs before first paint: dark unless the visitor chose light, and
// only opts into entrance motion when reduced motion is not requested.
export const bootScript = `try{var d=document.documentElement,t;t=localStorage.getItem('theme')==='light'?'light':'dark';d.dataset.theme=t;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ok')}}catch(e){}`;
