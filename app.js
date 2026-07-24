const q=id=>document.getElementById(id);
const row=(id,v)=>q(id).hidden=!v;
async function start(){
  const id=new URLSearchParams(location.search).get('id');
  if(!id) throw new Error('Missing id');
  const r=await fetch('employees.json',{cache:'no-store'});
  if(!r.ok) throw new Error('Data load failed');
  const data=await r.json();
  const e=data.find(x=>String(x.id)===String(id));
  if(!e) throw new Error('Not found');

  q('name').textContent=[e.firstName,e.lastName].filter(Boolean).join(' ');
  q('jobTitle').textContent=e.jobTitle||'';
  q('department').textContent=e.department||'';
  q('employeeId').textContent=e.employeeId||'';
  q('status').textContent=e.status||'Active';

  q('photo').src=e.photo||'images/placeholder.svg';
  q('email').textContent=e.email||'';
  q('email').href=e.email?'mailto:'+e.email:'#';
  q('workPhone').textContent=e.workPhone||'';
  q('workPhone').href=e.workPhone?'tel:'+e.workPhone.replace(/[^+\d]/g,''):'#';
  q('cellPhone').textContent=e.cellPhone||'';
  q('cellPhone').href=e.cellPhone?'tel:'+e.cellPhone.replace(/[^+\d]/g,''):'#';

  row('employeeIdRow',e.employeeId);
  row('emailRow',e.email);
  row('workPhoneRow',e.workPhone);
  row('cellPhoneRow',e.cellPhone);

  q('loading').hidden=true;
  q('profile').hidden=false;
}
start().catch(err=>{
  console.error(err);
  q('loading').hidden=true;
  q('error').hidden=false;
});
