(this["webpackJsonpreact-1"]=this["webpackJsonpreact-1"]||[]).push([[3],{292:function(e,n,t){e.exports={userPhoto:"Users_userPhoto__2nN_Q",navBar:"Users_navBar__3dIhe",userItem:"Users_userItem__UfaCw"}},293:function(e,n,t){"use strict";t.r(n);var r=t(30),a=t(31),o=t(34),s=t(32),l=t(35),u=t(0),c=t.n(u),i=t(10),p=t(128),g=function(e){return e.usersPage.users},f=function(e){return e.usersPage.pageSize},m=function(e){return e.usersPage.totalUsersCount},h=function(e){return e.usersPage.currentPage},d=function(e){return e.usersPage.followingInProgress},P=function(e){return e.usersPage.isFetching},v=t(44),E=t(33),w=t(292),b=t.n(w),C=function(e){for(var n=Math.ceil(e.totalUsersCount/e.pageSize),t=[],r=1;r<=n;r++)t.push(r);var a=Math.ceil(n/10),o=Object(u.useState)(1),s=Object(v.a)(o,2),l=s[0],i=s[1],p=10*(l-1)+1,g=10*l;return c.a.createElement("div",null,e.isFetching?c.a.createElement(E.a,null):null,c.a.createElement("div",null,l>1&&c.a.createElement("button",{onClick:function(){i(l-1)}},"Prev"),t.filter((function(e){return e>=p&&e<=g})).map((function(n){return c.a.createElement("span",{className:e.currentPage===n&&b.a.navBar,onClick:function(){e.onPageChanged(n)}},n)})),a>l&&c.a.createElement("button",{onClick:function(){i(l+1)}},"Next")))},U=t(50),I=t(16),_=t(49),j=t.n(_),k=function(e){var n=e.user,t=Object(U.a)(e,["user"]);return c.a.createElement("div",{className:b.a.userItem},c.a.createElement("div",null,c.a.createElement("span",null,c.a.createElement("div",null,c.a.createElement(I.b,{to:"/profile/".concat(n.id)},c.a.createElement("img",{src:null!=n.photos.small?n.photos.small:j.a,className:b.a.userPhoto}))),c.a.createElement("div",null,n.followed?c.a.createElement("button",{type:"button",disabled:t.followingInProgress.some((function(e){return e===n.id})),onClick:function(){t.unfollow(n.id)}},"Unfollow"):c.a.createElement("button",{disabled:t.followingInProgress.some((function(e){return e===n.id})),onClick:function(){t.follow(n.id)}},"Follow"))),c.a.createElement("span",null,c.a.createElement("span",null,c.a.createElement("div",null,n.name),c.a.createElement("div",null,null!==n.status&&n.status)))))},O=function(e){function n(){var e,t;Object(r.a)(this,n);for(var a=arguments.length,l=new Array(a),u=0;u<a;u++)l[u]=arguments[u];return(t=Object(o.a)(this,(e=Object(s.a)(n)).call.apply(e,[this].concat(l)))).onPageChanged=function(e){t.props.changePage(e,t.props.pageSize)},t}return Object(l.a)(n,e),Object(a.a)(n,[{key:"componentDidMount",value:function(){this.props.getUsers(this.props.currentPage,this.props.pageSize)}},{key:"render",value:function(){var e=this;return c.a.createElement("div",null,c.a.createElement(C,{totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,currentPage:this.props.currentPage,onPageChanged:this.onPageChanged,isFetching:this.props.isFetching}),this.props.users.map((function(n){return c.a.createElement(k,{users:n,unfollow:e.props.unfollow,follow:e.props.follow,followingInProgress:e.props.followingInProgress})})))}}]),n}(c.a.Component);n.default=Object(i.b)((function(e){return{users:g(e),pageSize:f(e),totalUsersCount:m(e),currentPage:h(e),followingInProgress:d(e),isFetching:P(e)}}),{getUsers:p.d,follow:p.c,unfollow:p.e,changePage:p.a})(O)}}]);
//# sourceMappingURL=3.c7287ad6.chunk.js.map