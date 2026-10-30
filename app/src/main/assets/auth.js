(()=>{
  const HASH='1f8c179789d9425932effae37eb26635045b8569ca393f52daa8d0ad743d3021';
  const gate=document.getElementById('login-gate');
  const form=document.getElementById('login-form');
  const input=document.getElementById('site-password');
  const error=document.getElementById('login-error');
  const unlock=()=>{document.body.classList.remove('locked');gate?.remove()};
  try{if(sessionStorage.getItem('hawraz_session_unlocked')==='yes'){unlock();return}}catch(e){}
  gate?.classList.add('visible');
  form?.addEventListener('submit',async e=>{
    e.preventDefault();error.textContent='';
    try{
      const bytes=new TextEncoder().encode(input.value);
      const digest=await crypto.subtle.digest('SHA-256',bytes);
      const actual=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
      if(actual===HASH){try{sessionStorage.setItem('hawraz_session_unlocked','yes')}catch(e){}unlock()}
      else{error.textContent='رمز عبور درست نیست.';input.value='';input.focus()}
    }catch(err){error.textContent='امکان بررسی رمز در این محیط وجود ندارد؛ برنامه را از طریق آدرس امن یا سرور محلی باز کن.'}
  });
})();
