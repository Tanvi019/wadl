const base = '/api/students';
const out = document.getElementById('output');

function show(json){
  if(typeof json === 'string') { out.innerHTML = `<pre>${json}</pre>`; return; }
  out.innerHTML = `<pre>${JSON.stringify(json, null, 2)}</pre>`;
}

document.getElementById('insertSample').onclick = async ()=>{
  const r = await fetch(base + '/insert');
  show(await r.text());
};

document.getElementById('listAll').onclick = async ()=>{
  const r = await fetch(base + '/all');
  show(await r.json());
};

document.getElementById('tableView').onclick = async ()=>{
  const r = await fetch(base + '/table');
  out.innerHTML = await r.text();
};

document.getElementById('dsbda20').onclick = async ()=>{
  const r = await fetch(base + '/dsbda/above20');
  show(await r.json());
};

document.getElementById('above25All').onclick = async ()=>{
  const r = await fetch(base + '/above25/all');
  show(await r.json());
};

document.getElementById('less40Both').onclick = async ()=>{
  const r = await fetch(base + '/lessthan40/both');
  show(await r.json());
};

document.getElementById('addForm').onsubmit = async (e)=>{
  e.preventDefault();
  const fm = new FormData(e.target);
  const obj = Object.fromEntries(fm.entries());
  // convert numbers
  ['Roll_No','WAD_Marks','DSBDA_Marks','CNS_Marks','CC_Marks','AI_marks'].forEach(k=>obj[k]=Number(obj[k]));

  const r = await fetch(base + '/add', {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(obj)});
  show(await r.text());
  e.target.reset();
};

document.getElementById('updateForm').onsubmit = async (e)=>{
  e.preventDefault();
  const roll = document.getElementById('updateRoll').value;
  const r = await fetch(base + '/update/' + roll, {method:'PUT'});
  show(await r.text());
};

document.getElementById('deleteForm').onsubmit = async (e)=>{
  e.preventDefault();
  const roll = document.getElementById('deleteRoll').value;
  const r = await fetch(base + '/delete/' + roll, {method:'DELETE'});
  show(await r.text());
};

// add small handler to POST /add route - server route exists in controller via student.create? We will create a simple pass-through on server side via /api/students/add by reusing controller.create
