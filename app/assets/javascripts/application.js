// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

      // var API_KEY = 'M2YxMzhhYjctMWQ5MS00YTg2LTlkZjgtOGUyY2UzOGQ2ZTM3';

      // function refresh(callback) {
      //   $.ajax({
      //     url: '/reauthorize',
      //     method: 'GET',
      //     data: { refreshToken: Napster.member.refreshToken },
      //     success: function(data) {
      //     	console.log('success')
      //     	console.log(Napster.player)
      //       Napster.member.set({
      //         accessToken: data.access_token,
      //         refreshToken: data.refresh_token
      //       });
      //       if (callback) {
      //         console.log("This is the callback")
      //         console.log(callback)
      //         callback(data);
      //       }
      //     }
      //   });
      // }

      // function getParameters() {
      //   var query = window.location.search.substring(1);
      //   var parameters = {};

      //   if (query) {
      //     query.split('&').forEach(function(item) {
      //       var param = item.split('=');
      //       parameters[param[0]] = param[1];
      //     });
      //   }

      //   return parameters;
      // }

      // $(document).ready(function() {
      //   var currentTrack;
      //   Napster.init({ consumerKey: API_KEY });

      //   Napster.player.on('ready', function(e) {
      //     var params = getParameters();
      //     console.log("Player ready")
      //     console.log(e)
      //     if (params.accessToken) {
      //       Napster.member.set(params);
      //     }
      //   });

      //   Napster.player.on('playevent', function(e) {
      //     var playing = e.data.playing;
      //     var paused = e.data.paused;
      //     var currentTrack = e.data.id;

      //     $('[data-track]').removeClass('playing paused');
      //     $('[data-track="' + currentTrack + '"]').toggleClass('playing', playing).toggleClass('paused', paused);
      //   });

      //   Napster.player.on('playtimer', function(e) {
      //     var id = currentTrack;
      //     var current = e.data.currentTime;
      //     var total = e.data.totalTime;
      //     var width = $("[data-track='" + id + "'] .track-info").width();

      //     $("[data-track='" + id + "']").addClass("playing");
      //     $("[data-track='" + id + "'] .progress-bar").width(parseInt((current / total) * width).toString() + "px");
      //     $("[data-track='" + id + "'] .current-time").html(Napster.util.secondsToTime(total - current));
      //   });

      //   Napster.player.on('error', console.log);
      // });