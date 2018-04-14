'use strict'

const pkg = require('./package.json')
const { join } = require('path')
const loadPlugins = require('gulp-load-plugins')
const jeet = require('jeet')
const rupture = require('rupture')

const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production'
const $ = loadPlugins()

const srcPath = join(__dirname, 'src')
const distPath = join(__dirname, 'dist')
const assetsPath = join(distPath, 'assets')

module.exports = {
  pkg,
  isProduction,
  plugins: $,
  src: {
    stylus: join(srcPath, 'stylus'),
    scripts: join(srcPath, 'scripts'),
    views: join(srcPath, 'views'),
    static: join(srcPath, 'static'),
    images: join(srcPath, 'images')
  },
  dest: {
    dist: distPath,
    stylesheets: join(assetsPath, 'stylesheets'),
    javascripts: join(assetsPath, 'javascripts'),
    images: join(assetsPath, 'images'),
    fonts: join(assetsPath, 'fonts')
  },
  stylus: {
    'include css': true,
    include: [
      join(__dirname, 'node_modules')
    ],
    use: [
      jeet(),
      rupture()
    ]
  },
  cssnano: {
    add: true,
    autoprefixer: {
      browsers: [
        '> 1%',
        'last 2 versions',
        'Firefox >= 20'
      ]
    }
  },
  plumber: {
    errorHandler: $.notify.onError({
      title: 'Gulp',
      message: 'Error: <%= error.message %>'
    })
  },
  size: taskName => {
    return {
      title: `Task: ${taskName} -`,
      showFiles: true
    }
  }
}
