const fs=require('fs');
const os=require('os');
const path=require('path');
const crypto=require('crypto');
const {spawnSync}=require('child_process');

const ROOT=path.resolve(__dirname,'..','..');
const INPUTS=['report/proposal.html','report/proposal.en.html','visual/index.html','visual/index.en.html','visual/assets/build-html.js'];
const FAMILY='JZ Civic CJK';
const SOURCE_URL='https://github.com/adobe-fonts/source-han-sans/raw/2.005R/Variable/WOFF2/OTF/Subset/SourceHanSansCN-VF.otf.woff2';
const sha=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
const ensure=(value,message)=>{if(!value)throw new Error(message)};

function argument(name,fallback){const index=process.argv.indexOf(name);return index>=0?process.argv[index+1]:fallback}
function glyphs(){
  const set=new Set(Array.from({length:95},(_,index)=>String.fromCodePoint(index+32)));
  for(const relative of INPUTS)for(const character of fs.readFileSync(path.join(ROOT,relative),'utf8'))if(character.codePointAt(0)>=32)set.add(character);
  return [...set].sort((a,b)=>a.codePointAt(0)-b.codePointAt(0)).join('');
}
function run(command,args,environment=process.env){
  const result=spawnSync(command,args,{encoding:'utf8',env:environment});
  if(result.status!==0)throw new Error(`${command} failed\n${result.stdout||''}\n${result.stderr||''}`);
}

function build(){
  const source=argument('--source');
  ensure(source&&fs.existsSync(source),'Pass --source <official SourceHanSansCN variable WOFF2>');
  const sourceUrl=argument('--source-url',SOURCE_URL);
  const python=argument('--python',process.env.PYTHON||'python');
  const subsetCommand=argument('--pyftsubset',process.env.PYFTSUBSET||'pyftsubset');
  const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'jz-font-build-'));
  const glyphText=glyphs();
  const glyphPath=path.join(temporary,'glyphs.txt');
  const preliminary=path.join(temporary,'subset-pre.woff2');
  const output=path.join(temporary,'subset.woff2');
  fs.writeFileSync(glyphPath,glyphText);
  run(subsetCommand,[source,`--text-file=${glyphPath}`,'--flavor=woff2','--layout-features=*','--no-hinting','--name-IDs=*','--name-languages=*','--name-legacy',`--output-file=${preliminary}`]);
  const rename=`from fontTools.ttLib import TTFont\nimport sys\nf=TTFont(sys.argv[1],recalcTimestamp=False)\nv={1:'JZ Civic CJK',2:'Regular',3:'JZ Civic CJK V17.1',4:'JZ Civic CJK',6:'JZCivicCJK',16:'JZ Civic CJK',17:'Regular',21:'JZ Civic CJK',22:'Regular',25:'JZCivicCJK'}\nfor n in f['name'].names:\n  if n.nameID in v:\n    try:n.string=v[n.nameID].encode(n.getEncoding())\n    except (LookupError,UnicodeEncodeError):n.string=v[n.nameID].encode('utf-16-be')\nif 'head' in f:\n  f['head'].created=2082844800\n  f['head'].modified=2082844800\nf.flavor='woff2'\nf.save(sys.argv[2],reorderTables=True)`;
  run(python,['-c',rename,preliminary,output]);
  const binary=fs.readFileSync(output);
  ensure(binary.length<=480*1024,`Subset exceeds 480 KiB: ${binary.length}`);
  const bundle={schema_version:'1.0.0',family:FAMILY,format:'woff2',sha256:sha(binary),bytes:binary.length,data_base64:binary.toString('base64')};
  const glyphManifest={schema_version:'1.0.0',source_files:INPUTS,glyph_count:[...glyphText].length,characters:glyphText};
  const metadata={schema_version:'1.0.0',family:FAMILY,license:'SIL Open Font License 1.1',upstream:{project:'Source Han Sans',version:'2.005R',url:sourceUrl,sha256:sha(fs.readFileSync(source))},subset:{sha256:bundle.sha256,bytes:bundle.bytes,glyph_count:glyphManifest.glyph_count,generator:'visual/assets/build-font.js'},reserved_font_name_handling:'The derived family is renamed JZ Civic CJK; no Source reserved font name is used for the subset family.',runtime_use:'The base64 WOFF2 bundle is embedded in all four offline HTML deliverables.'};
  fs.writeFileSync(path.join(__dirname,'font-bundle.json'),JSON.stringify(bundle,null,2)+'\n');
  fs.writeFileSync(path.join(__dirname,'font-glyphs.json'),JSON.stringify(glyphManifest,null,2)+'\n');
  fs.writeFileSync(path.join(__dirname,'font-metadata.json'),JSON.stringify(metadata,null,2)+'\n');
  fs.rmSync(temporary,{recursive:true,force:true});
  console.log(JSON.stringify(metadata,null,2));
}

module.exports={build};if(require.main===module)build();
