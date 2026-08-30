const fs=require('fs');
const os=require('os');
const path=require('path');
const {pathToFileURL}=require('url');
const {chromium}=require('playwright');

const ROOT=path.resolve(__dirname,'..','..');
const OUTPUT=process.env.JZ_FONT_QA_DIR||fs.mkdtempSync(path.join(os.tmpdir(),'jz-font-qa-'));
const browserCandidates=[process.env.JZ_CHROMIUM_PATH,'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe','C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'];
const executablePath=browserCandidates.find(candidate=>candidate&&fs.existsSync(candidate));
const pages=[
  ['report-zh','report/proposal.html',false],
  ['report-en','report/proposal.en.html',false],
  ['visual-zh','visual/index.html',true],
  ['visual-en','visual/index.en.html',true]
];
const ensure=(value,message)=>{if(!value)throw new Error(message)};

(async()=>{
  fs.mkdirSync(OUTPUT,{recursive:true});
  const browser=await chromium.launch({headless:true,...(executablePath?{executablePath}:{})});
  const desktop=await browser.newContext({viewport:{width:1440,height:1600},offline:true,reducedMotion:'reduce'});
  const results=[];
  for(const [name,relative,interactive] of pages){
    const page=await desktop.newPage();
    const remote=[];
    page.on('request',request=>{if(/^https?:/i.test(request.url()))remote.push(request.url())});
    await page.goto(pathToFileURL(path.join(ROOT,relative)).href,{waitUntil:'load'});
    await page.evaluate(()=>document.fonts.ready);
    const font=await page.evaluate(()=>({
      ready:document.fonts.check('16px "JZ Civic CJK"','京张双答公共路径中文'),
      body:getComputedStyle(document.body).fontFamily,
      replacement:document.body.innerText.includes('\uFFFD')||document.body.innerText.includes('\u25A1'),
      cjk:[...document.body.innerText].filter(c=>c.codePointAt(0)>=0x3400&&c.codePointAt(0)<=0x9fff).length
    }));
    ensure(font.ready,`${relative}: embedded JZ Civic CJK did not load`);
    ensure(font.body.includes('JZ Civic CJK'),`${relative}: body does not use JZ Civic CJK`);
    ensure(!font.replacement,`${relative}: replacement/tofu character present in text`);
    ensure(remote.length===0,`${relative}: made remote requests: ${remote.join(', ')}`);
    await page.screenshot({path:path.join(OUTPUT,`${name}-1440x1600.png`),fullPage:false});
    await page.screenshot({path:path.join(OUTPUT,`${name}-full.png`),fullPage:true});
    if(interactive){
      for(const state of ['OPEN','TRIAL','PAUSE','RETIRE']){
        await page.click(`[data-state="${state}"]`);
        ensure((await page.url()).includes(`state=${state}`),`${relative}: ${state} hash not restored`);
      }
      for(const time of ['DAY','NIGHT']){
        await page.click(`[data-time="${time}"]`);
        ensure((await page.url()).includes(`time=${time}`),`${relative}: ${time} hash not restored`);
      }
    }
    results.push({name,relative,font,remote_requests:remote.length});
    await page.close();
  }
  await desktop.close();

  const mobile=await browser.newContext({viewport:{width:390,height:844},offline:true,reducedMotion:'reduce'});
  for(const [name,relative] of pages.filter(item=>item[2])){
    const page=await mobile.newPage();
    await page.goto(pathToFileURL(path.join(ROOT,relative)).href,{waitUntil:'load'});
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:path.join(OUTPUT,`${name}-390x844.png`),fullPage:false});
    await page.close();
  }
  await mobile.close();
  await browser.close();
  console.log(JSON.stringify({ok:true,output_dir:OUTPUT,pages:results},null,2));
})().catch(error=>{console.error(error.stack||error);process.exit(1)});
