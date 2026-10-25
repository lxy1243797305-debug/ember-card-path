(() => {
  'use strict';
  const {Game,ENEMIES,card}=Ember, $=id=>document.getElementById(id);
  const paths={sword:'m5 3 15 15-3 3L2 6 2 2 3 3Zm9 13 6-6m-2 8 4 4m-1-5-4 4',shield:'M12 2 21 6v6c0 5-9 10-9 10S3 17 3 12V6l9-4Zm-4 9 3 3 5-6',flame:'M13 2c2 7 7 8 7 13a8 8 0 0 1-16 0c0-4 3-7 5-9-1 6 1 7 2 7 3-2 3-5 2-11Zm-1 12c-3 3-3 5 0 7 3-2 3-4 0-7',wind:'M3 7h12c6 0 6-6 2-6M2 12h17c5 0 4 7 0 6M5 17h5c5 0 4 6 0 6',leaf:'M20 3C9 1 2 6 4 14c2 8 16 7 16-11ZM3 22 16 8m-8 9-1-6m5 2 5 1',rune:'M12 2 21 12 12 22 3 12 12 2Zm0 5v10M7 12h10m-8-3 6 6m0-6-6 6',arrow:'M3 12h18m-7-7 7 7-7 7',book:'M3 3h7l2 2 2-2h7v17h-7l-2 1-2-1H3V3Zm9 2v16M6 7h3m-3 4h3m6-4h3m-3 4h3',soundoff:'M11 4 6 8H2v8h4l5 4V4Zm5 5 6 6m0-6-6 6',sound:'M11 4 6 8H2v8h4l5 4V4Zm4 4c3 3 3 5 0 8m3-11c5 5 5 9 0 14',help:'M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 4m0 3v.1M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20',heart:'M12 21 3 12C-3 4 8-1 12 6c4-7 15-2 9 6l-9 9Z',energy:'M13 2 4 14h7l-1 8 10-13h-8l1-7Z',compass:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 5-3 7-7 3 3-7 7-3Z',restart:'M3 11a9 9 0 1 1 2 7M3 4v7h7',cards:'M7 6h14v16H7V6ZM3 18V2h14',quill:'M4 21 21 3C10 1 4 7 5 17m-1 4h7m-1-9 4 1',chevron:'m9 5 7 7-7 7',close:'m5 5 14 14m0-14L5 19',check:'m4 12 5 5L20 6',camp:'m3 22 6-3 6 3 6-3M9 14l-2-4 4-8 3 6c6 6 3 9-2 10-3 0-5-1-6-4m1 8 10-3',hammer:'m3 21 10-10m-3-5 5-4 7 7-4 5-8-8Z',trophy:'M7 2h10v8c0 6-10 6-10 0V2Zm10 2h5v3c0 4-5 4-5 4M7 4H2v3c0 4 5 4 5 4m5 1v8m-5 2h10m-8-2h6'};
  const icon=(name)=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]||paths.rune}"/></svg>`;
  document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
  const KEY='ember-path-v1';let saved=null,storageOK=true;
  try{saved=JSON.parse(localStorage.getItem(KEY));}catch{storageOK=false;}
  const game=new Game(saved);if(!game.s)game.start();
  let selected=-1,locked=false,sound=false,audio=null,toastTimer,modalMode='';
  function save(){try{localStorage.setItem(KEY,JSON.stringify(game.snapshot()));}catch{storageOK=false;}$('save-status').textContent=storageOK?'进度自动保存在当前浏览器':'浏览器未允许存档，请保持此页面打开';}
  function toast(text){clearTimeout(toastTimer);$('toast').textContent=text;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,2600);}
  function tone(type){if(!sound)return;try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();audio.resume();const t=audio.currentTime;const notes=type==='win'?[440,554,659]:type==='attack'?[180,120]:type==='block'?[330,440]:[380,490];notes.forEach((freq,i)=>{const o=audio.createOscillator(),g=audio.createGain();o.type='triangle';o.frequency.setValueAtTime(freq,t+i*.065);g.gain.setValueAtTime(.0001,t+i*.065);g.gain.exponentialRampToValueAtTime(.07,t+i*.065+.01);g.gain.exponentialRampToValueAtTime(.0001,t+i*.065+.2);o.connect(g);g.connect(audio.destination);o.start(t+i*.065);o.stop(t+i*.065+.22);});}catch{sound=false;updateSound();}}
  const typeName={attack:'剑术',skill:'技艺',rune:'符文'};
  function cardHTML(id,index,mode='hand'){
    const c=card(id),unaffordable=mode==='hand'&&c.cost>game.s.energy;
    const attrs=mode==='hand'?`data-card-index="${index}" aria-pressed="${selected===index}"`:mode==='reward'?`data-reward="${id}"`:mode==='upgrade'?`data-upgrade="${index}"`:'';
    const clickable=mode!=='view',tag=clickable?'button':'article';
    return `<${tag} class="card ${c.type}${c.rare?' rare':''}${selected===index&&mode==='hand'?' selected':''}${unaffordable?' unaffordable':''}" ${attrs} ${clickable?`aria-label="${c.name}，${c.cost}能量，${c.text}${mode==='hand'&&unaffordable?' 能量不足':''}"`:''}><span class="card-cost">${c.cost}</span><span class="card-top"><span class="card-type">${typeName[c.type]}</span></span><span class="card-art">${icon(c.icon)}</span><strong class="card-name">${c.name}</strong><span class="card-description">${c.text}</span><span class="card-foot">${c.upgraded?'已精炼':c.rare?'珍稀':'旅途之牌'}</span></${tag}>`;
  }
  function render(){
    const s=game.s,e=ENEMIES[s.stage],isBattle=s.phase==='battle';
    $('deck-count').textContent=s.deck.length;
    $('journey').innerHTML=ENEMIES.map((x,i)=>`<li class="${i<s.stage||s.phase==='won'?'complete':i===s.stage?'current':''}"><span class="step-number">${i<s.stage||s.phase==='won'?icon('check'):i+1}</span><span>${x.title}</span>${i===s.stage&&s.phase!=='won'?'<span class="stage-state">此刻</span>':''}</li>`).join('');
    $('story').textContent=e.story;$('location').textContent=e.title;$('round-label').textContent=isBattle?`回合 ${s.turn}`:s.phase==='camp'?'林间休憩':s.phase==='reward'?'战利品':s.phase==='won'?'旅途完成':'旅途结束';$('encounter-kind').textContent=s.stage===4?'首领战':'普通遭遇';$('stage-label').textContent=`${s.stage+1} / 5`;
    $('battlefield').hidden=!isBattle;$('hand-section').hidden=!isBattle;$('action-bar').hidden=!isBattle;$('phase-panel').hidden=isBattle;
    $('latest-log').textContent=s.log[0]||'旅途已经开始。';
    if(isBattle){
      $('player-health').innerHTML=`${s.hp} <small>/ ${s.maxHp}</small>`;$('enemy-health').innerHTML=`${s.enemy.hp} <small>/ ${s.enemy.maxHp}</small>`;
      $('player-health-bar').style.transform=`scaleX(${s.hp/s.maxHp})`;$('enemy-health-bar').style.transform=`scaleX(${s.enemy.hp/s.enemy.maxHp})`;
      for(const [id,value,max]of[['player-meter',s.hp,s.maxHp],['enemy-meter',s.enemy.hp,s.enemy.maxHp]]){const meter=$(id);meter.setAttribute('aria-valuenow',value);meter.setAttribute('aria-valuemin','0');meter.setAttribute('aria-valuemax',max);}
      $('player-block').innerHTML=s.block?`${icon('shield')}${s.block}`:'';$('enemy-block').innerHTML=s.enemy.block?`${icon('shield')}${s.enemy.block}`:'';
      $('player-focus').innerHTML=s.focus?`${icon('rune')}蓄势 ${s.focus}`:'';
      $('enemy-status').innerHTML=[s.enemy.burn?`${icon('flame')}${s.enemy.burn}`:'',s.enemy.strength?`${icon('sword')}+${s.enemy.strength}`:''].filter(Boolean).join(' ');
      $('enemy-name').textContent=e.name;$('enemy-sprite').className=`sprite sprite-${e.sprite}`;$('enemy-sprite').setAttribute('aria-label',e.name);
      const intent=game.intent();$('enemy-intent').className=`intent ${intent.type==='block'?'defend':intent.type==='buff'?'buff':''}`;
      $('enemy-intent').innerHTML=`${icon(intent.type==='attack'?'sword':intent.type==='block'?'shield':'rune')}<span>${intent.name}</span><b>${intent.type==='buff'?'+':''}${intent.value}</b>`;
      $('intent-hint').textContent=intent.type==='attack'?`敌方将攻击 ${intent.value} 点 · 当前预计受伤 ${Math.max(0,intent.value-s.block)} 点`:intent.type==='block'?`敌方将获得 ${intent.value} 点护甲`: `敌方将永久增加 ${intent.value} 点攻击力`;
      $('hand').innerHTML=s.hand.map((id,i)=>cardHTML(id,i)).join('');$('draw-count').textContent=s.draw.length;$('discard-count').textContent=s.discard.length;$('energy-count').textContent=s.energy;
      updateSelection();
    }else renderPhase();
    save();
  }
  function updateSelection(){
    const s=game.s,c=selected>=0&&s.hand[selected]?card(s.hand[selected]):null;
    document.querySelectorAll('#hand [data-card-index]').forEach(el=>{const active=Number(el.dataset.cardIndex)===selected;el.classList.toggle('selected',active);el.setAttribute('aria-pressed',active);el.disabled=locked;});
    $('end-turn').disabled=locked;
    $('selected-summary').textContent=c?c.text:'剑与符文，皆由你选择。';
    $('play-button').textContent=c?(c.cost>s.energy?'能量不足':`打出 · ${c.name}`):'选择一张手牌';$('play-button').disabled=!c||c.cost>s.energy||locked;
  }
  function renderPhase(){
    const s=game.s,p=$('phase-panel');
    if(s.phase==='reward')p.innerHTML=`<div class="phase-emblem">${icon('trophy')}</div><h2>胜利，收下新的可能</h2><p>余烬护符恢复了 4 点生命。选一张牌加入牌组，或保持精简。</p><div class="reward-cards">${s.offers.map((id,i)=>cardHTML(id,i,'reward')).join('')}</div><button class="skip-reward" data-action="skip">跳过奖励，继续旅途</button>`;
    if(s.phase==='camp')p.innerHTML=`<div class="phase-emblem">${icon('camp')}</div><h2>篝火尚温</h2><p>踏入湿地前，选一种方式整顿行装。<br>当前生命 ${s.hp} / ${s.maxHp}，牌组 ${s.deck.length} 张。</p><div class="camp-options"><button class="camp-option" data-action="rest"><span>${icon('camp')}</span><b>休憩</b><small>恢复 18 点生命</small></button><button class="camp-option" data-action="upgrade"><span>${icon('hammer')}</span><b>精炼卡牌</b><small>永久强化一张牌</small></button></div>`;
    if(s.phase==='won'||s.phase==='lost')p.innerHTML=`<div class="phase-emblem">${icon(s.phase==='won'?'flame':'compass')}</div><h2>${s.phase==='won'?'余火，终于重燃':'旅途暂歇，火种犹存'}</h2><p class="end-screen-note">${s.phase==='won'?'守望者让开了道路。你把最后的余烬带出雾林，晨光第一次照进了这片沉寂的森林。':'雾林收起了这一次的脚步。记住敌人的意图，带着新的选择，再走一程。'}</p><div class="result-stats"><div><b>${s.phase==='won'?5:s.stage}</b><span>通过遭遇</span></div><div><b>${s.stats.cards}</b><span>打出卡牌</span></div><div><b>${s.stats.damage}</b><span>累计伤害</span></div></div><button class="primary-button" data-action="new">再启一段旅途</button>`;
  }
  function pop(target,amount){if(!amount)return;const el=document.createElement('span');el.className=`damage-pop ${target}-pop`;el.textContent=`−${amount}`;$('floating-effects').append(el);setTimeout(()=>el.remove(),850);const figure=$(target==='enemy'?'enemy-figure':'player-figure');figure.classList.remove('hit');void figure.offsetWidth;figure.classList.add('hit');}
  function cast(){if(locked||$('modal').open||game.s.phase!=='battle')return;const result=game.play(selected);if(!result.ok){toast(result.error);return;}locked=true;selected=-1;tone(game.s.phase==='reward'||game.s.phase==='won'?'win':result.card.damage?'attack':'block');render();pop('enemy',result.damage);$('hand').classList.add('playing-card');setTimeout(()=>{locked=false;$('hand').classList.remove('playing-card');updateSelection();},260);}
  function endTurn(){if(locked||$('modal').open||game.s.phase!=='battle')return;locked=true;const result=game.endTurn();selected=-1;tone(game.s.phase==='reward'||game.s.phase==='won'?'win':result.hurt?'attack':'block');render();pop('player',result.hurt);setTimeout(()=>{locked=false;updateSelection();},260);}
  function openModal(title,content,mode=''){modalMode=mode;$('modal-title').textContent=title;$('modal-body').innerHTML=content;if(!$('modal').open)$('modal').showModal();}
  function closeModal(){modalMode='';$('modal').close();}
  function showPile(kind){const s=game.s,items=kind==='deck'?s.deck:kind==='draw'?s.draw:s.discard;const titles={deck:'旅人的牌组',draw:'抽牌堆',discard:'弃牌堆'};const counts={};items.forEach(id=>counts[id]=(counts[id]||0)+1);const sorted=Object.keys(counts).sort((a,b)=>card(a).cost-card(b).cost);openModal(titles[kind],`<p class="deck-summary">共 ${items.length} 张${kind==='draw'?' · 按费用展示，不代表抽取顺序':''}${kind==='deck'?' · 战斗结束后，所有卡牌会回到牌组':''}</p>${sorted.length?`<div class="deck-grid">${sorted.map(id=>`<div>${cardHTML(id,-1,'view')}<p style="text-align:center;margin:5px 0 12px;font-size:11px">${counts[id]} 张</p></div>`).join('')}</div>`:'<p>这里暂时没有卡牌。</p>'}`);}
  function help(){openModal('第一次穿过雾林',`<ol class="help-list"><li><strong>先看意图。</strong>敌人头顶会告诉你下一步攻击、防御还是蓄力。</li><li><strong>分配能量。</strong>每回合有 3 点能量，抽 5 张牌。轻触一张手牌，再点“打出”。</li><li><strong>护甲只留一回合。</strong>护甲抵挡伤害，在你的下回合开始时清空。未用的手牌会进入弃牌堆。</li><li><strong>组合你的打法。</strong>灼烧在敌人行动前造成伤害，再减少一层；蓄势会强化下一张剑术牌的每次伤害。</li><li><strong>让牌组成长。</strong>每场胜利选一张新卡。第二场之后可以在篝火恢复生命，或精炼一张牌。通过五场遭遇即可通关。</li></ol><p class="help-note">没有行动倒计时，慢慢想。抽牌堆耗尽后会洗入弃牌。音效默认关闭，可通过页顶按钮开启。存档仅保存在当前浏览器。</p><div class="help-actions"><button class="end-button" data-action="confirm-reset">重新启程</button><button class="primary-button" data-action="close">返回旅途</button></div>`);}
  function newRun(){game.start();selected=-1;locked=false;closeModal();render();toast('新的旅途，新的可能。');}
  function confirmRestart(){openModal('重新启程？','<p>重新开始会覆盖当前旅途的存档。</p><div class="confirm-actions"><button class="end-button" data-action="close">继续当前旅途</button><button class="primary-button" data-action="new">重新开始</button></div>');}
  function upgrade(){const candidates=game.s.deck.map((id,i)=>({id,i})).filter(x=>!x.id.endsWith('+'));openModal('选择一张牌精炼',`<p class="deck-summary">选中后立即精炼，并继续旅途。数值为精炼后的效果。</p><div class="deck-grid">${candidates.map(x=>cardHTML(x.id+'+',x.i,'upgrade')).join('')}</div>`,'upgrade');}
  function updateSound(){$('sound-button').innerHTML=icon(sound?'sound':'soundoff');$('sound-button').setAttribute('aria-pressed',sound);$('sound-button').setAttribute('aria-label',sound?'关闭音效':'开启音效');$('sound-button').title=sound?'关闭音效':'开启音效';}
  $('hand').addEventListener('click',e=>{const el=e.target.closest('[data-card-index]');if(!el||locked)return;selected=Number(el.dataset.cardIndex);updateSelection();tone('select');});
  $('phase-panel').addEventListener('click',e=>{const el=e.target.closest('[data-reward]');if(el){game.reward(el.dataset.reward);selected=-1;tone('win');render();}});
  $('modal-body').addEventListener('click',e=>{const el=e.target.closest('[data-upgrade]');if(el&&modalMode==='upgrade'){if(game.camp('upgrade',Number(el.dataset.upgrade))){closeModal();selected=-1;render();toast('卡牌已精炼，继续旅途。');}}});
  document.addEventListener('click',e=>{const el=e.target.closest('[data-action]');if(!el)return;switch(el.dataset.action){case'close':closeModal();break;case'new':newRun();break;case'confirm-reset':confirmRestart();break;case'skip':game.reward(null);selected=-1;render();break;case'rest':game.camp('rest');selected=-1;render();toast('篝火温暖了疲惫的身体。');break;case'upgrade':upgrade();break;}});
  $('play-button').addEventListener('click',cast);$('end-turn').addEventListener('click',endTurn);$('deck-button').addEventListener('click',()=>showPile('deck'));$('draw-button').addEventListener('click',()=>showPile('draw'));$('discard-button').addEventListener('click',()=>showPile('discard'));$('help-button').addEventListener('click',help);$('restart-button').addEventListener('click',confirmRestart);$('close-modal').addEventListener('click',closeModal);$('log-button').addEventListener('click',()=>openModal('旅途中的交锋',`<ol class="log-list">${game.s.log.map(x=>`<li>${x}</li>`).join('')}</ol>`));
  $('sound-button').addEventListener('click',()=>{sound=!sound;updateSound();if(sound)tone('select');});
  $('modal').addEventListener('click',e=>{if(e.target===$('modal')){const r=$('modal').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal();}});
  document.addEventListener('keydown',e=>{if($('modal').open||game.s.phase!=='battle'||locked||e.repeat||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key>='1'&&e.key<='9'){const n=Number(e.key)-1;if(n<game.s.hand.length){e.preventDefault();selected=n;updateSelection();$('hand').children[n]?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'nearest'});}}if(e.target.closest('button,a,input,select,textarea'))return;if(e.key==='Enter'){e.preventDefault();cast();}if(e.code==='Space'){e.preventDefault();endTurn();}});
  render();
  // Keep first visit immediately playable; the visible hint and help button teach at the player's pace.
})();
