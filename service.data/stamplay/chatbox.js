module.exports = function(service,db) {
	
	service.getChatBox = getChatBox;
	service.getChatBoxes = getChatBoxes;
	service.setChatBox = setChatBox;
	service.createChatBox = createChatBox;
	service.getStyle = getStyle;
	service.getBot = getBot;

function getChatBoxes(query){
	_cleanApiFieldsForStamplay(query);
	return new Promise(function(resolve,reject){

  		db.Object('chatbox').get(query,function(err,docs){
  			if(err) reject(err);
			else{
				docs = JSON.parse(docs);
				docs.forEach(function(doc){
					_cleanStamplayFieldsForSave(doc);
				});
				resolve(docs.data);
			}
  		});
	
  });
}

function getChatBox(query){
	console.log('getChatBox(), query: ',query)
	_cleanApiFieldsForStamplay(query);
	return new Promise(function(resolve,reject){
		db.Object('chatbox').get(query,function(err,doc){
  			if(err) reject(err);
			else{
				doc = JSON.parse(doc);
				doc = doc.data[0];
				_cleanStamplayFieldsForSave(doc);
				resolve(doc);
			}
  		});
	
  });
}

function createChatBox(input){
	_cleanApiFieldsForStamplay(input);
	return new Promise(function(resolve,reject){
		//console.log('createChatBox', input);
		db.Object('chatbox').save(input,function(err,doc){
			if(err) reject(err);
			else{
				doc = JSON.parse(doc);
				_cleanStamplayFieldsForSave(doc);
				resolve(doc);
			}
		});
	});
}

function setChatBox(input){
	_cleanApiFieldsForStamplay(input);
	return new Promise(function(resolve,reject){

		_cleanStamplayFieldsForSave(input);

		// if !input._id, create with input
		if(!input._id){
			// create new chatbox
			db.Object('chatbox').save(input,function(err,doc){
				if(err) reject(err);
				else{
					doc = JSON.parse(doc);
					_cleanStamplayFieldsForSave(doc);
					resolve(doc);
				}
			});
		}else{
			var id = input._id;
			delete input._id;
			if(input.id) delete input.id;
			db.Object('chatbox').patch(id,input,function(err,doc){
				doc = JSON.parse(doc);
				_cleanStamplayFieldsForSave(doc);
				resolve(doc);
			});
		}
		
	});	
}

function getStyle(styles){
	console.log('in getStyle(), styles',typeof styles,styles);
	if(typeof styles == 'string'){
		return styles;
	}
	var index = Math.floor(Math.random(styles.length));
	console.log('styles[index]',styles[index]);
	return styles[index];
}

function getBot(owner){
	var that = this;
	console.log('in getBot(), owner',owner);
	return new Promise(function(resolve,reject){
		db.Object('chatbot').get({'user_owner': owner},function(err,docs){
			if(err) reject(err);
			else{
				docs = JSON.parse(docs);
				console.log('docs',docs);
				docs = docs.data;
				var bot = {};
				var index = Math.floor(Math.random()*docs.length);
				bot.owner = docs[index].owner;
				if(docs[index].user_owner){
					bot.owner = docs[index].user_owner;
				}
				bot.name = docs[index].name;
				console.log(index,bot.name);
				resolve(bot);
			}
		});
	});
	
}

function _cleanApiFieldsForStamplay(input){
	if(input.owner) input.user_owner = input.owner;

	delete input.owner;
}
function _cleanStamplayFieldsForSave(input){
	if(input.__v || input.__v === 0) delete input.__v;
	if(input.appId) delete input.appId;
	if(input.cobjectId) delete input.cobjectId;
	if(input.actions) delete input.actions;
	if(input.dt_update) delete input.dt_update;
	if(input.dt_create) delete input.dt_create;
	if(input.user_owner) input.owner = input.user_owner;
	delete input.user_owner;
}

} // end exports

    
 