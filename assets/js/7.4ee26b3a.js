(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{347:function(e,t,n){"use strict";n(353)},353:function(e,t,n){},360:function(e,t,n){},420:function(e,t,n){"use strict";n(360)},482:function(e,t,n){"use strict";n.r(t);const o=["There's nothing here.","How did we get here?","That's a Four-Oh-Four.","Looks like we've got some broken links."];var s={computed:{noFoundPageByTencent(){return!1!==this.$themeConfig.noFoundPageByTencent}},mounted(){if(this.noFoundPageByTencent){const e=document.createElement("script");e.setAttribute("homePageName","回到首页"),e.setAttribute("homePageUrl","/"),e.setAttribute("src","//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js"),document.body.append(e)}},methods:{getMsg:()=>o[Math.floor(Math.random()*o.length)]}},c=(n(347),n(420),n(0)),r=Object(c.a)(s,(function(){var e=this,t=e._self._c;return e.noFoundPageByTencent?e._e():t("section",{staticClass:"theme-container"},[t("article",{staticClass:"content"},[t("h1",[e._v("404")]),e._v(" "),t("blockquote",[e._v(e._s(e.getMsg()))]),e._v(" "),t("router-link",{attrs:{to:"/"}},[e._v("Take me home.")])],1)])}),[],!1,null,null,null);t.default=r.exports}}]);