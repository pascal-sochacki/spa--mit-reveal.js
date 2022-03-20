// @ts-ignore
import Reveal from 'reveal.js';
// @ts-ignore
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm.js';


Array.from(document.getElementsByTagName('code')).forEach((code: HTMLElement) => {
  const filename = code.getAttribute('filename');
  if (filename) {
    fetch(`code/${ filename }`)
      .then(response => {
        if (response.ok) {
          response.text().then(text => {
            const highlightAuto = RevealHighlight().hljs.highlightAuto(text);
            code.classList.add(`language-${ highlightAuto.language }`);
            code.innerHTML = highlightAuto.value;
          });
        } else {
          code.innerHTML = '<span class="error">Error: ' + response.statusText + '</span>';
        }
      })
  }
});

let deck = new Reveal({
  plugins: [RevealHighlight],
});
deck.initialize({ hash: true });

