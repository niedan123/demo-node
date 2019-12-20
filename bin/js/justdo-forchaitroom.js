// (function(e) {
// 	function YTX() {
// 	this.login_type = 1; //1  手机号登陆  2 VIOP账号登陆
// 	this._onUnitAccount = 'KF10089'; //多渠道客服帐号，目前只支持1个
// //      this._appid = '00000000598745e201598792f7c60005';   //魏
//         this._appid = 'ff8080814e760cd0014e760e70d00000';	//军
//         this._3rdServer = 'https://192.168.21.49:8998/2016-08-15/Corp/yuntongxun/inner/authen/';
//         this._appToken = '';
//         this.flag = true;//是否从第三方服务器获取sig
// 	this.is_online = false;
// 	this.user_account = ""; // 登陆账号
// 	this.username = ""; //登陆用户名
// 	this.pwd = ""; //登陆密码
// 	this.nickName = "";
// 	this._onMsgReceiveListener = null; // 消息监听
// 	this._noticeReceiveListener = null; // SDK消息通知监听
// 	this._onConnectStateChangeLisenter = null; //连接状态监听
// 	this.roomNumber = null;
//         this.chatwindow = $('[data-window="chat"]');
// 	};
// 	YTX.prototype._login_error_show = false;
// 	YTX.prototype = {
// 		init: function() {
// 			//		RL_YTX.setLogClose();
// 			var resp = RL_YTX.init(this._appid);
// 			RL_YTX.setMultLogin();
// 			if(!resp) {
// 				alert('SDK初始化错误');
// 				return;
// 			};
// 			IM.chat_window = $('[data-window-type="chat"]');
// 			IM.currentChat = this.chat_window.find('.chatting .chats');
// 			IM.chatNickName = this.chat_window.find('.receiver .name');
// 			IM.fireMsgWindow = $('#firemsg');
// 			IM.fireMsgContent = IM.fireMsgWindow.find('.modal-body');
// 			$(document).on('keypress', '[data-input="msgcontent"]', function(e) {
// 				if(e.keyCode === 13) {
// 					e.preventDefault();

