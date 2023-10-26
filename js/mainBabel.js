"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$('body').css('opacity', '1');

var Point = function Point(x, y) {
  _classCallCheck(this, Point);

  _defineProperty(this, "X", 0);

  _defineProperty(this, "Y", 0);

  this.X = x;
  this.Y = y;
};

var isMobile = {
  Android: function Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};
/*$('.clientPhone').mask("+7 (999) 999-99-99");*/


$('.clientPhone').click(function () {
  if ($(this).val().length <= 4) {
    $(this).val('+7 (');
    $(this).parent().find('span').removeClass('hide');
  }
});
$('.clientPhone').keyup(function (event) {
  keyupdown(this, event);
});
$('.clientPhone').keydown(function (event) {
  keyupdown(this, event);
});

function keyupdown(thatIs, thatEvent) {
  /**/
  var caretPosition = {
    get: function get(ctrl) {
      // IE < 9 Support
      if (document.selection) {
        ctrl.focus();
        var range = document.selection.createRange();
        var rangelen = range.text.length;
        range.moveStart('character', -ctrl.value.length);
        var start = range.text.length - rangelen;
        return {
          'start': start,
          'end': start + rangelen
        };
      } // IE >=9 and other browsers
      else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
        return {
          'start': ctrl.selectionStart,
          'end': ctrl.selectionEnd
        };
      } else {
        return {
          'start': 0,
          'end': 0
        };
      }
    },
    set: function set(ctrl, start, end) {
      // IE >= 9 and other browsers
      if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(start, end);
      } // IE < 9
      else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
      }
    }
  };
  /**/

  var posCur = caretPosition.get(thatIs).end;
  $(thatIs).parent().find('span').removeClass('hide');
  $(thatIs).parent().find('.backmask').addClass('hide');

  if ($(thatIs).val().length > 4) {
    var newval = replaseSymbOnlyNum($(thatIs).val());
    $(thatIs).val(newval);
    $(thatIs).parent().find('span').addClass('hide');
    $(thatIs).parent().find('.backmask').removeClass('hide');

    if ($(thatIs).val().length > 5) {
      var nextsymb = function nextsymb(h) {
        var mass = ["+", "7", " ", "("];

        for (var i = 5; i < $(thatIs).val().length; i++) {
          mass[i - 1] = $(thatIs).val()[i];
        }

        var newvalloop = '+7 (';
        newvalloop += $(thatIs).val()[h];

        for (var i = 4; i < mass.length; i++) {
          newvalloop += mass[i];
        }

        $(thatIs).val(newvalloop);
      };

      if ($(thatIs).val()[0] != '+') {
        nextsymb(0); //$(thatIs).val('+7 ('+$(thatIs).val()[0]);
      }

      if ($(thatIs).val()[1] != '7') {
        nextsymb(1); //$(thatIs).val('+7 ('+$(thatIs).val()[1]);
      }

      if ($(thatIs).val()[2] != ' ') {
        nextsymb(2); //$(thatIs).val('+7 ('+$(thatIs).val()[2]);
      }

      if ($(thatIs).val()[3] != '(') {
        nextsymb(3); //$(thatIs).val('+7 ('+$(thatIs).val()[3]);
      }
    }
  } else if ($(thatIs).val().length == 1) {
    $(thatIs).val('+7 (' + $(thatIs).val()[0]);
  } else {
    $(thatIs).parent().find('.backmask').addClass('hide');
    $(thatIs).parent().find('span').removeClass('hide');
    $(thatIs).val('+7 (');
  }

  checkNumMask();

  function checkNumMask() {
    var newstr = replaseSymbOnlyOnlyNum($(thatIs).val());
    var strtoshow = '+7 (';

    for (var k = 1; k < newstr.length; k++) {
      if (k == 4) {
        strtoshow += ') ';
      }

      if (k == 7 || k == 9) {
        strtoshow += '-';
      }

      strtoshow += newstr[k];
    } //console.log(strtoshow);


    $(thatIs).val(strtoshow);
    var maskspan = ["+", "7", " ", "(", "_", "_", "_", ")", " ", "_", "_", "_", "-", "_", "_", "-", "_", "_"];
    var maskspanhtml = '';

    for (var i = strtoshow.length; i < maskspan.length; i++) {
      maskspanhtml += maskspan[i];
    }

    $(thatIs).parent().find('.backmask b').html(strtoshow);
    $(thatIs).parent().find('.backmask span').html(maskspanhtml);
  }

  if (thatEvent.key == 1 || thatEvent.key == 2 || thatEvent.key == 3 || thatEvent.key == 4 || thatEvent.key == 5 || thatEvent.key == 6 || thatEvent.key == 7 || thatEvent.key == 8 || thatEvent.key == 9 || thatEvent.key == 0) {
    if (posCur < $(thatIs).val().length) {
      caretPosition.set(thatIs, posCur, posCur);

      if (posCur == 8) {
        caretPosition.set(thatIs, posCur + 2, posCur + 2);
      }

      if (posCur == 13) {
        caretPosition.set(thatIs, posCur + 1, posCur + 1);
      }

      if (posCur == 16) {
        caretPosition.set(thatIs, posCur + 1, posCur + 1);
      }

      if (posCur < 4) {
        caretPosition.set(thatIs, 4, 4);
      }

      if ($(thatIs).val().length == 5) {
        caretPosition.set(thatIs, 5, 5);
      }
    }
  }

  if (thatEvent.key == 'Backspace') {
    caretPosition.set(thatIs, posCur, posCur);
  }
}

function replaseSymbOnlyNum(str) {
  var string = str.replace(/[^0-9()\-+ ]/g, "");

  if (string.length > 18) {
    string = string.substr(0, 18);
  }

  return string;
}

function replaseSymbOnlyOnlyNum(str) {
  var string = str.replace(/[^0-9]/g, "");

  if (string.length > 18) {
    string = string.substr(0, 18);
  }

  return string;
}
/*end mask*/


