const fs=require('fs'), crypto=require('crypto'), path=require('path')
const files=fs.readFileSync('scripts/flags/cf/files.txt','utf8').split('\n').filter(Boolean)
const OUT='public/cf'; fs.mkdirSync(OUT,{recursive:true})
const MAN='scripts/flags/cf/manifest.json'
let manifest=fs.existsSync(MAN)?JSON.parse(fs.readFileSync(MAN,'utf8')):{}
const UA='GlobalioFlagFetcher/1.0 (https://globalio.netlify.app; contact keganbergeron@gmail.com)'
const sleep=ms=>new Promise(r=>setTimeout(r,ms))
let done=Object.keys(manifest).length, failed=0, fails=[]
function slug(name){let ext=(name.split('.').pop()||'svg').toLowerCase(); if(ext==='jpeg')ext='jpg'; const h=crypto.createHash('sha1').update(name).digest('hex').slice(0,16); return h+'.'+ext}
function directUrl(name){
  const fn=name.replace(/ /g,'_')
  const md5=crypto.createHash('md5').update(fn).digest('hex')
  return `https://upload.wikimedia.org/wikipedia/commons/${md5[0]}/${md5.slice(0,2)}/${encodeURIComponent(fn)}`
}
async function fetchOne(name){
  const url=directUrl(name)
  for(let a=0;a<4;a++){
    try{
      const res=await fetch(url,{headers:{'User-Agent':UA}})
      if(res.status===429||res.status>=500){await sleep(800*(a+1)+Math.random()*400);continue}
      if(!res.ok) return false  // 404 = dead file
      const buf=Buffer.from(await res.arrayBuffer())
      if(buf.length<40) return false
      const s=slug(name); fs.writeFileSync(path.join(OUT,s),buf); manifest[name]='/cf/'+s; return true
    }catch(e){await sleep(600*(a+1))}
  }
  return false
}
async function main(){
  const queue=files.filter(n=>!manifest[n])
  const CONC=8
  async function worker(){
    while(queue.length){
      const name=queue.shift()
      const ok=await fetchOne(name)
      if(ok)done++; else {failed++; fails.push(name)}
      if((done+failed)%50===0){fs.writeFileSync(MAN,JSON.stringify(manifest)); fs.writeFileSync('scripts/flags/cf/dl.log',`done=${done} failed=${failed} remaining=${queue.length}\n`)}
      await sleep(40)
    }
  }
  await Promise.all(Array.from({length:CONC},worker))
  fs.writeFileSync(MAN,JSON.stringify(manifest))
  fs.writeFileSync('scripts/flags/cf/fails.txt',fails.join('\n'))
  fs.writeFileSync('scripts/flags/cf/dl.log',`COMPLETE done=${done} failed=${failed}\n`)
}
main()
