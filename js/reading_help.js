	var x=null;
	
	
	 	var block_reading_help_mask_posY=0;
		var block_reading_help_mask_lastScrolledTop=0;
		var block_reading_help_mask_delta=40;
		

	

	
		var mouvementSouris = function(m)
		{
			block_reading_help_mask_posY = m.pageY;
		    $("#block_reading_help_mask_high").css('top', '0vh');
		    $("#block_reading_help_mask_high").css('height', (block_reading_help_mask_posY-block_reading_help_mask_delta)+'px'); 
		    $("#block_reading_help_mask_low").css('top', (block_reading_help_mask_posY+block_reading_help_mask_delta)+'px');
		    $("#block_reading_help_mask_low").css('height', ($( window ).height()-(block_reading_help_mask_posY-block_reading_help_mask_delta) )+'px');
			
		}
		var touchePressee = function(m) {
    		// ESCAPE key pressed
    		if (m.keyCode == 27) {
        		block_reading_help_closemask();
    		}
		}
		
		var scrolling = function(m){
   			if (block_reading_help_mask_lastScrolledTop != $(document).scrollTop()) {
      			block_reading_help_mask_posY -= block_reading_help_mask_lastScrolledTop;
      			block_reading_help_mask_lastScrolledTop = $(document).scrollTop();             
      			block_reading_help_mask_posY += block_reading_help_mask_lastScrolledTop;
      		} 
		    $("#block_reading_help_mask_high").css('height', (block_reading_help_mask_posY-block_reading_help_mask_delta)+'px'); 
		    $("#block_reading_help_mask_low").css('top', (block_reading_help_mask_posY+block_reading_help_mask_delta)+'px');
		    $("#block_reading_help_mask_low").css('height', ($( window ).height()-(block_reading_help_mask_posY-block_reading_help_mask_delta) )+'px');
		    }
		

	
		function block_reading_help_openmask(){
			var elementcode=document.getElementById('reading_help-text-escape');
			var escape =elementcode.dataset.code

						var div_high = $('<div />').appendTo('body');
			$(div_high).attr('id', 'block_reading_help_mask_high');
			$(div_high).css({'z-index': '1',
		    'position': 'absolute',
		    'top': '0', 
		    'left': '0',
		    'background-color': 'black',
		    'display': 'none'});

			var div_low = $('<div />').appendTo('body');
			$(div_low).attr('id', 'block_reading_help_mask_low');
			$(div_low).css({'z-index': '1',
		    'position': 'absolute',
		    'top': '0', 
		    'left': '0',
		    'background-color': 'black',
		    'display': 'none'});
			var span = $('<span />').appendTo(div_low);
			$(span).attr('id', 'block_reading_help_mask_low');
			$(span).text(escape);
			$(span).css({'color': 'white', 
				'display' :'block',
				'width' :'300px',
   				'height' : '100%',
				'font-family' : 'Arial, Helvetica, sans-serif',
   				'margin': '20px auto'});

			var span2 = $('<span />').appendTo(div_high);
			$(span2).attr('id', 'block_reading_help_mask_high');
			$(span2).text(escape);
			$(span2).css({'color': 'white', 
				'display' :'block',
				'width' :'300px',
   				'height' : '100%',
				'font-family' : 'Arial, Helvetica, sans-serif',
   				'margin': '20px auto'});
			
			
		    $("#block_reading_help_mask_high").css('left', '0');
		    $("#block_reading_help_mask_high").css('top', '0vh');
		    $("#block_reading_help_mask_high").css('width', '100vw');
		    $("#block_reading_help_mask_high").css('height', '45vh');
		    $("#block_reading_help_mask_high").css('z-index', '2147483647');
		    $("#block_reading_help_mask_high").fadeIn("fast");


		    $("#block_reading_help_mask_low").css('left', '0');
		    $("#block_reading_help_mask_low").css('top', '55vh');
		    $("#block_reading_help_mask_low").css('width', '100vw');
		    $("#block_reading_help_mask_low").css('height', '100vh');
		    $("#block_reading_help_mask_low").css('z-index', '2147483647');
		    $("#block_reading_help_mask_low").fadeIn("fast");
		    this.addEventListener('mousemove', mouvementSouris);
  			this.addEventListener('keydown', touchePressee);
  			this.addEventListener('scroll', scrolling);
		}
		function block_reading_help_closemask(){
		    $("#block_reading_help_mask_high").hide();
		    $("#block_reading_help_mask_high").css('left', 0);
		    $("#block_reading_help_mask_high").css('top', 0);
		    $("#block_reading_help_mask_low").hide();
		    $("#block_reading_help_mask_low").css('left', 0);
		    $("#block_reading_help_mask_low").css('top', 0);
		}
		
		

