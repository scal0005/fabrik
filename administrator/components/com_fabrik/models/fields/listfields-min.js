/*! Fabrik */
var ListFieldsElement=my.Class({addWatched:!1,options:{conn:null,highlightpk:!1,showAll:1,mode:"dropdown",defaultOpts:[],addBrackets:!1},constructor:function(a,b){this.strEl=a;var c,d;if(this.el=a,this.options=$.append(this.options,b),this.options.defaultOpts.length>0){this.el=$("#"+this.el),"gui"===this.options.mode?(this.select=this.el.parent().find("select.elements"),d=[this.select],0===$("#"+this.options.conn).length&&this.watchAdd()):(d=document.getElementsByName(this.el.name),this.el.empty(),$("#"+this.strEl).empty());var e=this.options.defaultOpts;Array.each(d,function(a){$("#"+a).empty()}),e.each(function(a){var b={value:a.value};a.value===this.options.value&&(b.selected="selected"),Array.each(d,function(d){c=a.label?a.label:a.text,$(document.createElement("option")).attr(b).text(c).inject(d)})}.bind(this))}else 0===$("#"+this.options.conn).length?this.cnnperiodical=setInterval(function(){this.getCnn.call(this,!0)},500):this.setUp()},cloned:function(a,b){this.strEl=a,this.el=$("#"+a),this._cloneProp("conn",b),this._cloneProp("table",b),this.setUp()},_cloneProp:function(a,b){var c=this.options[a].split("-");c=c.splice(0,c.length-1),c.push(b),this.options[a]=c.join("-")},getCnn:function(){0!==$("#"+this.options.conn).length&&(this.setUp(),clearInterval(this.cnnperiodical))},setUp:function(){var a=this;this.el=$("#"+this.el),"gui"===this.options.mode&&(this.select=this.el.parent().find("select.elements")),$("#"+this.options.conn).on("change",function(){a.updateMe()}),$("#"+this.options.table).on("change",function(){a.updateMe()});var b=$("#"+this.options.conn).val();""!==b&&-1!==b&&(this.periodical=setInterval(function(){this.updateMe.call(this,!0)},500)),this.watchAdd()},watchAdd:function(){var a=this;if(this.addWatched!==!0){console.log("watch add",this),this.addWatched=!0;var b=this.el.parent().find("button");b.on("mousedown",function(b){b.stop(),a.addPlaceHolder()}),b.on("click",function(a){a.stop()})}},updateMe:function(e){var self=this;"object"==typeof e&&e.stop(),$("#"+this.el.id+"_loader").show();var cid=$("#"+this.options.conn).val(),tid=$("#"+this.options.table).val();if(tid){clearInterval(this.periodical);var url="index.php?option=com_fabrik&format=raw&task=plugin.pluginAjax&g=element&plugin=field&method=ajax_fields&showall="+this.options.showAll+"&cid="+cid+"&t="+tid,myAjax=$.ajax({url:url,method:"get",data:{highlightpk:this.options.highlightpk,k:2}}).done(function(r){var els;0!==$("#"+self.strEl).length&&(self.el=$("#"+self.strEl)),"gui"===self.options.mode?els=[self.select]:(els=document.getElementsByName(self.el.name),self.el.empty(),$("#"+self.strEl).empty());var opts=eval(r);Array.each(els,function(a){$("#"+a).empty()}),opts.each(function(a){var b={value:a.value};a.value===self.options.value&&(b.selected="selected"),Array.each(els,function(c){$(document.createElement("option")).attr(b).text(a.label).inject(c)})}),$("#"+self.el.id+"_loader").hide()});Fabrik.requestQueue.add(myAjax)}},addPlaceHolder:function(){var a=this.el.parent().find("select"),b=a.get("value");this.options.addBrackets&&(b=b.replace(/\./,"___"),b="{"+b+"}"),this.insertTextAtCaret(this.el,b)},getInputSelection:function(a){var b,c,d,e,f,g=0,h=0;return"number"==typeof a.selectionStart&&"number"==typeof a.selectionEnd?(g=a.selectionStart,h=a.selectionEnd):(c=document.selection.createRange(),c&&c.parentElement()===a&&(e=a.value.length,b=a.value.replace(/\r\n/g,"\n"),d=a.createTextRange(),d.moveToBookmark(c.getBookmark()),f=a.createTextRange(),f.collapse(!1),d.compareEndPoints("StartToEnd",f)>-1?g=h=e:(g=-d.moveStart("character",-e),g+=b.slice(0,g).split("\n").length-1,d.compareEndPoints("EndToEnd",f)>-1?h=e:(h=-d.moveEnd("character",-e),h+=b.slice(0,h).split("\n").length-1)))),{start:g,end:h}},offsetToRangeCharacterMove:function(a,b){return b-(a.value.slice(0,b).split("\r\n").length-1)},setSelection:function(a,b,c){if("number"==typeof a.selectionStart&&"number"==typeof a.selectionEnd)a.selectionStart=b,a.selectionEnd=c;else if("undefined"!=typeof a.createTextRange){var d=a.createTextRange(),e=this.offsetToRangeCharacterMove(a,b);d.collapse(!0),b===c?d.move("character",e):(d.moveEnd("character",this.offsetToRangeCharacterMove(a,c)),d.moveStart("character",e)),d.select()}},insertTextAtCaret:function(a,b){var c=this.getInputSelection(a).end,d=c+b.length,e=a.value;a.value=e.slice(0,c)+b+e.slice(c),this.setSelection(a,d,d)}});