const { RTMClient } = require('@slack/rtm-api');
var token = 'xoxb-829172762213-816378205746-exITCNYQGwI9wVpfToXe71xu';

var rtm = new RTMClient(token);
rtm.start();

rtm.on('message', function(message)
	{
		var channel = message.channel;
		var text = message.text;

		if(text == '독수리')
		{
			rtm.sendMessage('이-글', channel);
		}
		else
		{
			rtm.sendMessage('응?', channel);
		}
	});
