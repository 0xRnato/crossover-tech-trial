const gulp = require('gulp');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');

gulp.task('dev', ['watch', 'replace', 'minify-main', 'minify-controllers', 'minify-services', 'minify-directives', 'minify-css']);

gulp.task('prod', ['replace', 'minify-main', 'minify-controllers', 'minify-services', 'minify-directives', 'minify-css']);

gulp.task('watch', function () {
  gulp.watch('client/scripts/*.js', ['replace', 'minify-main']);
  gulp.watch('client/scripts/controllers/*.js', ['replace', 'minify-controllers']);
  gulp.watch('client/scripts/services/*.js', ['replace', 'minify-services']);
  gulp.watch('client/scripts/directives/*.js', ['replace', 'minify-directives']);
  gulp.watch('client/styles/*.css', ['replace', 'minify-css']);
});

gulp.task('minify-css', function () {
  return gulp.src(['client/styles/*.css'])
    .pipe(concat('main.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('client/dist'));
});

gulp.task('minify-main', function () {
  return gulp
    .src([
      '!client/scripts/*.spec.js',
      'client/scripts/*.js'])
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(minify())
    .pipe(gulp.dest('client/dist'));
});

gulp.task('minify-controllers', function () {
  return gulp
    .src([
      '!client/scripts/controllers/*.spec.js',
      'client/scripts/controllers/*.js'])
    .pipe(concat('controllers.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(minify())
    .pipe(gulp.dest('client/dist'));
});

gulp.task('minify-services', function () {
  return gulp
    .src([
      '!client/scripts/services/*.spec.js',
      'client/scripts/services/*.js'])
    .pipe(concat('services.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(minify())
    .pipe(gulp.dest('client/dist'));
});

gulp.task('minify-directives', function () {
  return gulp
    .src([
      '!client/scripts/directives/*.spec.js',
      'client/scripts/directives/*.js'])
    .pipe(concat('directives.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(minify())
    .pipe(gulp.dest('client/dist'));
});

gulp.task('replace', function () {
  return gulp
    .src(['client/index.html'])
    .pipe(replace(/\w=[0-9]{13,13}/g, "v=" + Date.now()))
    .pipe(gulp.dest('client/'));
});
