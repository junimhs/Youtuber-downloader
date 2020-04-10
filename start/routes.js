'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')
Route.get('/', 'HomeController.index').as('index')
Route.post('/', 'HomeController.search').as('search')
Route.post('/download', 'HomeController.download').as('download')
Route.get('/mp3', 'Mp3Controller.index').as('mp3')
Route.post('/mp3', 'Mp3Controller.search').as('search_mp3')
Route.post('/download_mp3', 'Mp3Controller.download').as('download_mp3')