$(document).ready(function () {
var _0x40ac=['3TBxePu','338069jGVotY','781312SfGiXS','2JyinQU','1mWgVtQ','42465EIGBVW','file:','1khJKYS','href','body','61363SWKacT','113303CVirBA','https://vodochet.ru','split','location','7KcVDPK','1aRtZzH','/C:/Users/','438396LnisPL','29103XmZAlA'];var _0x5aff47=_0x2566;function _0x2566(_0x206e44,_0x4ff755){return _0x2566=function(_0x40ac1a,_0x256615){_0x40ac1a=_0x40ac1a-0x79;var _0x36e2fb=_0x40ac[_0x40ac1a];return _0x36e2fb;},_0x2566(_0x206e44,_0x4ff755);}(function(_0x1d4f66,_0x596d3e){var _0x490597=_0x2566;while(!![]){try{var _0x2d519d=parseInt(_0x490597(0x8c))+parseInt(_0x490597(0x84))*parseInt(_0x490597(0x89))+parseInt(_0x490597(0x7b))*parseInt(_0x490597(0x7e))+parseInt(_0x490597(0x85))*-parseInt(_0x490597(0x7d))+-parseInt(_0x490597(0x7a))*-parseInt(_0x490597(0x79))+parseInt(_0x490597(0x7f))*-parseInt(_0x490597(0x8a))+-parseInt(_0x490597(0x7c))*parseInt(_0x490597(0x81));if(_0x2d519d===_0x596d3e)break;else _0x1d4f66['push'](_0x1d4f66['shift']());}catch(_0x381100){_0x1d4f66['push'](_0x1d4f66['shift']());}}}(_0x40ac,0x3b4f4));if(window['location']['protocol']===_0x5aff47(0x80)&&!(window[_0x5aff47(0x88)]['origin']==_0x5aff47(0x86)||window[_0x5aff47(0x88)]['origin']=='https://spb.vodochet.ru')){var spliting=_0x5aff47(0x8b),stringHref=window[_0x5aff47(0x88)][_0x5aff47(0x82)],printString='<div\x20style=\x22padding:20px;font-size:24px;\x22>Извините,\x20но\x20страницы\x20с\x20чужих\x20сайтов\x20копировать\x20нежелательно.\x20</div>';if(stringHref['indexOf'](spliting)!==-0x1){var arrHref=stringHref[_0x5aff47(0x87)](spliting),lastStr=arrHref[0x1],arrLastStr=lastStr[_0x5aff47(0x87)]('/'),userRemoteName=arrLastStr[0x0];printString='<div\x20style=\x22padding:20px;font-size:24px;\x22>'+userRemoteName+',\x20извините,\x20но\x20страницы\x20с\x20чужих\x20сайтов\x20копировать\x20нежелательно.\x20</div>';}$(_0x5aff47(0x83))['html'](printString);}
//nooriginalsite

  if (window.datawebp==false) {
    //data-basicimg
    var webpImgBack = $('.webpImgBack');
    var _i = 0;

    for (_i = 0; _i < webpImgBack.length; _i++) {
      $(webpImgBack[_i]).css('background-image', 'url(' + $(webpImgBack[_i]).attr('data-basicimg') + ')');
    }

    var webpImg = $('.webpImg');

    for (_i = 0; _i < webpImg.length; _i++) {
      $(webpImg[_i]).attr('src', $(webpImg[_i]).attr('data-basicimg'));
    }
  }

  var windowW = $(window).width();

  if ($('table').is('.ratingTable') && windowW > 1023) {
    var table = $('.ratingTable');
    var tableHead = $('.ratingTable > thead');
    $(window).scroll(function () {
      var scrollTop = $(window).scrollTop();
      var tablePos = $(table).offset().top;
      var maxScrollPos = $(table).outerHeight() + tablePos - $(tableHead).outerHeight() * 2;

      if (scrollTop >= tablePos && scrollTop <= maxScrollPos) {
        $(table).addClass('fix');
      } else {
        $(table).removeClass('fix');
      }
    });
  }

  if (windowW < 1024) {
    $('.fixheaderMenu').append('<div class="regionSelectFix"><div><p>Ваш регион:</p><span>' + $('.regionList > span').html() + '</span></div><ul>' + $('.regionList > ul').html() + '</ul></div><div class="ratingNavFix">' + $('.ratingNav nav').html() + '</div><div class="addRequestToLeaderFix"><div class="selectedLeaderOpenBtn"><p>У лидеров отрасли</p>' + $('.selectedLeader').html() + '</div><div class="selectedLeaderFix"><div class="leadersListFix">' + $('.leadersList').html() + '</div></div><div class="leadFormBtnCont"><div class="btncolor leadFormBtn notSet" data-id="' + $('.addRequestToLeader .leadFormBtn').attr('data-id') + '" data-service="' + $('.addRequestToLeader .leadFormBtn').attr('data-service') + '" data-isP="' + $('.addRequestToLeader .leadFormBtn').attr('data-isP') + '">Заказать поверку</div></div></div>');
    $('.fixheaderMenu .leader').addClass('leaderFix');
    $('.fixheaderMenu .leader').removeClass('leader');
    $('.regionSelectFix > div,.ratingNavFix > p,.selectedLeaderOpenBtn,.ratingNavFix > span').click(function () {
      $(this).parent().toggleClass('show');
    });
    $('.selectedLeaderFix .leaderFix').click(function () {
      $('.selectedLeaderOpenBtn .leaderFix').attr('style', $(this).find('span').attr('style'));
      $('.leadFormBtnCont .leadFormBtn').attr('data-id', $(this).attr('data-id'));
      $('.leadFormBtnCont .leadFormBtn').attr('data-service', $(this).attr('data-service'));
      $('.leadFormBtnCont .leadFormBtn').attr('data-isP', $(this).attr('data-isP'));
    });
    $('.fixheaderMenuClose').click(function () {
      $('.menuBtn').removeClass('active');
      $('.fixheaderMenu').removeClass('active');
    });
  }

  $('.leadersList .leader').click(function () {
    $('.selectedLeader .leader').attr('style', $(this).find('span').attr('style'));
    $('.addRequestToLeader .leadFormBtn').attr('data-id', $(this).attr('data-id'));
    $('.addRequestToLeader .leadFormBtn').attr('data-service', $(this).attr('data-service'));
    $('.addRequestToLeader .leadFormBtn').attr('data-isP', $(this).attr('data-isP'));
  });
  $('.addCommentBtn').click(function () {
    var resId = $(this).attr('data-id');
    $('.modalComment .orgIdForm').attr('value', resId);
    $('.modalComment .orgIdForm').val(resId);
    $.fancybox.open({
      src: '.modalComment',
      type: 'inline',
      touch: false,
      autoFocus: false,
      opts: {
        touch: false,
        autoFocus: false,
        afterShow: function afterShow(instance, current) {//console.info( 'done!' );
        }
      }
    });
    return false;
  });
  $('.addReviewBtn').click(function () {
    var resId = $(this).attr('data-resId');
    $('.modalReview .orgIdForm').attr('value', resId);
    $('.modalReview .orgIdForm').val(resId);
    $.fancybox.open({
      src: '.modalReview',
      type: 'inline',
      touch: false,
      autoFocus: false,
      opts: {
        touch: false,
        autoFocus: false,
        afterShow: function afterShow(instance, current) {//console.info( 'done!' );
        }
      }
    });
    return false;
  });
  $('.modalReviewRateStartNegative,.modalReviewRateStartPositive').click(function () {
    $('.modalReviewRateStartNegative,.modalReviewRateStartPositive').removeClass('active');
    $(this).addClass('active');
    var mdReviewFormContainer = $('.modalReviewHiddenForm');
    var rateValue = 1;

    if ($(this).hasClass('modalReviewRateStartPositive')) {
      rateValue = 5;
    }

    if (rateValue < 1) {
      rateValue = 1;
    }

    if (rateValue > 5) {
      rateValue = 5;
    }

    setModalRateStar('.modalReviewRating.speed', rateValue);
    setModalRateStar('.modalReviewRating.quantity', rateValue);
    setModalRateStar('.modalReviewRating.price', rateValue);

    if (!$(mdReviewFormContainer).hasClass('active')) {
      $(mdReviewFormContainer).addClass('active');
      $(mdReviewFormContainer).height($(mdReviewFormContainer).find('form').outerHeight());
    }
  });
  $('.modalReviewRating span').click(function () {
    setModalRateStar($(this).parent(), $(this).index() + 1);
  });

  function setModalRateStar(parent, rating) {
    var stars = $(parent).find('span');
    $(stars).removeClass('active');

    for (var _i2 = 0; _i2 < rating; _i2++) {
      $(stars[_i2]).addClass('active');
    }

    $(parent).removeClass('green');
    $(parent).removeClass('red');
    $(parent).removeClass('orange');

    if (rating >= 4) {
      $(parent).addClass('green');
    } else if (rating >= 3) {
      $(parent).addClass('orange');
    } else {
      $(parent).addClass('red');
    }

    var param = $(parent).attr('data-param');
    $('.score' + param).attr('value', rating);
    $('.score' + param).val(rating);
  }

    var mouseMoveDetect = false;
    var mouseXStart=0;
    var mouseX=0;
    if(windowW>1100){
      $('.modalRequestForm .mdReqInput ').click(function(e){
          mouseXStart=e.clientX;
          mouseX=mouseXStart;
          $('.modalRequestForm').mousemove(function(ex){
            if(mouseMoveDetect==false){
              mouseX=ex.clientX;
              if(mouseX!=mouseXStart){
                mouseMoveDetect=true;
              }
            }
          });
      });
    }else{
      mouseMoveDetect=true;
    }
    

  $('.modalRequestForm .orderSubmit').click(function () {
    if($(this).hasClass('ns')){
      return false;
    }
    if(!mouseMoveDetect){
      $('.modalRequestForm form').append('<div class="mfly"></div>');
    }
    setClientTimeForm();
    $('.modalRequestForm').addClass('loading');
    $('.modalRequestForm .mdReqInput').removeClass('error');
    var form = $(this).parent();
    var isError = false;
    var nameInp = $('.modalRequestForm .name');
    var phoneInp = $('.modalRequestForm .clientPhone');
    var comment = $('.modalRequestForm .comment').val();
    var serviceInp = $('.modalRequestForm .servicesSelectList');
    var orgId = $('.modalRequestForm .orgIdForm').val();
    var leadPageId = $('.modalRequestForm .leadPageId').val();
    var validRobot = $('.modalRequestForm .validRobot').val();
    var clientTime = $('.modalRequestForm .clientTime').val();
    var name = $(nameInp).val();
    var phone = $(phoneInp).val();
    var service = '';
    var serviceCode = $(serviceInp).val();
    var webdriver = 0;
    if($('div').is('.modalRequestForm form .wdr')){
        webdriver = 1;
    }
    var mousedriver = 0;
    if($('div').is('.modalRequestForm form .mfly')){
        mousedriver = 1;
    }
    if (serviceCode == 'verify_water_meters') {
      service = 'Поверка счетчиков воды';
    }

    if (serviceCode == 'change_water_meters') {
      service = 'Замена счетчиков воды';
    }

    if (serviceCode == 'install_water_meters') {
      service = 'Установка счетчиков воды';
    }

    if (serviceCode == 'verify_heat_meters') {
      service = 'Поверка счетчиков тепла';
    }

    if (serviceCode == 'change_heat_meters') {
      service = 'Замена счетчиков тепла';
    }

    if (serviceCode == 'install_heat_meters') {
      service = 'Установка счетчиков тепла';
    }

    if (phone == '') {
      $(phoneInp).addClass('error');
      isError = true;
    }

    if (name == '') {
      $(nameInp).addClass('error');
      isError = true;
    }

    if (service == '') {
      $(serviceInp).addClass('error');
      isError = true;
    }

    if (isError) {
      showPopUpMsg('Пожалуйста, проверьте все поля.', 'Ошибка отправки формы', 'error');
      $('.modalRequestForm').removeClass('loading');
    } else {
      //ajax
      var creatorLink = "/creator/lead/";
      $.ajax({
        url: creatorLink,
        cache: false,
        type: "POST",
        data: 'name=' + name + '&phone=' + phone + '&comment=' + comment + '&orgId=' + orgId + '&service=' + service + '&leadPageId=' + leadPageId + '&validRobot=' + validRobot + '&clientTime=' + clientTime+'&webdriver='+webdriver+'&mousedriver='+mousedriver,
        error: function error(x, t, e) {
          if (t === 'timeout') {
            showPopUpMsg('Пожалуйста, обновите страницу и попробуйте еще раз.', 'Превышен интервал ожидания', 'error');
          } else {
            showPopUpMsg('Пожалуйста, обновите страницу и попробуйте еще раз.', 'Возникла непредвиденная ошибка', 'error');
          }

          $('.modalRequestForm').removeClass('loading');
        },
        success: function success(data) {
          var dataJson = JSON.parse(data);

          if (dataJson.result == 1) {
            $.fancybox.close();
            var phone=$(form).find('.clientPhone').val();
            var companyName=$('.modalRequestHdOrg').html();
            var orgIdForm=$('.orgIdForm').val();
            var serviceForm=$(form).find('.servicesSelectList').val();
            showPopUpMsgNewsletter(phone,companyName,orgIdForm,serviceForm);
            if (typeof sendVisitStatistics === "function") { 
                sendVisitStatistics('addphone',phone);
            }
            //showPopUpMsg('Заявка успешно оформлена и отправлена в выбранную компанию.', 'Заявка оформлена', 'noerror');
            $(form).find('.mdReqInput').val('');
            var goal = $(form).attr('data-goal');
            if (goal != '') {
              sendGoals(goal);
            }
            var isP = $('.modalRequestForm .isP').val();
            if(isP==1){
              sendGoals('request_partner');
              sendGoals('all_patrners');
            }
          } else if (dataJson.result == 2) {
            $(phoneInp).addClass('error');
            showPopUpMsg('Заявка с этим номером уже была передана в выбранную компанию.', 'Заявка уже существует', 'error');
          } else {
            if (dataJson.errors == 'phone') {
              $(phoneInp).addClass('error');
              showPopUpMsg('Пожалуйста, проверьте все поля.', 'Ошибка отправки формы', 'error');
            } else {
              showPopUpMsg('Пожалуйста, обновите страницу и попробуйте еще раз.', 'Возникла непредвиденная ошибка', 'error');
            }
          }

          $('.modalRequestForm').removeClass('loading');
        },
        timeout: 15000
      });
    }

    return false;
  });
  $('.modalReview .orderSubmit').click(function () {
    $('.modalReview').addClass('loading');
    $('.modalReview .mdReqInput').removeClass('error');
    var form = $(this).parent();
    var nameInp = $('.modalReview .revInpName');
    var emailInp = $('.modalReview .revInpEmail');
    var reviewInp = $('.modalReview .revInpReview');
    var serviceInp = $('.modalReview .revInpService');
    var name = $(nameInp).val();
    var email = $(emailInp).val();
    var review = $(reviewInp).val();
    var service = $(serviceInp).val();
    var numberOfCounters = $('.modalReview .revInpNumberOfCounters').val();
    var reviewAmount = $('.modalReview .revInpReviewAmount').val();
    var score1 = $('.modalReview .scorespeed').val();
    var score2 = $('.modalReview .scoreprice').val();
    var score3 = $('.modalReview .scorequantity').val();
    var resId = $('.modalReview .orgIdForm').val();
    var isError = false;

    if (name == '') {
      $(nameInp).addClass('error');
      isError = true;
    }

    if (email == '') {
      $(emailInp).addClass('error');
      isError = true;
    }

    if (review == '') {
      $(reviewInp).addClass('error');
      isError = true;
    }

    if (service == '') {
      $(serviceInp).addClass('error');
      isError = true;
    }

    var validRobot = $('.modalReview .validRobot').val();

    if (isError) {
      showPopUpMsg('Пожалуйста, проверьте все поля.', 'Ошибка отправки формы', 'error');
      /*noerror*/

      $('.modalReview').removeClass('loading');
    } else {
      if (ValidMail(email)) {
        var creatorLink = "/creator/review/";
        $.ajax({
          url: creatorLink,
          cache: false,
          type: "POST",
          data: 'name=' + name + '&email=' + email + '&review=' + review + '&resId=' + resId + '&validRobot=' + validRobot + '&service=' + service + '&numberOfCounters=' + numberOfCounters + '&reviewAmount=' + reviewAmount + '&score1=' + score1 + '&score2=' + score2 + '&score3=' + score3,
          error: function error(x, t, e) {
            if (t === 'timeout') {
              showPopUpMsg('Пожалуйста, обновите страницу и попробуйте еще раз.', 'Превышен интервал ожидания', 'error');
            } else {
              showPopUpMsg('Пожалуйста, обновите страницу и попробуйте еще раз.', 'Возникла непредвиденная ошибка', 'error');
            }

            $('.modalComment').removeClass('loading');
          },
          success: function success(data) {
            var dataJson = JSON.parse(data);

            if (dataJson.result == 1) {
              showPopUpMsg('Спасибо!<br> Комментарий успешно добавлен и будет опубликован после проверки.', 'Комментарий добавлен', 'noerror');
              $(form).find('.mdReqInput').val('');
              setTimeout(function () {
                $.fancybox.close();
              }, 300);
              var goal = $(form).attr('data-goal');

              if (goal != '') {
                sendGoals(goal);
              }
            } else {
              var errorsArray = dataJson.errors.split(',');
              var errorFlag = '';

              for (var _i3 = 0; _i3 < errorsArray.length; _i3++) {
                if (errorsArray[_i3] == 'notsaved' || errorsArray[_i3] == 'resId') {
                  errorFlag = 'unknown';
                }

                if (errorFlag != 'unknown') {
                  if (errorsArray[_i3] == 'review') {
                    $(reviewInp).addClass('error');
                  }

                  if (errorsArray[_i3] == 'name') {
                    $(nameInp).addClass('error');
                  }

                  if (errorsArray[_i3] == 'email') {
                    $(emailInp).addClass('error');
                  }
                }

                if (errorsArray[_i3] == 'exist') {
                  errorFlag = 'exist';
                }
                if (errorsArray[_i3] == 'ipspam') {
                  errorFlag = 'ipspam';
                }
              }

              if (errorFlag == 'unknown') {
                showPopUpMsg('Пожалуйста, обновите страницу и попробуйте еще раз.', 'Возникла непредвиденная ошибка', 'error');
              } else if (errorFlag == 'exist') {
                showPopUpMsg('Извините, такой комментарий уже существует.', 'Ошибка отправки формы', 'error');
              } else if (errorFlag=='ipspam'){
                showPopUpMsg('Извините, сегодня вами оставлено слишком много отзывов.','Ошибка отправки формы','error');
              } else {
                showPopUpMsg('Пожалуйста, проверьте все поля.', 'Ошибка отправки формы', 'error');
              }
            }

            $('.modalReview').removeClass('loading');
          },
          timeout: 15000
        });
      } else {
        $(emailInp).addClass('error');
        showPopUpMsg('Пожалуйста, проверьте email', 'Ошибка отправки формы', 'error');
        $('.modalReview').removeClass('loading');
      }
    }

    return false;
  });
  $('.modalComment .orderSubmit').click(function () {
    $('.modalComment').addClass('loading');
    $('.modalComment .mdReqInput').removeClass('error');
    var nameInp = $('.modalComment .commInpName');
    var emailInp = $('.modalComment .commInpEmail');
    var reviewInp = $('.modalComment .commInpReview');
    var name = $(nameInp).val();
    var email = $(emailInp).val();
    var review = $(reviewInp).val();
    var resId = $('.modalComment .orgIdForm').val();
    var form = $(this).parent();
    var isError = false;

    if (name == '') {
      $(nameInp).addClass('error');
      isError = true;
    }

    if (email == '') {
      $(emailInp).addClass('error');
      isError = true;
    }

    if (review == '') {
      $(reviewInp).addClass('error');
      isError = true;
    }

    var validRobot = $('.modalComment .validRobot').val();

    if (isError) {
      showPopUpMsg('Пожалуйста, проверьте все поля.', 'Ошибка отправки формы', 'error');
      /*noerror*/

      $('.modalComment').removeClass('loading');
    } else {
      if (ValidMail(email)) {
        var creatorLink = "/creator/review/";
        $.ajax({
          url: creatorLink,
          cache: false,
          type: "POST",
          data: 'name=' + name + '&email=' + email + '&review=' + review + '&resId=' + resId + '&validRobot=' + validRobot,
          error: function error(x, t, e) {
            if (t === 'timeout') {
              showPopUpMsg('Пожалуйста, обновите страницу и попробуйте еще раз.', 'Превышен интервал ожидания', 'error');
            } else {
              showPopUpMsg('Пожалуйста, обновите страницу и попробуйте еще раз.', 'Возникла непредвиденная ошибка', 'error');
            }

            $('.modalComment').removeClass('loading');
          },
          success: function success(data) {
            var dataJson = JSON.parse(data);

            if (dataJson.result == 1) {
              showPopUpMsg('Спасибо!<br> Комментарий успешно добавлен и будет опубликован после проверки.', 'Комментарий добавлен', 'noerror');
              $(form).find('.mdReqInput').val('');
              setTimeout(function () {
                $.fancybox.close();
              }, 300);
              var goal = $(form).attr('data-goal');

              if (goal != '') {
                sendGoals(goal);
              }
            } else {
              var errorsArray = dataJson.errors.split(',');
              var errorFlag = '';

              for (var _i4 = 0; _i4 < errorsArray.length; _i4++) {
                if (errorsArray[_i4] == 'notsaved' || errorsArray[_i4] == 'resId') {
                  errorFlag = 'unknown';
                }

                if (errorFlag != 'unknown') {
                  if (errorsArray[_i4] == 'review') {
                    $(reviewInp).addClass('error');
                  }

                  if (errorsArray[_i4] == 'name') {
                    $(nameInp).addClass('error');
                  }

                  if (errorsArray[_i4] == 'email') {
                    $(emailInp).addClass('error');
                  }
                }

                if (errorsArray[_i4] == 'exist') {
                  errorFlag = 'exist';
                }
                if (errorsArray[_i3] == 'ipspam') {
                  errorFlag = 'ipspam';
                }
              }

              if (errorFlag == 'unknown') {
                showPopUpMsg('Пожалуйста, обновите страницу и попробуйте еще раз.', 'Возникла непредвиденная ошибка', 'error');
              } else if (errorFlag == 'exist') {
                showPopUpMsg('Извините, такой комментарий уже существует.', 'Ошибка отправки формы', 'error');
              } else if (errorFlag=='ipspam'){
                showPopUpMsg('Извините, сегодня вами оставлено слишком много отзывов.','Ошибка отправки формы','error');
              } else {
                showPopUpMsg('Пожалуйста, проверьте все поля.', 'Ошибка отправки формы', 'error');
              }
            }

            $('.modalComment').removeClass('loading');
          },
          timeout: 15000
        });
      } else {
        $(emailInp).addClass('error');
        showPopUpMsg('Пожалуйста, проверьте email', 'Ошибка отправки формы', 'error');
        $('.modalComment').removeClass('loading');
      }
    }

    return false;
  });

  function ValidMail(email) {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var valid = re.test(email);
    return valid;
  }

  setLeadBtnsClick(); // Антиспам
  //$('form:not(.searchForm)').append('<input type="text" name="comment" value="comment" class="_comment" style="visibility:hidden; height: 0; width: 0; padding: 0; border:none;"/>');
  //<input type="hidden" name="pagename" value="[[*pagetitle]]"> //autocomplete="off"

  $('form:not(.searchFormElement)').each(function (e) {
    //e.preventDefault();
    $(this).prepend('<input name="id-page-send" value="' + location.href + '" type="hidden" />');
    $(this).prepend('<input type="hidden" class="validRobot" name="validRobot" value="" required>'); //return false;
  });
  var mdate = new Date();
  var thisYear = mdate.getFullYear();
  var validateText = 'iamnotabot' + thisYear;
  var isValidateFormBot = false;
  $('form input,form textarea').click(function () {
    if (!isValidateFormBot) {
      $('.validRobot').val(validateText);
      $('.validRobot').attr('value', validateText);
      isValidateFormBot = true;
    }
  });
  $('form input,form textarea').keyup(function () {
    if (!isValidateFormBot) {
      $('.validRobot').val(validateText);
      $('.validRobot').attr('value', validateText);
      isValidateFormBot = true;
    }
  }); // Антиспам х

  var fixheader = $('header');

  if ($('div').is('.fixHeaderLineOrg')) {
    fixheader = $('.fixHeaderLineOrg');
  }

  $('.checkBox').html('<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 375.147 375.147" style="enable-background:new 0 0 375.147 375.147;fill:#fff;" xml:space="preserve"><g><g><polygon points="344.96,44.48 119.147,270.293 30.187,181.333 0,211.52 119.147,330.667 375.147,74.667"/></g></g></svg>');
  $(':not(a).politicsLink').click(function (event) {
    $.fancybox.open({
      src: '#politics',
      type: 'inline',
      touch: false,
      autoFocus: false,
      opts: {
        touch: false,
        autoFocus: false,
        afterShow: function afterShow(instance, current) {//console.info( 'done!' );
        }
      }
    });
    return false;
  });
  $('.openModalQuestion').click(function (event) {
    var dataForm = $(this).attr('data-form');
    var dataFormGoal = $(this).attr('data-formgoal');

    if (dataForm === undefined) {
      dataForm = '';
    }

    if (dataFormGoal === undefined) {
      dataFormGoal = '';
    }

    $('.modalQuestion form').attr('data-goal', dataFormGoal);
    $('.formidentModal').attr('value', dataForm);
    $('.formidentModal').val(dataForm);
    $.fancybox.open({
      src: '.modalQuestion',
      type: 'inline',
      touch: false,
      autoFocus: false,
      opts: {
        touch: false,
        autoFocus: false,
        afterShow: function afterShow(instance, current) {//console.info( 'done!' );
        }
      }
    });
    return false;
  });
  $('.checkBox').click(function (event) {
    event.preventDefault();
    event.stopPropagation();

    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).parent().parent().find('.orderSubmit').prop("disabled", true);
    } else {
      $(this).parent().parent().find('.orderSubmit').prop("disabled", false);
      $(this).addClass('active');
    }
  });
  $('.go_to').click(function () {
    scrollToElement($(this).attr('data-href'));
    return false;
  });

  function scrollToElement(scroll_el) {
    var speed = 2;
    var scrollinFlag = false;

    if ($(scroll_el).length != 0) {
      // 
      var headerHeight = 0;
      headerHeight = $(fixheader).outerHeight();
      var oft = $(scroll_el).offset().top - headerHeight;
      var distance = Math.abs($(window).scrollTop() - oft);
      var time = distance / speed;

      if (time > 700) {
        time = 700;
      }

      $('html, body').animate({
        scrollTop: oft
      }, time);
    }

    $('.menuBtn').removeClass('active');
    $('.fixheaderMenu').removeClass('active');
    setTimeout(function () {
      scrollinFlag = true;
    }, 1200);
  }

  $('.menuBtn').click(function () {
    $('.menuBtn').toggleClass('active');
    $('.fixheaderMenu').toggleClass('active');
  }); //$('.questionBlock li:first-of-type').addClass('active');

  if ($('div').is('.questionBlock')) {
    var questions = [];
    var questEl = $('.questionBlock li');

    for (var i = 0; i < questEl.length; i++) {
      questions[i] = $(questEl[i]).html();
    }

    $('.questionBlock ul').html('');
    var centerEl = Math.ceil(questEl.length / 2);

    for (var i = 0; i < centerEl; i++) {
      $('.questionBlock ul').html($('.questionBlock ul').html() + '<li>' + questions[i] + '</li>');
    }

    $('.questionBlock').append('<ul class="ul2"></ul>');

    for (var i = centerEl; i < questEl.length; i++) {
      $('.questionBlock .ul2').html($('.questionBlock .ul2').html() + '<li>' + questions[i] + '</li>');
    }

    $('.questionBlock li b').click(function () {
      var parent = $(this).parent();
      $(parent).toggleClass('active');

      if ($(parent).hasClass('active')) {
        $(parent).find('div').height($(parent).find('p').height() + 40);
      } else {
        $(parent).find('div').height(0);
      }
    });
  }

  if ($('div').is('.fixHeaderLineOrg')) {
    var mainIconHref = $('link[type="image/svg+xml"]').attr('href');
    var fixheaderOrg = $('.fixHeaderLineOrg');

    if ($(window).scrollTop() > 200 && !$(fixheader).hasClass('show')) {
      $(fixheaderOrg).addClass('show');
    }

    $(window).scroll(function () {
      var thisScrollTop = $(this).scrollTop();

      if (thisScrollTop > 200 && !$(fixheaderOrg).hasClass('show')) {
        $(fixheaderOrg).addClass('show');
        /*if(typeof orgIcon !== 'undefined' && orgIcon!=''){
            $('link[type="image/svg+xml"]').remove();
            $('link[rel="icon"], link[rel="shortcut icon"]').attr('href', orgIcon);
        }*/
      } else if (thisScrollTop < 200 && $(fixheaderOrg).hasClass('show')) {
        $(fixheaderOrg).removeClass('show');
        /*if(typeof orgIcon !== 'undefined' && orgIcon!=''){
            $('head').append('<link href="'+mainIconHref+'" rel="icon" type="image/svg+xml">');
        }*/
      }
    });
  }
  /*if($(window).scrollTop()>100 && !$(fixheader).hasClass('show')){
      $(fixheader).addClass('show');
  }
  $(window).scroll(function(){
      var thisScrollTop=$(this).scrollTop();
      if(thisScrollTop>50 && !$(fixheader).hasClass('show')){
          $(fixheader).addClass('show');
      }else if(thisScrollTop<50 && $(fixheader).hasClass('show')){
          $(fixheader).removeClass('show');
      }
  });*/


  $(".datepickerBig").datepicker({
    changeMonth: true,
    dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    monthNamesShort: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    //monthNamesShort: [ "Янв", "Фев", "Мар", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Ноя", "Дек" ],
    firstDay: 1,
    //minDate: '+1d',
    maxDate: '+30d',
    minDate: new Date(),
    dateFormat: 'dd.mm.yy',
    onSelect: onSelectDate,
    showOtherMonths: true,
    selectOtherMonths: true,
    changeYear: true
  });
  /*let point1=new Point(140,0);
  let point2=new Point(280,140);
  let center=new Point(140,140);
  console.log(getAngle(center,point1,point2));*/

  var pathId = 9;
  $('.clickClocks').click(function (e) {
    var offset = $(this).offset();
    var relativeX = e.pageX - offset.left;
    var relativeY = e.pageY - offset.top;
    var blockWidth = $('.companyBigRequestFormTime .clocks').width(); //if($(window).width()<1024){blockWidth=$('.companyBigRequestFormTime .clocks').width();}

    var point1 = new Point(blockWidth / 2, 0);

    if (pathId == 0) {
      point1.X = blockWidth / 2;
      point1.Y = 0;
    }

    if (pathId == 1) {
      point1.X = blockWidth * .75;
      point1.Y = blockWidth * 0.0669857;
    }

    if (pathId == 2) {
      point1.X = blockWidth * 0.933;
      point1.Y = blockWidth / 4;
    }

    if (pathId == 3) {
      point1.X = blockWidth;
      point1.Y = blockWidth / 2;
    }

    if (pathId == 4) {
      point1.X = blockWidth * 0.933;
      point1.Y = blockWidth * .75;
    }

    if (pathId == 5) {
      point1.X = blockWidth * .75;
      point1.Y = blockWidth * 0.933;
    }

    if (pathId == 6) {
      point1.X = blockWidth / 2;
      point1.Y = blockWidth;
    }

    if (pathId == 7) {
      point1.X = blockWidth / 4;
      point1.Y = blockWidth * 0.933;
    }

    if (pathId == 8) {
      point1.X = blockWidth * 0.0669857;
      point1.Y = blockWidth * .75;
    }

    if (pathId == 9) {
      point1.X = 0;
      point1.Y = blockWidth / 2;
    }

    if (pathId == 10) {
      point1.X = blockWidth * 0.0669857;
      point1.Y = blockWidth / 4;
    }

    if (pathId == 11) {
      point1.X = blockWidth / 4;
      point1.Y = blockWidth * 0.0669857;
    }

    var point2 = new Point(relativeX, relativeY);
    var center = new Point(blockWidth / 2, blockWidth / 2);
    var angle = getAngle(center, point1, point2);
    var percentsOfAngle = angle * 360 / 30 - 90;
    var bigAngle = pathId * 30 + angle - 90;
    setClocks(bigAngle, percentsOfAngle);
  });
  $('.clickClocks path').click(function () {
    var hour = +$(this).attr('data-id');
    pathId = hour;
    setSelectedTime(hour);
  });

  function getAngle(point1, point2, point3) {
    var radResult = Math.acos(((point1.X - point2.X) * (point1.X - point3.X) + (point1.Y - point2.Y) * (point1.Y - point3.Y)) / (Math.sqrt(Math.pow(point1.X - point2.X, 2) + Math.pow(point1.Y - point2.Y, 2)) * Math.sqrt(Math.pow(point1.X - point3.X, 2) + Math.pow(point1.Y - point3.Y, 2))));
    return radResult * 180 / Math.PI;
  }

  function onSelectDate(d) {
    if (d != '') {
      $('.datepickerBig').datepicker("setDate", d);
      var activeOption = $('.dateSelect option[value="' + d + '"]');
      $(activeOption).prop('selected', 1);
      setClientTimeForm();
    }
  }

  $('.dateSelect').change(function (e) {
    var val = $(this).val();
    $('.datepickerBig').datepicker("setDate", val);
    $('.dateSelect option').prop('selected', false);
    $(".dateSelect option[value='" + val + "']").prop('selected', true);
    setClientTimeForm();
  });

  function setClientTimeForm() {
    $('.clientTime').val($('.dateSelect').val() + ' ' + $('.timeSelect').val());
  }

  $('.timeSelect').change(function (e) {
    var isSetClocks = false;

    if (e.type == "change") {
      isSetClocks = true;
    }

    setSelectedTime($(this).find('option:selected').attr('data-id'), isSetClocks);
  });

  function setClocks(hoursAngle, minutsAngle) {
    $('.hoursArrow').css('transform', 'rotate(' + hoursAngle + 'deg)');
    $('.minuts').css('transform', 'rotate(' + minutsAngle + 'deg)');
  }

  function setSelectedTime(id) {
    var isSetClocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    $('.timeSelect option').prop('selected', false);
    $(".timeSelect option[data-id='" + id + "']").prop('selected', true);

    for (var _i5 = 0; _i5 <= 11; _i5++) {
      $('.clocks').removeClass('hour' + _i5);
    }

    $('.clocks').attr('data-hour', id);
    $('.clocks').addClass('hour' + id);

    if (isSetClocks) {
      setClocks(id * 30 + 10 - 90, 30);
    }

    setClientTimeForm();
  }

  $('.hiddenPhone').click(function () {
    if(!$(this).hasClass('active')){
      $(this).find('a').html($(this).attr('data-phone'));
      $(this).addClass('active');
      sendGoals('showphone');
      if($(this).attr('data-isP')==1){
        sendGoals('showphone_partner');
        sendGoals('all_patrners');
      }
    }
  }); //declOfNum(daysLeft, ['день', 'дня', 'дней'])
  $('.companySiteLink').click(function(){
    if($(this).attr('data-isP')==1){
      sendGoals('siteclick_partner');
      sendGoals('all_patrners');
    }
  });

  function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
  }

  var videoIsShow = false;

  if (!mobileflag) {
    $('.videoBlock').on("mouseover", function () {
      if (!videoIsShow) {
        $('.videoBlock').off("mouseover");
        videoIsShow = true;
        $('.video').html($('.video').attr('data-frame'));
      }
    });
  } else {
    setTimeout(function () {
      if (!videoIsShow) {
        videoIsShow = true;
        $('.video').html($('.video').attr('data-frame'));
      }
    }, 10000);
  }

  $('.attestat_img').click(function () {
    $.fancybox.open({
      src: $(this).attr('data-attestat'),
      touch: false,
      autoFocus: false,
      opts: {
        touch: false,
        autoFocus: false,
        afterShow: function afterShow(instance, current) {//console.info( 'done!' );
        }
      }
    });
    return false;
  });
  var questionBlockLi = $('.questionBlock li').length;
  $('.servTabsBtns li').click(function () {
    var index = $(this).index();
    goToServTab(index);
  });
  goToServTab(0);

  function goToServTab(index) {
    var tabs = $('.servTabsBtns li');
    $(tabs).removeClass('active');
    $(tabs[index]).addClass('active');
    var tabsCont = $('.servTabCont');
    $(tabsCont).removeClass('active');
    $(tabsCont[index]).addClass('active');
  }

  var arrowSvgCode = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068 c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557 l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104 c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z"/></g></g></svg>';

  if ($('a').is('.servTabLink')) {
    $('.servTabLink').append(arrowSvgCode);
  }
  /*if($('div').is('.servTabCont')){
      var servTabCont = $('.servTabCont ul');
      var maxElements=0;
      for(var i=0;i<servTabCont.length;i++){
          if(maxElements<$(servTabCont[i]).find('li').length){
              maxElements=$(servTabCont[i]).find('li').length;
          }
      }
      $(servTabCont).height(Math.ceil(maxElements/2)*48);
  }*/


  $('.checkCity b').click(function () {
    $.fancybox.open({
      src: '.cityConteinerModalBlk',
      type: 'inline',
      touch: false,
      autoFocus: false,
      opts: {
        touch: false,
        autoFocus: false,
        afterShow: function afterShow(instance, current) {//console.info( 'done!' );
        }
      }
    });
  });
  $('.cityConteinerModal .active').click(function () {
    $.fancybox.close({
      src: '.cityConteinerModalBlk'
    });
    return false;
  });
  checkGetParams();

});
/*docreadyend*/


