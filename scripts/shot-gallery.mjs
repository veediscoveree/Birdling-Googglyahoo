// Screenshot the avatar gallery from a built single-file app.
//   node scripts/shot-gallery.mjs <out.png> [dist/index.html] [ids=a,b,c] [cols=6]
// Dev-only review tool (uses playwright-core + the preinstalled Chromium).
import { chromium } from 'playwright-core'
import { createServer } from 'http'
import { readFileSync, readdirSync, existsSync } from 'fs'

const [, , out, distArg, idsArg] = process.argv
const html = readFileSync(distArg || 'dist/index.html', 'utf8')
const ids = idsArg?.startsWith('ids=') ? idsArg.slice(4) : ''
const extra = process.argv.slice(5).map(a => '&' + a).join('')   // e.g. legacy=1
const findChrome = () => {
  const root = '/opt/pw-browsers'
  for (const d of readdirSync(root).filter(d => d.startsWith('chromium-'))) {
    for (const sub of ['chrome-linux64', 'chrome-linux']) {
      const p = `${root}/${d}/${sub}/chrome`; if (existsSync(p)) return p
    }
  }
}
const srv = createServer((q, r) => { r.writeHead(200, { 'Content-Type': 'text/html' }); r.end(html) })
await new Promise(r => srv.listen(0, r))
const b = await chromium.launch({ executablePath: findChrome(), args: ['--no-sandbox'] })
const ctx = await b.newContext({ viewport: { width: ids ? 560 : 840, height: 900 }, deviceScaleFactor: 2 })
await ctx.route(/wikimedia|wikipedia|xeno-canto|ebird/, r => r.fulfill({ contentType: 'application/json', body: '{}' }))
const p = await ctx.newPage()
const errs = []; p.on('pageerror', e => errs.push(e.message))
await p.goto(`http://127.0.0.1:${srv.address().port}/?gallery=1${ids ? '&ids=' + ids : ''}${extra}`, { waitUntil: 'networkidle' })
await p.waitForTimeout(400)
const h = await p.evaluate(() => document.querySelector('div[style*="overflow-y: auto"]').scrollHeight)
await p.setViewportSize({ width: ids ? 560 : 840, height: h + 20 })
await p.screenshot({ path: out, fullPage: true })
if (errs.length) console.log('PAGE ERRORS:', errs.join(' | '))
console.log('saved', out)
await b.close(); srv.close()
