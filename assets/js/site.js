(function(){
 const root=document.body.dataset.root||'.';
 const rootUrl=(p)=>root+'/'+p.replace(/^\//,'');
 const themeBtn=document.querySelector('[data-theme-toggle]');
 const saved=localStorage.getItem('efritonia-theme'); if(saved) document.documentElement.dataset.theme=saved;
 if(themeBtn){themeBtn.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('efritonia-theme',next);themeBtn.textContent=next==='dark'?'☀ Светлая тема':'☾ Тёмная тема';});}
 const menuBtn=document.querySelector('[data-menu-toggle]'),nav=document.querySelector('.nav'); if(menuBtn&&nav)menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
 // mark active nav item
 const cleanPath=p=>p.replace(/index\.html$/,'').replace(/\/+$/,'');const currentPath=cleanPath(location.pathname);document.querySelectorAll('.nav a').forEach(a=>{try{if(cleanPath(new URL(a.href,location.href).pathname)===currentPath)a.classList.add('active')}catch(_){}});
 // Search across archive pages
 const searchBtn=document.querySelector('[data-search-open]'),panel=document.querySelector('.search-panel'),input=panel&&panel.querySelector('input'),results=panel&&panel.querySelector('.search-results');
 const index=[
  ['Главная','Кратко об Эфритонии, герб, флаг и главные события','index.html'],
  ['Государство','Паспорт, правители, религия, валюта и ресурсы','state/index.html'],
  ['Летопись','Хронология 955–1270 и важнейшие события','chronicle/index.html'],
  ['Основание и Козань','Основание страны и столица','chronicle/index.html'],
  ['Войны Эфритонии','Все военные кампании и войны страны','campaigns/index.html'],
  ['Незерская кампания','Путь в Незер и битва у портала 1240–1245','campaigns/nether/index.html'],
  ['Эндская кампания','Поход в Энд, дракон и города Края 1245–1250','campaigns/end/index.html'],
  ['Война с разбойниками','Великая война 1270 года','campaigns/pillagers/index.html'],
  ['Территория и регионы','Козань, три региона и четвёртый строящийся','territory/index.html'],
  ['Здания','Белый дом, общежития, фермы и другие сооружения','heritage/buildings/index.html'],
  ['Памятники','Памятники голему, Руслану, собакам и Тому Перлу','heritage/memorials/index.html'],
  ['Герои и жители','Правители, Максим и жители страны','people/index.html'],
  ['Музей и реликвии','Драконье яйцо, элитры, стержни ифрита','museum/index.html'],
  ['Новости','Будущие новости Эфритонии','news/index.html'],
  ['Документы','Государственные документы и законы','documents/index.html'],
  ['Фотоархив','Все фотографии по историческим категориям','archive/index.html'],
 ];
 if(searchBtn&&panel){searchBtn.addEventListener('click',()=>{panel.classList.toggle('open');if(input)input.focus()});document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();panel.classList.add('open');input&&input.focus()}if(e.key==='Escape')panel.classList.remove('open')});if(input)input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();results.innerHTML='';if(!q){results.innerHTML='<div class="empty">Введите название раздела, события или объекта.</div>';return}const found=index.filter(x=>x.join(' ').toLowerCase().includes(q));if(!found.length){results.innerHTML='<div class="empty">Ничего не найдено.</div>';return}found.forEach(x=>{const a=document.createElement('a');a.href=rootUrl(x[2]);a.innerHTML='<strong>'+x[0]+'</strong><small>'+x[1]+'</small>';results.appendChild(a)})});}
 // missing-image placeholders
 document.querySelectorAll('img[data-fallback]').forEach(img=>{img.addEventListener('error',()=>{const box=document.createElement('div');box.className='image-placeholder';box.textContent=img.dataset.fallback||'Изображение ещё не добавлено';img.replaceWith(box)},{once:true})});
 // photo category pages
 const gallery=document.querySelector('[data-gallery]');
 if(gallery&&window.EFRITONIA_PHOTOS){const key=gallery.dataset.gallery,group=window.EFRITONIA_PHOTOS[key];if(group){const wrap=gallery.querySelector('.photo-grid');const filter=gallery.querySelector('[data-photo-filter]');const list=group.files.map((file,i)=>({file,title:group.title+' — снимок '+(i+1),path:group.folder+'/'+file}));function render(q=''){wrap.innerHTML='';const filtered=list.filter(x=>(x.title+' '+x.file).toLowerCase().includes(q.toLowerCase()));if(!filtered.length){wrap.innerHTML='<p class="empty">По этому запросу ничего не найдено.</p>';return}filtered.forEach((item,i)=>{const fig=document.createElement('figure');fig.className='photo';const img=document.createElement('img');img.src=rootUrl(item.path);img.alt=item.title;img.dataset.fallback='Фотография '+item.file+' — добавьте файл в '+item.path;img.loading='lazy';const cap=document.createElement('figcaption');cap.innerHTML='<strong>'+item.title+'</strong><br><small>'+item.file+'</small>';fig.append(img,cap);img.addEventListener('error',()=>{const ph=document.createElement('div');ph.className='image-placeholder';ph.textContent='Файл '+item.file+' ещё не добавлен';img.replaceWith(ph)},{once:true});fig.addEventListener('click',()=>openLightbox(item.path,item.title));wrap.appendChild(fig)})}render();if(filter)filter.addEventListener('input',()=>render(filter.value));}}
 // lightbox for any image marked zoom
 const lb=document.querySelector('.lightbox');function openLightbox(src,alt){if(!lb)return;const im=lb.querySelector('img');im.src=rootUrl(src);im.alt=alt;lb.classList.add('open');}window.openLightbox=openLightbox;if(lb){lb.addEventListener('click',e=>{if(e.target===lb||e.target.matches('[data-close]'))lb.classList.remove('open')});document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open')});document.querySelectorAll('img[data-zoom]').forEach(img=>img.addEventListener('click',()=>openLightbox(img.dataset.zoom||img.getAttribute('src'),img.alt)));}
})();
