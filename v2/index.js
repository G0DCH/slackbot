require('dotenv').config();
const { RTMClient } = require('@slack/rtm-api');
var token = process.env.SLACK_TOKEN;

var rtm = new RTMClient(token);
rtm.start();

rtm.on('message', function(message)
	{
		var channel = message.channel;
		var text = message.text;

		switch(text)
		{
			case '독수리':
				rtm.sendMessage('이-글', channel);
				break;
			case '치타':
				rtm.sendMessage('치-타',channel);
				break;
			case '고양이':
				rtm.sendMessage('애옹',channel);
				break;
			default:
				rtm.sendMessage('독수리, 치타, 고양이 중에 말해주세요.', channel);
		}
		
	});
