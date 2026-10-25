const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, 'dist');
const target = process.argv[2] || path.join(__dirname, 'build', 'ember-card-path-offline.html');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const data = (file, mime) => `data:${mime};base64,${fs.readFileSync(path.join(root, file)).toString('base64')}`;

let html = read('index.html');
let css = read('style.css');
css = css.replaceAll('assets/travel-serif.woff2', data('assets/travel-serif.woff2', 'font/woff2'));
css = css.replaceAll('assets/characters.png', data('assets/characters.png', 'image/png'));
html = html.replace('href="assets/mark.svg"', `href="${data('assets/mark.svg', 'image/svg+xml')}"`);
html = html.replace('<link rel="stylesheet" href="style.css">', `<style>${css}</style>`);
html = html.replace(/\s*<script src="(?:engine|app)\.js" defer><\/script>/g, '');
html = html.replace('<body>', '<body id="top">').replace('href="./"', 'href="#top"');
html = html.replace('<title>余烬牌途 · 雾林手札</title>', '<title>余烬牌途 · 单文件离线版</title>');
const scripts = ['engine.js', 'app.js'].map(file => {
  const source = read(file);
  new vm.Script(source, { filename: file });
  return `<script>${source.replace(/<\/script/gi, '<\\/script')}</script>`;
});
const licenses = [
  ['project-license', fs.readFileSync(path.join(__dirname, 'LICENSE'), 'utf8')],
  ['font-license', read('assets/OFL-NotoSerifSC.txt')]
].map(([id,text])=>`<script type="text/plain" id="${id}">${text.replace(/<\/script/gi, '<\\/script')}</script>`).join('\n');
html = html.replace('</body>', `${scripts.join('\n')}\n${licenses}\n</body>`);
const externalRefs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(x=>x[1]).filter(x=>!x.startsWith('data:')&&!x.startsWith('#'));
const assetRefs = [...css.matchAll(/url\(["']?([^)'"\s]+)/g)].map(x=>x[1]).filter(x=>!x.startsWith('data:'));
if (externalRefs.length || assetRefs.length) throw new Error('仍有外部资源引用');
if ((html.match(/<script>/g)||[]).length !== 2) throw new Error('脚本打包数量不符');
fs.mkdirSync(path.dirname(path.resolve(target)), {recursive:true});
fs.writeFileSync(target, html, 'utf8');
console.log(JSON.stringify({file:target,bytes:fs.statSync(target).size,embeddedScripts:2,externalResources:0}));