var speechUtteranceChunker = function (utt, settings, callback) {
    settings = settings || {};
    var newUtt;
    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
    if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
        newUtt = utt;
        newUtt.text = txt;
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
            }
            if (callback !== undefined) {
                callback();
            }
        });
    }
    else {
        var chunkLength = (settings && settings.chunkLength) || 160;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var chunkArr = txt.match(pattRegex);
 
        if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
            //call once all text has been spoken...
            if (callback !== undefined) {
                callback();
            }
            return;
        }
        var chunk = chunkArr[0];
        newUtt = new SpeechSynthesisUtterance(chunk);
        var x;
        for (x in utt) {
            if (utt.hasOwnProperty(x) && x !== 'text') {
                newUtt[x] = utt[x];
            }
        }
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
                return;
            }
            settings.offset = settings.offset || 0;
            settings.offset += chunk.length - 1;
            speechUtteranceChunker(utt, settings, callback);
        });
    }
 
    if (settings.modifier) {
        settings.modifier(newUtt);
    }
    console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
    //placing the speak invocation inside a callback fixes ordering and onend issues.
    setTimeout(function () {
        speechSynthesis.speak(newUtt);
    }, 0);
};

		function block_reading_help_speechsynthesis(button)
		{
			var clicked = button.getAttribute("data-clicked") === "true";
	
			if (clicked) {
				button.style.backgroundColor = "blue";
				button.setAttribute("data-clicked", "false");
				document.removeEventListener("mouseup", block_reading_help_lireTexte);
			} else {
				button.style.backgroundColor = "red"; // Remplacez "red" par la couleur de votre choix
				button.setAttribute("data-clicked", "true");
				if ('speechSynthesis' in window) {
					document.addEventListener("mouseup", block_reading_help_lireTexte);
//					document.addEventListener("selectionchange", block_reading_help_lireTexte);
				}else{
				  alert("Sorry, your browser doesn't support text to speech!");
				}
			}


		}
		
		function block_reading_help_lireTexte()
		{
			var elementcode=document.getElementById('reading_help-lang');
			var lang=elementcode.dataset.code
			var selectedText = window.getSelection().toString().trim();
			if (selectedText !== "") {
			let all = "Oak is strong and also gives shade \n \
              Cats and dogs each hate the other \n \
              The pipe began to rust while new \n Bye.";	
			sentences = all.split('\n');
			
			
			for (i = 0; i < sentences.length; i++) {
			  const sentence = sentences[i];
			  const audio = new SpeechSynthesisUtterance(sentence);
			    			audio.volume = 1; // From 0 to 1
			audio.rate = 0.9; // From 0.1 to 1
			audio.lang = lang;

			  audio.onstart = () => console.log(audio.text);
			  speechSynthesis.speak(audio);
			}
		}
 /*   		for (i = 0; i < sentences.length; i++) {
      			await getNextAudio(sentences[i],lang);
      			
      			    	async function getNextAudio(sentence,lang) {
      		console.log(sentence);
  			let audio = new SpeechSynthesisUtterance(sentence);
  			audio.volume = 1; // From 0 to 1
			audio.rate = 0.9; // From 0.1 to 1
			audio.lang = lang;
  			window.speechSynthesis.speak(audio);
		    return new Promise(resolve => { audio.onend = resolve;  });
		}

    		}
    		}
     */
		}
		
/*		
		function block_reading_help_lireTexte()
		{
			var elementcode=document.getElementById('reading_help-lang');
			var lang=elementcode.dataset.code
			var selectedText = window.getSelection().toString().trim();
			if (selectedText !== "") {
				//console.log(selectedText);
				speechSynthesis.cancel();
				var msg = new SpeechSynthesisUtterance();
				msg.volume = 1; // From 0 to 1
				msg.rate = 0.9; // From 0.1 to 1
				msg.lang = lang;
				msg.text = selectedText;
				speechSynthesis.speak(msg);
				speechSynthesis.cancel();
				var msg2 = new SpeechSynthesisUtterance();
				msg2.volume = 1; // From 0 to 1
				msg2.rate = 0.9; // From 0.1 to 1
				msg2.lang = lang;
				msg2.text = selectedText;
				speechSynthesis.speak(msg2);

			}
		}
*/
