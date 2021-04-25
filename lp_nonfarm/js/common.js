var Com = {
    /**
     * 获取url中的参数
     * @para (name: 值)
     * */
    getQueryString: function (name) {
        var text = window.location.href.split("?")[1];
        if (text) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.href.split("?")[1].match(reg);
            if (r != null) return unescape(r[2]);
        } else {
            return null;
        }
    },
    /**
     * 判断设备
     * */
    browserRedirect: function () {
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
}
