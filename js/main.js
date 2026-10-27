(()=>{
const config=window.PORTFOLIO_CONFIG||{works:[],commissionOpen:false};
const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const page=document.body.dataset.page;
$$('.main-nav a').forEach(a=>{if(a.dataset.page===page){a.classList.add('active');a.setAttribute('aria-current','page')}});
const nav=$('#mainNav'),menu=$('#menuToggle');menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰'});
const themeButton=$('#themeToggle');const savedTheme=localStorage.getItem('yizhiling-theme');if(savedTheme==='dark'||savedTheme==='light') document.documentElement.dataset.theme=savedTheme;
function themeLabel(){themeButton.textContent=document.documentElement.dataset.theme==='dark'?'☀':'◐';} themeLabel();themeButton?.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('yizhiling-theme',next);themeLabel()});
$$('[data-commission-status]').forEach(el=>{el.textContent=config.commissionOpen?'委託開放中':'暫停接受委託';el.classList.toggle('is-closed',!config.commissionOpen)});
$('#year').textContent=new Date().getFullYear();
function realImageFor(id){return config.works.find(x=>x.id===id)?.image;}
$$('[data-work-index]').forEach(el=>{const src=realImageFor(Number(el.dataset.workIndex));if(src)el.src=src});
const modal=$('#lightbox'),modalImg=$('#lightboxImage'),modalCaption=$('#lightboxCaption');
function showImage(item){modalImg.src=item.image;modalImg.alt=item.alt;modalCaption.textContent=item.title; if(typeof modal.showModal==='function')modal.showModal();}
$('#closeLightbox')?.addEventListener('click',()=>modal.close());modal?.addEventListener('click',e=>{if(e.target===modal)modal.close()});
function makeCard(item,i){const card=document.createElement('button');card.className='work-card';card.type='button';card.setAttribute('aria-label','放大作品：'+item.title);const frame=document.createElement('span');frame.className='work-card-image';const img=document.createElement('img');img.src=item.image;img.alt=item.alt;img.loading=i>2?'lazy':'eager';frame.appendChild(img);const foot=document.createElement('span');foot.className='work-card-footer';const title=document.createElement('strong');title.textContent=item.title;const cat=document.createElement('span');cat.textContent=item.category+' ↗';foot.append(title,cat);card.append(frame,foot);card.addEventListener('click',()=>showImage(item));return card}
function render(container,items){if(!container)return;container.replaceChildren(...items.map(makeCard))}
render($('#featuredGrid'),config.works.slice(0,3));
const gallery=$('#galleryGrid'),filters=$('#galleryFilters');if(gallery&&filters){const categories=['全部作品',...new Set(config.works.map(w=>w.category))];function filterBy(category){$$('.filter-chip',filters).forEach(chip=>{const on=chip.dataset.category===category;chip.classList.toggle('selected',on);chip.setAttribute('aria-pressed',String(on))});const items=category==='全部作品'?config.works:config.works.filter(w=>w.category===category);render(gallery,items);$('#workCount').textContent=items.length+' WORKS'}categories.forEach(cat=>{const button=document.createElement('button');button.type='button';button.className='filter-chip';button.dataset.category=cat;button.textContent=cat;button.addEventListener('click',()=>filterBy(cat));filters.appendChild(button)});filterBy('全部作品')}
})();