// 					let _this = this;
// 					let value = $(this).html();
//                     value = IM.DO_pre_replace_content_to_db(value);
// 					IM.EV_sendTextMsg(value,function () {
// 						$(_this).html('');
//                     });
// 				};
// 			});
// 			$(document).on('click', '[data-button="send_msg"]', function() {
// 				let tar = $('[data-input="msgcontent"]');
// 				let value = tar.html();
// 				value = IM.DO_pre_replace_content_to_db(value);
// 				IM.EV_sendTextMsg(value,function () {
//                     tar.html('');
//                 });
// 			});
// 		},
// 		/**
// 		 * @param content 消息内容
// 		 * @param callback 回调函数
// 		 * */
// 		EV_sendTextMsg: function( content,callback) {
// 			console.log('send Text message: connent[' + content + ']...');
// 			let obj = new RL_YTX.ChatroomMsgBuilder();
// 			obj.setText(content);
// 			obj.setReceiver(IM.roomNumber);
// 			let msgId = RL_YTX.sendChatroomMsg(obj, function(obj) {
// 				console.log(obj);
// 				let level = Math.floor(Math.random()*100);
// 				IM.addMsgToChatWindow(level,'我',content);
// 				callback();
// 			}, function(obj) {
// 				setTimeout(function() { //断线的时候如果不延迟会出现找不到标签的情况，延迟0.3秒可解决。
// 					console.error(obj);
// 					if(170001 == obj.code) {
// 						alert("发送消息内容超长，请分条发送");
// 					} else if(174002 == obj.code) {
// 						alert("错误码： " + obj.code+ "; 错误描述：" + obj.msg);
// 					} else if(620008 === obj.code){
// 						console.log("您已被禁言");
// 					} else
// 						{
// 						alert("错误码： " + obj.code + "; 错误描述：" + obj.msg);
// 					}
// 				}, 300)
// 			});
// 			IM._extopts = [];
// 		},
// 		DO_pre_replace_content_to_db: function(str) {
// 			str = str.replace(/<(div|br|p)[/]?>/g, '\u000A');
// 			str = str.replace(/\u000A+/g, '\u000D');
// 			str = str.replace(/<[^img][^>]+>/g, ''); // 去掉所有的html标记
// 			str = str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(
// 				/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g,
// 				' ');
// 			if('\u000D' === str) {
// 				str = '';
// 			}
// 			return str;
// 		},
// 		Do_login: function(val,callback) {
// 			this.getSig(val,'',callback);
// 		},
// 		DO_logout: function() {
// 			RL_YTX.logout(function(e){
// 				console.log('logout');
// 			},function(err){
// 				console.log(err);
// 			})
// 		},
// 		getSig: function(account_number, pwd,callback) {
// 			let pass = pwd ? pwd : "";
// 			var timestamp = this.getTimeStamp();
// 			if(IM.flag) {
// 				this.privateLogin(account_number, timestamp, function(obj) {
// 					IM.EV_login(account_number, pass, obj.sig, timestamp,callback);
// 				}, function(obj) {
// 					alert("错误码：" + obj.code + "; 错误描述：" + obj.msg);
// 				});
// 			} else {
// 				//仅用于本地测试，官方不推荐这种方式应用在生产环境
// 				//没有服务器获取sig值时，可以使用如下代码获取sig
// 				var sig = hex_md5(this._appid + account_number + timestamp + this._appToken);
// 				console.log("本地计算sig：" + sig);
// 				this.EV_login(account_number, pass, sig, timestamp,callback);
// 			};
// 		},
// 		privateLogin: function(user_account, timestamp, callback, onError) {
// 			console.log("privateLogin");
// 			var data = {
// 				"appid": this._appid,
// 				"username": user_account,
// 				"timestamp": timestamp
// 			};
// 			var url = this._3rdServer + 'genSig';
// 			$.ajax({
// 				type: "POST",
// 				url: url,
// 				dataType: 'jsonp',
// 				data: data,
// 				contentType: "application/x-www-form-urlencoded",
// 				jsonp: 'cb',
// 				success: function(result) {
// 					if(result.code != '000000') {
// 						var resp = {};
// 						resp.code = result.code;
// 						resp.msg = "Get SIG fail from 3rd server!...";
// 						onError(resp);
// 						return;
// 					} else {
// 						var resp = {};
// 						resp.code = result.code;
// 						resp.sig = result.sig;
// 						callback(resp);
// 						return;
// 					}
// 				},
// 				error: function(e) {
// 					var resp = {};
// 					console.log(e);
// 					resp.msg = 'Get SIG fail from 3rd server!';
// 					onError(resp);
// 				},
// 				timeout: 5000
// 			});
// 		},
// 		getTimeStamp: function() {
// 			var now = new Date();
// 			var timestamp = now.getFullYear() + '' + ((now.getMonth() + 1) >= 10 ? "" + (now.getMonth() + 1) : "0" + (now.getMonth() + 1)) + (now.getDate() >= 10 ? now.getDate() : "0" + now.getDate()) + (now.getHours() >= 10 ? now.getHours() : "0" + now.getHours()) + (now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes()) + (now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds());
// 			return timestamp;
// 		},
// 		EV_login: function(user_account, pwd, sig, timestamp,callback) {
// 			console.log("EV_login");
// 			var loginBuilder = new RL_YTX.LoginBuilder();
// 			loginBuilder.setType(this.login_type);
// 			loginBuilder.setUserName(user_account);
// 			if(1 == this.login_type) { //1是自定义账号，2是voip账号
// 				loginBuilder.setSig(sig);
// 			} else {
// 				loginBuilder.setPwd(pwd);
// 			};
// 			loginBuilder.setTimestamp(timestamp);
// //			RL_YTX.setPcLogin();
// 			var _callback = callback
			
// 			RL_YTX.login(loginBuilder, function(obj) {
// 				if(_callback && typeof _callback === "function"){
//                     _callback();
// 				}
// 				IM.user_account = user_account;
// 				IM.is_online = true;
// 				console.log("EV_login succ...");
// 				// 注册PUSH监听
// 				RL_YTX.onMsgReceiveListener(
// 					function(obj) {
// 						IM.EV_onMsgReceiveListener(obj);
// 					});
// 				RL_YTX.onCharRoomEventLinstener(function (obj) {
// 					IM.EV_onChatRoomEventLinster(obj);
//                 });

// 				// 服务器连接状态变更时的监听
// 				IM._onConnectStateChangeLisenter = RL_YTX.onConnectStateChangeLisenter(function(obj) {
// 					// obj.code;//变更状态 1 断开连接 2 重练中 3 重练成功 4 被踢下线 5 断开连接，需重新登录
// 					// 断线需要人工重连
// 					if(1 == obj.code) {
// 						console.log('onConnectStateChangeLisenter obj.code:' + obj.msg);
// 					} else if(2 == obj.code) {
// 						console.log('网络状况不佳，正在试图重连服务器');
// 						$("#pop_videoView").hide();
// 					} else if(3 == obj.code) {
// 						console.log('连接成功');
// 					} else if(4 == obj.code) {
// 						IM.DO_logout();
// 						console.log(obj.msg);
// 					} else if(5 == obj.code) {
// 						console.log('网络状况不佳，正在试图重连服务器');
// 						IM.getSig(IM.user_account);
// 					} else {
// 						console.log('onConnectStateChangeLisenter obj.code:' + obj.msg);
// 					}
// 				});
// 			}, function(obj) {
// 				console.log("错误码： " + obj.code + "; 错误描述：" + obj.msg);
// 			});
// 		},

