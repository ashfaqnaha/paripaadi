const $=id=>document.getElementById(id);
let candidates=[],candidateIndex=0,activeName="",animationFrame=0;
function showPrompt(name){
 const occasion=findEvent(name);
 if(!occasion){hidePrompt();$('event').setCustomValidity('Choose a festival from the suggestions so we can use a recognizable visual.');$('event').reportValidity();return;}
 candidates=shortlist(occasion).kept;
 candidateIndex=0;activeName=name;
 cancelAnimationFrame(animationFrame);
 $('prompt').classList.remove('scrambling');
 $('prompt').readOnly=false;
 $('copy').disabled=false;
 $('event').value=name;
 $('prompt').value=generatePrompt(name,candidates[0]);
 $('regenerate').disabled=candidates.length<2;
 $('regenerate').title=candidates.length<2?'No further ranked matches for this festival.':'';
 $('result').hidden=false;
 $('status').textContent='Copy this into your image-generation tool.';
 $('copy').textContent='Copy prompt';
 return $('prompt').value;
}
$('festivals').innerHTML=EVENTS.map(e=>`<option value="${e.name}"></option>`).join('');
$('festival-form').addEventListener('submit',e=>{e.preventDefault();const name=$('event').value.trim();if(!name){$('event').setCustomValidity('Enter a festival or holiday.');$('event').reportValidity();return;}showPrompt(name);});
function hidePrompt(){ cancelAnimationFrame(animationFrame);$('result').hidden=true; $('prompt').value=''; }
$('event').addEventListener('input',()=>{$('event').setCustomValidity('');hidePrompt();});
window.addEventListener('pageshow',hidePrompt);
function replaceWithScramble(text){
 cancelAnimationFrame(animationFrame);
 const box=$('prompt');
 const finish=()=>{box.value=text;box.classList.remove('scrambling');box.readOnly=false;$('copy').disabled=false;$('regenerate').disabled=candidateIndex>=candidates.length-1;$('regenerate').title=$('regenerate').disabled?'You have reached the last matching idea.':'';$('status').textContent=$('regenerate').disabled?'Last matching idea. Copy it into your image tool.':'New idea ready. Copy it into your image tool.';};
 $('copy').disabled=true;$('regenerate').disabled=true;box.readOnly=true;
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}
 box.classList.add('scrambling');box.scrollTop=0;
 const glyphs='01アイウエオカキクケコサシスセソ';
 const start=performance.now();let previousFrame=-1;
 function frame(now){
  const progress=Math.min((now-start)/850,1);
  if(progress===1){finish();return;}
  const step=Math.floor((now-start)/45);
  if(step!==previousFrame){previousFrame=step;const revealed=Math.floor(text.length*progress);box.value=Array.from(text,(char,i)=>i<revealed||/\s/.test(char)?char:glyphs[Math.floor(Math.random()*glyphs.length)]).join('');}
  animationFrame=requestAnimationFrame(frame);
 }
 animationFrame=requestAnimationFrame(frame);
}
$('regenerate').addEventListener('click',()=>{
 if(candidateIndex>=candidates.length-1)return;
 candidateIndex++;
 $('copy').textContent='Copy prompt';$('status').textContent='Finding the next idea…';
 replaceWithScramble(generatePrompt(activeName,candidates[candidateIndex]));
});
$('copy').addEventListener('click',async()=>{
 let success=false;
 try{if(!navigator.clipboard)throw Error();await navigator.clipboard.writeText($('prompt').value);success=true;}catch{$('prompt').focus();$('prompt').select();try{success=document.execCommand('copy');}catch{}}
 $('copy').textContent=success?'Copied':'Copy prompt';
 $('status').textContent=success?'Paste it into your image-generation tool.':'Press Ctrl+C or ⌘C, then paste into your image-generation tool.';
});
if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'choose_festival',description:'Set the festival field. The user must press Get prompt to reveal the prompt.',inputSchema:{type:'object',properties:{festival:{type:'string',minLength:1,maxLength:100}},required:['festival'],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){if(!input||typeof input.festival!=='string'||!input.festival.trim()||input.festival.length>100)throw new Error('Enter a festival name of 1–100 characters.');$('event').value=input.festival.trim();hidePrompt();return {festival:$('event').value,nextAction:'Press Get prompt'};}})).catch(()=>{});}catch{}}
