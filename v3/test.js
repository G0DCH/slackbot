require('dotenv').config();

var status = 0;

const token = process.env.SLACK_TESTERTOKEN;
const tchannel = process.env.TESTING_CHANNEL;
const tuser = process.env.TESTING_USER;

const { RTMClient, LogLevel } = require('@slack/rtm-api');

const rtm = new RTMClient(token);

rtm.start().catch(console.error);

rtm.on('ready', async() =>
	{
		const res = await rtm.sendMessage("테스트를 시작합니다.", tchannel);
		console.log("보낸 메시지: 테스트를 시작합니다.");
		status++;
	});
rtm.on('message', function(message)
	{
		var text = message.text;
		//console.log(message.user);
		if(message.user == tuser)
		{
		switch(status)
		{
			case 1:
				if(text != "독수리, 치타, 고양이 중에 말해주세요.")
				{
					console.log("테스트 실패: 기본 메시지");
					process.exit(1);
				}
				console.log("받은 메시지: ", text);
				rtm.sendMessage("독수리", tchannel);
				status++;
				break;
			case 2:
				console.log("보낸 메시지: 독수리");
				if(text != "이-글")
				{
					console.log("테스트 실패: 독수리");
					process.exit(1);
				}
				console.log("받은 메시지: ", text);
				rtm.sendMessage("치타", tchannel);
				status++;
				break;
			case 3:
				console.log("보낸 메시지: 치타");
				if(text != "치-타")
				{
					console.log("테스트 실패: 치타");
					process.exit(1);
				}
				console.log("받은 메시지: ", text);
				rtm.sendMessage("고양이", tchannel);
				status++;
				break;
			case 4:
				console.log("보낸 메시지: 고양이");
				if(text != "애옹")
				{
					console.log("테스트 실패: 고양이");
					process.exit(1);
				}
				console.log("받은 메시지: ", text);
				console.log("테스트가 정상 종료되었습니다.");
				rtm.sendMessage("Slack 배포 테스트 성공!", tchannel);
				process.exit(0);
				break;
			default:				
				console.log("테스트가 이상 상태입니다.");

		}
		}
	});
