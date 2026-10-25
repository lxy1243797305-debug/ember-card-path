(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.Ember = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';
  const CARDS = {
    strike: {name:'旅人斩',type:'attack',cost:1,damage:6,icon:'sword',text:'造成 6 点伤害。',flavor:'走过长路的剑，依旧锋利。'},
    guard: {name:'坚守',type:'skill',cost:1,block:5,icon:'shield',text:'获得 5 点护甲。',flavor:'稳住脚步，等风过去。'},
    spark: {name:'余火符',type:'rune',cost:1,damage:4,burn:2,icon:'flame',text:'造成 4 点伤害，施加 2 层灼烧。',flavor:'灰烬之下，还有星火。'},
    cleave: {name:'破晓重斩',type:'attack',cost:2,damage:15,icon:'sword',text:'造成 15 点伤害。',flavor:'以双手迎接黎明。',rare:true},
    quick: {name:'追风步',type:'skill',cost:0,draw:2,icon:'wind',text:'抽 2 张牌。',flavor:'风会为你指出下一步。'},
    mend: {name:'林间甘露',type:'skill',cost:1,heal:6,icon:'leaf',text:'恢复 6 点生命。',flavor:'森林也记得温柔。'},
    focus: {name:'蓄势符',type:'rune',cost:1,focus:5,icon:'rune',text:'下一张攻击牌的每次伤害 +5。',flavor:'让力量先于剑锋抵达。'},
    pierce: {name:'穿甲刺',type:'attack',cost:1,damage:9,pierce:true,icon:'arrow',text:'造成 9 点伤害，无视护甲。',flavor:'找到那一道缝隙。'},
    siphon: {name:'汲生刃',type:'attack',cost:1,damage:5,heal:3,icon:'leaf',text:'造成 5 点伤害，恢复 3 点生命。',flavor:'一场交换，恰到好处。'},
    fortress: {name:'古树庇护',type:'skill',cost:2,block:14,icon:'shield',text:'获得 14 点护甲。',flavor:'百年树影，护你一瞬。',rare:true},
    ember: {name:'烙印',type:'rune',cost:1,burn:6,icon:'flame',text:'施加 6 层灼烧。',flavor:'把尚未燃尽的故事写下。',rare:true},
    flurry: {name:'回旋三连',type:'attack',cost:1,damage:3,hits:3,icon:'wind',text:'造成 3 点伤害，共 3 次。',flavor:'如叶落，如风起。',rare:true},
    bastion: {name:'攻守之势',type:'attack',cost:1,damage:5,block:4,icon:'rune',text:'造成 5 点伤害，获得 4 点护甲。',flavor:'每一次进攻都留有归途。'}
  };
  const ENEMIES = [
    {name:'苔地窃贼',title:'雾林入口',hp:32,sprite:1,story:'雾气里，一根树枝长矛拦住了去路。',pattern:[{type:'attack',value:6,name:'试探突刺'},{type:'block',value:7,name:'木盾防御'},{type:'attack',value:9,name:'莽撞冲锋'}]},
    {name:'失落甲胄',title:'断剑小径',hp:45,sprite:2,story:'盔甲早已空无一人，守誓的剑却仍然举起。',pattern:[{type:'block',value:9,name:'锈甲重整'},{type:'attack',value:12,name:'沉重劈砍'},{type:'attack',value:7,name:'残刃横扫'}]},
    {name:'提灯幽蛾',title:'萤火湿地',hp:48,sprite:3,story:'不要追逐湿地的灯光。它也在追逐你。',pattern:[{type:'attack',value:8,name:'磷粉侵袭'},{type:'buff',value:3,name:'幽光聚集'},{type:'attack',value:10,name:'振翅扑击'}]},
    {name:'符石巨像',title:'遗迹回廊',hp:62,sprite:4,story:'沉睡的石头被脚步唤醒，古老符文再次流转。',pattern:[{type:'attack',value:11,name:'岩拳'},{type:'block',value:12,name:'符石护壁'},{type:'attack',value:16,name:'碎地重击'}]},
    {name:'枯冠守望者',title:'余烬之门',hp:92,sprite:5,story:'最后一缕余火，被守望者藏在了胸膛里。',pattern:[{type:'attack',value:12,name:'枯枝穿刺'},{type:'buff',value:3,name:'古老怒意'},{type:'attack',value:16,name:'王冠坠击'},{type:'block',value:14,name:'树皮重生'}]}
  ];
  const initialDeck = ['strike','strike','strike','strike','guard','guard','guard','spark','spark','bastion'];
  function card(id) {
    const upgraded=id.endsWith('+'), base=id.replace('+',''), c={...CARDS[base],id,base,upgraded};
    if(!c.name) throw new Error('未知卡牌');
    if(upgraded) {
      c.name += '·精炼';
      if(c.damage)c.damage+=3;
      if(c.block)c.block+=3;
      if(c.burn)c.burn+=2;
      if(c.heal)c.heal+=3;
      if(c.focus)c.focus+=3;
      if(c.draw)c.draw+=1;
      c.text=[c.damage?`造成 ${c.damage} 点${c.pierce?'无视护甲的':''}伤害${c.hits?`，共 ${c.hits} 次`:''}`:'',c.block?`获得 ${c.block} 点护甲`:'',c.burn?`施加 ${c.burn} 层灼烧`:'',c.heal?`恢复 ${c.heal} 点生命`:'',c.focus?`下一张攻击牌的每次伤害 +${c.focus}`:'',c.draw?`抽 ${c.draw} 张牌`:''].filter(Boolean).join('，')+'。';
    }
    return c;
  }
  class Game {
    constructor(saved) {
      if(saved && Game.valid(saved)) this.s=JSON.parse(JSON.stringify(saved));
      else this.s=null;
    }
    static valid(s) {
      const validId=id=>typeof id==='string'&&!!CARDS[id.replace('+','')];
      return s?.version===1&&['battle','reward','camp','won','lost'].includes(s.phase)&&Number.isInteger(s.stage)&&s.stage>=0&&s.stage<5&&Number.isFinite(s.hp)&&s.hp>=0&&s.hp<=s.maxHp&&s.maxHp===64&&Array.isArray(s.deck)&&s.deck.length>=10&&s.deck.every(validId)&&['hand','draw','discard'].every(k=>Array.isArray(s[k])&&s[k].every(validId))&&s.enemy&&Number.isFinite(s.enemy.hp)&&Array.isArray(s.log)&&Array.isArray(s.offers)&&s.offers.every(validId)&&Number.isFinite(s.seed)&&Number.isFinite(s.energy)&&Number.isInteger(s.turn);
    }
    random(){this.s.seed=(Math.imul(1664525,this.s.seed)+1013904223)>>>0;return this.s.seed/4294967296;}
    shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
    start(seed=Date.now()) {
      this.s={version:1,seed:seed>>>0,phase:'battle',stage:0,hp:64,maxHp:64,block:0,energy:3,focus:0,coins:0,deck:[...initialDeck],hand:[],draw:[],discard:[],enemy:{},turn:1,offers:[],log:[],stats:{cards:0,damage:0,turns:0},campUsed:false};
      this.battle();return this.s;
    }
    note(msg){this.s.log.unshift(msg);this.s.log=this.s.log.slice(0,24);}
    battle(){const s=this.s,e=ENEMIES[s.stage];s.phase='battle';s.enemy={hp:e.hp,maxHp:e.hp,block:0,burn:0,strength:0};s.turn=1;s.block=0;s.energy=3;s.focus=0;s.draw=this.shuffle(s.deck);s.hand=[];s.discard=[];s.offers=[];this.drawCards(5);this.note(`抵达${e.title}，遭遇${e.name}。`);}
    drawCards(n){const s=this.s;for(let i=0;i<n;i++){if(s.hand.length>=10)break;if(!s.draw.length){if(!s.discard.length)break;s.draw=this.shuffle(s.discard);s.discard=[];this.note('弃牌重新洗入抽牌堆。');}s.hand.push(s.draw.pop());}}
    intent(){const s=this.s,p=ENEMIES[s.stage].pattern[(s.turn-1)%ENEMIES[s.stage].pattern.length];return {...p,value:p.value+(p.type==='attack'?s.enemy.strength:0)};}
    play(index){const s=this.s;if(s.phase!=='battle')return {ok:false,error:'当前不能出牌。'};if(!Number.isInteger(index)||index<0||index>=s.hand.length)return {ok:false,error:'请先选择一张手牌。'};const c=card(s.hand[index]);if(c.cost>s.energy)return {ok:false,error:'能量不足，试试其他牌或结束回合。'};
      s.energy-=c.cost;s.hand.splice(index,1);s.discard.push(c.id);s.stats.cards++;
      let damage=0;if(c.damage){const boost=c.type==='attack'?s.focus:0;for(let hit=0;hit<(c.hits||1);hit++){let raw=c.damage+boost;if(!c.pierce){const absorbed=Math.min(s.enemy.block,raw);s.enemy.block-=absorbed;raw-=absorbed;}const dealt=Math.min(s.enemy.hp,raw);s.enemy.hp-=dealt;damage+=dealt;}if(c.type==='attack')s.focus=0;s.stats.damage+=damage;}
      if(c.block)s.block+=c.block;if(c.burn)s.enemy.burn+=c.burn;if(c.focus)s.focus+=c.focus;
      if(c.heal)s.hp=Math.min(s.maxHp,s.hp+c.heal);if(c.draw)this.drawCards(c.draw);
      this.note(`打出${c.name}${c.damage?`，造成 ${damage} 点伤害`:''}${c.block?`，护甲 +${c.block}`:''}${c.burn?`，灼烧 +${c.burn}`:''}${c.heal?`，生命 +${c.heal}`:''}${c.focus?`，蓄势 +${c.focus}`:''}${c.draw?`，抽 ${c.draw} 张牌`:''}。`);
      if(s.enemy.hp<=0)this.victory();return {ok:true,card:c,damage};
    }
    endTurn(){const s=this.s;if(s.phase!=='battle')return {ok:false};s.stats.turns++;
      if(s.enemy.burn>0){const dmg=Math.min(s.enemy.burn,s.enemy.hp);s.enemy.hp-=dmg;s.stats.damage+=dmg;this.note(`灼烧造成 ${dmg} 点伤害。`);s.enemy.burn--;if(s.enemy.hp<=0){this.victory();return {ok:true};}}
      // Enemy armor lasts until its next action, so it can absorb one player turn.
      s.enemy.block=0;const intent=this.intent();let hurt=0;
      if(intent.type==='attack'){hurt=Math.max(0,intent.value-s.block);s.hp=Math.max(0,s.hp-hurt);s.block=Math.max(0,s.block-intent.value);this.note(`${intent.name}：你受到 ${hurt} 点伤害。`);}
      if(intent.type==='block'){s.enemy.block+=intent.value;this.note(`${intent.name}：敌人获得 ${intent.value} 点护甲。`);}
      if(intent.type==='buff'){s.enemy.strength+=intent.value;this.note(`${intent.name}：敌人力量 +${intent.value}。`);}
      if(s.hp<=0){s.phase='lost';return {ok:true,hurt};}
      s.discard.push(...s.hand);s.hand=[];s.block=0;s.energy=3;s.turn++;this.drawCards(5);return {ok:true,hurt};
    }
    victory(){const s=this.s;s.coins+=20+s.stage*5;s.hp=Math.min(s.maxHp,s.hp+4);this.note('战斗胜利。余烬护符恢复 4 点生命。');if(s.stage===4){s.phase='won';return;}s.phase='reward';const pool=Object.keys(CARDS).filter(x=>!['strike','guard','spark'].includes(x));s.offers=this.shuffle(pool).slice(0,3);}
    reward(id){const s=this.s;if(s.phase!=='reward')return false;if(id!==null&&!s.offers.includes(id))return false;if(id){s.deck.push(id);this.note(`获得卡牌：${card(id).name}。`);}s.stage++;if(s.stage===2&&!s.campUsed){s.phase='camp';s.campUsed=true;}else this.battle();return true;}
    camp(choice,index){const s=this.s;if(s.phase!=='camp')return false;if(choice==='rest'){s.hp=Math.min(s.maxHp,s.hp+18);this.note('篝火休憩，恢复 18 点生命。');}else if(choice==='upgrade'&&Number.isInteger(index)&&s.deck[index]&&!s.deck[index].endsWith('+')){s.deck[index]+='+';this.note(`精炼了${card(s.deck[index]).name}。`);}else return false;this.battle();return true;}
    snapshot(){return JSON.parse(JSON.stringify(this.s));}
  }
  return {Game,CARDS,ENEMIES,card};
});
