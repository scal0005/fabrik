/*! Fabrik */

define(["jquery","fab/list-plugin"],function(a,b){return new Class({Extends:b,initialize:function(a){this.parent(a)},buttonAction:function(){this.list.submit("list.doPlugin")}})});