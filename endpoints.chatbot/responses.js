module.exports = function(name){

var responses = {};

responses['welcome'] = {
				message:{
					type:'welcome message', 
					body:{
						displayName:name, 
						text:"Thanks for visiting our website. We know how confusing it can be to find the care you're looking for. We'd love for you to choose Mindful Motion, but we care more about finding you the right fit for you. \n\nWould you answer a couple of questions to help us point you in the right direction?",
						image:'http://public.foolhardysoftworks.com:9000/backend/icons/PNG/voltron.png',
					}

				},
				responses: {
					type:'response welcome',
					body:{
						yes:{
							text: "Ok, let's go",
							id: 'begin',
							message: {
								type: "text message",
								qCode: 'welcome',
								meta: 'yes',
								body: {
										text:"Okay, let's go",
									},
								

							},
							
						},
						no:{
							text: "I'd rather not",
					  		id: 'cancel',	
							message: {
								type: "text message",
								qCode: 'welcome',
								meta: 'no',
								body: {
									 	text:"I'd rather not",
								},
							},

							
						}
						
					}
				}

		};
responses['avatar'] = chooseAvatar();
responses['avatar chosen'] = {
					message: textMessage(name,'is that what you look like?','avatar chosen 2',null),
}
responses['avatar chosen 2'] = {
					message: textMessage(name,'...unfortunate','avatar chosen 3',null),
}
responses['avatar chosen 3'] = {
					message: textMessage(name,"So, let's talk about your situation. What seems to be bothering you?",null,null),
					responses:{
						type:'response list text',
						body:[
							{text:"Back Pain", message:textMessage(null,"Back Pain","have back pain",null)},
							{text:"Shoulder Pain", message:textMessage(null,"Shoulder Pain", "have shoulder pain", null)},
							{text:"Knee Pain", message:textMessage(null,"Knee Pain", "have knee pain", null)},
							],
							}
}

responses['have back pain'] = {
					message: textMessage(name,"How long has it been bothering you?",null,null),
					responses:{
						type:'response list text',
						body:[
							{text:"A day or so", message:textMessage(null,"A day or so","backpain for a day",null)},
							{text:"About a week", message:textMessage(null,"About a week", "backpain for a week", null)},
							{text:"Longer than a week", message:textMessage(null,"Longer than a week", "backpain for longer than a week", null)},
							],
							}
}

responses['have shoulder pain'] = {
					message: textMessage(name,"Stop being a bitch.  Unless of course, you're a professional pitcher. Do you have million dollar contracts riding on your shoulder health? Are you pitching for the Yankees?",'pitcher',null),
}
responses['pitcher'] = {
					message: textMessage(name,"I didn't think so.",null,null),
}

responses['have knee pain'] = {
					message: textMessage(name,"I see...",'bucket list',null),
}

responses['bucket list'] = {
					message: textMessage(name,"You have a classic case of being old. When you get old, your shit starts to break. Go buy some depends and think about your bucket list.",null,null),
}

responses['backpain for a day'] = {
					message: textMessage(name,"Have you tried to take care of it?", null,null),
					responses:{
						type:'response list text',
						body:[
							{text:"Professional Care", message:textMessage(null,"Professional Care","I asked pros",null)},
							{text:"Self-Care", message:textMessage(null,"Self-Care", "I did nothing", null)},
							{text:"Prayer", message:textMessage(null,"Prayer", "by brodin", null)},
							],
					}
}

responses['backpain for a week'] = {
					message: textMessage(name,"toughen up", null,null),
}

responses['backpain for longer than a week'] = {
					message: textMessage(name,"I'm familiar with a big pain in my backside.  I've just thought of a way to make it go away.  Goodbye.", null,null),
}

responses['by brodin'] = {
					message: textMessage(name,"By Brodin's oily weight belt! Prayer won't heal amputees and it won't heal you.  What else have you tried?", null,null),
					responses:{
						type:'response list text',
						body:[
							{text:"Crystal Energy", message:textMessage(null,"I sought healing from Mother Gaia","crystals",null)},
							{text:"My psychic dog", message:textMessage(null,"bark bark bark", "dog", null)},
							{text:"5x5 Squats", message:textMessage(null,"I got pumped with 5x5 Squats!", "wheyman", null)},
							],
					}
}

responses['wheyman'] = {
					message: textMessage(name,"Wheyman, Brother!  You walk the Iron Path", null,null),
}

responses['crystals'] = {
					message: textMessage(name,"Alas you have been seduced by a harpy of Broki into a false temple. There is only one way to swole acceptance, brother.  The Iron Way.", null,null),
}

responses['dog'] = {
					message: textMessage(name,"I've seen this before. It does not end well for you... or the dog.", null,null),
}

responses['I did nothing'] = {
					message: textMessage(name,"OK, so you've had Back Pain for A day or so and you've been managing it with Self-Care.  Did I get that right?", null,null),
					responses:{
						type:'response list text',
						body:[
							{text:"Yes, that's right", message:textMessage(null,"Yes, that's right","you got it",null)},
							{text:"No, not quite", message:textMessage(null,"No, not quite", "ya dont got it", null)},
							],
					}
}


responses['you got it'] = {
					message: textMessage(name,"OK, great! Is there anything you'd like to add to help us understand what's going on?", null,null),
					responses:{
						type:'large free response',
						body:{
							buttonText:"Add Details",
							prompt:"Type in the box below:",
							message:{
										type:"text message",
										qCode:"back pain details",
										body:{
											text:"",
										}
									}
						},
					}
}

responses['you dont got it'] = {
					message: textMessage(name,"Okay, I stopped caring anyway. I bet you have back pain cuz ur fat.", null,null),
					
}

responses['back pain details'] = {
					message: textMessage(name,"Thanks for sharing that! As you can see, we're actually not talking with you live. It's a bummer because we're sure you're a really nice person. We'd love to meet you soon. But first, is it okay to email with feedback on our conversation?", null,null),
					responses:{
						type:'response list text',
						body:[
							{text:"Yes, that's awesome", message:textMessage(null,"Yes, that's right","email me",null)},
							{text:"No thanks", message:textMessage(null,"No, not quite", "dont fucking email me", null)},
							],
					}
}

responses['dont fucking email me'] = {
					message: textMessage(name,"Wish granted! Signing you up for cat facts.", null,null),
					
}

responses['email me'] = {
					message: textMessage(name,"OK, great! This is exciting. We use an app called Kurbi for these conversations. It'll make sure you stay anonymous so that your information and identity aren't used inappropriately. If you're happy with my feedback you can rate me and share your contact information so that we can set up a time to talk in person.",null, null),
					responses:{
						type:'small free response',
						body:{
							buttonText:"Add Details",
							prompt:"Type in your email in the box below:",
							message:{
										type:"text message",
										qCode:"scored the email",
										body:{
											text:"",
										}
									}
						},
					}
}

responses['scored the email'] = {
					message: textMessage(name,"OK, great! This is exciting. We use an app called Kurbi for these conversations. It'll make sure you stay anonymous so that your information and identity aren't used inappropriately. If you're happy with my feedback you can rate me and share your contact information so that we can set up a time to talk in person.",null, null),
					responses:{
						type:'small free response',
						body:{
							buttonText:"Add Details",
							prompt:"Type in your email in the box below:",
							message:{
										type:"text message",
										qCode:"grab the name",
										body:{
											text:"",
										}
									}
						},
					}
}



return responses;

function textMessage(name,text,qCode,meta){
	var temp = {};
	temp['type'] = 'text message';
	temp.body = {};
	temp.qCode = qCode;
	temp.meta = meta;
	temp.body.displayName = name;
	temp.body.text = text;
	
	return temp;
	
}

function chooseAvatar(){

var body = [];
var letters = 'ABCDEFGHIJKLMNO';

for(var i = 0; i < 12; i++){
	var temp = {};
	var M = "0" + Math.floor(Math.random()*4 + 1);
	var N = letters[Math.floor(Math.random()*letters.length)];
	
	temp.url = "http://public.foolhardysoftworks.com:9000/backend/icons/PNG/"+N+M+".png";
	temp.message = {};
	temp.message.type = 'image message';
	temp.message.qCode = 'avatar chosen';
	temp.message.meta = N+M;
	temp.message.body = {
					image: temp.url,
						};
	temp.id = N;
	body.push(temp);
}

 var msg =	{
				message:{
					type:'text message', 
					body:{
						displayName:name, 
						text:"Our chat is completely anonymous, so let's start by choosing an avatar you'd like to represent you.",
					}

				},
				responses: {
					type:'response list icons',
					body:body,
				}

		};

	return msg;
}
}