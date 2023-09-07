/** @type {import('next').NextConfig} */

const semi = require('@douyinfe/semi-next').default({});

module.exports = semi({
    transpilePackages: ['@douyinfe/semi-ui', '@douyinfe/semi-icons', '@douyinfe/semi-illustrations'],
})
