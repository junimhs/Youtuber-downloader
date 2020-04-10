'use strict'

const YoutubeController = use('App/Controllers/Http/YoutubeController')
const Youtube = new YoutubeController()
const formatarNumero = require('../../../lib/formatNumero')

class HomeController {
  async index({ view }) {

    return view.render('index', {link: ''})

  }

  async search({ view, request, response, session }) {

    const link = request.input('link')
    let video = null

    await Youtube.getData( link )
    // Indica que el video existe
    .then( ( info ) => {

      const detail = info.player_response.videoDetails;
      const minute = Math.floor((Number(detail.lengthSeconds) / 60))
      const second = Math.floor((Number(detail.lengthSeconds) % 60))
      video = {
        id: detail.videoId,
        link: link,
        title: detail.title,
        author: detail.author,
        description: detail.shortDescription,
        view: formatarNumero(Number(detail.viewCount)),
        time: `${minute}:${second}`,
        thumb: detail.thumbnail.thumbnails[detail.thumbnail.thumbnails.length - 1].url
      }

    })
    // Indica que el video no existe o hubo un error
    .catch( ( err ) => {

      session.flash({
        notification_class: 'alert-danger',
        notification_icon: 'fa-times',
        notification_message: 'ERROR: Não conseguie encontrar o video, tente novamente.'
      })

    });

  if(video == null)
    return response.redirect('/')
  else
    return view.render('index', {link: video.link, video: video})

  }

  async download({ view, request, response }) {

    const link = request.input('link')
    const title = request.input('title')

    return Youtube.download_mp4( link, title, response )
  }
}

module.exports = HomeController
