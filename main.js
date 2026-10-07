const toggle=document.querySelector('.menu');const nav=document.querySelector('#nav');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus()}});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));const legacy={"#familia":"/nuestra-casa/","#camino":"/camino-jtl/"};if(location.pathname==='/'&&legacy[location.hash])location.replace(legacy[location.hash]);document.querySelectorAll('[data-event-end]').forEach(el=>{if(Date.now()>new Date(el.dataset.eventEnd).getTime()){el.querySelector('.eyebrow').textContent='ENCUENTRO REALIZADO · OCTUBRE 2026';el.querySelector('.button').remove()}});
const bankCopy=document.getElementById('copy-bank');
if(bankCopy){bankCopy.hidden=false;bankCopy.addEventListener('click',async()=>{
const data='Titular: Iglesia Jesús te llama ciudad de coquimbo\nBanco: Scotiabank\nTipo: Cuenta corriente\nCuenta: 000991522425\nRUT: 65.247.512-4\nCorreo: aportesjtlcoquimbo@gmail.com';
const status=document.getElementById('copy-status');
try{await navigator.clipboard.writeText(data);status.textContent='Datos copiados. Ya puedes pegarlos en tu aplicación bancaria.';}
catch{status.textContent='No fue posible copiar automáticamente. Selecciona los datos de esta página y cópialos manualmente.';}
});}

document.querySelectorAll('[data-highlight-until]').forEach(el=>{if(Date.now()>=Date.parse(el.dataset.highlightUntil))el.hidden=true;});
const upcoming=document.querySelector('.upcoming-home');if(upcoming&&[...upcoming.querySelectorAll('[data-highlight-until]')].every(el=>el.hidden))upcoming.hidden=true;
