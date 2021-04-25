<!--#config errmsg="" -->
<!--# if expr="${SERVER_NAME}=/^*/" -->
<!--#include file="/include/config.html" -->
<!--# else -->
<!--#include virtual="/include/config.html" -->
<!--# endif -->

var Com = {
    //公共url
    Url: {
        //接口地址
        localUrl  : "<!--#echo var='8BX_OPENAPI_HOST'-->/tools/?service=",           //接口域名1
        localUrl2 : "<!--#echo var='8BX_OPENAPI2_HOST'-->/hx/?service=",             //接口域名2
        localUrl3 : "<!--#echo var='8BX_OPENAPI2_HOST'-->/tools/?service=",          //接口域名3
        cmsUrl    : "<!--#echo var='8BX_OPENAPI_HOST'-->/cms/?service=",             //cms域名
        openUrl   : "<!--#echo var='8BX_MYID_HOST'-->/cn/openAccount.html?action=0", //真实开户
        open2Url  : "<!--#echo var='8BX_MYID_HOST'-->/cn/demoAccount.html?action=0", //虚拟开户
        downUrl   : "<!--#echo var='8BX_APP2_HOST'-->/index.html?appType=BTS",       //下载APP
        webUIUrl  : "<!--#echo var='8BX_TRADING_HOST'-->",                           //BTC网页版
        userUrl   : "<!--#echo var='8BX_BTS_HOST'-->",                               //客户中心域名
        bxUrl     : "<!--#echo var='8BX_HTML_HOST'-->",                              //8bx官网
        mbxUrl    : "<!--#echo var='8BX_M_HOST'-->",                                 //8bx m站官网
        serverUrl : "<!--#echo var='8BX_HTML_HOST'-->/customerService.html",         //8bx官网  客服
        serverUrl2: "<!--#echo var='8BX_M_HOST'-->/customerService.html",            //8bx  m站客服
        QQUrl     : "http://wpa.b.qq.com/cgi/wpa.php?ln=2&uin=800829525",            //QQ客服
        noticeUrl : 'http://192.168.35.100:8083/Goldoffice_gateway_uat/RESTful/backoffice_ro',  //集团的公告域名

        //接口名称
        Method: {
            getQuote         : 'getQuoteBtc',               //价格行情
            notice           : 'Base.getNoticeDatas',       //公告
            noticeDetail     : 'Base.getNoticeDetail',      //公告
            getIPLocation    : 'Base.getIPLocation',        //判断ip
            getAngelActivity : 'getAngelActivity',          //活动领取人数
            getAdvStatistics : 'Ad.addAdvStatistics',       //ums广告
            getType          : 'Advisory.getType',          //资讯栏目
            getList          : 'Advisory.getList',          //资讯列表
            getAd            : 'Ad.get',                    //广告内容
            getAdList        : 'Ad.getList',                //广告内容
            getAdNewlist     : 'Ad.getNewlist',             //广告内容
            quickList        : 'Advisory.quickList',        //快讯列表
            getTopList       : 'Advisory.getTopList',       //热门资讯列表
            details          : 'Advisory.details',          //资讯详情
            getKData         : 'Quotes.getkdata',           //8比汇官网行情接口-走势图
            marketprice      : 'Quotes.marketprice',        //8比汇官网行情接口-列表
            CGetList         : 'Contract.getContractList',          //获取合约
            CGetInfo         : 'Contract.getInfo',          //合约细则
            getVote          : 'Vote.getvote',              //获取投票
            setVote          : 'Vote.setvote',              //设置投票
            friendsGetList   : 'Friends.getList',           //获取友情链接列表
            actGetInfo       : 'Activity.getInfo',          //活动配置
            Help             : 'Help.getType',              //帮助中心
            HelpList         : 'Help.getList',              //帮助中心列表
            activityCheckIn  : 'Event.joinEventByAccounts', //活动报名
            activityBounty   : 'Bounty.bountyprofit', //活动线上报名
            actInfo          : 'recommended.getInviteCode', //活动信息
            actInfo2         : 'recommended.setRelationShip',//活动信息2
            getSpreadLink    : 'recommended.getSpreadLink', //活动链接和二维码
            acGetList        : 'ActivitySet.getList',       //活动专区
            actNum           : 'Event.getAccountEventCurrentLot', //活动手数
            noticeList       : 'Pushsystem.webNoticeList',  //公告列表
            indexData        : 'indexdata.index',           //运营数据
            bounty           : 'Bounty.bountyprofit',       //增利宝活动报名
            pdgroupvolume    : 'Bounty.pdgroupvolume',      //交易手数
            hotProducts      : 'Tradevolume.getHotSymbol',  //当月热门产品
            getAccountEventStatus: 'Event.getAccountEventStatus',       //有无报名
            topicDetail      : 'Topic.getDetail',       //话题专题详情
            getCrunchies     : 'Crunchies.deal'             //持仓/建仓比例
        }
    },
    /**
     * 执行Ajax
     * @para (url : 地址 , data : json数据格式类型 , type : post or get , success_callback : 成功后返回的信息)
     */
    Ajax: function (url, data, type, _success_callback, _error_callback) {
        AjaxLog("----------------------- Ajax Start ----------------------------------");
        AjaxLog("请求地址：" + url);
        AjaxLog("请求参数：" + JSON.stringify(data));
        AjaxLog("请求类型：" + type);
        _error_callback  = _error_callback || function () {
            AjaxLog("请求失败:" + url);
            return false;
        };

        /*if(type !== "get" && type !== "GET"){
            data = JSON.stringify(data)
        }*/

        var dataType = 'jsonp';
        if(data.dataType){
            dataType = 'json';
        }
        delete data.dataType;

        try {
            $.ajax({
                url: url,
                type: type,
                dataType: dataType,
                contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                timeout: 60000,
                async: true,
                data: data,
                success: function (_res) {
                    AjaxLog("Ajax success!");
                    if (_success_callback) {
                        AjaxLog("接收参数 ："+url+ JSON.stringify(_res));
                        if(_res.ret !== 200){
                            // alert(_res.msg)
                            return false;
                        }else{
                            _success_callback(_res);
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    AjaxLog("Ajax error!");
                    if(_error_callback){
                        _error_callback();
                    }
                    AjaxLog(XMLHttpRequest.status);
                    AjaxLog(XMLHttpRequest.readyState);
                    AjaxLog(textStatus);
                }
            });
        } catch (e) {
            AjaxLog(e.name + ":" + e.message);
        }
    },
    /**
     * 设置cookie
     * @para (name: key, value: 值, hours: 时间)
     * */
    setCookies: function (name, value, hours) {
        var expire = "";
        if (hours != null)
        {
            expire = new Date ((new Date ()).getTime () + hours * 3600000);
            expire = "; expires=" + expire.toGMTString ();
        }
        document.cookie = name + "=" + escape (value) + expire;
    },
    /**
     * 获取cookie
     * @para (name: 值)
     * */
    getCookies: function (name) {
        var cookieValue = "";
        var search = name + "=";
        if (document.cookie.length > 0)
        {
            var offset = document.cookie.indexOf (search);
            if (offset != -1)
            {
                offset += search.length;
                var end = document.cookie.indexOf (";", offset);
                if (end == -1)
                    end = document.cookie.length;
                cookieValue = unescape (document.cookie.substring (offset, end))
            }
        }
        return cookieValue;
    },
    /**
     * 删除cookie
     * @para (name: 值)
     * */
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = Com.getCookies(name);
        if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    },
    /**
     * 获取url中的参数
     * @para (name: 值)
     * */
    getQueryString: function (name) {
        var text = window.location.href.split("?")[1];
        if(text){
            var reg = new RegExp("(^|&)" + name  + "=([^&]*)(&|$)");
            var r = window.location.href.split("?")[1].match(reg);
            if (r != null) return unescape(r[2]);
        }else{
            return null;
        }
    },
    /**
     * string 转 dom
     * @para (id: htmlId, arg: 值)
     * */
    parseDom: function (id, arg) {
        var objE = document.getElementById(id);
        objE.innerHTML = arg;
        return objE.childNodes;
    },
    /**
     * 移动端设置rem
     * */
    setRem: function(){
        !function(n){
            var  e=n.document,
                t=e.documentElement,
                i=720,
                d=i/100,
                o="orientationchange"in n?"orientationchange":"resize",
                a=function(){
                    var n=t.clientWidth||320;n>720&&(n=720);
                    t.style.fontSize=n/d+"px"
                };
            e.addEventListener&&(n.addEventListener(o,a,!1),e.addEventListener("DOMContentLoaded",a,!1))
        }(window);
    },
    /**
     * 判断设备
     * */
    browserRedirect: function(){
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            // document.writeln("phone");
            return true;
        } else {
            // document.writeln("pc");
            return false;
        }
    },
    /*移动设备判断安卓||IOS*/
    sysPlatform:function() {
        var isMobile = isMobileAccess(),
            userAgent = navigator.userAgent.toLowerCase(),
            sys = "";

        if (isMobile) {
            //安卓
            if (userAgent.match(/android/i)) {
                sys = "android";
            }
            //苹果
            if (userAgent.match(/(iphone|ipad|ipod|ios)/i)) {
                sys = "ios";
            }
            return sys;
        } else {
            return false;
        }
    },
    /**
     * 倒计时
     * @para (StartDate: 开始时间, EndDate: 结束时间, _success: 成功函数, _error: 失败函数)
     * */
    countDown: function (StartDate, EndDate, _success, _error) {
        var NowTime;
        function GetRTime() {
            var EndTime   = new Date(EndDate); //截止时间
            // var StartTime = new Date("December 12 12:00:00 2016");
            var nMS = EndTime.getTime() - NowTime.getTime();
            var nD = Math.floor(nMS / (1000 * 60 * 60 * 24));
            var nH = Math.floor(nMS / (1000 * 60 * 60)) % 24;
            var nM = Math.floor(nMS / (1000 * 60)) % 60;
            var nS = Math.floor(nMS / 1000) % 60;
            // var nU = Math.floor(nMS / 100) % 10;
            if(nD >= 0) {
                var data = {
                    Day : nD,
                    Hour : nH,
                    Minute : nM,
                    Second : nS
                };
                if(_success){
                    _success(data);
                }
                setTimeout(GetRTime, 1000);
            }else{
                if(_error){
                    _error();
                }
            }
            NowTime = new Date(NowTime.valueOf() + 1000);
        }
        NowTime = new Date(StartDate);
        GetRTime();
    },
    /**
     * 倒计时
     * @para (startTime: 开始时间,  _success: 成功函数)
     * */
    timing: function (startTime, _success) {
        var calculationTime = function(startTime) {
            var s1 = new Date(startTime.replace(/-/g, "/")),
                s2 = new Date(),
                runTime = parseInt((s2.getTime() - s1.getTime()) / 1000);
            var year = Math.floor(runTime / 86400 / 365);
            runTime = runTime % (86400 * 365);
            var month = Math.floor(runTime / 86400 / 30);
            runTime = runTime % (86400 * 30);
            var day = Math.floor(runTime / 86400);
            runTime = runTime % 86400;
            var hour = Math.floor(runTime / 3600);
            runTime = runTime % 3600;
            var minute = Math.floor(runTime / 60);
            runTime = runTime % 60;
            var second = runTime;
            var time = {
                year: year,
                month: month,
                day: day,
                hour: hour,
                minute: minute,
                second: second,
            }
            if(_success){
                _success(time);
            }
        };
        setInterval(function () {
            calculationTime(startTime)
        }, 1000);
    },
    /**
     * 查看大图
     * @para (id: html Id)
     * */
    pictureImg: function (id){
        $(id).find("img").click(function () {
            appendImg(this)
        })

        function appendImg(target) {
            var $img = '<div class="big-picture-box">' +
                '    <div class="big-picture-mask"></div>' +
                '    <div class="big-picture-main">' +
                '       <i class="big-picture-close" id="pictureClose"> </i>' +
                '       <img src="" id="pictureImg" alt="" />' +
                '    </div>' +
                '</div>'
            var $imgBox = $(".big-picture-box").length;
            var $imgUrl = $(target).attr("src");
            if(!$imgBox){
                $("body").append($img)
            }
            $("#pictureImg").attr("src", $imgUrl);

            $("#pictureClose").click(function () {
                $(".big-picture-box").remove();
            })
        }
    },
    /**
     * 复制
     * @para (message: 值,  _success: 成功函数)
     * */
    copy: function (message, _success) {
        var input = document.createElement("input");
        input.value = message;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
        document.body.removeChild(input);
        if(_success){
            _success();
        }
    },
    /**
     * 获取app登录相关信息
     * @para (success: 成功函数)
     * */
    getInfo: function(success){
        var data1 = {};
        var data2={}
        if(accountApp()){
            data2 = accountApp()
            data1.isApp =true
        }else{
            data1.account =false
            data1.channel =false
            data1.isApp =false
        }
        var data = $.extend(true,data1, data2);
        // console.log(JSON.stringify(data))
        // $("body").append('<div style="position: fixed; top:300px;left:50px;background: red;color: fff;z-index: 99999;">'+JSON.stringify(data)+'</div>')
        if (success) {
            success(data)
        }
    },
}




//打印日志开关
var AjaxConsoleLog = false;
var AjaxLog = (function(oriLogFunc){
    return function(str)
    {
        if (AjaxConsoleLog) {
            oriLogFunc.call(console, str);
        }
    }
})(console.log);

var openConsoleLog = true;
var consoleLog = (function(oriLogFunc){
    return function(str)
    {
        if (openConsoleLog) {
            oriLogFunc.call(console, str);
        }
    }
})(console.log);