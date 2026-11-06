/**
 * Runs before first paint: applies a stored theme choice and marks the page
 * as script-enabled (which lets scroll reveals hide content until it is in
 * view). If the app never hydrates within four seconds, the mark is removed
 * so nothing can stay hidden.
 */
const script = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){d.setAttribute('data-theme',t);}}catch(e){}setTimeout(function(){if(!window.__hy){d.classList.remove('js');}},4000);})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
