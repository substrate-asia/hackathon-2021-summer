const del = require('del')
const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsp = ts.createProject('tsconfig.json')

function clean () {
  return del(['dist/*'])
}
clean.displayName = 'clean:dist'

function build () {
  return gulp.src(['./src/**/*.ts'])
    .pipe(tsp())
    .pipe(gulp.dest('./dist'))
}
build.displayName = 'build:ts'

function copy () {
  return gulp.src(['./src/**/*.js', './src/**/*.json'])
    .pipe(gulp.dest('./dist'))
}
copy.displayName = 'copy:js|json'

exports.build = build
exports.default = gulp.series(clean, build, copy)
