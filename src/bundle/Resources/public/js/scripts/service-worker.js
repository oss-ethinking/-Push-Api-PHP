!function(e){var t={}
function n(a){if(t[a])return t[a].exports
var i=t[a]={i:a,l:!1,exports:{}}
return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e
if(4&t&&"object"==typeof e&&e&&e.__esModule)return e
var a=Object.create(null)
if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i))
return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){importScripts("https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js"),importScripts("https://www.gstatic.com/firebasejs/7.8.2/firebase-messaging.js"),firebase.initializeApp({messagingSenderId:config.app.firebase.messageSenderId,projectId:config.app.firebase.projectId,apiKey:config.app.firebase.apiKey,appId:config.app.firebase.appId}),firebase.messaging().setBackgroundMessageHandler((function(e){self.registration.update()
var t=e.data.title,n={body:e.data.message||e.data.body,silent:!0,icon:e.data.icon,data:e.data},a=config.app.client.defaultUrl
try{var i=indexedDB.open(config.app.database.notificationDB,config.app.database.version)
e.data.url&&(a=e.data.url),e.data.title||(t=" ")
var r={date:new Date(Date.now()),text:e.data.message||e.data.body,url:a,title:t}
i.onsuccess=function(){i.result.transaction(config.app.database.notificationTable,"readwrite").objectStore(config.app.database.notificationTable).add(r)},i.onerror=function(e){console.warn("[Service Worker] indexedDB error",e)}}catch(e){console.log("failed",e)}return self.registration.showNotification(t,n)})),self.addEventListener("notificationclick",(function(e){e.stopImmediatePropagation()
var t=e.notification.data
if(t){var n=t.url
e.waitUntil(clients.matchAll({type:"window"}).then((function(e){for(var t=0;t<e.length;t++){if(e[t].url===n)return e[t].focus()}if(clients.openWindow)return clients.openWindow(n)}))),e.notification.close()}})),self.addEventListener("install",(function(){return self.skipWaiting()})),self.addEventListener("activate",(function(e){return e.waitUntil(clients.claim())}))}])
