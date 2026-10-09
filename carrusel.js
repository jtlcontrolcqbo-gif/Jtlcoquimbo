(()=>{
const region=document.querySelector('.upcoming-home');if(!region)return;
const slides=[...region.querySelectorAll('[data-highlight-until]')].filter(el=>!el.hidden);if(!slides.length)return;
const controls=region.querySelector('.activity-controls');
const pause=region.querySelector('[data-carousel="pause"]');
const count=region.querySelector('.activity-count');
const dots=region.querySelector('.activity-dots');
const announcement=region.querySelector('.activity-announcement');
const motion=matchMedia('(prefers-reduced-motion: reduce)');
let current=0,paused=motion.matches,hover=false,visible=false,timer;
const labels=slides.map(el=>el.dataset.activityLabel||(el.classList.contains('school-banner')?'Inicio Escuela Avanzada':'Seminario: El llamado a plantar nuevas iglesias'));
region.classList.add('carousel-ready');controls.hidden=slides.length<2;
const buttons=slides.map((slide,i)=>{slide.setAttribute('role','group');slide.setAttribute('aria-roledescription','diapositiva');slide.setAttribute('aria-label',(i+1)+' de '+slides.length+': '+labels[i]);const b=document.createElement('button');b.type='button';b.textContent=String(i+1);b.setAttribute('aria-label','Mostrar '+labels[i]);b.addEventListener('click',()=>{paused=true;show(i,true);});dots.append(b);return b;});
function schedule(){clearTimeout(timer);pause.textContent=paused?'Reanudar':'Pausar';if(slides.length>1&&!paused&&!hover&&visible&&!document.hidden)timer=setTimeout(()=>show((current+1)%slides.length,false),7000);}
function show(index,announce){current=(index+slides.length)%slides.length;slides.forEach((s,i)=>{s.hidden=i!==current;s.classList.toggle('activity-active',i===current);buttons[i].setAttribute('aria-current',i===current?'true':'false');});count.textContent=(current+1)+' / '+slides.length;if(announce)announcement.textContent=labels[current];schedule();}
function manual(delta){paused=true;show(current+delta,true);}
region.querySelector('[data-carousel="previous"]').addEventListener('click',()=>manual(-1));
region.querySelector('[data-carousel="next"]').addEventListener('click',()=>manual(1));
pause.addEventListener('click',()=>{paused=!paused;schedule();});
region.addEventListener('mouseenter',()=>{hover=true;schedule();});region.addEventListener('mouseleave',()=>{hover=false;schedule();});
region.addEventListener('focusin',()=>{paused=true;schedule();});
region.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();manual(e.key==='ArrowLeft'?-1:1);}});
let start=null;const viewport=region.querySelector('.upcoming-grid');
viewport.addEventListener('touchstart',e=>{start=[e.touches[0].clientX,e.touches[0].clientY];},{passive:true});
viewport.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start[0],dy=e.changedTouches[0].clientY-start[1];start=null;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)manual(dx<0?1:-1);},{passive:true});
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.15}).observe(region);
document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',()=>{if(motion.matches)paused=true;schedule();});
show(0,false);
})();
