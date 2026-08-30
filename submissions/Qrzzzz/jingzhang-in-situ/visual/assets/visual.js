(()=>{
const drawer=document.querySelector('[data-drawer]');const open=document.querySelector('[data-open]');const close=document.querySelector('[data-close]');let previous=null;
const focusable=root=>[...root.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el=>!el.hidden);
const drawerPeers=()=>[...document.body.children].filter(el=>el!==drawer);
function showDrawer(){previous=document.activeElement;drawer.hidden=false;drawerPeers().forEach(el=>{el.inert=true});document.body.classList.add('dialog-open');close.focus()}
function hideDrawer(){drawer.hidden=true;drawerPeers().forEach(el=>{el.inert=false});document.body.classList.remove('dialog-open');previous?.focus()}
open?.addEventListener('click',showDrawer);close?.addEventListener('click',hideDrawer);
drawer?.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();hideDrawer()}if(event.key==='Tab'){const items=focusable(drawer);if(!items.length)return;const first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});
const lightbox=document.querySelector('[data-lightbox]');const lightboxImage=lightbox?.querySelector('img');const lightboxTitle=lightbox?.querySelector('[data-lightbox-title]');const lightboxSummary=lightbox?.querySelector('[data-lightbox-summary]');const lightboxClose=lightbox?.querySelector('[data-lightbox-close]');const lightboxViewport=lightbox?.querySelector('.lightbox-viewport');let lightboxReturn=null;
function setZoom(value){if(!lightboxImage)return;lightboxImage.style.width=value+'%';lightboxViewport?.scrollTo({left:0,top:0,behavior:'auto'})}
document.querySelectorAll('[data-zoom-src]').forEach(button=>button.addEventListener('click',()=>{lightboxReturn=button;lightboxImage.src=button.dataset.zoomSrc;lightboxImage.alt=button.dataset.zoomAlt;lightboxTitle.textContent=button.dataset.zoomTitle;lightboxSummary.textContent=button.dataset.zoomSummary;setZoom(100);lightbox.showModal();lightboxClose.focus()}));
lightbox?.querySelectorAll('[data-lightbox-zoom]').forEach(button=>button.addEventListener('click',()=>setZoom(Number(button.dataset.lightboxZoom))));
lightbox?.addEventListener('keydown',event=>{if(event.key!=='Tab')return;const items=focusable(lightbox);if(!items.length)return;const first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}});
lightboxClose?.addEventListener('click',()=>lightbox.close());lightbox?.addEventListener('cancel',event=>{event.preventDefault();lightbox.close()});lightbox?.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});lightbox?.addEventListener('close',()=>{lightboxImage.removeAttribute('src');lightboxReturn?.focus()});
})();
