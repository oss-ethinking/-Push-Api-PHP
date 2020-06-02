/*! For license information please see webpush-development.js.LICENSE.txt */
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t()
else if("function"==typeof define&&define.amd)define([],t)
else{var n=t()
    for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,(function(){return function(e){var t={}
    function n(r){if(t[r])return t[r].exports
        var i=t[r]={i:r,l:!1,exports:{}}
        return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e
        if(4&t&&"object"==typeof e&&e&&e.__esModule)return e
        var r=Object.create(null)
        if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i))
        return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
        return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=15)}([function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var r=t[n]
    r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.exports=function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}},function(e,t,n){!function(e){"use strict"
    function t(e){return Array.prototype.slice.call(e)}function n(e){return new Promise((function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}}))}function r(e,t,r){var i,o=new Promise((function(o,a){n(i=e[t].apply(e,r)).then(o,a)}))
        return o.request=i,o}function i(e,t,n){var i=r(e,t,n)
        return i.then((function(e){if(e)return new l(e,i.request)}))}function o(e,t,n){n.forEach((function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})}))}function a(e,t,n,i){i.forEach((function(i){i in n.prototype&&(e.prototype[i]=function(){return r(this[t],i,arguments)})}))}function s(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})}))}function c(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return i(this[t],r,arguments)})}))}function u(e){this._index=e}function l(e,t){this._cursor=e,this._request=t}function f(e){this._store=e}function d(e){this._tx=e,this.complete=new Promise((function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}}))}function p(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new d(n)}function h(e){this._db=e}o(u,"_index",["name","keyPath","multiEntry","unique"]),a(u,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),c(u,"_index",IDBIndex,["openCursor","openKeyCursor"]),o(l,"_cursor",["direction","key","primaryKey","value"]),a(l,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(e){e in IDBCursor.prototype&&(l.prototype[e]=function(){var t=this,r=arguments
        return Promise.resolve().then((function(){return t._cursor[e].apply(t._cursor,r),n(t._request).then((function(e){if(e)return new l(e,t._request)}))}))})})),f.prototype.createIndex=function(){return new u(this._store.createIndex.apply(this._store,arguments))},f.prototype.index=function(){return new u(this._store.index.apply(this._store,arguments))},o(f,"_store",["name","keyPath","indexNames","autoIncrement"]),a(f,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),c(f,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),s(f,"_store",IDBObjectStore,["deleteIndex"]),d.prototype.objectStore=function(){return new f(this._tx.objectStore.apply(this._tx,arguments))},o(d,"_tx",["objectStoreNames","mode"]),s(d,"_tx",IDBTransaction,["abort"]),p.prototype.createObjectStore=function(){return new f(this._db.createObjectStore.apply(this._db,arguments))},o(p,"_db",["name","version","objectStoreNames"]),s(p,"_db",IDBDatabase,["deleteObjectStore","close"]),h.prototype.transaction=function(){return new d(this._db.transaction.apply(this._db,arguments))},o(h,"_db",["name","version","objectStoreNames"]),s(h,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(e){[f,u].forEach((function(n){e in n.prototype&&(n.prototype[e.replace("open","iterate")]=function(){var n=t(arguments),r=n[n.length-1],i=this._store||this._index,o=i[e].apply(i,n.slice(0,-1))
        o.onsuccess=function(){r(o.result)}})}))})),[u,f].forEach((function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[]
        return new Promise((function(i){n.iterateCursor(e,(function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():i(r)):i(r)}))}))})})),e.openDb=function(e,t,n){var i=r(indexedDB,"open",[e,t]),o=i.request
        return o&&(o.onupgradeneeded=function(e){n&&n(new p(o.result,e.oldVersion,o.transaction))}),i.then((function(e){return new h(e)}))},e.deleteDb=function(e){return r(indexedDB,"deleteDatabase",[e])},Object.defineProperty(e,"__esModule",{value:!0})}(t)},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0})
    var r=n(8),i={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},o=function(e,t){if(!e)throw a(t)},a=function(e){return new Error("Firebase Database ("+i.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)},s=function(e){for(var t=[],n=0,r=0;r<e.length;r++){var i=e.charCodeAt(r)
        i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},c={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray:function(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter")
            this.init_()
            for(var n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[],i=0;i<e.length;i+=3){var o=e[i],a=i+1<e.length,s=a?e[i+1]:0,c=i+2<e.length,u=c?e[i+2]:0,l=o>>2,f=(3&o)<<4|s>>4,d=(15&s)<<2|u>>6,p=63&u
                c||(p=64,a||(d=64)),r.push(n[l],n[f],n[d],n[p])}return r.join("")},encodeString:function(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(s(e),t)},decodeString:function(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){for(var t=[],n=0,r=0;n<e.length;){var i=e[n++]
            if(i<128)t[r++]=String.fromCharCode(i)
            else if(i>191&&i<224){var o=e[n++]
                t[r++]=String.fromCharCode((31&i)<<6|63&o)}else if(i>239&&i<365){var a=((7&i)<<18|(63&(o=e[n++]))<<12|(63&(s=e[n++]))<<6|63&e[n++])-65536
                t[r++]=String.fromCharCode(55296+(a>>10)),t[r++]=String.fromCharCode(56320+(1023&a))}else{o=e[n++]
                var s=e[n++]
                t[r++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&s)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray:function(e,t){this.init_()
            for(var n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[],i=0;i<e.length;){var o=n[e.charAt(i++)],a=i<e.length?n[e.charAt(i)]:0,s=++i<e.length?n[e.charAt(i)]:64,c=++i<e.length?n[e.charAt(i)]:64
                if(++i,null==o||null==a||null==s||null==c)throw Error()
                var u=o<<2|a>>4
                if(r.push(u),64!==s){var l=a<<4&240|s>>2
                    if(r.push(l),64!==c){var f=s<<6&192|c
                        r.push(f)}}}return r},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={}
            for(var e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},u=function(e){try{return c.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null}
    function l(e,t){if(!(t instanceof Object))return t
        switch(t.constructor){case Date:return new Date(t.getTime())
            case Object:void 0===e&&(e={})
                break
            case Array:e=[]
                break
            default:return t}for(var n in t)t.hasOwnProperty(n)&&(e[n]=l(e[n],t[n]))
        return e}var f=function(){function e(){var e=this
        this.reject=function(){},this.resolve=function(){},this.promise=new Promise((function(t,n){e.resolve=t,e.reject=n}))}return e.prototype.wrapCallback=function(e){var t=this
        return function(n,r){n?t.reject(n):t.resolve(r),"function"==typeof e&&(t.promise.catch((function(){})),1===e.length?e(n):e(n,r))}},e}()
    function d(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}var p=function(e){function t(n,r){var i=e.call(this,r)||this
        return i.code=n,i.name="FirebaseError",Object.setPrototypeOf(i,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(i,h.prototype.create),i}return r.__extends(t,e),t}(Error),h=function(){function e(e,t,n){this.service=e,this.serviceName=t,this.errors=n}return e.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n]
        for(var r=t[0]||{},i=this.service+"/"+e,o=this.errors[e],a=o?v(o,r):"Error",s=this.serviceName+": "+a+" ("+i+").",c=new p(i,s),u=0,l=Object.keys(r);u<l.length;u++){var f=l[u]
            "_"!==f.slice(-1)&&(f in c&&console.warn('Overwriting FirebaseError base field "'+f+'" can cause unexpected behavior.'),c[f]=r[f])}return c},e}()
    function v(e,t){return e.replace(g,(function(e,n){var r=t[n]
        return null!=r?r.toString():"<"+n+"?>"}))}var g=/\{\$([^}]+)}/g
    function b(e){return JSON.parse(e)}var y=function(e){var t={},n={},r={},i=""
        try{var o=e.split(".")
            t=b(u(o[0])||""),n=b(u(o[1])||""),i=o[2],r=n.d||{},delete n.d}catch(e){}return{header:t,claims:n,data:r,signature:i}}
    var m=function(){function e(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128
        for(var e=1;e<this.blockSize;++e)this.pad_[e]=0
        this.reset()}return e.prototype.reset=function(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0},e.prototype.compress_=function(e,t){t||(t=0)
        var n=this.W_
        if("string"==typeof e)for(var r=0;r<16;r++)n[r]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4
        else for(r=0;r<16;r++)n[r]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4
        for(r=16;r<80;r++){var i=n[r-3]^n[r-8]^n[r-14]^n[r-16]
            n[r]=4294967295&(i<<1|i>>>31)}var o,a,s=this.chain_[0],c=this.chain_[1],u=this.chain_[2],l=this.chain_[3],f=this.chain_[4]
        for(r=0;r<80;r++){r<40?r<20?(o=l^c&(u^l),a=1518500249):(o=c^u^l,a=1859775393):r<60?(o=c&u|l&(c|u),a=2400959708):(o=c^u^l,a=3395469782)
            i=(s<<5|s>>>27)+o+f+a+n[r]&4294967295
            f=l,l=u,u=4294967295&(c<<30|c>>>2),c=s,s=i}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+c&4294967295,this.chain_[2]=this.chain_[2]+u&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+f&4294967295},e.prototype.update=function(e,t){if(null!=e){void 0===t&&(t=e.length)
        for(var n=t-this.blockSize,r=0,i=this.buf_,o=this.inbuf_;r<t;){if(0===o)for(;r<=n;)this.compress_(e,r),r+=this.blockSize
            if("string"==typeof e){for(;r<t;)if(i[o]=e.charCodeAt(r),++r,++o===this.blockSize){this.compress_(i),o=0
                break}}else for(;r<t;)if(i[o]=e[r],++r,++o===this.blockSize){this.compress_(i),o=0
                break}}this.inbuf_=o,this.total_+=t}},e.prototype.digest=function(){var e=[],t=8*this.total_
        this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56))
        for(var n=this.blockSize-1;n>=56;n--)this.buf_[n]=255&t,t/=256
        this.compress_(this.buf_)
        var r=0
        for(n=0;n<5;n++)for(var i=24;i>=0;i-=8)e[r]=this.chain_[n]>>i&255,++r
        return e},e}()
    var _=function(){function e(e,t){var n=this
        this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((function(){e(n)})).catch((function(e){n.error(e)}))}return e.prototype.next=function(e){this.forEachObserver((function(t){t.next(e)}))},e.prototype.error=function(e){this.forEachObserver((function(t){t.error(e)})),this.close(e)},e.prototype.complete=function(){this.forEachObserver((function(e){e.complete()})),this.close()},e.prototype.subscribe=function(e,t,n){var r,i=this
        if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.")
        void 0===(r=function(e,t){if("object"!=typeof e||null===e)return!1
            for(var n=0,r=t;n<r.length;n++){var i=r[n]
                if(i in e&&"function"==typeof e[i])return!0}return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n}).next&&(r.next=w),void 0===r.error&&(r.error=w),void 0===r.complete&&(r.complete=w)
        var o=this.unsubscribeOne.bind(this,this.observers.length)
        return this.finalized&&this.task.then((function(){try{i.finalError?r.error(i.finalError):r.complete()}catch(e){}})),this.observers.push(r),o},e.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},e.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},e.prototype.sendOne=function(e,t){var n=this
        this.task.then((function(){if(void 0!==n.observers&&void 0!==n.observers[e])try{t(n.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}}))},e.prototype.close=function(e){var t=this
        this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((function(){t.observers=void 0,t.onNoObservers=void 0})))},e}()
    function w(){}function S(e,t,n){var r=""
        switch(t){case 1:r=n?"first":"First"
            break
            case 2:r=n?"second":"Second"
                break
            case 3:r=n?"third":"Third"
                break
            case 4:r=n?"fourth":"Fourth"
                break
            default:throw new Error("errorPrefix called with argumentNumber > 4.  Need to update it?")}var i=e+" failed: "
        return i+=r+" argument "}t.CONSTANTS=i,t.Deferred=f,t.ErrorFactory=h,t.FirebaseError=p,t.Sha1=m,t.assert=o,t.assertionError=a,t.async=function(e,t){return function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r]
        Promise.resolve(!0).then((function(){e.apply(void 0,n)})).catch((function(e){t&&t(e)}))}},t.base64=c,t.base64Decode=u,t.base64Encode=function(e){var t=s(e)
        return c.encodeByteArray(t,!0)},t.contains=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.createSubscribe=function(e,t){var n=new _(e,t)
        return n.subscribe.bind(n)},t.decode=y,t.deepCopy=function(e){return l(void 0,e)},t.deepExtend=l,t.errorPrefix=S,t.getUA=d,t.isAdmin=function(e){var t=y(e).claims
        return"object"==typeof t&&!0===t.admin},t.isBrowser=function(){return"object"==typeof self&&self.self===self},t.isBrowserExtension=function(){var e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0
        return"object"==typeof e&&void 0!==e.id},t.isElectron=function(){return d().indexOf("Electron/")>=0},t.isEmpty=function(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1
        return!0},t.isIE=function(){var e=d()
        return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0},t.isMobileCordova=function(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(d())},t.isNode=function(){try{return"[object process]"===Object.prototype.toString.call(e.process)}catch(e){return!1}},t.isNodeSdk=function(){return!0===i.NODE_CLIENT||!0===i.NODE_ADMIN},t.isReactNative=function(){return"object"==typeof navigator&&"ReactNative"===navigator.product},t.isUWP=function(){return d().indexOf("MSAppHost/")>=0},t.isValidFormat=function(e){var t=y(e).claims
        return!!t&&"object"==typeof t&&t.hasOwnProperty("iat")},t.isValidTimestamp=function(e){var t=y(e).claims,n=Math.floor((new Date).getTime()/1e3),r=0,i=0
        return"object"==typeof t&&(t.hasOwnProperty("nbf")?r=t.nbf:t.hasOwnProperty("iat")&&(r=t.iat),i=t.hasOwnProperty("exp")?t.exp:r+86400),!!n&&!!r&&!!i&&n>=r&&n<=i},t.issuedAtTime=function(e){var t=y(e).claims
        return"object"==typeof t&&t.hasOwnProperty("iat")?t.iat:null},t.jsonEval=b,t.map=function(e,t,n){var r={}
        for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e))
        return r},t.querystring=function(e){for(var t=[],n=function(e,n){Array.isArray(n)?n.forEach((function(n){t.push(encodeURIComponent(e)+"="+encodeURIComponent(n))})):t.push(encodeURIComponent(e)+"="+encodeURIComponent(n))},r=0,i=Object.entries(e);r<i.length;r++){var o=i[r]
        n(o[0],o[1])}return t.length?"&"+t.join("&"):""},t.querystringDecode=function(e){var t={}
        return e.replace(/^\?/,"").split("&").forEach((function(e){if(e){var n=e.split("=")
            t[n[0]]=n[1]}})),t},t.safeGet=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0},t.stringLength=function(e){for(var t=0,n=0;n<e.length;n++){var r=e.charCodeAt(n)
        r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t},t.stringToByteArray=function(e){for(var t=[],n=0,r=0;r<e.length;r++){var i=e.charCodeAt(r)
        if(i>=55296&&i<=56319){var a=i-55296
            r++,o(r<e.length,"Surrogate pair missing trail surrogate."),i=65536+(a<<10)+(e.charCodeAt(r)-56320)}i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):i<65536?(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},t.stringify=function(e){return JSON.stringify(e)},t.validateArgCount=function(e,t,n,r){var i
        if(r<t?i="at least "+t:r>n&&(i=0===n?"none":"no more than "+n),i)throw new Error(e+" failed: Was called with "+r+(1===r?" argument.":" arguments.")+" Expects "+i+".")},t.validateCallback=function(e,t,n,r){if((!r||n)&&"function"!=typeof n)throw new Error(S(e,t,r)+"must be a valid function.")},t.validateContextObject=function(e,t,n,r){if((!r||n)&&("object"!=typeof n||null===n))throw new Error(S(e,t,r)+"must be a valid context object.")},t.validateNamespace=function(e,t,n,r){if((!r||n)&&"string"!=typeof n)throw new Error(S(e,t,r)+"must be a valid firebase namespace.")}}).call(this,n(7))},function(e,t,n){"use strict"
    Object.defineProperty(t,"__esModule",{value:!0})
    var r,i,o=n(6),a=n(3),s=n(5),c=n(10),u=((r={})["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",r["bad-app-name"]="Illegal App name: '{$appName}",r["duplicate-app"]="Firebase App named '{$appName}' already exists",r["app-deleted"]="Firebase App named '{$appName}' already deleted",r["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",r),l=new a.ErrorFactory("app","Firebase",u),f="@firebase/app",d=((i={})[f]="fire-core",i["@firebase/analytics"]="fire-analytics",i["@firebase/auth"]="fire-auth",i["@firebase/database"]="fire-rtdb",i["@firebase/functions"]="fire-fn",i["@firebase/installations"]="fire-iid",i["@firebase/messaging"]="fire-fcm",i["@firebase/performance"]="fire-perf",i["@firebase/remote-config"]="fire-rc",i["@firebase/storage"]="fire-gcs",i["@firebase/firestore"]="fire-fst",i["fire-js"]="fire-js",i["firebase-wrapper"]="fire-js-all",i),p=new c.Logger("@firebase/app"),h=function(){function e(e,t,n){var r,i,c=this
        this.firebase_=n,this.isDeleted_=!1,this.name_=t.name,this.automaticDataCollectionEnabled_=t.automaticDataCollectionEnabled||!1,this.options_=a.deepCopy(e),this.container=new s.ComponentContainer(t.name),this._addComponent(new s.Component("app",(function(){return c}),"PUBLIC"))
        try{for(var u=o.__values(this.firebase_.INTERNAL.components.values()),l=u.next();!l.done;l=u.next()){var f=l.value
            this._addComponent(f)}}catch(e){r={error:e}}finally{try{l&&!l.done&&(i=u.return)&&i.call(u)}finally{if(r)throw r.error}}}return Object.defineProperty(e.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed_(),this.automaticDataCollectionEnabled_},set:function(e){this.checkDestroyed_(),this.automaticDataCollectionEnabled_=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this.checkDestroyed_(),this.name_},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"options",{get:function(){return this.checkDestroyed_(),this.options_},enumerable:!0,configurable:!0}),e.prototype.delete=function(){var e=this
        return new Promise((function(t){e.checkDestroyed_(),t()})).then((function(){return e.firebase_.INTERNAL.removeApp(e.name_),Promise.all(e.container.getProviders().map((function(e){return e.delete()})))})).then((function(){e.isDeleted_=!0}))},e.prototype._getService=function(e,t){return void 0===t&&(t="[DEFAULT]"),this.checkDestroyed_(),this.container.getProvider(e).getImmediate({identifier:t})},e.prototype._removeServiceInstance=function(e,t){void 0===t&&(t="[DEFAULT]"),this.container.getProvider(e).clearInstance(t)},e.prototype._addComponent=function(e){try{this.container.addComponent(e)}catch(t){p.debug("Component "+e.name+" failed to register with FirebaseApp "+this.name,t)}},e.prototype._addOrOverwriteComponent=function(e){this.container.addOrOverwriteComponent(e)},e.prototype.checkDestroyed_=function(){if(this.isDeleted_)throw l.create("app-deleted",{appName:this.name_})},e}()
    h.prototype.name&&h.prototype.options||h.prototype.delete||console.log("dc")
    var v=function e(){var t=function(e){var t={},n=new Map,r={__esModule:!0,initializeApp:function(n,i){void 0===i&&(i={})
            if("object"!=typeof i||null===i){i={name:i}}var o=i
            void 0===o.name&&(o.name="[DEFAULT]")
            var s=o.name
            if("string"!=typeof s||!s)throw l.create("bad-app-name",{appName:String(s)})
            if(a.contains(t,s))throw l.create("duplicate-app",{appName:s})
            var c=new e(n,o,r)
            return t[s]=c,c},app:i,registerVersion:function(e,t,n){var r,i=null!==(r=d[e])&&void 0!==r?r:e
            n&&(i+="-"+n)
            var o=i.match(/\s|\//),a=t.match(/\s|\//)
            if(o||a){var u=['Unable to register library "'+i+'" with version "'+t+'":']
                return o&&u.push('library name "'+i+'" contains illegal characters (whitespace or "/")'),o&&a&&u.push("and"),a&&u.push('version name "'+t+'" contains illegal characters (whitespace or "/")'),void p.warn(u.join(" "))}c(new s.Component(i+"-version",(function(){return{library:i,version:t}}),"VERSION"))},apps:null,SDK_VERSION:"7.8.1",INTERNAL:{registerComponent:c,removeApp:function(e){delete t[e]},components:n,useAsService:function(e,t){if("serverAuth"===t)return null
                return t}}}
        function i(e){if(e=e||"[DEFAULT]",!a.contains(t,e))throw l.create("no-app",{appName:e})
            return t[e]}function c(s){var c,u,f=s.name
            if(n.has(f))return p.debug("There were multiple attempts to register component "+f+"."),"PUBLIC"===s.type?r[f]:null
            if(n.set(f,s),"PUBLIC"===s.type){var d=function(e){if(void 0===e&&(e=i()),"function"!=typeof e[f])throw l.create("invalid-app-argument",{appName:f})
                return e[f]()}
                void 0!==s.serviceProps&&a.deepExtend(d,s.serviceProps),r[f]=d,e.prototype[f]=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
                    var n=this._getService.bind(this,f)
                    return n.apply(this,s.multipleInstances?e:[])}}try{for(var h=o.__values(Object.keys(t)),v=h.next();!v.done;v=h.next()){var g=v.value
                t[g]._addComponent(s)}}catch(e){c={error:e}}finally{try{v&&!v.done&&(u=h.return)&&u.call(h)}finally{if(c)throw c.error}}return"PUBLIC"===s.type?r[f]:null}return(r.default=r,Object.defineProperty(r,"apps",{get:function(){return Object.keys(t).map((function(e){return t[e]}))}}),i.App=e,r)}(h)
        return t.INTERNAL=o.__assign(o.__assign({},t.INTERNAL),{createFirebaseNamespace:e,extendNamespace:function(e){a.deepExtend(t,e)},createSubscribe:a.createSubscribe,ErrorFactory:a.ErrorFactory,deepExtend:a.deepExtend}),t}(),g=function(){function e(e){this.container=e}return e.prototype.getPlatformInfoString=function(){return this.container.getProviders().map((function(e){if(function(e){var t,n=e.getComponent()
        return"VERSION"===(null===(t=n)||void 0===t?void 0:t.type)}(e)){var t=e.getImmediate()
        return t.library+"/"+t.version}return null})).filter((function(e){return e})).join(" ")},e}()
    if(a.isBrowser()&&void 0!==self.firebase){p.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ")
        var b=self.firebase.SDK_VERSION
        b&&b.indexOf("LITE")>=0&&p.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}var y=v.initializeApp
    v.initializeApp=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
        return a.isNode()&&p.warn('\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      '),y.apply(void 0,e)}
    var m=v
    !function(e,t){e.INTERNAL.registerComponent(new s.Component("platform-logger",(function(e){return new g(e)}),"PRIVATE")),e.registerVersion(f,"0.5.4",t),e.registerVersion("fire-js","")}(m),t.default=m,t.firebase=m},function(e,t,n){"use strict"
    Object.defineProperty(t,"__esModule",{value:!0})
    var r=n(9),i=n(3),o=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e}(),a=function(){function e(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map}return e.prototype.get=function(e){void 0===e&&(e="[DEFAULT]")
        var t=this.normalizeInstanceIdentifier(e)
        if(!this.instancesDeferred.has(t)){var n=new i.Deferred
            this.instancesDeferred.set(t,n)
            try{var r=this.getOrInitializeService(t)
                r&&n.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise},e.prototype.getImmediate=function(e){var t=r.__assign({identifier:"[DEFAULT]",optional:!1},e),n=t.identifier,i=t.optional,o=this.normalizeInstanceIdentifier(n)
        try{var a=this.getOrInitializeService(o)
            if(!a){if(i)return null
                throw Error("Service "+this.name+" is not available")}return a}catch(e){if(i)return null
            throw e}},e.prototype.getComponent=function(){return this.component},e.prototype.setComponent=function(e){var t,n
        if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".")
        if(this.component)throw Error("Component for "+this.name+" has already been provided")
        if(this.component=e,function(e){return"EAGER"===e.instantiationMode}(e))try{this.getOrInitializeService("[DEFAULT]")}catch(e){}try{for(var i=r.__values(this.instancesDeferred.entries()),o=i.next();!o.done;o=i.next()){var a=r.__read(o.value,2),s=a[0],c=a[1],u=this.normalizeInstanceIdentifier(s)
            try{var l=this.getOrInitializeService(u)
                c.resolve(l)}catch(e){}}}catch(e){t={error:e}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}},e.prototype.clearInstance=function(e){void 0===e&&(e="[DEFAULT]"),this.instancesDeferred.delete(e),this.instances.delete(e)},e.prototype.delete=function(){return r.__awaiter(this,void 0,void 0,(function(){var e
        return r.__generator(this,(function(t){switch(t.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(e.filter((function(e){return"INTERNAL"in e})).map((function(e){return e.INTERNAL.delete()})))]
            case 1:return t.sent(),[2]}}))}))},e.prototype.isComponentSet=function(){return null!=this.component},e.prototype.getOrInitializeService=function(e){var t=this.instances.get(e)
        return!t&&this.component&&(t=this.component.instanceFactory(this.container,function(e){return"[DEFAULT]"===e?void 0:e}(e)),this.instances.set(e,t)),t||null},e.prototype.normalizeInstanceIdentifier=function(e){return this.component?this.component.multipleInstances?e:"[DEFAULT]":e},e}()
    var s=function(){function e(e){this.name=e,this.providers=new Map}return e.prototype.addComponent=function(e){var t=this.getProvider(e.name)
        if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name)
        t.setComponent(e)},e.prototype.addOrOverwriteComponent=function(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},e.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e)
        var t=new a(e,this)
        return this.providers.set(e,t),t},e.prototype.getProviders=function(){return Array.from(this.providers.values())},e}()
    t.Component=o,t.ComponentContainer=s,t.Provider=a},function(e,t,n){"use strict"
    n.r(t),n.d(t,"__extends",(function(){return i})),n.d(t,"__assign",(function(){return o})),n.d(t,"__rest",(function(){return a})),n.d(t,"__decorate",(function(){return s})),n.d(t,"__param",(function(){return c})),n.d(t,"__metadata",(function(){return u})),n.d(t,"__awaiter",(function(){return l})),n.d(t,"__generator",(function(){return f})),n.d(t,"__exportStar",(function(){return d})),n.d(t,"__values",(function(){return p})),n.d(t,"__read",(function(){return h})),n.d(t,"__spread",(function(){return v})),n.d(t,"__spreadArrays",(function(){return g})),n.d(t,"__await",(function(){return b})),n.d(t,"__asyncGenerator",(function(){return y})),n.d(t,"__asyncDelegator",(function(){return m})),n.d(t,"__asyncValues",(function(){return _})),n.d(t,"__makeTemplateObject",(function(){return w})),n.d(t,"__importStar",(function(){return S})),n.d(t,"__importDefault",(function(){return x}))
    var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)}
    function i(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var o=function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])
        return e}).apply(this,arguments)}
    function a(e,t){var n={}
        for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r])
        if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0
            for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}function s(e,t,n,r){var i,o=arguments.length,a=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
        if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
        else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,n,a):i(t,n))||a)
        return o>3&&a&&Object.defineProperty(t,n,a),a}function c(e,t){return function(n,r){t(n,r,e)}}function u(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function l(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){e.done?i(e.value):new n((function(t){t(e.value)})).then(a,s)}c((r=r.apply(e,t||[])).next())}))}function f(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1]
            return i[1]},trys:[],ops:[]}
        return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o
        function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.")
            for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i
                switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o
                    break
                    case 4:return a.label++,{value:o[1],done:!1}
                    case 5:a.label++,r=o[1],o=[0]
                        continue
                    case 7:o=a.ops.pop(),a.trys.pop()
                        continue
                    default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0
                        continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1]
                        break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o
                        break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o)
                        break}i[2]&&a.ops.pop(),a.trys.pop()
                        continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1]
            return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function d(e,t){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}function p(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0
        return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}function h(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator]
        if(!n)return e
        var r,i,o=n.call(e),a=[]
        try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}function v(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(h(arguments[t]))
        return e}function g(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length
        var r=Array(e),i=0
        for(t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)r[i]=o[a]
        return r}function b(e){return this instanceof b?(this.v=e,this):new b(e)}function y(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.")
        var r,i=n.apply(e,t||[]),o=[]
        return r={},a("next"),a("throw"),a("return"),r[Symbol.asyncIterator]=function(){return this},r
        function a(e){i[e]&&(r[e]=function(t){return new Promise((function(n,r){o.push([e,t,n,r])>1||s(e,t)}))})}function s(e,t){try{(n=i[e](t)).value instanceof b?Promise.resolve(n.value.v).then(c,u):l(o[0][2],n)}catch(e){l(o[0][3],e)}var n}function c(e){s("next",e)}function u(e){s("throw",e)}function l(e,t){e(t),o.shift(),o.length&&s(o[0][0],o[0][1])}}function m(e){var t,n
        return t={},r("next"),r("throw",(function(e){throw e})),r("return"),t[Symbol.iterator]=function(){return this},t
        function r(r,i){t[r]=e[r]?function(t){return(n=!n)?{value:b(e[r](t)),done:"return"===r}:i?i(t):t}:i}}function _(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.")
        var t,n=e[Symbol.asyncIterator]
        return n?n.call(e):(e=p(e),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t)
        function r(n){t[n]=e[n]&&function(t){return new Promise((function(r,i){(function(e,t,n,r){Promise.resolve(r).then((function(t){e({value:t,done:n})}),t)})(r,i,(t=e[n](t)).done,t.value)}))}}}function w(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}function S(e){if(e&&e.__esModule)return e
        var t={}
        if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n])
        return t.default=e,t}function x(e){return e&&e.__esModule?e:{default:e}}},function(e,t){var n
    n=function(){return this}()
    try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict"
    n.r(t),n.d(t,"__extends",(function(){return i})),n.d(t,"__assign",(function(){return o})),n.d(t,"__rest",(function(){return a})),n.d(t,"__decorate",(function(){return s})),n.d(t,"__param",(function(){return c})),n.d(t,"__metadata",(function(){return u})),n.d(t,"__awaiter",(function(){return l})),n.d(t,"__generator",(function(){return f})),n.d(t,"__exportStar",(function(){return d})),n.d(t,"__values",(function(){return p})),n.d(t,"__read",(function(){return h})),n.d(t,"__spread",(function(){return v})),n.d(t,"__spreadArrays",(function(){return g})),n.d(t,"__await",(function(){return b})),n.d(t,"__asyncGenerator",(function(){return y})),n.d(t,"__asyncDelegator",(function(){return m})),n.d(t,"__asyncValues",(function(){return _})),n.d(t,"__makeTemplateObject",(function(){return w})),n.d(t,"__importStar",(function(){return S})),n.d(t,"__importDefault",(function(){return x}))
    var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)}
    function i(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var o=function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])
        return e}).apply(this,arguments)}
    function a(e,t){var n={}
        for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r])
        if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0
            for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}function s(e,t,n,r){var i,o=arguments.length,a=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
        if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
        else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,n,a):i(t,n))||a)
        return o>3&&a&&Object.defineProperty(t,n,a),a}function c(e,t){return function(n,r){t(n,r,e)}}function u(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function l(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){e.done?i(e.value):new n((function(t){t(e.value)})).then(a,s)}c((r=r.apply(e,t||[])).next())}))}function f(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1]
            return i[1]},trys:[],ops:[]}
        return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o
        function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.")
            for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i
                switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o
                    break
                    case 4:return a.label++,{value:o[1],done:!1}
                    case 5:a.label++,r=o[1],o=[0]
                        continue
                    case 7:o=a.ops.pop(),a.trys.pop()
                        continue
                    default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0
                        continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1]
                        break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o
                        break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o)
                        break}i[2]&&a.ops.pop(),a.trys.pop()
                        continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1]
            return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function d(e,t){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}function p(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0
        return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}function h(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator]
        if(!n)return e
        var r,i,o=n.call(e),a=[]
        try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}function v(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(h(arguments[t]))
        return e}function g(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length
        var r=Array(e),i=0
        for(t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)r[i]=o[a]
        return r}function b(e){return this instanceof b?(this.v=e,this):new b(e)}function y(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.")
        var r,i=n.apply(e,t||[]),o=[]
        return r={},a("next"),a("throw"),a("return"),r[Symbol.asyncIterator]=function(){return this},r
        function a(e){i[e]&&(r[e]=function(t){return new Promise((function(n,r){o.push([e,t,n,r])>1||s(e,t)}))})}function s(e,t){try{(n=i[e](t)).value instanceof b?Promise.resolve(n.value.v).then(c,u):l(o[0][2],n)}catch(e){l(o[0][3],e)}var n}function c(e){s("next",e)}function u(e){s("throw",e)}function l(e,t){e(t),o.shift(),o.length&&s(o[0][0],o[0][1])}}function m(e){var t,n
        return t={},r("next"),r("throw",(function(e){throw e})),r("return"),t[Symbol.iterator]=function(){return this},t
        function r(r,i){t[r]=e[r]?function(t){return(n=!n)?{value:b(e[r](t)),done:"return"===r}:i?i(t):t}:i}}function _(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.")
        var t,n=e[Symbol.asyncIterator]
        return n?n.call(e):(e=p(e),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t)
        function r(n){t[n]=e[n]&&function(t){return new Promise((function(r,i){(function(e,t,n,r){Promise.resolve(r).then((function(t){e({value:t,done:n})}),t)})(r,i,(t=e[n](t)).done,t.value)}))}}}function w(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}function S(e){if(e&&e.__esModule)return e
        var t={}
        if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n])
        return t.default=e,t}function x(e){return e&&e.__esModule?e:{default:e}}},function(e,t,n){"use strict"
    n.r(t),n.d(t,"__extends",(function(){return i})),n.d(t,"__assign",(function(){return o})),n.d(t,"__rest",(function(){return a})),n.d(t,"__decorate",(function(){return s})),n.d(t,"__param",(function(){return c})),n.d(t,"__metadata",(function(){return u})),n.d(t,"__awaiter",(function(){return l})),n.d(t,"__generator",(function(){return f})),n.d(t,"__exportStar",(function(){return d})),n.d(t,"__values",(function(){return p})),n.d(t,"__read",(function(){return h})),n.d(t,"__spread",(function(){return v})),n.d(t,"__spreadArrays",(function(){return g})),n.d(t,"__await",(function(){return b})),n.d(t,"__asyncGenerator",(function(){return y})),n.d(t,"__asyncDelegator",(function(){return m})),n.d(t,"__asyncValues",(function(){return _})),n.d(t,"__makeTemplateObject",(function(){return w})),n.d(t,"__importStar",(function(){return S})),n.d(t,"__importDefault",(function(){return x}))
    var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)}
    function i(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var o=function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])
        return e}).apply(this,arguments)}
    function a(e,t){var n={}
        for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r])
        if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0
            for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}function s(e,t,n,r){var i,o=arguments.length,a=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
        if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
        else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(o<3?i(a):o>3?i(t,n,a):i(t,n))||a)
        return o>3&&a&&Object.defineProperty(t,n,a),a}function c(e,t){return function(n,r){t(n,r,e)}}function u(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function l(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){e.done?i(e.value):new n((function(t){t(e.value)})).then(a,s)}c((r=r.apply(e,t||[])).next())}))}function f(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1]
            return i[1]},trys:[],ops:[]}
        return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o
        function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.")
            for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i
                switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o
                    break
                    case 4:return a.label++,{value:o[1],done:!1}
                    case 5:a.label++,r=o[1],o=[0]
                        continue
                    case 7:o=a.ops.pop(),a.trys.pop()
                        continue
                    default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0
                        continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1]
                        break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o
                        break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o)
                        break}i[2]&&a.ops.pop(),a.trys.pop()
                        continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1]
            return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function d(e,t){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}function p(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0
        return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}function h(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator]
        if(!n)return e
        var r,i,o=n.call(e),a=[]
        try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}function v(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(h(arguments[t]))
        return e}function g(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length
        var r=Array(e),i=0
        for(t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)r[i]=o[a]
        return r}function b(e){return this instanceof b?(this.v=e,this):new b(e)}function y(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.")
        var r,i=n.apply(e,t||[]),o=[]
        return r={},a("next"),a("throw"),a("return"),r[Symbol.asyncIterator]=function(){return this},r
        function a(e){i[e]&&(r[e]=function(t){return new Promise((function(n,r){o.push([e,t,n,r])>1||s(e,t)}))})}function s(e,t){try{(n=i[e](t)).value instanceof b?Promise.resolve(n.value.v).then(c,u):l(o[0][2],n)}catch(e){l(o[0][3],e)}var n}function c(e){s("next",e)}function u(e){s("throw",e)}function l(e,t){e(t),o.shift(),o.length&&s(o[0][0],o[0][1])}}function m(e){var t,n
        return t={},r("next"),r("throw",(function(e){throw e})),r("return"),t[Symbol.iterator]=function(){return this},t
        function r(r,i){t[r]=e[r]?function(t){return(n=!n)?{value:b(e[r](t)),done:"return"===r}:i?i(t):t}:i}}function _(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.")
        var t,n=e[Symbol.asyncIterator]
        return n?n.call(e):(e=p(e),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t)
        function r(n){t[n]=e[n]&&function(t){return new Promise((function(r,i){(function(e,t,n,r){Promise.resolve(r).then((function(t){e({value:t,done:n})}),t)})(r,i,(t=e[n](t)).done,t.value)}))}}}function w(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}function S(e){if(e&&e.__esModule)return e
        var t={}
        if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n])
        return t.default=e,t}function x(e){return e&&e.__esModule?e:{default:e}}},function(e,t,n){"use strict"
    function r(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length
        var r=Array(e),i=0
        for(t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)r[i]=o[a]
        return r}n.r(t),n.d(t,"LogLevel",(function(){return i})),n.d(t,"Logger",(function(){return c})),n.d(t,"setLogLevel",(function(){return u}))
    var i,o=[]
    !function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(i||(i={}))
    var a=i.INFO,s=function(e,t){for(var n=[],o=2;o<arguments.length;o++)n[o-2]=arguments[o]
        if(!(t<e.logLevel)){var a=(new Date).toISOString()
            switch(t){case i.DEBUG:case i.VERBOSE:console.log.apply(console,r(["["+a+"]  "+e.name+":"],n))
                break
                case i.INFO:console.info.apply(console,r(["["+a+"]  "+e.name+":"],n))
                    break
                case i.WARN:console.warn.apply(console,r(["["+a+"]  "+e.name+":"],n))
                    break
                case i.ERROR:console.error.apply(console,r(["["+a+"]  "+e.name+":"],n))
                    break
                default:throw new Error("Attempted to log a message with an invalid logType (value: "+t+")")}}},c=function(){function e(e){this.name=e,this._logLevel=a,this._logHandler=s,o.push(this)}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in i))throw new TypeError("Invalid value assigned to `logLevel`")
            this._logLevel=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function")
            this._logHandler=e},enumerable:!0,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
        this._logHandler.apply(this,r([this,i.DEBUG],e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
        this._logHandler.apply(this,r([this,i.VERBOSE],e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
        this._logHandler.apply(this,r([this,i.INFO],e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
        this._logHandler.apply(this,r([this,i.WARN],e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
        this._logHandler.apply(this,r([this,i.ERROR],e))},e}()
    function u(e){o.forEach((function(t){t.logLevel=e}))}},function(e,t,n){var r=n(12),i=n(13)
    "string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]])
    var o={insert:"head",singleton:!1},a=(r(i,o),i.locals?i.locals:{})
    e.exports=a},function(e,t,n){"use strict"
    var r,i=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},o=function(){var e={}
        return function(t){if(void 0===e[t]){var n=document.querySelector(t)
            if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[]
    function s(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n
        break}return t}function c(e,t){for(var n={},r=[],i=0;i<e.length;i++){var o=e[i],c=t.base?o[0]+t.base:o[0],u=n[c]||0,l="".concat(c," ").concat(u)
        n[c]=u+1
        var f=s(l),d={css:o[1],media:o[2],sourceMap:o[3]};-1!==f?(a[f].references++,a[f].updater(d)):a.push({identifier:l,updater:g(d,t),references:1}),r.push(l)}return r}function u(e){var t=document.createElement("style"),r=e.attributes||{}
        if(void 0===r.nonce){var i=n.nc
            i&&(r.nonce=i)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t)
        else{var a=o(e.insert||"head")
            if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.")
            a.appendChild(t)}return t}var l,f=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")})
    function d(e,t,n,r){var i=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css
        if(e.styleSheet)e.styleSheet.cssText=f(t,i)
        else{var o=document.createTextNode(i),a=e.childNodes
            a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function p(e,t,n){var r=n.css,i=n.media,o=n.sourceMap
        if(i?e.setAttribute("media",i):e.removeAttribute("media"),o&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=r
        else{for(;e.firstChild;)e.removeChild(e.firstChild)
            e.appendChild(document.createTextNode(r))}}var h=null,v=0
    function g(e,t){var n,r,i
        if(t.singleton){var o=v++
            n=h||(h=u(t)),r=d.bind(null,n,o,!1),i=d.bind(null,n,o,!0)}else n=u(t),r=p.bind(null,n,t),i=function(){!function(e){if(null===e.parentNode)return!1
            e.parentNode.removeChild(e)}(n)}
        return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return
            r(e=t)}else i()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=i())
        var n=c(e=e||[],t)
        return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var i=s(n[r])
            a[i].references--}for(var o=c(e,t),u=0;u<n.length;u++){var l=s(n[u])
            0===a[l].references&&(a[l].updater(),a.splice(l,1))}n=o}}}},function(e,t,n){(t=n(14)(!1)).push([e.i,'.pushdelivery__modalbody__picture{width:60%}.pushdelivery__modalbody__picture img{width:80px;height:80px}@media screen and (max-width: 720px){.pushdelivery__modalbody__picture img{width:50px;height:50px}}.pushdelivery__tab__close{font-size:14px;padding:10px;color:#aaa;cursor:pointer;text-align:right;background:#fff}.pushdelivery__sidebarsettings__list input[type="checkbox"]{background-color:initial;display:inline-block;margin-right:4px;vertical-align:baseline;-webkit-appearance:checkbox}.check-label{cursor:pointer}.pushdelivery__denied{background:#fff;border:1px solid #ccc;box-shadow:rgba(0,0,0,0.4) 0 2px 24px 0;display:flex;flex-direction:column;font-size:12px;padding:20px;width:450px;max-width:calc(100% - 25px);bottom:80px;margin-left:25px;position:fixed;z-index:1001}.pushdelivery__denied.hide{display:none}.pushdelivery__modal{background:#fff;border:1px solid #ccc;box-shadow:rgba(0,0,0,0.4) 0 2px 24px 0;display:flex;flex-direction:column;font-size:12px;margin:auto;padding:20px;width:450px;max-width:100%;position:fixed;top:55px;left:0;right:0;z-index:99999}.pushdelivery__modalbody{display:flex;flex-direction:row}.pushdelivery__modalbody__content{letter-spacing:-.1px}@media screen and (max-width: 720px){.pushdelivery__modalbody__content{padding-left:5px}}.pushdelivery__modalbody__title{font-size:15px;font-weight:700}.pushdelivery__modalbody__text{font-size:16px;line-height:1.5;margin:0}.pushdelivery__modalbody__list{line-height:1.4;list-style:none;padding-left:0;margin-bottom:20px}.pushdelivery__modalbody__list li{margin-bottom:6px}.pushdelivery__modalfooter{display:flex;justify-content:center}@media screen and (max-width: 720px){.pushdelivery__modalfooter{margin-top:5px}}.pushdelivery__modalfooter__branding{color:#ccc;font-size:11px;height:32px;line-height:32px;margin:0;width:130px}.pushdelivery__modalfooter__confirm-buttons{display:flex;justify-content:center;max-height:32px;width:calc(100% - 130px)}.pushdelivery__modalfooter__allow,.pushdelivery__modalfooter__deny{border-radius:4px;border:1px solid;padding:12px 18px;line-height:1.5px}.pushdelivery__modalfooter__allow{background:#1781e3;border:1px solid #1781e3;color:#fff;font-size:14px;margin-left:15px}.pushdelivery__modalfooter__allow:hover,.pushdelivery__sidebarsettings__save:hover{background:#0851da;border-color:#0851da}.pushdelivery__modalfooter__deny{border:1px solid #ccc;font-size:14px;padding:9px}.pushdelivery__bell{bottom:20px;display:none;left:30px;position:fixed;z-index:1039}@media screen and (max-width: 720px){.pushdelivery__bell{left:20px}}.pushdelivery__bell:hover{transition:width 1s ease-in-out}.pushdelivery__bell:hover .pushdelivery__bell__info{display:flex}.pushdelivery__bell__button{background-size:40px;background-repeat:no-repeat;background-position:center;background-color:#fff;border-radius:99px;box-shadow:1px 1px 3px 0 rgba(0,0,0,0.4);cursor:pointer;height:40px;transition:width .2s, height .2s;width:40px;white-space:nowrap}.pushdelivery__bell__button.active:hover{height:40px;width:40px}.pushdelivery__bell__info{display:none;padding-left:10px}.pushdelivery__bell__info.active{display:flex}.pushdelivery__bell__info--triangle{width:0;height:0;border-style:solid;align-self:center;border-width:6px 6px 6px 0;border-color:transparent #000 transparent transparent}.pushdelivery__bell__info--text{align-self:center;background:#000;border-radius:4px;color:#fff;font-size:11px;height:34px;line-height:34px;padding:0 10px}.pushdelivery__sidebar{background:#f5f5f5;display:none;flex-direction:column;height:100%;border-right:1px solid #ccc;padding:0;position:fixed;top:0;left:0;width:300px;z-index:99998}.pushdelivery__sidebar.collapsed{display:flex}.pushdelivery__sidebar li{list-style:none;padding-left:0}.pushdelivery__sidebar__navigation{display:flex;margin:0;padding:10px 0 0 0;background:#fff}.pushdelivery__sidebar__navigation li{cursor:pointer;flex-grow:1;font-size:18px;padding-bottom:4px;text-align:center;border-bottom:3px solid transparent;font-weight:700}.pushdelivery__sidebar__navigation li.active{border-bottom-color:#333;margin-bottom:auto}.no-notifications{font-size:16px;padding:20px}.pushdelivery__sidebarmessages{display:none;font-size:12px;height:calc(100% - 74px);overflow-x:auto;padding:0;margin:0}.pushdelivery::-webkit-scrollbar{display:none}.pushdelivery__sidebarmessages li{padding:20px}.pushdelivery__sidebarsettings{padding:0 10px}.pushdelivery__sidebarsettings__title{font-size:18px;letter-spacing:-.1px;margin-top:40px}.pushdelivery__sidebarsettings__list{font-size:16px;margin:20px 0 30px;height:calc(100vh - 440px);overflow-y:scroll;padding-left:0;box-sizing:content-box;min-height:50px;-webkit-overflow-scrolling:touch;-ms-overflow-style:none;scrollbar-width:none}.pushdelivery__sidebarsettings__list::-webkit-scrollbar{display:none}.pushdelivery__sidebarsettings__cancel{border:none;margin:10px auto;display:block;font-size:14px;color:#1781e3;background:transparent}.pushdelivery__sidebarsettings__save{background:#1781DE;border-color:#1781e3;color:#fff;border-radius:4px;cursor:pointer;display:block;font-size:16px;line-height:1;margin:auto;padding:9px}.pushdelivery__open_sidebar{text-decoration:underline;color:blue;cursor:pointer}.pushdelivery__denied__close{position:absolute;right:20px;display:inline-block;width:15px;height:15px;overflow:hidden;background:#fff}.pushdelivery__denied__close::before,.pushdelivery__denied__close::after{content:"";position:absolute;height:2px;width:100%;top:50%;left:0;margin-top:-1px;background:#000}.pushdelivery__denied__close::before{transform:rotate(45deg)}.pushdelivery__denied__close::after{transform:rotate(-45deg)}.pushdelivery__image img{width:315px}.pushdelivery__sidebarsettings_language{margin-top:20px;font-size:18px}.pushdelivery__sidebarsettings_language ul{padding:10px 0;margin:0;justify-content:start;display:flex}.pushdelivery__sidebarsettings_language ul li{cursor:pointer;display:inline-block;width:80px;text-align:center;font-size:14px;letter-spacing:-.1px;padding:5px 0;margin-right:5px;border-radius:5px;border:1px solid #ccc;background:white}.pushdelivery__sidebarsettings_language ul li.active,.pushdelivery__sidebarsettings_language ul li:hover{background-color:#ececec}.notification-date{display:inline-block;font-size:12px}.notification-text{font-size:14px;line-height:1.43}.pushdelivery__archive_notification li{border-bottom:1px solid}.pushdelivery__archive_notification strong{font-size:16px}.pushdelivery__archive_notification{border-bottom:1px solid grey}.pushdelivery__archive_notification a{text-decoration:none;color:#000}.pushdelivery__archive_notification a:hover{text-decoration:underline}.pushdelivery__archive_notification p{margin-bottom:0}.pushdelivery{box-sizing:border-box;line-height:1}.pushdelivery h1,.pushdelivery h2,.pushdelivery h3{font-weight:100}.pushdelivery__notification{background:white;bottom:100px;box-shadow:rgba(0,0,0,0.4) 0 2px 24px 0;display:flex;flex-direction:row;position:fixed;z-index:99999}@media screen and (min-width: 720px){.pushdelivery__notification{width:350px;margin-left:20px}}.pushdelivery__notification--icon{align-self:center;height:50px;margin:10px;width:50px}.pushdelivery__notification--title,.pushdelivery__notification--date,.pushdelivery__notification--content{padding:5px 0}.pushdelivery__notification--content{display:flex;flex-direction:column;align-self:center;width:calc(100% - 80px)}.pushdelivery__notification--content a{text-decoration:none;color:black}.pushdelivery__notification--title{font-weight:bold;padding-top:10px;overflow:hidden;text-overflow:ellipsis}.pushdelivery__notification--text{font-size:14px;line-height:1.43}.pushdelivery__notification--date{font-size:12px;list-style:none;text-align:right}\n',""]),e.exports=t},function(e,t,n){"use strict"
    e.exports=function(e){var t=[]
        return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3]
            if(!r)return n
            if(t&&"function"==typeof btoa){var i=(a=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),o=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}))
                return[n].concat(o).concat([i]).join("\n")}var a,s,c
            return[n].join("\n")}(t,e)
            return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]])
            var i={}
            if(r)for(var o=0;o<this.length;o++){var a=this[o][0]
                null!=a&&(i[a]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s])
                r&&i[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},function(e,t,n){"use strict"
    n.r(t)
    var r=n(0),i=n.n(r),o=n(1),a=n.n(o),s=n(4),c=n.n(s),u=n(5)
    var l=function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])
        return e}).apply(this,arguments)}
    function f(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){e.done?i(e.value):new n((function(t){t(e.value)})).then(a,s)}c((r=r.apply(e,t||[])).next())}))}function d(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1]
            return i[1]},trys:[],ops:[]}
        return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o
        function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.")
            for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i
                switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o
                    break
                    case 4:return a.label++,{value:o[1],done:!1}
                    case 5:a.label++,r=o[1],o=[0]
                        continue
                    case 7:o=a.ops.pop(),a.trys.pop()
                        continue
                    default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0
                        continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1]
                        break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o
                        break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o)
                        break}i[2]&&a.ops.pop(),a.trys.pop()
                        continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1]
            return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function p(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0
        return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}function h(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator]
        if(!n)return e
        var r,i,o=n.call(e),a=[]
        try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}var v,g=n(3),b=n(2),y=((v={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',v["not-registered"]="Firebase Installation is not registered.",v["installation-not-found"]="Firebase Installation not found.",v["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',v["app-offline"]="Could not process request. Application offline.",v["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",v),m=new g.ErrorFactory("installations","Installations",y)
    function _(e){return e instanceof g.FirebaseError&&e.code.includes("request-failed")}function w(e){return"https://firebaseinstallations.googleapis.com/v1/projects/"+e.projectId+"/installations"}function S(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()}
        var t}function x(e,t){return f(this,void 0,void 0,(function(){var n,r
        return d(this,(function(i){switch(i.label){case 0:return[4,t.json()]
            case 1:return n=i.sent(),r=n.error,[2,m.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}}))}))}function k(e){var t=e.apiKey
        return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function I(e,t){var n=t.refreshToken,r=k(e)
        return r.append("Authorization",function(e){return"FIS_v2 "+e}(n)),r}function E(e){return f(this,void 0,void 0,(function(){var t
        return d(this,(function(n){switch(n.label){case 0:return[4,e()]
            case 1:return(t=n.sent()).status>=500&&t.status<600?[2,e()]:[2,t]}}))}))}function D(e,t){var n=t.fid
        return f(this,void 0,void 0,(function(){var t,r,i,o,a,s
            return d(this,(function(c){switch(c.label){case 0:return t=w(e),r=k(e),i={fid:n,authVersion:"FIS_v2",appId:e.appId,sdkVersion:"w:0.4.2"},o={method:"POST",headers:r,body:JSON.stringify(i)},[4,E((function(){return fetch(t,o)}))]
                case 1:return(a=c.sent()).ok?[4,a.json()]:[3,3]
                case 2:return s=c.sent(),[2,{fid:s.fid||n,registrationStatus:2,refreshToken:s.refreshToken,authToken:S(s.authToken)}]
                case 3:return[4,x("Create Installation",a)]
                case 4:throw c.sent()}}))}))}function T(e){return new Promise((function(t){setTimeout(t,e)}))}function C(e){return btoa(String.fromCharCode.apply(String,function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(h(arguments[t]))
        return e}(e))).replace(/\+/g,"-").replace(/\//g,"_")}var P=/^[cdef][\w-]{21}$/
    function O(){try{var e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16
        var t=function(e){return C(e).substr(0,22)}(e)
        return P.test(t)?t:""}catch(e){return""}}function A(e){return e.appName+"!"+e.appId}var j=new Map
    function N(e,t){var n=A(e)
        L(n,t),function(e,t){var n=M()
            n&&n.postMessage({key:e,fid:t})
            F()}(n,t)}function L(e,t){var n,r,i=j.get(e)
        if(i)try{for(var o=p(i),a=o.next();!a.done;a=o.next()){(0,a.value)(t)}}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}}var B=null
    function M(){return!B&&"BroadcastChannel"in self&&((B=new BroadcastChannel("[Firebase] FID Change")).onmessage=function(e){L(e.data.key,e.data.fid)}),B}function F(){0===j.size&&B&&(B.close(),B=null)}var R,z="firebase-installations-store",V=null
    function K(){return V||(V=Object(b.openDb)("firebase-installations-database",1,(function(e){switch(e.oldVersion){case 0:e.createObjectStore(z)}}))),V}function U(e,t){return f(this,void 0,void 0,(function(){var n,r,i,o,a
        return d(this,(function(s){switch(s.label){case 0:return n=A(e),[4,K()]
            case 1:return r=s.sent(),i=r.transaction(z,"readwrite"),[4,(o=i.objectStore(z)).get(n)]
            case 2:return a=s.sent(),[4,o.put(t,n)]
            case 3:return s.sent(),[4,i.complete]
            case 4:return s.sent(),a&&a.fid===t.fid||N(e,t.fid),[2,t]}}))}))}function W(e){return f(this,void 0,void 0,(function(){var t,n,r
        return d(this,(function(i){switch(i.label){case 0:return t=A(e),[4,K()]
            case 1:return n=i.sent(),[4,(r=n.transaction(z,"readwrite")).objectStore(z).delete(t)]
            case 2:return i.sent(),[4,r.complete]
            case 3:return i.sent(),[2]}}))}))}function H(e,t){return f(this,void 0,void 0,(function(){var n,r,i,o,a,s
        return d(this,(function(c){switch(c.label){case 0:return n=A(e),[4,K()]
            case 1:return r=c.sent(),i=r.transaction(z,"readwrite"),[4,(o=i.objectStore(z)).get(n)]
            case 2:return a=c.sent(),void 0!==(s=t(a))?[3,4]:[4,o.delete(n)]
            case 3:return c.sent(),[3,6]
            case 4:return[4,o.put(s,n)]
            case 5:c.sent(),c.label=6
            case 6:return[4,i.complete]
            case 7:return c.sent(),!s||a&&a.fid===s.fid||N(e,s.fid),[2,s]}}))}))}function q(e){return f(this,void 0,void 0,(function(){var t,n,r
        return d(this,(function(i){switch(i.label){case 0:return[4,H(e,(function(n){var r=function(e){return $(e||{fid:O(),registrationStatus:0})}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){var n=Promise.reject(m.create("app-offline"))
            return{installationEntry:t,registrationPromise:n}}var r={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=function(e,t){return f(this,void 0,void 0,(function(){var n,r
            return d(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,7]),[4,D(e,t)]
                case 1:return n=i.sent(),[2,U(e,n)]
                case 2:return _(r=i.sent())&&409===r.serverCode?[4,W(e)]:[3,4]
                case 3:return i.sent(),[3,6]
                case 4:return[4,U(e,{fid:t.fid,registrationStatus:0})]
                case 5:i.sent(),i.label=6
                case 6:throw r
                case 7:return[2]}}))}))}(e,r)
            return{installationEntry:r,registrationPromise:i}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:G(e)}:{installationEntry:t}}(e,r)
            return t=i.registrationPromise,i.installationEntry}))]
            case 1:return""!==(n=i.sent()).fid?[3,3]:(r={},[4,t])
            case 2:return[2,(r.installationEntry=i.sent(),r)]
            case 3:return[2,{installationEntry:n,registrationPromise:t}]}}))}))}function G(e){return f(this,void 0,void 0,(function(){var t,n,r,i
        return d(this,(function(o){switch(o.label){case 0:return[4,J(e)]
            case 1:t=o.sent(),o.label=2
            case 2:return 1!==t.registrationStatus?[3,5]:[4,T(100)]
            case 3:return o.sent(),[4,J(e)]
            case 4:return t=o.sent(),[3,2]
            case 5:return 0!==t.registrationStatus?[3,7]:[4,q(e)]
            case 6:return n=o.sent(),r=n.installationEntry,(i=n.registrationPromise)?[2,i]:[2,r]
            case 7:return[2,t]}}))}))}function J(e){return H(e,(function(e){if(!e)throw m.create("installation-not-found")
        return $(e)}))}function $(e){return 1===(t=e).registrationStatus&&t.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e
        var t}function Y(e,t){var n=e.appConfig,r=e.platformLoggerProvider
        return f(this,void 0,void 0,(function(){var e,i,o,a,s,c,u
            return d(this,(function(l){switch(l.label){case 0:return e=function(e,t){var n=t.fid
                return w(e)+"/"+n+"/authTokens:generate"}(n,t),i=I(n,t),(o=r.getImmediate({optional:!0}))&&i.append("x-firebase-client",o.getPlatformInfoString()),a={installation:{sdkVersion:"w:0.4.2"}},s={method:"POST",headers:i,body:JSON.stringify(a)},[4,E((function(){return fetch(e,s)}))]
                case 1:return(c=l.sent()).ok?[4,c.json()]:[3,3]
                case 2:return u=l.sent(),[2,S(u)]
                case 3:return[4,x("Generate Auth Token",c)]
                case 4:throw l.sent()}}))}))}function X(e,t){return void 0===t&&(t=!1),f(this,void 0,void 0,(function(){var n,r,i
        return d(this,(function(o){switch(o.label){case 0:return[4,H(e.appConfig,(function(r){if(!Q(r))throw m.create("not-registered")
            var i=r.authToken
            if(!t&&function(e){return 2===e.requestStatus&&!function(e){var t=Date.now()
                return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(e)}(i))return r
            if(1===i.requestStatus)return n=function(e,t){return f(this,void 0,void 0,(function(){var n,r
                return d(this,(function(i){switch(i.label){case 0:return[4,Z(e.appConfig)]
                    case 1:n=i.sent(),i.label=2
                    case 2:return 1!==n.authToken.requestStatus?[3,5]:[4,T(100)]
                    case 3:return i.sent(),[4,Z(e.appConfig)]
                    case 4:return n=i.sent(),[3,2]
                    case 5:return 0===(r=n.authToken).requestStatus?[2,X(e,t)]:[2,r]}}))}))}(e,t),r
            if(!navigator.onLine)throw m.create("app-offline")
            var o=function(e){var t={requestStatus:1,requestTime:Date.now()}
                return l(l({},e),{authToken:t})}(r)
            return n=function(e,t){return f(this,void 0,void 0,(function(){var n,r,i
                return d(this,(function(o){switch(o.label){case 0:return o.trys.push([0,3,,8]),[4,Y(e,t)]
                    case 1:return n=o.sent(),i=l(l({},t),{authToken:n}),[4,U(e.appConfig,i)]
                    case 2:return o.sent(),[2,n]
                    case 3:return!_(r=o.sent())||401!==r.serverCode&&404!==r.serverCode?[3,5]:[4,W(e.appConfig)]
                    case 4:return o.sent(),[3,7]
                    case 5:return i=l(l({},t),{authToken:{requestStatus:0}}),[4,U(e.appConfig,i)]
                    case 6:o.sent(),o.label=7
                    case 7:throw r
                    case 8:return[2]}}))}))}(e,o),o}))]
            case 1:return r=o.sent(),n?[4,n]:[3,3]
            case 2:return i=o.sent(),[3,4]
            case 3:i=r.authToken,o.label=4
            case 4:return[2,i]}}))}))}function Z(e){return H(e,(function(e){if(!Q(e))throw m.create("not-registered")
        var t,n=e.authToken
        return 1===(t=n).requestStatus&&t.requestTime+1e4<Date.now()?l(l({},e),{authToken:{requestStatus:0}}):e}))}function Q(e){return void 0!==e&&2===e.registrationStatus}function ee(e){return f(this,void 0,void 0,(function(){var t
        return d(this,(function(n){switch(n.label){case 0:return[4,q(e)]
            case 1:return(t=n.sent().registrationPromise)?[4,t]:[3,3]
            case 2:n.sent(),n.label=3
            case 3:return[2]}}))}))}function te(e,t){return f(this,void 0,void 0,(function(){var n,r,i,o
        return d(this,(function(a){switch(a.label){case 0:return n=function(e,t){var n=t.fid
            return w(e)+"/"+n}(e,t),r=I(e,t),i={method:"DELETE",headers:r},[4,E((function(){return fetch(n,i)}))]
            case 1:return(o=a.sent()).ok?[3,3]:[4,x("Delete Installation",o)]
            case 2:throw a.sent()
            case 3:return[2]}}))}))}function ne(e,t){var n=e.appConfig
        return function(e,t){M()
            var n=A(e),r=j.get(n)
            r||(r=new Set,j.set(n,r)),r.add(t)}(n,t),function(){!function(e,t){var n=A(e),r=j.get(n)
            r&&(r.delete(t),0===r.size&&j.delete(n),F())}(n,t)}}function re(e){return m.create("missing-app-config-values",{valueName:e})}(R=c.a).INTERNAL.registerComponent(new u.Component("installations",(function(e){var t=e.getProvider("app").getImmediate(),n={appConfig:function(e){var t,n
            if(!e||!e.options)throw re("App Configuration")
            if(!e.name)throw re("App Name")
            try{for(var r=p(["projectId","apiKey","appId"]),i=r.next();!i.done;i=r.next()){var o=i.value
                if(!e.options[o])throw re(o)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),platformLoggerProvider:e.getProvider("platform-logger")}
        return{app:t,getId:function(){return function(e){return f(this,void 0,void 0,(function(){var t,n,r
                return d(this,(function(i){switch(i.label){case 0:return[4,q(e.appConfig)]
                    case 1:return t=i.sent(),n=t.installationEntry,(r=t.registrationPromise)?r.catch(console.error):X(e).catch(console.error),[2,n.fid]}}))}))}(n)},getToken:function(e){return function(e,t){return void 0===t&&(t=!1),f(this,void 0,void 0,(function(){return d(this,(function(n){switch(n.label){case 0:return[4,ee(e.appConfig)]
                case 1:return n.sent(),[4,X(e,t)]
                case 2:return[2,n.sent().token]}}))}))}(n,e)},delete:function(){return function(e){return f(this,void 0,void 0,(function(){var t,n
                return d(this,(function(r){switch(r.label){case 0:return[4,H(t=e.appConfig,(function(e){if(!e||0!==e.registrationStatus)return e}))]
                    case 1:if(!(n=r.sent()))return[3,6]
                        if(1!==n.registrationStatus)return[3,2]
                        throw m.create("delete-pending-registration")
                    case 2:if(2!==n.registrationStatus)return[3,6]
                        if(navigator.onLine)return[3,3]
                        throw m.create("app-offline")
                    case 3:return[4,te(t,n)]
                    case 4:return r.sent(),[4,W(t)]
                    case 5:r.sent(),r.label=6
                    case 6:return[2]}}))}))}(n)},onIdChange:function(e){return ne(n,e)}}}),"PUBLIC")),R.registerVersion("@firebase/installations","0.4.2")
    var ie,oe=function(){return(oe=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])
        return e}).apply(this,arguments)}
    function ae(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){e.done?i(e.value):new n((function(t){t(e.value)})).then(a,s)}c((r=r.apply(e,t||[])).next())}))}function se(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1]
            return i[1]},trys:[],ops:[]}
        return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o
        function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.")
            for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i
                switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o
                    break
                    case 4:return a.label++,{value:o[1],done:!1}
                    case 5:a.label++,r=o[1],o=[0]
                        continue
                    case 7:o=a.ops.pop(),a.trys.pop()
                        continue
                    default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0
                        continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1]
                        break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o
                        break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o)
                        break}i[2]&&a.ops.pop(),a.trys.pop()
                        continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1]
            return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function ce(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0
        return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}function ue(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator]
        if(!n)return e
        var r,i,o=n.call(e),a=[]
        try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}var le=((ie={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',ie["only-available-in-window"]="This method is available in a Window context.",ie["only-available-in-sw"]="This method is available in a service worker context.",ie["permission-default"]="The notification permission was not granted and dismissed instead.",ie["permission-blocked"]="The notification permission was not granted and blocked instead.",ie["unsupported-browser"]="This browser doesn't support the API's required to use the firebase SDK.",ie["failed-service-worker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",ie["token-subscribe-failed"]="A problem occured while subscribing the user to FCM: {$errorInfo}",ie["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",ie["token-unsubscribe-failed"]="A problem occured while unsubscribing the user from FCM: {$errorInfo}",ie["token-update-failed"]="A problem occured while updating the user from FCM: {$errorInfo}",ie["token-update-no-token"]="FCM returned no token when updating the user to push.",ie["use-sw-after-get-token"]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",ie["invalid-sw-registration"]="The input to useServiceWorker() must be a ServiceWorkerRegistration.",ie["invalid-bg-handler"]="The input to setBackgroundMessageHandler() must be a function.",ie["invalid-vapid-key"]="The public VAPID key must be a string.",ie["use-vapid-key-after-get-token"]="The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",ie),fe=new g.ErrorFactory("messaging","Messaging",le)
    function de(e){return fe.create("missing-app-config-values",{valueName:e})}function pe(e){var t=new Uint8Array(e)
        return btoa(String.fromCharCode.apply(String,function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(ue(arguments[t]))
            return e}(t))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function he(e){return ae(this,void 0,void 0,(function(){var t,n,r=this
        return se(this,(function(i){switch(i.label){case 0:return"databases"in indexedDB?[4,indexedDB.databases()]:[3,2]
            case 1:if(t=i.sent(),!t.map((function(e){return e.name})).includes("fcm_token_details_db"))return[2,null]
                i.label=2
            case 2:return n=null,[4,Object(b.openDb)("fcm_token_details_db",5,(function(t){return ae(r,void 0,void 0,(function(){var r,i,o,a
                return se(this,(function(s){switch(s.label){case 0:return t.oldVersion<2?[2]:t.objectStoreNames.contains("fcm_token_object_Store")?[4,(r=t.transaction.objectStore("fcm_token_object_Store")).index("fcmSenderId").get(e)]:[2]
                    case 1:return i=s.sent(),[4,r.clear()]
                    case 2:if(s.sent(),!i)return[2]
                        if(2===t.oldVersion){if(!(o=i).auth||!o.p256dh||!o.endpoint)return[2]
                            n={token:o.fcmToken,createTime:(a=o.createTime,null!=a?a:Date.now()),subscriptionOptions:{auth:o.auth,p256dh:o.p256dh,endpoint:o.endpoint,swScope:o.swScope,vapidKey:"string"==typeof o.vapidKey?o.vapidKey:pe(o.vapidKey)}}}else 3===t.oldVersion?n={token:(o=i).fcmToken,createTime:o.createTime,subscriptionOptions:{auth:pe(o.auth),p256dh:pe(o.p256dh),endpoint:o.endpoint,swScope:o.swScope,vapidKey:pe(o.vapidKey)}}:4===t.oldVersion&&(n={token:(o=i).fcmToken,createTime:o.createTime,subscriptionOptions:{auth:pe(o.auth),p256dh:pe(o.p256dh),endpoint:o.endpoint,swScope:o.swScope,vapidKey:pe(o.vapidKey)}})
                        return[2]}}))}))}))]
            case 3:return i.sent().close(),[4,Object(b.deleteDb)("fcm_token_details_db")]
            case 4:return i.sent(),[4,Object(b.deleteDb)("fcm_vapid_details_db")]
            case 5:return i.sent(),[4,Object(b.deleteDb)("undefined")]
            case 6:return i.sent(),[2,ve(n)?n:null]}}))}))}function ve(e){if(!e||!e.subscriptionOptions)return!1
        var t=e.subscriptionOptions
        return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}var ge=null
    function be(){return ge||(ge=Object(b.openDb)("firebase-messaging-database",1,(function(e){switch(e.oldVersion){case 0:e.createObjectStore("firebase-messaging-store")}}))),ge}function ye(e){return ae(this,void 0,void 0,(function(){var t,n,r
        return se(this,(function(i){switch(i.label){case 0:return t=we(e),[4,be()]
            case 1:return[4,i.sent().transaction("firebase-messaging-store").objectStore("firebase-messaging-store").get(t)]
            case 2:return(n=i.sent())?[2,n]:[3,3]
            case 3:return[4,he(e.appConfig.senderId)]
            case 4:return(r=i.sent())?[4,me(e,r)]:[3,6]
            case 5:return i.sent(),[2,r]
            case 6:return[2]}}))}))}function me(e,t){return ae(this,void 0,void 0,(function(){var n,r,i
        return se(this,(function(o){switch(o.label){case 0:return n=we(e),[4,be()]
            case 1:return r=o.sent(),[4,(i=r.transaction("firebase-messaging-store","readwrite")).objectStore("firebase-messaging-store").put(t,n)]
            case 2:return o.sent(),[4,i.complete]
            case 3:return o.sent(),[2,t]}}))}))}function _e(e){return ae(this,void 0,void 0,(function(){var t,n,r
        return se(this,(function(i){switch(i.label){case 0:return t=we(e),[4,be()]
            case 1:return n=i.sent(),[4,(r=n.transaction("firebase-messaging-store","readwrite")).objectStore("firebase-messaging-store").delete(t)]
            case 2:return i.sent(),[4,r.complete]
            case 3:return i.sent(),[2]}}))}))}function we(e){return e.appConfig.appId}var Se="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4"
    function xe(e,t){return ae(this,void 0,void 0,(function(){var n,r,i,o,a,s
        return se(this,(function(c){switch(c.label){case 0:return[4,De(e)]
            case 1:n=c.sent(),r=Te(t),i={method:"POST",headers:n,body:JSON.stringify(r)},c.label=2
            case 2:return c.trys.push([2,5,,6]),[4,fetch(Ee(e.appConfig),i)]
            case 3:return[4,c.sent().json()]
            case 4:return o=c.sent(),[3,6]
            case 5:throw a=c.sent(),fe.create("token-subscribe-failed",{errorInfo:a})
            case 6:if(o.error)throw s=o.error.message,fe.create("token-subscribe-failed",{errorInfo:s})
                if(!o.token)throw fe.create("token-subscribe-no-token")
                return[2,o.token]}}))}))}function ke(e,t){return ae(this,void 0,void 0,(function(){var n,r,i,o,a,s
        return se(this,(function(c){switch(c.label){case 0:return[4,De(e)]
            case 1:n=c.sent(),r=Te(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)},c.label=2
            case 2:return c.trys.push([2,5,,6]),[4,fetch(Ee(e.appConfig)+"/"+t.token,i)]
            case 3:return[4,c.sent().json()]
            case 4:return o=c.sent(),[3,6]
            case 5:throw a=c.sent(),fe.create("token-update-failed",{errorInfo:a})
            case 6:if(o.error)throw s=o.error.message,fe.create("token-update-failed",{errorInfo:s})
                if(!o.token)throw fe.create("token-update-no-token")
                return[2,o.token]}}))}))}function Ie(e,t){return ae(this,void 0,void 0,(function(){var n,r,i,o,a
        return se(this,(function(s){switch(s.label){case 0:return[4,De(e)]
            case 1:n=s.sent(),r={method:"DELETE",headers:n},s.label=2
            case 2:return s.trys.push([2,5,,6]),[4,fetch(Ee(e.appConfig)+"/"+t,r)]
            case 3:return[4,s.sent().json()]
            case 4:if((i=s.sent()).error)throw o=i.error.message,fe.create("token-unsubscribe-failed",{errorInfo:o})
                return[3,6]
            case 5:throw a=s.sent(),fe.create("token-unsubscribe-failed",{errorInfo:a})
            case 6:return[2]}}))}))}function Ee(e){return"https://fcmregistrations.googleapis.com/v1/projects/"+e.projectId+"/registrations"}function De(e){var t=e.appConfig,n=e.installations
        return ae(this,void 0,void 0,(function(){var e
            return se(this,(function(r){switch(r.label){case 0:return[4,n.getToken()]
                case 1:return e=r.sent(),[2,new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":"FIS "+e})]}}))}))}function Te(e){var t=e.p256dh,n=e.auth,r=e.endpoint,i=e.vapidKey,o={web:{endpoint:r,auth:n,p256dh:t}}
        return i!==Se&&(o.web.applicationPubKey=i),o}var Ce
    function Pe(e,t,n){return ae(this,void 0,void 0,(function(){var r,i,o,a
        return se(this,(function(s){switch(s.label){case 0:if("granted"!==Notification.permission)throw fe.create("permission-blocked")
            return[4,Ne(t,n)]
            case 1:return r=s.sent(),[4,ye(e)]
            case 2:return i=s.sent(),o={vapidKey:n,swScope:t.scope,endpoint:r.endpoint,auth:pe(r.getKey("auth")),p256dh:pe(r.getKey("p256dh"))},i?[3,3]:[2,je(e,o)]
            case 3:if(c=i.subscriptionOptions,l=(u=o).vapidKey===c.vapidKey,f=u.endpoint===c.endpoint,d=u.auth===c.auth,p=u.p256dh===c.p256dh,l&&f&&d&&p)return[3,8]
                s.label=4
            case 4:return s.trys.push([4,6,,7]),[4,Ie(e,i.token)]
            case 5:return s.sent(),[3,7]
            case 6:return a=s.sent(),console.warn(a),[3,7]
            case 7:return[2,je(e,o)]
            case 8:return Date.now()>=i.createTime+6048e5?[2,Ae({token:i.token,createTime:Date.now(),subscriptionOptions:o},e,t)]:[2,i.token]
            case 9:return[2]}var c,u,l,f,d,p}))}))}function Oe(e,t){return ae(this,void 0,void 0,(function(){var n,r
        return se(this,(function(i){switch(i.label){case 0:return[4,ye(e)]
            case 1:return(n=i.sent())?[4,Ie(e,n.token)]:[3,4]
            case 2:return i.sent(),[4,_e(e)]
            case 3:i.sent(),i.label=4
            case 4:return[4,t.pushManager.getSubscription()]
            case 5:return(r=i.sent())?[2,r.unsubscribe()]:[2,!0]}}))}))}function Ae(e,t,n){return ae(this,void 0,void 0,(function(){var r,i,o
        return se(this,(function(a){switch(a.label){case 0:return a.trys.push([0,3,,5]),[4,ke(t,e)]
            case 1:return r=a.sent(),i=oe({token:r,createTime:Date.now()},e),[4,me(t,i)]
            case 2:return a.sent(),[2,r]
            case 3:return o=a.sent(),[4,Oe(t,n)]
            case 4:throw a.sent(),o
            case 5:return[2]}}))}))}function je(e,t){return ae(this,void 0,void 0,(function(){var n,r
        return se(this,(function(i){switch(i.label){case 0:return[4,xe(e,t)]
            case 1:return n=i.sent(),r={token:n,createTime:Date.now(),subscriptionOptions:t},[4,me(e,r)]
            case 2:return i.sent(),[2,r.token]}}))}))}function Ne(e,t){return ae(this,void 0,void 0,(function(){var n
        return se(this,(function(r){switch(r.label){case 0:return[4,e.pushManager.getSubscription()]
            case 1:return(n=r.sent())?[2,n]:[2,e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:t})]}}))}))}function Le(e){return"object"==typeof e&&!!e&&"google.c.a.c_id"in e}!function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(Ce||(Ce={}))
    var Be=function(){function e(e){var t=this
        this.firebaseDependencies=e,this.vapidKey=null,this.onMessageCallback=null,navigator.serviceWorker.addEventListener("message",(function(e){return t.messageEventListener(e)}))}return Object.defineProperty(e.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!0,configurable:!0}),e.prototype.getToken=function(){return ae(this,void 0,void 0,(function(){var e
        return se(this,(function(t){switch(t.label){case 0:return this.vapidKey||(this.vapidKey=Se),[4,this.getServiceWorkerRegistration()]
            case 1:return e=t.sent(),"default"!==Notification.permission?[3,3]:[4,Notification.requestPermission()]
            case 2:t.sent(),t.label=3
            case 3:if("granted"!==Notification.permission)throw fe.create("permission-blocked")
                return[2,Pe(this.firebaseDependencies,e,this.vapidKey)]}}))}))},e.prototype.deleteToken=function(){return ae(this,void 0,void 0,(function(){var e
        return se(this,(function(t){switch(t.label){case 0:return[4,this.getServiceWorkerRegistration()]
            case 1:return e=t.sent(),[2,Oe(this.firebaseDependencies,e)]}}))}))},e.prototype.requestPermission=function(){return ae(this,void 0,void 0,(function(){var e
        return se(this,(function(t){switch(t.label){case 0:return"granted"===Notification.permission?[2]:[4,Notification.requestPermission()]
            case 1:if("granted"===(e=t.sent()))return[2]
                throw"denied"===e?fe.create("permission-blocked"):fe.create("permission-default")}}))}))},e.prototype.usePublicVapidKey=function(e){if(null!==this.vapidKey)throw fe.create("use-vapid-key-after-get-token")
        if("string"!=typeof e||0===e.length)throw fe.create("invalid-vapid-key")
        this.vapidKey=e},e.prototype.useServiceWorker=function(e){if(!(e instanceof ServiceWorkerRegistration))throw fe.create("invalid-sw-registration")
        if(this.swRegistration)throw fe.create("use-sw-after-get-token")
        this.swRegistration=e},e.prototype.onMessage=function(e){var t=this
        return this.onMessageCallback="function"==typeof e?e:e.next,function(){t.onMessageCallback=null}},e.prototype.setBackgroundMessageHandler=function(){throw fe.create("only-available-in-sw")},e.prototype.onTokenRefresh=function(){return function(){}},e.prototype.getServiceWorkerRegistration=function(){return ae(this,void 0,void 0,(function(){var e,t
        return se(this,(function(n){switch(n.label){case 0:if(this.swRegistration)return[3,4]
            n.label=1
            case 1:return n.trys.push([1,3,,4]),e=this,[4,navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"})]
            case 2:return e.swRegistration=n.sent(),[3,4]
            case 3:throw t=n.sent(),fe.create("failed-service-worker-registration",{browserErrorMessage:t.message})
            case 4:return[2,this.swRegistration]}}))}))},e.prototype.messageEventListener=function(e){var t
        return ae(this,void 0,void 0,(function(){var n,r,i,o
            return se(this,(function(a){switch(a.label){case 0:return(null===(t=e.data)||void 0===t?void 0:t.firebaseMessaging)?(n=e.data.firebaseMessaging,r=n.type,i=n.payload,this.onMessageCallback&&r===Ce.PUSH_RECEIVED&&this.onMessageCallback(i),Le(o=i.data)&&"1"===o["google.c.a.e"]?[4,this.logEvent(r,o)]:[3,2]):[2]
                case 1:a.sent(),a.label=2
                case 2:return[2]}}))}))},e.prototype.logEvent=function(e,t){return ae(this,void 0,void 0,(function(){var n
        return se(this,(function(r){switch(r.label){case 0:return n=function(e){switch(e){case Ce.NOTIFICATION_CLICKED:return"notification_open"
            case Ce.PUSH_RECEIVED:return"notification_foreground"
            default:throw new Error}}(e),[4,this.firebaseDependencies.analyticsProvider.get()]
            case 1:return r.sent().logEvent(n,{message_id:t["google.c.a.c_id"],message_name:t["google.c.a.c_l"],message_time:t["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)}),[2]}}))}))},e}()
    var Me=function(){function e(e){var t=this
        this.firebaseDependencies=e,this.vapidKey=null,this.bgMessageHandler=null,self.addEventListener("push",(function(e){e.waitUntil(t.onPush(e))})),self.addEventListener("pushsubscriptionchange",(function(e){e.waitUntil(t.onSubChange(e))})),self.addEventListener("notificationclick",(function(e){e.waitUntil(t.onNotificationClick(e))}))}return Object.defineProperty(e.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!0,configurable:!0}),e.prototype.setBackgroundMessageHandler=function(e){if(!e||"function"!=typeof e)throw fe.create("invalid-bg-handler")
        this.bgMessageHandler=e},e.prototype.getToken=function(){var e,t,n
        return ae(this,void 0,void 0,(function(){var r
            return se(this,(function(i){switch(i.label){case 0:return this.vapidKey?[3,2]:[4,ye(this.firebaseDependencies)]
                case 1:r=i.sent(),this.vapidKey=null!=(n=null===(t=null===(e=r)||void 0===e?void 0:e.subscriptionOptions)||void 0===t?void 0:t.vapidKey)?n:Se,i.label=2
                case 2:return[2,Pe(this.firebaseDependencies,self.registration,this.vapidKey)]}}))}))},e.prototype.deleteToken=function(){return Oe(this.firebaseDependencies,self.registration)},e.prototype.requestPermission=function(){throw fe.create("only-available-in-window")},e.prototype.usePublicVapidKey=function(e){if(null!==this.vapidKey)throw fe.create("use-vapid-key-after-get-token")
        if("string"!=typeof e||0===e.length)throw fe.create("invalid-vapid-key")
        this.vapidKey=e},e.prototype.useServiceWorker=function(){throw fe.create("only-available-in-window")},e.prototype.onMessage=function(){throw fe.create("only-available-in-window")},e.prototype.onTokenRefresh=function(){throw fe.create("only-available-in-window")},e.prototype.onPush=function(e){return ae(this,void 0,void 0,(function(){var t,n,r
        return se(this,(function(i){switch(i.label){case 0:return(t=function(e){var t=e.data
            if(!t)return null
            try{return t.json()}catch(e){return null}}(e))?[4,ze()]:[2]
            case 1:return function(e){return e.some((function(e){return"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://")}))}(n=i.sent())?[2,Re(n,t)]:(r=function(e){var t
                if(!e||"object"!=typeof e.notification)return
                var n=oe({},e.notification)
                return n.data=oe(oe({},e.notification.data),((t={}).FCM_MSG=e,t)),n}(t))?[4,Ke(r)]:[3,3]
            case 2:return i.sent(),[3,5]
            case 3:return this.bgMessageHandler?[4,this.bgMessageHandler(t)]:[3,5]
            case 4:i.sent(),i.label=5
            case 5:return[2]}}))}))},e.prototype.onSubChange=function(e){var t,n,r
        return ae(this,void 0,void 0,(function(){var i
            return se(this,(function(o){switch(o.label){case 0:return e.newSubscription?[3,2]:[4,Oe(this.firebaseDependencies,self.registration)]
                case 1:return o.sent(),[2]
                case 2:return[4,ye(this.firebaseDependencies)]
                case 3:return i=o.sent(),[4,Oe(this.firebaseDependencies,self.registration)]
                case 4:return o.sent(),[4,Pe(this.firebaseDependencies,self.registration,(r=null===(n=null===(t=i)||void 0===t?void 0:t.subscriptionOptions)||void 0===n?void 0:n.vapidKey,null!=r?r:Se))]
                case 5:return o.sent(),[2]}}))}))},e.prototype.onNotificationClick=function(e){var t,n
        return ae(this,void 0,void 0,(function(){var r,i,o,a
            return se(this,(function(s){switch(s.label){case 0:return(r=null===(n=null===(t=e.notification)||void 0===t?void 0:t.data)||void 0===n?void 0:n.FCM_MSG)?e.action?[2]:(e.stopImmediatePropagation(),e.notification.close(),(i=function(e){var t,n,r,i=null!==(n=null===(t=e.fcmOptions)||void 0===t?void 0:t.link)&&void 0!==n?n:null===(r=e.notification)||void 0===r?void 0:r.click_action
                if(i)return i
                return Le(e.data)?self.location.origin:null}(r))?[4,Fe(i)]:[2]):[2]
                case 1:return(o=s.sent())?[3,4]:[4,self.clients.openWindow(i)]
                case 2:return o=s.sent(),[4,(c=3e3,new Promise((function(e){setTimeout(e,c)})))]
                case 3:return s.sent(),[3,6]
                case 4:return[4,o.focus()]
                case 5:o=s.sent(),s.label=6
                case 6:return o?(a=Ve(Ce.NOTIFICATION_CLICKED,r),[2,o.postMessage(a)]):[2]}var c}))}))},e}()
    function Fe(e){return ae(this,void 0,void 0,(function(){var t,n,r,i,o,a,s
        return se(this,(function(c){switch(c.label){case 0:return t=new URL(e,self.location.href).href,[4,ze()]
            case 1:n=c.sent()
                try{for(r=ce(n),i=r.next();!i.done;i=r.next())if(o=i.value,new URL(o.url,self.location.href).href===t)return[2,o]}catch(e){a={error:e}}finally{try{i&&!i.done&&(s=r.return)&&s.call(r)}finally{if(a)throw a.error}}return[2,null]}}))}))}function Re(e,t){var n,r,i=Ve(Ce.PUSH_RECEIVED,t)
        try{for(var o=ce(e),a=o.next();!a.done;a=o.next()){a.value.postMessage(i)}}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}}function ze(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function Ve(e,t){return{firebaseMessaging:{type:e,payload:t}}}function Ke(e){var t,n=null!=(t=e.title)?t:"",r=e.actions,i=Notification.maxActions
        return r&&i&&r.length>i&&console.warn("This browser only supports "+i+" actions. The remaining actions will not be displayed."),self.registration.showNotification(n,e)}var Ue={isSupported:We}
    function We(){return self&&"ServiceWorkerGlobalScope"in self?"indexedDB"in self&&null!==indexedDB&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey"):"indexedDB"in window&&null!==indexedDB&&navigator.cookieEnabled&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}c.a.INTERNAL.registerComponent(new u.Component("messaging",(function(e){var t=e.getProvider("app").getImmediate(),n={app:t,appConfig:function(e){var t,n
            if(!e||!e.options)throw de("App Configuration Object")
            if(!e.name)throw de("App Name")
            var r=e.options
            try{for(var i=ce(["projectId","apiKey","appId","messagingSenderId"]),o=i.next();!o.done;o=i.next()){var a=o.value
                if(!r[a])throw de(a)}}catch(e){t={error:e}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}return{appName:e.name,projectId:r.projectId,apiKey:r.apiKey,appId:r.appId,senderId:r.messagingSenderId}}(t),installations:e.getProvider("installations").getImmediate(),analyticsProvider:e.getProvider("analytics-internal")}
        if(!We())throw fe.create("unsupported-browser")
        return self&&"ServiceWorkerGlobalScope"in self?new Me(n):new Be(n)}),"PUBLIC").setServiceProps(Ue))
    var He=function(){function e(t){i()(this,e),this.id=t}return a()(e,[{key:"getId",value:function(){return this.id}},{key:"isValid",value:function(){return!!this.id}}]),e}(),qe=function e(t,n){i()(this,e),this.expire=(new Date).getTime()+1e3*n,this.item=t},Ge=function(){function e(t){i()(this,e),this.cachePrefix="pushDelivery.cache.",this.dbConfig=t.app.database,this.localStorageConfiguration=t.app.localStorage}return a()(e,[{key:"storeItemLocalStorage",value:function(e,t){localStorage.setItem(e,JSON.stringify(t))}},{key:"getItemLocalStorage",value:function(e){return JSON.parse(localStorage.getItem(e))}},{key:"removeItemLocalStorage",value:function(e){localStorage.removeItem(e)}},{key:"init",value:function(){if(window.indexedDB){var e=indexedDB.open(this.dbConfig.notificationDB,this.dbConfig.version),t=this.dbConfig,n=this
            e.onupgradeneeded=function(e){(n.db=e.target.result,e.oldVersion<1)&&n.db.createObjectStore(t.notificationTable,{autoIncrement:!0}).createIndex("date","date",{unique:!1})},e.onsuccess=function(e){n.db=e.target.result},e.onerror=function(e){throw console.log("error opening database:",e.target.errorCode),new Error("Unable to open database")},this.migrateLegacyDeviceInformation()}else console.log("Your browser doesn't IndexedDB.")}},{key:"migrateLegacyDeviceInformation",value:function(){null===window.localStorage.getItem(this.localStorageConfiguration.deviceStorageKey)&&"function"==typeof this.localStorageConfiguration.migration&&this.localStorageConfiguration.migration(this.localStorageConfiguration)}},{key:"save",value:function(e){var t=this.db.transaction([this.dbConfig.notificationTable],"readwrite"),n=t.objectStore(this.dbConfig.notificationTable)
            t.onerror=function(e){console.log("error storing notification:",e.target.errorCode)},n.add(e)}},{key:"getAllEntries",value:function(){var e=this.db.transaction([this.dbConfig.notificationTable],"readonly").objectStore(this.dbConfig.notificationTable).index("date"),t=this
            return new Promise((function(n,r){var i=t.dbConfig.notificationMaxResults,o=[],a=e.openCursor(null,"prev")
                a.onsuccess=function(e){var t=e.target.result
                    t&&o.length<=i?(o.push(t.value),t.continue()):n(o)},a.onerror=r}))}},{key:"addCache",value:function(e,t,n){sessionStorage.setItem(this.cachePrefix+e,JSON.stringify(new qe(t,n)))}},{key:"getCache",value:function(e){var t=sessionStorage.getItem(this.cachePrefix+e)
            if(t){var n=JSON.parse(t)
                if(n.expire>(new Date).getTime())return n.item}return null}},{key:"removeCache",value:function(e){sessionStorage.removeItem(this.cachePrefix+e)}}]),e}()
    function Je(e,t){for(var n=0,r=Object.keys(t);n<r.length;n++){var i=r[n]
        t[i]instanceof Object&&Object.assign(t[i],Je(e[i],t[i]))}return Object.assign(e||{},t),e}var $e={globalScope:!0,app:{database:{notificationDB:"ethinking-notification",notificationTable:"notification",version:1,notificationMaxResults:50},localStorage:{deviceStorageKey:"pushDelivery.device"}},ui:{color:"#ffffff",icon:"blank.gif",translations:{de:{settings:{label_subscribed:"Sie sind für Benachrichtigungen angemeldet.",label_blocked:"Bitte Benachrichtigungen im Browser erlauben",label_subscribe:"Für Benachrichtigungen anmelden"},sidebar:{message_list_empty:"Keine Benachrichtigungen vorhanden.",tab_notification:"Meldungen",tab_settings:"Einstellungen",label_language:"Sprache wählen:",label_description:"Sie erhalten Benachrichtigungen für:",label_tag_selection:"Themenbereich wählen",button_unsubscribe:"Von allen Benachrichtigungen abmelden",button_save:"Speichern",button_close:"Schliessen"},askForPermissionsDialog:{label_description:"Möchten Sie künftig direkt per Browser-Benachrichtigung über die wichtigsten Nachrichten informiert werden?",button_confirm:"Ja",button_deny:"Nein"},howToUnblockDialog:{image:{chrome:"https://push.delivery.ethinking.de/bluewin/images/chrome-notification-german.png",firefox:"https://push.delivery.ethinking.de/bluewin/images/firefox-notification-german.png"},label_title:"Blockierung jetzt aufheben",label_description:"So können Sie die Blockierung schnell und einfach aufheben. Danach laden Sie die Seite bitte neu."},confirm:{label_text:"Sind Sie sich sicher?"},tagGroupLabels:{browser_german:"Deutsch",browser_italian:"Italienisch",browser_french:"Französisch"}},fr:{settings:{label_subscribed:"Vous avez activé les notifications",label_blocked:"Merci d'autoriser les notifications du navigateur",label_subscribe:"Activer les notifications"},sidebar:{message_list_empty:"Aucune notification disponible.",tab_notification:"Notifications",tab_settings:"Paramètres",label_language:"Sélectionner la langue",label_description:"",label_tag_selection:"Sélectionner un thème",button_unsubscribe:"Se désabonner de toutes les notifications",button_save:"Sauvegarder",button_close:"Fermer"},askForPermissionsDialog:{label_description:"À l'avenir, souhaitez-vous être informé des principales actualités par notification de votre navigateur?",button_confirm:"Oui",button_deny:"Non"},howToUnblockDialog:{image:{chrome:"https://push.delivery.ethinking.de/bluewin/images/chrome-notification-french.png",firefox:"https://push.delivery.ethinking.de/bluewin/images/firefox-notification-french.png"},label_title:"Débloquer maintenant",label_description:"Voici comment annuler rapidement et facilement le blocage. Rafraîchir ensuite la page."},confirm:{label_text:"Êtes-vous sûr?"},tagGroupLabels:{browser_german:"Allemand",browser_italian:"Français",browser_french:"Italien"}},it:{settings:{label_subscribed:"Avete attivato le notifiche",label_blocked:"Autorizzare le notifiche sul browser",label_subscribe:"Attivare le notifiche"},sidebar:{message_list_empty:"Nessuna notifica disponibile.",tab_notification:"Notifiche",tab_settings:"Impostazioni",label_language:"Selezionare la lingua",label_description:"",label_tag_selection:"Selezionare un tema",button_unsubscribe:"Annullare l'abbonamento a tutte le notifiche",button_save:"Salvare",button_close:"Chiudere"},askForPermissionsDialog:{label_description:"In futuro, volete essere informati delle principali novità attraverso le notifiche sul vostro browser?",button_confirm:"Sì",button_deny:"No"},howToUnblockDialog:{image:{chrome:"https://push.delivery.ethinking.de/bluewin/images/chrome-notification-italian.png",firefox:"https://push.delivery.ethinking.de/bluewin/images/firefox-notification-italian.png"},label_title:"Sbloccare ora",label_description:"Ecco come annullare il blocco rapidamente e facilmente. Aggiorna la pagina."},confirm:{label_text:"È sicuro?"},tagGroupLabels:{browser_german:"Tedesco",browser_italian:"Italiano",browser_french:"Francese"}},en:{button_close:"Close",sidebar_tab_settings:"Settings"},defaultLanguage:"de"},template:{modal:{logo:"https://showcase-ez.ethinking.de/bundles/ezplatformpushconnector/img/push-logo.jpg"},bell:{image:"https://push.delivery.ethinking.de/bluewin/images/bluewin-wheel.svg"}}}},Ye=function(){function e(t){i()(this,e),this.config=Je($e,t),console.log(this.config,"config in PushDeliveryClient"),this.apiConfig=this.config.app.api,this.headers={Authorization:this.getAuthorization(),"Content-Type":"application/json"}}return a()(e,[{key:"getAuthorization",value:function(){return"Bearer "+this.apiConfig.accessToken}},{key:"postData",value:function(e,t){try{return fetch(this.apiConfig.baseUrl+t,{method:"POST",headers:this.headers,body:JSON.stringify(e)}).then((function(e){if(e.ok)return e.clone().json().catch((function(){return e.clone().text()}))
            throw new Error("Error on endpoint:"+t)}))}catch(e){console.log("Error on endpoint:"+t,e)}}},{key:"getTags",value:function(){return this.postData({appId:this.apiConfig.id,platformId:this.apiConfig.platformId},"tags")}},{key:"getSubscribedTags",value:function(e){return this.postData({appId:this.apiConfig.id,platformId:this.apiConfig.platformId,deviceId:e.id},"list")}},{key:"subscribe",value:function(e,t){return this.postData({tagId:t,appId:this.apiConfig.id,appVersion:"webclient-3.0",platformId:this.apiConfig.platformId,deviceId:e.getId()},"reg")}},{key:"unsubscribe",value:function(e,t){return this.postData({tagId:t,appId:this.apiConfig.id,platformId:this.apiConfig.platformId,deviceId:e.getId()},"ureg")}}]),e}(),Xe=function(){function e(t){i()(this,e),this.config=Je($e,t),this.validateConfig(t),this.storageService=new Ge(t),this.pushDeliveryClient=new Ye(t),!0===t.globalScope&&(window.pushDelivery=this)}return a()(e,[{key:"setPayloadHandler",value:function(e){this.handlePayload=e}},{key:"init",value:function(){var e=this
            console.log("init pushDelivery",this.config),this.storageService.init(),"denied"!==Notification.permission&&"default"!==Notification.permission||this.getDevice().getId()&&(this.getSubscribedTags().then((function(t){e.unsubscribeFrom(t)})),this.storageService.removeItemLocalStorage(this.config.app.localStorage.deviceStorageKey)),this.initFirebase(),this.initServiceWorker()}},{key:"initFirebase",value:function(){console.log("initFirebase"),c.a.initializeApp({messagingSenderId:this.config.app.firebase.messageSenderId,projectId:this.config.app.firebase.projectId,apiKey:this.config.app.firebase.apiKey,appId:this.config.app.firebase.appId}),this.messaging=c.a.messaging()}},{key:"initServiceWorker",value:function(){var e=this
            console.log("initServiceWorker")
            var t=this
            navigator.serviceWorker.register(this.config.app.firebase.serviceWorkerPath).then((function(t){console.log("before post-message in PushDelivery"),null!==t.active&&(console.log("inside if when post-message in PushDelivery"),t.active.postMessage(e.config)),console.log("post-message in PushDelivery"),e.messaging.useServiceWorker(t)})),this.messaging.onTokenRefresh((function(t){e.getSubscribedTags().then((function(t){e.unsubscribeFrom(t),e.retrieveAndStoreDeviceToken().then((function(){e.subscribeTo(t)}))}))})),this.messaging.onMessage((function(n){var r=n.data.title,i=t.config.app.client.defaultUrl
                try{n.data.url&&(i=n.data.url),n.data.title||(r=" "),e.handlePayload&&e.handlePayload(n)
                    var o={date:new Date(Date.now()),text:n.data.message||n.data.body,url:i,title:r}
                    t.storageService.save(o)}catch(e){console.log("failed",e)}}))}},{key:"retrieveAndStoreDeviceToken",value:function(){var e=this
            return this.messaging.getToken().then((function(t){var n=new He
                n.id=t,e.storageService.storeItemLocalStorage(e.config.app.localStorage.deviceStorageKey,n)})).catch((function(e){console.log("failed!",e)}))}},{key:"isSupportedBrowser",value:function(){return/Edge/.test(navigator.userAgent)||/Trident/.test(navigator.userAgent)?(console.warn("Browser not supported"),!1):!(!navigator.userAgent.match("Chrome")&&!navigator.userAgent.match("Firefox"))&&("serviceWorker"in navigator||(console.warn("Service worker not supported"),!1))}},{key:"getDevice",value:function(){var e=this.storageService.getItemLocalStorage(this.config.app.localStorage.deviceStorageKey)
            return new He(e?e.id:null)}},{key:"requestPermission",value:function(){var e=this
            return Notification.requestPermission().then((function(t){switch("permission"in Notification||(Notification.permission=t),Notification.permission){case"default":case"denied":break
                case"granted":e.getDevice().getId()?e.subscribeToDefaultTags():e.retrieveAndStoreDeviceToken().then((function(){e.subscribeToDefaultTags()}))}}))}},{key:"subscribeToDefaultTags",value:function(){var e=this
            return this.getDefaultSubscriptionTags().then((function(t){return e.subscribeTo(t),t.map((function(e){return{id:e}}))}),(function(e){console.log("Error on defaultSubscribe:",e)}))}},{key:"getDefaultSubscriptionTags",value:function(){var e=this
            if(this.config.app.client.defaultSubscribedTags){if(console.log(this.config.app.client.defaultSubscribedTags,"getDefaultSubscriptionTags"),"function"==typeof this.config.app.client.defaultSubscribedTags)return this.getTags().then((function(t){return e.config.app.client.defaultSubscribedTags(t)}))
                if(Array.isArray(this.config.app.client.defaultSubscribedTags))return Promise.resolve(this.config.app.client.defaultSubscribedTags)
                if(this.config.app.client.defaultSubscribedTags)return Promise.resolve([this.config.app.client.defaultSubscribedTags])}return Promise.resolve([])}},{key:"getSubscribedTags",value:function(){var e=this
            if(this.getDevice().id){var t=this.storageService.getCache("subscribedTags")
                return t?Promise.resolve(t):this.pushDeliveryClient.getSubscribedTags(this.getDevice()).then((function(t){return e.storageService.addCache("subscribedTags",t,3600),t}))}throw new Error("Device is not initialized. Unable to retrieve the subscribe tags")}},{key:"subscribeTo",value:function(e){if(this.getDevice().id)return this.storageService.removeCache("subscribedTags"),this.pushDeliveryClient.subscribe(this.getDevice(),e)
            throw new Error("Device is not initialized. Unable to subscribe to tag")}},{key:"unsubscribeFrom",value:function(e){if(this.getDevice().id)return this.storageService.removeCache("subscribedTags"),this.pushDeliveryClient.unsubscribe(this.getDevice(),e)
            throw new Error("Device is not initialized. Unable to unsubscribe from tag")}},{key:"getPushNotificationPermission",value:function(){return Notification.permission}},{key:"getArchive",value:function(){return this.storageService.getAllEntries()}},{key:"getTags",value:function(){var e=this,t=this.storageService.getCache("tags")
            return t?Promise.resolve(t):this.pushDeliveryClient.getTags(this.getDevice()).then((function(t){return e.storageService.addCache("tags",t,3600),t}))}},{key:"validateConfig",value:function(e){if(!(e.app&&e.app.api.id&&e.app.api.baseUrl&&e.app.firebase))throw new Error("Push.delivery configuration is not valid!")}},{key:"debug",value:function(){var e=this
            return this.getSubscribedTags().then((function(t){var n="PushDeliveryDebug\n-----------------\nDevice:   "+e.getDevice().id+"\n\nSubscribedTags:"+JSON.stringify(t)
                e.getTags().then((function(e){var t=n+"\n\nTags:"+JSON.stringify(e)
                    console.log(t)}))})),""}}]),e}(),Ze=function(){function e(t){i()(this,e),this.config=t,this.defaultLanguage="en",this.config.ui.translations.defaultLanguage&&(this.defaultLanguage=this.config.ui.translations.defaultLanguage)}return a()(e,[{key:"getLabel",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r]
            var i=this.config.ui.translations[e]
            if(void 0===i&&(i=this.config.ui.translations[this.defaultLanguage]),i){for(var o=1;o<arguments.length;o++){if(!i[arguments[o]])return""
                i=i[arguments[o]]}return i}return""}},{key:"getTagLabel",value:function(e,t){return this.config.ui.tagLabels[e][t.name]}},{key:"getTagGroupLabel",value:function(e,t){return this.config.ui.tagGroupLabels[e][t.name]}}]),e}(),Qe=function(){function e(t){i()(this,e),this.pushDelivery=new Xe(t),this.mergedConfig=Je($e,t),this.config=function(e){var t=e,n=t.app.client.defaultSubscribedTags.split(/\s*,\s*/g).map((function(e){return Number(e)||e}))
        return console.log(n),t.app.client.defaultSubscribedTags=n,t}(this.mergedConfig),this.translationService=new Ze(this.config),this.settingsButtonId="pushDeliverySettingsButton",this.sidebarId="pushDeliverySidebar",this.askForPermissionDialogId="pushDeliveryAskForPermission",this.howtoRemoveDeniedPermisionDialogId="pushDeliveryRemoveDeniedPermission",this.pushDeliverySettingsLabelId="pushDeliverySettingsButtonLabel",this.archivePanelId="pushDeliverySettingsPanelArchive",this.settingsPanelId="pushDeliverySettingsPanelSettings",this.showArchiveButtonId="pushDeliverySettingsButtonArchive",this.showSettingsButtonId="pushDeliverySettingsButtonSettings",this.language=document.documentElement.lang,this.browser=this.userAgent(),!0===t.globalScope&&(window.pushDeliveryUI=this)}return a()(e,[{key:"init",value:function(){var e=this
            console.log("init pushUI",this.config),this.pushDelivery.setPayloadHandler((function(t){var n=t.data.title,r=e.pushDelivery.config.app.client.defaultUrl
                try{t.data.url&&(r=t.data.url),t.data.title||(n=" ")
                    var i={body:t.data.message||t.data.body,silent:!0,icon:t.data.icon,data:t.data,title:n,url:r,date:new Date}
                    e.showOnSiteNotification(i)}catch(e){console.log("failed",e)}})),this.pushDelivery.init(),console.log(this.config,"config pushUI"),this.config.app.client.autosubscribe?(console.log("No sidebar start"),this.createAskForPermissionDialog(),this.createHowToUnblockDialog(),this.askForPermissionOnLoad(),console.log("No sidebar end")):(this.createSettingsButton(),this.createSidebarPanel(),this.createAskForPermissionDialog(),this.createHowToUnblockDialog(),this.updateButtonLabel(),this.showElement(this.settingsButtonId,"flex"))}},{key:"updateButtonLabel",value:function(){var e=this,t=this.pushDelivery.getPushNotificationPermission(),n=document.getElementById(this.pushDeliverySettingsLabelId),r=document.documentElement.lang
            switch(t){case"default":n.textContent=this.translationService.getLabel(r,"settings","label_subscribe")
                break
                case"denied":n.textContent=this.translationService.getLabel(r,"settings","label_blocked")
                    break
                case"granted":this.pushDelivery.getDevice().id?this.pushDelivery.getSubscribedTags().then((function(t){0===t.length?n.textContent=e.translationService.getLabel(r,"settings","label_subscribe"):n.textContent=e.translationService.getLabel(r,"settings","label_subscribed")})):n.textContent=this.translationService.getLabel(r,"settings","label_subscribe")}}},{key:"handleSettingsButtonClick",value:function(e){return function(){switch(e.pushDelivery.getPushNotificationPermission()){case"default":e.showElement(e.askForPermissionDialogId)
            break
            case"denied":e.showElement(e.howtoRemoveDeniedPermisionDialogId)
                break
            case"granted":this.config.app.client.autosubscribe||(e.pushDelivery.getDevice().isValid()?e.pushDelivery.getSubscribedTags().then((function(t){0===t.length?e.pushDelivery.subscribeToDefaultTags().then((function(t){e.showSidebarInitialView(e,t)})):e.pushDelivery.getSubscribedTags().then((function(t){e.showSidebarInitialView(e,t)}))})):e.pushDelivery.retrieveAndStoreDeviceToken().then((function(){e.pushDelivery.subscribeToDefaultTags().then((function(t){e.showSidebarInitialView(e,t)}))})))}}}},{key:"showSidebarInitialView",value:function(e,t){e.updateSubscribedTagSelection(t),e.renderArchiveView(),e.showElement(e.archivePanelId),document.getElementById(e.showArchiveButtonId).className="pushdelivery__tab__msg active",document.getElementById(e.showSettingsButtonId).className="pushdelivery__tab__settings",e.showElement(e.sidebarId)}},{key:"showElement",value:function(e,t){document.getElementById(e)&&(t||(t="block"),document.getElementById(e).style.display=t)}},{key:"hideElement",value:function(e){document.getElementById(e)&&(document.getElementById(e).style.display="none")}},{key:"createSettingsButton",value:function(){var e=document.createElement("div")
            e.setAttribute("id",this.settingsButtonId),e.classList.add("pushdelivery__bell")
            var t=this.translationService.getLabel(this.language,"settings"),n=this.config.ui.color||"transparent",r=this.config.ui.template.bell.image||"",i=this.pushDeliverySettingsLabelId
            e.innerHTML='\n\t\t\t\t<div class="pushdelivery__bell__button" style="background-image: url(\''.concat(r,"'); background-color: ").concat(n,';"></div>\n\t\t\t\t<div class="pushdelivery__bell__info" id="bell_info">\n\t\t\t\t<div class="pushdelivery__bell__info--triangle"></div>\n\t\t\t\t<div id="').concat(i,'" class="pushdelivery__bell__info--text">').concat(t.label_subscribe,"</div>\n\t\t\t\t</div>\n\t\t\t\t"),e.addEventListener("click",this.handleSettingsButtonClick(this)),document.body.appendChild(e)}},{key:"askForPermissionOnLoad",value:function(){var e=this
            console.log(this,"ask")
            var t=this.pushDelivery.getPushNotificationPermission()
            switch(console.log(t,"current perm"),t){case"default":this.showElement(this.askForPermissionDialogId),console.log("default",this)
                break
                case"denied":console.log("denied",this.howtoRemoveDeniedPermisionDialogId),this.showElement(this.howtoRemoveDeniedPermisionDialogId)
                    break
                case"granted":console.log("granted"),this.pushDelivery.getDevice().isValid()?this.pushDelivery.getSubscribedTags().then((function(t){0===t.length?(console.log("granted no tags subscribed before"),e.pushDelivery.subscribeToDefaultTags()):(console.log("granted get tags"),e.pushDelivery.getSubscribedTags())})):this.pushDelivery.retrieveAndStoreDeviceToken().then((function(){console.log("granted but first timer"),e.pushDelivery.subscribeToDefaultTags()}))}}},{key:"createSidebarPanel",value:function(){var e=document.createElement("div")
            e.classList.add("pushdelivery__sidebar"),e.setAttribute("id",this.sidebarId)
            var t=this.translationService.getLabel(this.language,"sidebar")
            e.innerHTML='\n            <div class="pushdelivery__tab__close" id="pushdelivery__sidebar--close">'.concat(t.button_close,' X</div>\n            <ul class="pushdelivery__sidebar__navigation">\n                <li id="').concat(this.showArchiveButtonId,'" class="pushdelivery__tab__msg active">').concat(t.tab_notification,'</li>\n                <li id="').concat(this.showSettingsButtonId,'" class="pushdelivery__tab__settings"> ').concat(t.tab_settings,'</li>\n            </ul>\n            <ul id="').concat(this.archivePanelId,'" class="pushdelivery__sidebarmessages"></ul>\n            <div id="').concat(this.settingsPanelId,'" class="pushdelivery__sidebarsettings"></div>\n        '),document.body.appendChild(e)
            var n,r=this
            return document.getElementById(this.showArchiveButtonId).addEventListener("click",(function(){r.hideElement(r.settingsPanelId),r.showElement(r.archivePanelId),this.className="pushdelivery__tab__msg active",document.getElementById(r.showSettingsButtonId).className="pushdelivery__tab__settings"})),document.getElementById(this.showSettingsButtonId).addEventListener("click",(function(){r.showElement(r.settingsPanelId),r.hideElement(r.archivePanelId),this.className="pushdelivery__tab__settings active",document.getElementById(r.showArchiveButtonId).className="pushdelivery__tab__msg"})),document.getElementById("pushdelivery__sidebar--close").addEventListener("click",(n=this,function(){n.hideElement(n.sidebarId)})),this.hideElement(this.settingsPanelId),this.createSubscriptionView()}},{key:"createSubscriptionView",value:function(){var e=this
            return this.pushDelivery.getTags().then((function(t){e.config.ui.tagsFilter&&(t=e.config.ui.tagsFilter(t)),e.renderTagGroups(t)}))}},{key:"renderTagGroups",value:function(e){var t="",n=this,r=!0,i=this.translationService.getLabel(this.language,"tagGroupLabels")
            e.forEach((function(e){var n=i[e.sourceId]
                void 0===n&&(n="Sprache")
                var o='<li class="'.concat(r?"active":"",'" data-group-id="').concat(e.id,'">').concat(n,"</li>")
                t+=o,r=!1}))
            var o=document.createElement("div")
            o.className="pushdelivery__sidebarsettings_language"
            var a=document.createElement("div")
            void 0!==this.translationService.getLabel(this.language,"sidebar","label_language")?a.textContent=this.translationService.getLabel(this.language,"sidebar","label_language"):a.textContent="Sprache"
            var s=document.createElement("ul")
            s.innerHTML=t,o.appendChild(a),o.appendChild(s)
            var c=document.createElement("h3")
            c.className="pushdelivery__sidebarsettings__title",c.textContent=this.translationService.getLabel(this.language,"sidebar","label_tag_selection")
            var u=document.createElement("ul")
            u.className="pushdelivery__sidebarsettings__list",r=!0,e.forEach((function(e){if(e.tags){var t=n.renderTagsForGroup(e,r),i=!0,o=!1,a=void 0
                try{for(var s,c=t[Symbol.iterator]();!(i=(s=c.next()).done);i=!0){var l=s.value
                    u.appendChild(l)}}catch(e){o=!0,a=e}finally{try{i||null==c.return||c.return()}finally{if(o)throw a}}r=!1}}))
            var l=document.createElement("div"),f=document.createElement("button")
            f.className="pushdelivery__sidebarsettings__save",f.textContent=this.translationService.getLabel(this.language,"sidebar","button_save"),f.addEventListener("click",(function(){return n.hideElement(n.sidebarId)}))
            var d=document.createElement("button")
            d.className="pushdelivery__sidebarsettings__cancel",d.textContent=this.translationService.getLabel(this.language,"sidebar","button_unsubscribe"),d.addEventListener("click",(function(){return n.cancelAllSubscriptions()})),l.appendChild(f),l.appendChild(d)
            var p=document.getElementById(this.settingsPanelId)
            p.innerHTML="",p.appendChild(o),p.appendChild(c),p.appendChild(u),p.appendChild(l),this.appendGroupSelectionListeners(),this.appendTagSelectionListeners(this.pushDelivery)}},{key:"appendGroupSelectionListeners",value:function(){var e=document.getElementById(this.settingsPanelId).querySelectorAll("li[data-group-id]")
            e.forEach((function(t){t.addEventListener("click",(function(){var t=!0,n=!1,r=void 0
                try{for(var i,o=e[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){i.value.className=""}}catch(e){n=!0,r=e}finally{try{t||null==o.return||o.return()}finally{if(n)throw r}}this.className="active"
                var a=this.getAttribute("data-group-id")
                document.querySelectorAll("li[data-parent-group-id]").forEach((function(e){e.getAttribute("data-parent-group-id")===a?e.style="display:list-item":e.style="display:none"}))}))}))}},{key:"appendTagSelectionListeners",value:function(e){document.getElementById(this.settingsPanelId).querySelectorAll("input[data-tag-id]").forEach((function(t){t.addEventListener("click",(function(){var t=this.getAttribute("data-tag-id")
            this.checked?e.subscribeTo(t):e.unsubscribeFrom(t)}))}))}},{key:"updateSubscribedTagSelection",value:function(e){var t=document.querySelectorAll("input[data-tag-id]"),n=!0,r=!1,i=void 0
            try{for(var o,a=t[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){o.value.checked=!1}}catch(e){r=!0,i=e}finally{try{n||null==a.return||a.return()}finally{if(r)throw i}}t.forEach((function(t){var n=parseInt(t.getAttribute("data-tag-id"))
                e.forEach((function(e){e.id===n&&(t.checked=!0)}))}))}},{key:"renderTagsForGroup",value:function(e,t){var n=[]
            return e.tags.forEach((function(r){var i=document.createElement("li")
                i.setAttribute("data-parent-group-id",e.id),i.setAttribute("data-tag-id",r.id),i.style=t?"display: list-item":"display: none",i.innerHTML='\n\t\t        <label class="check-label" for="'.concat(r.id,'">\n\t\t            <input type="checkbox" id="').concat(r.id,'" data-tag-id="').concat(r.id,'" name="').concat(r.name,'">\n\t\t            ').concat(r.name,"\n\t\t        </label>\n            \t"),n.push(i)})),n}},{key:"createHowToUnblockDialog",value:function(){var e=document.createElement("div")
            e.classList.add("pushdelivery__denied"),e.style="display:none",e.setAttribute("id",this.howtoRemoveDeniedPermisionDialogId)
            var t,n=this.translationService.getLabel(this.language,"howToUnblockDialog")
            e.innerHTML='\n    \t\t<div class="pushdelivery__modalbody">\n\t    \t\t<div class="pushdelivery__modalbody__picture">\n\t    \t\t\t<img src="'.concat(this.config.ui.template.modal.logo,'" alt="Logo">\n\t    \t\t</div>\n\t    \t\t<div class="pushdelivery__modalbody__content">\n\t    \t\t\t<h3 class="pushdelivery__modalbody__title">').concat(n.label_title,'</h3>\n\t    \t\t\t<p class="pushdelivery__modalbody__text">').concat(n.label_description,'</p>     \n\t    \t\t\t<div class="pushdelivery__image"><img src="').concat(n.image[this.browser],'" alt="How to unblock your browser."></div>\n\t    \t\t</div>\n\t    \t\t<div id="pushdelivery__denied--modal-close" class="pushdelivery__denied__close">\n\t    \t\t</div>\n    \t\t</div>\n    \t\t'),document.body.appendChild(e),document.getElementById("pushdelivery__denied--modal-close").addEventListener("click",(t=this,function(){t.hideElement(t.howtoRemoveDeniedPermisionDialogId)}))}},{key:"showOnSiteNotification",value:function(e){var t=document.createElement("div")
            t.classList.add("pushdelivery","pushdelivery__notification"),t.setAttribute("id","pushdelivery__notification--modal"),e.url=e.url||window.location.href,e.title=e.title||"Push Nachricht",t.innerHTML='\n  <div class="pushdelivery__notification--icon">\n  <a href="'.concat(e.url,'">\n  <img src="').concat(e.icon,'" width="100%" height="100%" alt="Firmen Icon"></div>\n  <div class="pushdelivery__notification--content">\n  <div class="pushdelivery__notification--title">').concat(e.title,'</div>\n  <div class="pushdelivery__notification--text">').concat(e.body,'</div>\n  <li class="pushdelivery__notification--date">').concat(e.date.toLocaleString("de-DE",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"}),"</li>\n  </a>\n  </div>\n  "),document.body.appendChild(t)
            var n=document.getElementById("pushdelivery__notification--modal")
            setTimeout((function(){n.remove()}),5e3)}},{key:"createAskForPermissionDialog",value:function(){var e=document.createElement("div")
            e.style="display:none",e.classList.add("pushdelivery","pushdelivery__modal"),e.setAttribute("id",this.askForPermissionDialogId)
            var t,n=this.translationService.getLabel(this.language,"askForPermissionsDialog")
            e.innerHTML='\n\t\t\t<div class="pushdelivery__modalbody">\n\t\t\t<div class="pushdelivery__modalbody__picture">\n\t\t\t<img src="'.concat(this.config.ui.template.modal.logo,'" alt="">\n\t\t\t</div>\n\t\t\t<div class="pushdelivery__modalbody__content">\n\t\t\t<p class="pushdelivery__modalbody__text">\n\t\t\t').concat(n.label_description,'\n\t\t\t</p>     \n\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="pushdelivery__modalfooter">\n\t\t\t<div class="pushdelivery__modalfooter__confirm-buttons">\n\t\t\t<button id="modal_deny" class="pushdelivery__modalfooter__deny"">').concat(n.button_deny,'</button>\n\t\t\t<button id="modal_allow" class="pushdelivery__modalfooter__allow"">').concat(n.button_confirm,"</button>\n\t\t\t</div>\n\t\t\t</div>\n\t\t\t"),document.body.appendChild(e),document.getElementById("modal_deny").addEventListener("click",(t=this,function(){t.hideElement(t.askForPermissionDialogId)})),document.getElementById("modal_allow").addEventListener("click",this.requestPermission(this))}},{key:"renderArchiveView",value:function(){var e=this
            this.pushDelivery.getArchive().then((function(t){var n=document.getElementById(e.archivePanelId)
                if(n.innerHTML="",0===t.length)n.innerHTML='<li class="no-notifications">'.concat(e.translationService.getLabel(e.language,"sidebar","message_list_empty"),"</li>")
                else{var r=!0,i=!1,o=void 0
                    try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var c=a.value
                        n.innerHTML+='<li class="pushdelivery__archive_notification"><a href="'.concat(c.url,'" target="_blank">\n                            <strong>').concat(c.title,'</strong>\n                            <p class="notification-text">').concat(c.text,'</p>\n                            <p class="notification-date">').concat(c.date.toLocaleString("de-DE",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"}),"</p></a></li>")}}catch(e){i=!0,o=e}finally{try{r||null==s.return||s.return()}finally{if(i)throw o}}}}))}},{key:"requestPermission",value:function(e){return this.config.app.client.autosubscribe?function(){e.hideElement(e.askForPermissionDialogId),e.pushDelivery.requestPermission()}:function(){e.hideElement(e.askForPermissionDialogId),e.pushDelivery.requestPermission().then((function(){e.updateButtonLabel()}))}}},{key:"userAgent",value:function(){var e,t=navigator.userAgent
            return t.indexOf("Chrome")>-1?e="chrome":t.indexOf("Firefox")>-1?e="firefox":t.indexOf("Safari")>-1&&(e="safari"),e}},{key:"cancelAllSubscriptions",value:function(){var e=this
            this.confirmUnsubscribeWindow()&&(this.pushDelivery.getSubscribedTags().then((function(t){e.pushDelivery.unsubscribeFrom(t.map((function(e){return e.id}))).then((function(){e.updateButtonLabel()}))})),this.hideElement(this.sidebarId))}},{key:"confirmUnsubscribeWindow",value:function(){var e=this.translationService.getLabel(this.language,"confirm")
            return window.confirm(e.label_text)}}]),e}()
    n(11)
    window.PushDeliveryUI=Qe,window.PushDelivery=Xe}])}))