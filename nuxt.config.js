/* eslint-disable */
import axios from 'axios'
import content from './content.json'
console.log(JSON.stringify(content.pages, null, 2))

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: process.env.npm_package_description || ''
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicons/favicon.ico'
    }, {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/core/main.css'
    }, {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/daygrid/main.css'
    }]
  },
  loading: {
    color: '#72c9e0'
  },
  css: [
    '~/node_modules/normalize.css/normalize.css',
    '@/assets/scss/main.scss'
  ],
  plugins: [
    { src: '~/plugins/full-calendar', ssr: false }
  ],
  modules: [],
  generate: {
    interval: 100,
    routes: () => {
      return axios.get('http://localhost:3000/content.json') // not working :(
        .then(res => {
          return res.data.pages.map(page => {
            return {
              route: page.slug,
              payload: page
            }
          })
        })
    }
  },
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        }, {
          test: /\.(png|jpe?g|gif|svg|webp)$/,
          loader: 'url-loader',
          query: {
            limit: 1000, // 1kB
            name: 'img/[name].[hash:7].[ext]'
          }
        }, {
          test: /\.(woff?2||eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          query: {
            limit: 1000, // 1kB
            name: 'fonts/[name].[hash:7].[ext]'
          }
        })
      }
    }
  }
}
