import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SEO_ROUTE_LIST } from '../src/utils/seoContent.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const indexPath = path.join(distDir, 'index.html')

const SITE_NAME = 'Magical Africa'
const SITE_URL = 'https://magical.africa'
const DEFAULT_IMAGE = `${SITE_URL}/images/magical-colored-fav.png`

const routes = SEO_ROUTE_LIST

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const toAbsoluteUrl = (value = '') => {
  if (!value) return DEFAULT_IMAGE
  if (/^https?:\/\//i.test(value)) return value
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`
}

const canonicalUrl = (routePath) => `${SITE_URL}${routePath === '/' ? '' : routePath}`

const buildSchema = (route) => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': route.schemaType || 'WebPage',
  name: route.title,
  description: route.description,
  url: canonicalUrl(route.path),
  image: toAbsoluteUrl(route.image),
  inLanguage: 'en'
})

const stripSeoTags = (html) => html
  .replace(/<title>[\s\S]*?<\/title>/i, '')
  .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/i, '')
  .replace(/<meta\s+name="robots"[\s\S]*?\/>\s*/i, '')
  .replace(/<meta\s+property="og:title"[\s\S]*?\/>\s*/i, '')
  .replace(/<meta\s+property="og:description"[\s\S]*?\/>\s*/i, '')
  .replace(/<meta\s+property="og:type"[\s\S]*?\/>\s*/i, '')
  .replace(/<meta\s+property="og:image"[\s\S]*?\/>\s*/i, '')
  .replace(/<meta\s+property="og:url"[\s\S]*?\/>\s*/i, '')
  .replace(/<meta\s+name="twitter:card"[\s\S]*?\/>\s*/i, '')
  .replace(/<meta\s+name="twitter:title"[\s\S]*?\/>\s*/i, '')
  .replace(/<meta\s+name="twitter:description"[\s\S]*?\/>\s*/i, '')
  .replace(/<meta\s+name="twitter:image"[\s\S]*?\/>\s*/i, '')
  .replace(/<link\s+rel="canonical"[\s\S]*?\/?>\s*/i, '')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '')

const buildSeoBlock = (route) => {
  const image = toAbsoluteUrl(route.image)
  const url = canonicalUrl(route.path)
  const robots = route.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
  const title = escapeHtml(route.title)
  const description = escapeHtml(route.description)
  const keywords = escapeHtml(route.keywords)

  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${keywords}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json">${buildSchema(route)}</script>
  `
}

const buildSitemap = () => {
  const urls = routes
    .filter((r) => !r.noIndex)
    .map((r) => `  <url>
    <loc>${canonicalUrl(r.path)}</loc>
    <changefreq>${r.path === '/' || r.path === '/tribes' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${r.path === '/' ? '1.0' : r.path.startsWith('/tribes/') ? '0.7' : '0.8'}</priority>
  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

const routeOutputPath = (routePath) => {
  if (routePath === '/') return indexPath
  return path.join(distDir, routePath.replace(/^\//, ''), 'index.html')
}

const main = async () => {
  const template = await readFile(indexPath, 'utf8')

  for (const route of routes) {
    const outputPath = routeOutputPath(route.path)
    const html = stripSeoTags(template).replace('</head>', `${buildSeoBlock(route)}\n  </head>`)

    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, html, 'utf8')
  }

  await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(), 'utf8')
  console.log('sitemap.xml generated.')

  console.log(`SEO route HTML generated for ${routes.length} public routes.`)
}

main().catch((error) => {
  console.error('SEO postbuild failed:', error)
  process.exit(1)
})