// 		EV_onMsgReceiveListener: function(obj) {
// 			console.log('EV_onMsgReceiveListener  :Receive message');
// 			console.log(obj);
// 			let roles = {1:'<i class="c_red">主播</i>',2:'<i class="c_green">管理员</i>',3:'<i class="c_normal">路人甲</i>'};
// 			if(obj.msgType === 1){
//                 IM.addMsgToChatWindow(2,obj.senderNickName?obj.senderNickName:obj.msgSender,obj.msgContent,obj.msgSender);
// 			}
// 		},
//         // EV_onChatRoomEventLinster:function (obj) {
//         //     let roles = {1:'<i class="c_red">主播</i>',2:'<i class="c_green">管理员</i>',3:'<i class="c_normal">路人甲</i>'};
//         //     if(obj.type === 1){//有用户加入
// 		// 		console.log("有用户加入");
//         //         let role = roles[obj.role?obj.role:3];
//         //         let nickName = '['+ role +']' + obj.nickName;
//         //         IM.addMsgToChatWindow(0,nickName,'加入房间');
//         //         let arr =[];
//         //         let ins = {
//         //             userId:obj.member,
//         //             infoExt:'',
//         //             enterTime:obj.msgDateCreated,
//         //             nickName : obj.nickName,
//         //             type:obj.role
//         //         };
//         //         arr[0] = ins;
//         //         IM.addToOnlineList(arr);
//         //     }else if(obj.type === 2){//修改聊天室通知
// 		// 		console.log(2);
//         //     }else if(obj.type === 3){//设置角色通知
// 		// 		if(obj.role === 2){
//         //             console.log(obj.member + "成为管理员");
//         //             $('[data-userid="'+ obj.member +'"]').find("i").html("管理员")
//         //         }else{
//         //             console.log(obj.member + "被取消管理员");
//         //             $('[data-userid="'+ obj.member +'"]').find("i").html("路人甲")
// 		// 		}
//         //     }else if(obj.type === 4){//有用户被踢出
//         //         let role = roles[obj.role];
//         //         let nickName = '['+ role +']'+obj.nickName ;
//         //         IM.addMsgToChatWindow(0,nickName,'被踢出房间');
//         //         $('[data-userid="'+ obj.member +'"]').remove();
// 		// 		if(obj.member == IM.user_account){
// 		// 			alert("您已被飞出房间");
// 		// 		}
//         //     }else if(obj.type === 5){//有用户退出
//         //         let role = roles[obj.role];
//         //         let nickName = '['+ role +']' + obj.nickName;
//         //         IM.addMsgToChatWindow(0,nickName,'离开房间');
//         //         $('[data-userid="'+ obj.member +'"]').remove();
//         //     }else if(obj.type === 6 ){// 全员禁言
// 		// 		console.log(6)
// 		// 	}else if(obj.type === 7){//聊天室全员取消禁言
// 		// 		console.log(7)
// 		// 	}else if(obj.type === 8){//单人禁言
// 		// 		console.log(obj.member + "被禁言");
// 		// 		if(obj.member === IM.user_account){
// 		// 			$('[data-input="msgcontent"]').attr("contenteditable","false");
// 		// 		}
// 		// 	}else if(obj.type === 9){//成员取消禁言

// 		// 	}else if(obj.type === 10){//拉入黑名单
// 		// 		if(obj.member === IM.user_account){
// 		// 			alert("您已被加入黑名单")
// 		// 		}
// 		// 	}else if (obj.type === 11){//成员取消拉黑

// 		// 	}else if(obj.type === 12){//聊天室关闭

// 		// 	}else if(obj.type === 14){//修改聊天室信息
//         //         if(obj.member === IM.user_account){
//         //             alert("您已被加入黑名单")
//         //         }
//         //     }
//         // },

// 		/*
// 		 * @param noticeMsg  消息提示的内容
// 		 * @param autoDismiss  是否鼠标滑过删除此条消息
// 		 * @param groupId  群组ID
// 		 * @param invitor  邀请者
// 		 * @param name  群组名称
// 		 * */
// 		_onConnectStateChangeLisenter: function(obj) {
// 			console.log("_onConnectStateChangeLisenter");
// 		},

//         addMsgToChatWindow:function (level,name,content,userid) {
// 			if(level === 0){
//                 var html = `<li><span>`+ name +`</span> &nbsp;<b>`+ content+`</b> </li>`;
// 			}else{
//                 var html = `<li data-userid="`+ userid +`"><i class="icon icon_level level_` + level + `"></i><span data-sendername="` + name + `">`+ name +`</span>: <b>`+ content +`</b> </li>`;
//             }
//             IM.chatwindow.append(html);
//             IM.chatwindow.scrollTop(IM.chatwindow[0].scrollHeight);
//         },


		

// 	};
// 	window.IM = new YTX();
// 	IM.init();
// })(jQuery);
