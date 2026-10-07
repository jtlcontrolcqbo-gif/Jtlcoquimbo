(()=>{
const dialog=document.getElementById('jtl-wa-dialog');
const open=document.getElementById('jtl-wa-open');
if(!dialog||!open)return;
open.addEventListener('click',()=>dialog.showModal());
document.getElementById('jtl-wa-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>open.focus());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
})();
