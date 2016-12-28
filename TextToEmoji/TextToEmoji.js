// ==UserScript==
// @name         TextToEmoji
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Text to emoji
// @author       Ref
// @match        https://leekwars.com/chat
// @grant        none
// @require       http://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

(function() {
    'use strict';

    String.prototype.RemoveAccents = function() {
		var strAccents = this.split('');
		var strAccentsOut = [];
		var strAccentsLen = strAccents.length;
		var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
		var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
		for (var y = 0; y < strAccentsLen; y++) {
			if (accents.indexOf(strAccents[y]) != -1) {
				strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
			} else
				strAccentsOut[y] = strAccents[y];
		}
		strAccentsOut = strAccentsOut.join('');
		return strAccentsOut;
	};

    LW.on('pageload', function()
	{
        var chat = $('#chat>.content>.flex>.chat-input');
        var alphabet = 'azertyuiopqsdfghjklmwxcvbn';
        var space = ' ';
        var exclamation = '!';
        var question = '?';
        var pattern = /^\/img (.+)/i;
        chat.keydown(function(event) {
            if(event.which == 13) {
                if(pattern.test(chat[0].value)) {
                    var text = chat[0].value.match(pattern)[1].RemoveAccents().toLowerCase();
                    var textLen = text.length;
                    var finalText = '';
                    for(var i = 0; i < textLen; i++)
                    {
                        if(text[i] == space) {
                            finalText += ':white_large_square: ';
                        }
                        else if(text[i] == question) {
                            finalText += ':question: ';
                        }
                        else if(text[i] == exclamation) {
                            finalText += ':exclamation: ';
                        }
                        else if(alphabet.indexOf(text[i]) != -1) {
                            finalText += `:regional_indicator_${text[i]}: `;
                        }
                        else {
                            finalText += text[i];
                        }
                    }
                    chat[0].value = finalText;
                }
            }
        });
    });
})();