//Slide
$(document).on('ready', function() {
$(".center").slick({
	autoplay: true,
    infinite: true,
    centerMode: true,
    centerPadding: '350px',
		slidesToShow: 1,
		dots: true,
    responsive: [
    {
      breakpoint: 1140,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '220px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 1040,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '160px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 767,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});
});
/*Animação H1*/
(function($){
	$.fn.shuffleLetters = function(prop){
		var options = $.extend({
			"step"		: 15,			// How many times should the letters be changed
			"fps"		: 25,			
			"text"		: "", 			// Use this text instead of the contents
			"callback"	: function(){}	// Run once the animation is complete
		},prop)
		return this.each(function(){
			var el = $(this),
				str = "";
			if(el.data('animated')){
				return true;
			}
			el.data('animated',true);
			if(options.text) {
				str = options.text.split('');
			}
			else {
				str = el.text().split('');
			}
			var types = [],
				letters = [];
			for(var i=0;i<str.length;i++){
				var ch = str[i];
				if(ch == " "){
					types[i] = "space";
					continue;
				}
				else if(/[a-z]/.test(ch)){
					types[i] = "lowerLetter";
				}
				else if(/[A-Z]/.test(ch)){
					types[i] = "upperLetter";
				}
				else {
					types[i] = "symbol";
				}	
				letters.push(i);
			}
			el.html("");			
			(function shuffle(start){
				var i,
					len = letters.length, 
					strCopy = str.slice(0);	
				if(start>len){
					el.data('animated',false);
					options.callback(el);
					return;
				}
				for(i=Math.max(start,0); i < len; i++){
					if( i < start+options.step){
						strCopy[letters[i]] = randomChar(types[letters[i]]);
					}
					else {
						strCopy[letters[i]] = "";
					}
				}
				el.text(strCopy.join(""));
				setTimeout(function(){
					shuffle(start+1);
				},1000/options.fps);
			})(-options.step);
		});
	};
	function randomChar(type){
		var pool = "";
		if (type == "lowerLetter"){
			pool = "011";
		}
		else if (type == "upperLetter"){
			pool = "011";
		}
		else if (type == "symbol"){
			pool = ",.?/\\(^)![]{}*&^%$#'\"";
		}
		var arr = pool.split('');
		return arr[Math.floor(Math.random()*arr.length)];
	}
})(jQuery);

//Efeito de entrada //
Visibility.onVisible(function(){
	setTimeout(function () {
		$(".header .anima").addClass("animated fadeInDown");
	}, 600);
});

// Formulario
$('.formphp').on('submit', function() {
	Pace.restart();
	var emailContato = "contato@tenshitech.com.br"; 

	var that = $(this),
			url = that.attr('action'),
			type = that.attr('method'),
			data = {};
	
	that.find('[name]').each(function(index, value) {
		var that = $(this),
				name = that.attr('name'),
				value = that.val();
				
		data[name] = value;
	});
	
	$.ajax({
		url: url,
		type: type,
		data: data,
		success: function(response) {
		
			if( $('[name="leaveblank"]').val().length != 0 ) {
				$('.formphp').html("<div id='form-erro'></div>");
				$('#form-erro').html("<span>Falha no envio!</span><p>Você pode tentar novamente, ou enviar direto para o e-mail " + emailContato + " </p>")
				.hide()
				.fadeIn(1500, function() {
				$('#form-erro');
				});
			} else {
			
				$('.formphp').html("<div id='form-send'></div>");
				$('#form-send').html("<span>Mensagem enviada!</span><p>Em breve eu entro em contato com você. Abraços.</p>")
				.hide()
				.fadeIn(1500, function() {
				$('#form-send');
				});
			};
		},
		error: function(response) {
			$('.formphp').html("<div id='form-erro'></div>");
			$('#form-erro').html("<span>Falha no envio!</span><p>Você pode tentar novamente, ou enviar direto para o e-mail " + emailContato + " </p>")
			.hide()
			.fadeIn(1500, function() {
			$('#form-erro');  
		});
		}
	});
	return false;
});