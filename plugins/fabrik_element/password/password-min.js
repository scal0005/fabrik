/*! Fabrik */
var FbPassword=my.Class(FbElement,{options:{progressbar:!1},constructor:function(a,b){this.parent(a,b),this.options.editable&&this.ini()},ini:function(){var a=this;this.element&&this.element.on("keyup",function(b){a.passwordChanged(b)}),this.options.ajax_validation===!0&&this.getConfirmationField().on("blur",function(b){a.callvalidation(b)}),""===this.getConfirmationField().get("value")&&(this.getConfirmationField().value=this.element.value)},callvalidation:function(a){this.form.doElementValidation(a,!1,"_check")},cloned:function(a){console.log("cloned"),this.parent(a),this.ini()},passwordChanged:function(){var a=this.getContainer().find(".strength");if(0!==a.length){var b=new RegExp("^(?=.{6,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$","g"),c=new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$","g"),d=new RegExp("(?=.{6,}).*","g"),e=this.element,f="";if(this.options.progressbar){f+='<div class="bar bar-warning" style="width: 10%;"></div>';var g=Joomla.JText._("PLG_ELEMENT_PASSWORD_MORE_CHARACTERS");d.test(e.value)&&(f='<div class="bar bar-info" style="width: 30%;"></div>',g=Joomla.JText._("PLG_ELEMENT_PASSWORD_WEAK")),c.test(e.value)&&(f='<div class="bar bar-info" style="width: 70%;"></div>',g=Joomla.JText._("PLG_ELEMENT_PASSWORD_MEDIUM")),b.test(e.value)&&(f='<div class="bar bar-success" style="width: 100%;"></div>',g=Joomla.JText._("PLG_ELEMENT_PASSWORD_STRONG"));var h={title:g};try{jQuery(a).tooltip("destroy")}catch(i){console.log(i)}jQuery(a).tooltip(h)}else f=!1===d.test(e.value)?"<span>"+Joomla.JText._("PLG_ELEMENT_PASSWORD_MORE_CHARACTERS")+"</span>":b.test(e.value)?'<span style="color:green">'+Joomla.JText._("PLG_ELEMENT_PASSWORD_STRONG")+"</span>":c.test(e.value)?'<span style="color:orange">'+Joomla.JText._("PLG_ELEMENT_PASSWORD_MEDIUM")+"</span>":'<span style="color:red">'+Joomla.JText._("PLG_ELEMENT_PASSWORD_WEAK")+"</span>";a.html(f)}},getConfirmationField:function(){return this.getContainer().find("input[name*=check]")}});