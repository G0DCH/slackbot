require('dotenv').config();
const { RTMClient } = require('@slack/rtm-api');
var token = process.env.SLACK_TOKEN;

var rtm = new RTMClient(token);
rtm.start();

var eagle = require('./eagle');
var cheetah = require('./cheetah');
var cat = require('./cat');

rtm.on('message', function(message)
	{
		var channel = message.channel;
		var text = message.text;

		switch(text)
		{
			case '독수리':
				eagle(rtm, channel);
				break;
			case '치타':
				cheetah(rtm, channel);
				break;
			case '고양이':
				cat(rtm, channel);
				break;
			case '배포 테스트':
				rtm.sendMessage('Slack 배포 테스트', channel);
			default:
				rtm.sendMessage('독수리, 치타, 고양이 중에 말해주세요.', channel);
		}
		
	});
