/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.kyzor.online',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    exclude: ['/login', '/dashboard/*', '/admin/*'],
}