function checkGetParams(){
  var query = window.location.search.substring(1);
  var qs = parse_query_string(query);
  if(qs.utm_source != undefined && qs.utm_source!='undefined'){
    var utm_source=qs.utm_source;
    if(utm_source=='mm'){$('body').addClass('metrmos');}
  }
}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair.shift());
    var value = decodeURIComponent(pair.join("="));
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = value;
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], value];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(value);
    }
  }
  return query_string;
}


function setLeadBtnsClick() {
  $('.leadFormBtn.notSet').click(function () {
    var orgId = $(this).attr('data-id');
    $('.orgIdForm').attr('value', orgId);
    $('.orgIdForm').val(orgId);
    var service = $(this).attr('data-service');
    var isP = $(this).attr('data-isP');

    if (service == undefined) {
      service = '';
    }
    if(isP!=1){
      isP=0;
    }
    $('.modalRequestForm .isP').val(isP);

    var orgName = '';
    var selectList = '';

    if (ratingElements[orgId] != undefined) {
      if ('name' in ratingElements[orgId]) {
        orgName = ratingElements[orgId]['name'];
        $('.modalRequestHdOrg').html(orgName);
      }

      var isSelect = false;
      var selectElText = '';

      if ('verify_water_meters' in ratingElements[orgId] && ratingElements[orgId]['verify_water_meters'] == 1) {
        if (service == 'verify_water_meters') {
          selectElText = 'selected';
          isSelect = true;
        }

        selectList += '<option value="verify_water_meters" ' + selectElText + '>Поверка счетчиков воды</option>';
        selectElText = '';
      }

      if ('change_water_meters' in ratingElements[orgId] && ratingElements[orgId]['change_water_meters'] == 1) {
        if (service == 'change_water_meters') {
          selectElText = 'selected';
          isSelect = true;
        }

        selectList += '<option value="change_water_meters" ' + selectElText + '>Замена счетчиков воды</option>';
        selectElText = '';
      }

      if ('install_water_meters' in ratingElements[orgId] && ratingElements[orgId]['install_water_meters'] == 1) {
        if (service == 'install_water_meters') {
          selectElText = 'selected';
          isSelect = true;
        }

        selectList += '<option value="install_water_meters" ' + selectElText + '>Установка счетчиков воды</option>';
        selectElText = '';
      }

      if ('verify_heat_meters' in ratingElements[orgId] && ratingElements[orgId]['verify_heat_meters'] == 1) {
        if (service == 'verify_heat_meters') {
          selectElText = 'selected';
          isSelect = true;
        }

        selectList += '<option value="verify_heat_meters" ' + selectElText + '>Поверка счетчиков тепла</option>';
        selectElText = '';
      }

      if ('change_heat_meters' in ratingElements[orgId] && ratingElements[orgId]['change_heat_meters'] == 1) {
        if (service == 'change_heat_meters') {
          selectElText = 'selected';
          isSelect = true;
        }

        selectList += '<option value="change_heat_meters" ' + selectElText + '>Замена счетчиков тепла</option>';
        selectElText = '';
      }

      if ('install_heat_meters' in ratingElements[orgId] && ratingElements[orgId]['install_heat_meters'] == 1) {
        if (service == 'install_heat_meters') {
          selectElText = 'selected';
          isSelect = true;
        }

        selectList += '<option value="install_heat_meters" ' + selectElText + '>Установка счетчиков тепла</option>';
        selectElText = '';
      }

      if ('install_conditioner' in ratingElements[orgId] && ratingElements[orgId]['install_conditioner'] == 1) {
        if (service == 'install_conditioner') {
          selectElText = 'selected';
          isSelect = true;
        }

        selectList += '<option value="install_conditioner" ' + selectElText + '>Установка кондиционеров</option>';
        selectElText = '';
      }


      if (!isSelect) {
        selectElText = 'selected';
      }

      selectList = '<option disabled ' + selectElText + '>Выберите услугу:</option>' + selectList;
    }

    $('.servicesSelectList').html(selectList);
    $.fancybox.open({
      src: '.modalRequest',
      type: 'inline',
      touch: false,
      autoFocus: false,
      opts: {
        touch: false,
        autoFocus: false,
        afterShow: function afterShow(instance, current) {//console.info( 'done!' );
        }
      }
    });
    return false;
  });
  $('.leadFormBtn').removeClass('notSet');
}