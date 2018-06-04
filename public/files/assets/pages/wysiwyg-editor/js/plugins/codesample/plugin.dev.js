(function(exports){"use strict";var html="",baseDir;var modules={},exposedModules=[],moduleCount=0;var scripts=document.getElementsByTagName('script');for(var i=0;i<scripts.length;i++){var src=scripts[i].src;if(src.indexOf('/plugin.dev.js')!=-1){baseDir=src.substring(0,src.lastIndexOf('/'));}}
function require(ids,callback){var module,defs=[];for(var i=0;i<ids.length;++i){module=modules[ids[i]]||resolve(ids[i]);if(!module){throw'module definition dependecy not found: '+ ids[i];}
defs.push(module);}
callback.apply(null,defs);}
function resolve(id){if(exports.privateModules&&id in exports.privateModules){return;}
var target=exports;var fragments=id.split(/[.\/]/);for(var fi=0;fi<fragments.length;++fi){if(!target[fragments[fi]]){return;}
target=target[fragments[fi]];}
return target;}
function register(id){var target=exports;var fragments=id.split(/[.\/]/);for(var fi=0;fi<fragments.length- 1;++fi){if(target[fragments[fi]]===undefined){target[fragments[fi]]={};}
target=target[fragments[fi]];}
target[fragments[fragments.length- 1]]=modules[id];}
function define(id,dependencies,definition){var privateModules,i;if(typeof id!=='string'){throw'invalid module definition, module id must be defined and be a string';}
if(dependencies===undefined){throw'invalid module definition, dependencies must be specified';}
if(definition===undefined){throw'invalid module definition, definition function must be specified';}
require(dependencies,function(){modules[id]=definition.apply(null,arguments);});if(--moduleCount===0){for(i=0;i<exposedModules.length;i++){register(exposedModules[i]);}}
if(exports.AMDLC_TESTS){privateModules=exports.privateModules||{};for(id in modules){privateModules[id]=modules[id];}
for(i=0;i<exposedModules.length;i++){delete privateModules[exposedModules[i]];}
exports.privateModules=privateModules;}}
function expose(ids){exposedModules=ids;}
function writeScripts(){document.write(html);}
function load(path){html+='<script type="text/javascript" src="'+ baseDir+'/'+ path+'"></script>\n';moduleCount++;}
exports.define=define;exports.require=require;expose(["tinymce/codesampleplugin/Prism","tinymce/codesampleplugin/Utils","tinymce/codesampleplugin/Dialog","tinymce/codesampleplugin/Plugin"]);load('classes/Prism.js');load('classes/Utils.js');load('classes/Dialog.js');load('classes/Plugin.js');writeScripts();})(this);