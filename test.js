
encode64 = function(a) {
    if (!a)
        return "";
    a = a.toString();
    var b, c, d, e, f, g, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (d = a.length,
    c = 0,
    b = ""; d > c; ) {
        if (e = 255 & a.charCodeAt(c++),
        c == d) {
            b += h.charAt(e >> 2),
            b += h.charAt((3 & e) << 4),
            b += "==";
            break
        }
        if (f = a.charCodeAt(c++),
        c == d) {
            b += h.charAt(e >> 2),
            b += h.charAt((3 & e) << 4 | (240 & f) >> 4),
            b += h.charAt((15 & f) << 2),
            b += "=";
            break
        }
        g = a.charCodeAt(c++),
        b += h.charAt(e >> 2),
        b += h.charAt((3 & e) << 4 | (240 & f) >> 4),
        b += h.charAt((15 & f) << 2 | (192 & g) >> 6),
        b += h.charAt(63 & g)
    }
    return b
}
  , QS = function() {
    for (var a = {}, b = window.location.search.substring(1), c = b.split("&"), d = 0; d < c.length; d++) {
        var e = c[d].split("=");
        if ("undefined" == typeof a[e[0]])
            a[e[0]] = e[1];
        else if ("string" == typeof a[e[0]]) {
            var f = [a[e[0]], e[1]];
            a[e[0]] = f
        } else
            a[e[0]].push(e[1])
    }
    return a
};
function decode64(a) {
    if (!a)
        return "";
    a = a.toString();
    var b, c, d, e, f, g, h, i = new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);
    for (g = a.length,
    f = 0,
    h = ""; g > f; ) {
        do
            b = i[255 & a.charCodeAt(f++)];
        while (g > f && -1 == b);if (-1 == b)
            break;
        do
            c = i[255 & a.charCodeAt(f++)];
        while (g > f && -1 == c);if (-1 == c)
            break;
        h += String.fromCharCode(b << 2 | (48 & c) >> 4);
        do {
            if (d = 255 & a.charCodeAt(f++),
            61 == d)
                return h;
            d = i[d]
        } while (g > f && -1 == d);if (-1 == d)
            break;
        h += String.fromCharCode((15 & c) << 4 | (60 & d) >> 2);
        do {
            if (e = 255 & a.charCodeAt(f++),
            61 == e)
                return h;
            e = i[e]
        } while (g > f && -1 == e);if (-1 == e)
            break;
        h += String.fromCharCode((3 & d) << 6 | e)
    }
    return h
}

var PlayListData = function(a, b, c) {
        var d = this;
        new Date;
        this._sid = YKP.userCache.sid,
        this._fileType = c,
        this._videoSegsDic = {};
        var e = (new RandomProxy,
        [])
            , f = [];
        f.streams = {},
        f.logos = {},
        f.typeArr = {},
        f.totalTime = {};
        for (var g = 0; g < b.length; g++) {
                for (var h = b[g].audio_lang, i = !1, j = 0; j < e.length; j++)
                        if (e[j] == h) {
                                i = !0;
                                break
                        }
                i || e.push(h)
        }
        for (var g = 0; g < e.length; g++) {
                for (var k = e[g], l = {}, m = {}, n = [], j = 0; j < b.length; j++) {
                        var o = b[j];
                        if (k == o.audio_lang) {
                                if (!d.isValidType(o.stream_type))
                                        continue;var p = d.convertType(o.stream_type)
                                    , q = 0;
                                "none" != o.logo && (q = 1),
                                m[p] = q;
                                var r = !1;
                                for (var s in n)
                                        p == n[s] && (r = !0);
                                r || n.push(p);
                                var t = o.segs;
                                if (null  == t)
                                        continue;var u = [];
                                r && (u = l[p]);
                                for (var v = 0; v < t.length; v++) {
                                        var w = t[v];
                                        if (null  == w)
                                                break;
                                        var x = {};
                                        x.no = v,
                                        x.size = w.size,
                                        x.seconds = Number(w.total_milliseconds_video) / 1e3,
                                        x.milliseconds_video = Number(o.milliseconds_video) / 1e3,
                                        x.key = w.key,
                                        x.fileId = this.getFileId(o.stream_fileid, v),
                                        x.src = this.getVideoSrc(j, v, a, o.stream_type, x.fileId),
                                        x.type = p,
                                        u.push(x)
                                }
                                l[p] = u
                        }
                }
                var y = this.langCodeToCN(k).key;
                f.logos[y] = m,
                f.streams[y] = l,
                f.typeArr[y] = n
        }
        this._videoSegsDic = f,
        this._videoSegsDic.lang = this.langCodeToCN(e[0]).key
}
    , RandomProxy = function(a) {
        this._randomSeed = a,
        this.cg_hun()
}
;
RandomProxy.prototype = {
    cg_hun: function() {
        this._cgStr = "";
        for (var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890", b = a.length, c = 0; b > c; c++) {
            var d = parseInt(this.ran() * a.length);
            this._cgStr += a.charAt(d),
            a = a.split(a.charAt(d)).join("")
        }
    },
    cg_fun: function(a) {
        for (var b = a.split("*"), c = "", d = 0; d < b.length - 1; d++)
            c += this._cgStr.charAt(b[d]);
        return c
    },
    ran: function() {
        return this._randomSeed = (211 * this._randomSeed + 30031) % 65536,
        this._randomSeed / 65536
    }
},
PlayListData.prototype = {
        getFileId: function(a, b) {
                if (null  == a || "" == a)
                        return "";
                var c = ""
                    , d = a.slice(0, 8)
                    , e = b.toString(16);
                1 == e.length && (e = "0" + e),
                e = e.toUpperCase();
                var f = a.slice(10, a.length);
                return c = d + e + f
        },
        isValidType: function(a) {
                return "3gphd" == a || "flv" == a || "flvhd" == a || "mp4hd" == a || "mp4hd2" == a || "mp4hd3" == a ? !0 : !1
        },
        convertType: function(a) {
                var b = a;
                switch (a) {
                case "m3u8":
                        b = "mp4";
                        break;
                case "3gphd":
                        b = "3gphd";
                        break;
                case "flv":
                        b = "flv";
                        break;
                case "flvhd":
                        b = "flv";
                        break;
                case "mp4hd":
                        b = "mp4";
                        break;
                case "mp4hd2":
                        b = "hd2";
                        break;
                case "mp4hd3":
                        b = "hd3"
                }
                return b
        },
        langCodeToCN: function(a) {
                var b = "";
                switch (a) {
                case "default":
                        b = {
                                key: "guoyu",
                                value: "国语"
                        };
                        break;
                case "guoyu":
                        b = {
                                key: "guoyu",
                                value: "国语"
                        };
                        break;
                case "yue":
                        b = {
                                key: "yue",
                                value: "粤语"
                        };
                        break;
                case "chuan":
                        b = {
                                key: "chuan",
                                value: "川话"
                        };
                        break;
                case "tai":
                        b = {
                                key: "tai",
                                value: "台湾"
                        };
                        break;
                case "min":
                        b = {
                                key: "min",
                                value: "闽南"
                        };
                        break;
                case "en":
                        b = {
                                key: "en",
                                value: "英语"
                        };
                        break;
                case "ja":
                        b = {
                                key: "ja",
                                value: "日语"
                        };
                        break;
                case "kr":
                        b = {
                                key: "kr",
                                value: "韩语"
                        };
                        break;
                case "in":
                        b = {
                                key: "in",
                                value: "印度"
                        };
                        break;
                case "ru":
                        b = {
                                key: "ru",
                                value: "俄语"
                        };
                        break;
                case "fr":
                        b = {
                                key: "fr",
                                value: "法语"
                        };
                        break;
                case "de":
                        b = {
                                key: "de",
                                value: "德语"
                        };
                        break;
                case "it":
                        b = {
                                key: "it",
                                value: "意语"
                        };
                        break;
                case "es":
                        b = {
                                key: "es",
                                value: "西语"
                        };
                        break;
                case "po":
                        b = {
                                key: "po",
                                value: "葡语"
                        };
                        break;
                case "th":
                        b = {
                                key: "th",
                                value: "泰语"
                        }
                }
                return b
        },
        getVideoSrc: function(a, b, c, d, e, f, g) {
                var h = c.stream[a]
                    , i = c.video.encodeid;
                if (!i || !d)
                        return "";
                var j = {
                        flv: 0,
                        flvhd: 0,
                        mp4: 1,
                        hd2: 2,
                        "3gphd": 1,
                        "3gp": 0
                }
                    , k = j[d]
                    , l = {
                        flv: "flv",
                        mp4: "mp4",
                        hd2: "flv",
                        mp4hd: "mp4",
                        mp4hd2: "mp4",
                        "3gphd": "mp4",
                        "3gp": "flv",
                        flvhd: "flv"
                }
                    , m = l[d]
                    , n = b.toString(16);
                1 == n.length && (n = "0" + n);
                var o = h.segs[b].total_milliseconds_video / 1e3
                    , p = h.segs[b].key;
                ("" == p || -1 == p) && (p = h.key2 + h.key1);
                var q = "";
                c.show && (q = c.show.pay ? "&ypremium=1" : "&ymovie=1");
                var r = "/player/getFlvPath/sid/" + YKP.userCache.sid + "_" + n + "/st/" + m + "/fileid/" + e + "?K=" + p + "&hd=" + k + "&myp=0&ts=" + o + "&ypp=0" + q
                    , s = [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]
                    , t = encodeURIComponent(encode64(rc4(translate(YK.mk.a4 + "poz" + YKP.userCache.a2, s).toString(), YKP.userCache.sid + "_" + e + "_" + YKP.userCache.token)));
                return r += "&ep=" + t,
                r += "&ctype=12",
                r += "&ev=1",
                r += "&token=" + YKP.userCache.token,
                r += "&oip=" + YK.v.data.security.ip,
                r += (f ? "/password/" + f : "") + (g ? g : ""),
                r = "http://k.youku.com" + r
        }
};
function rc4(a, b) {
    for (var c, d = [], e = 0, f = "", g = 0; 256 > g; g++)
        d[g] = g;
    for (g = 0; 256 > g; g++)
        e = (e + d[g] + a.charCodeAt(g % a.length)) % 256,
        c = d[g],
        d[g] = d[e],
        d[e] = c;
    g = 0,
    e = 0;
    for (var h = 0; h < b.length; h++)
        g = (g + 1) % 256,
        e = (e + d[g]) % 256,
        c = d[g],
        d[g] = d[e],
        d[e] = c,
        f += String.fromCharCode(b.charCodeAt(h) ^ d[(d[g] + d[e]) % 256]);
    return f
}

function translate(a, b) {
    for (var c = [], d = 0; d < a.length; d++) {
        var e = 0;
        e = a[d] >= "a" && a[d] <= "z" ? a[d].charCodeAt(0) - "a".charCodeAt(0) : a[d] - "0" + 26;
        for (var f = 0; 36 > f; f++)
            if (b[f] == e) {
                e = f;
                break
            }
        e > 25 ? c[d] = e - 26 : c[d] = String.fromCharCode(e + 97)
    }
    return c.join("")
}
YK = {"WIN_TYPE":30,"defaultVideoType":"mp4","defaultLanguage":"guoyu","resizeTag":true,"initConfig":{"id":"youku-player","vid":"369056609","prefer":"h5","expand":0,"canWide":0,"paid":"1","client_id":"youkumobileplaypage","wintype":"interior","events":{},"playlistconfig":{},"vvlogconfig":{"rurl":"http://v.youku.com/v_show/id_XMTQ3NjIyNjQzNg==.html?from=y1.6-96.1.1.1c7f5a5880ec11e3a705"},"adconfig":{},"target":"player"},"playerEvents":{},"mk":{"a3":"b4et","a4":"boa4"},"config":{"id":"youku-player","vid":"369056609","partnerId":"youkumobileplaypage","parentBox":"player","events":{},"width":110,"height":62,"isMobile":true,"isMobileIOS":false,"content":"mp4","wintype":"interior","expand":0,"canWide":0},"v":{"e":{"desc":"","provider":"play","code":0},"data":{"stream":[{"logo":"none","audio_lang":"default","height":236,"subtitle_lang":"default","segs":[{"total_milliseconds_audio":"8207743","total_milliseconds_video":"8207667","key":"9a6896c0b957eed8261ee499","size":"309716988"}],"stream_type":"3gphd","width":624,"milliseconds_video":8207667,"drm_type":"default","transfer_mode":"http","milliseconds_audio":8207743,"stream_fileid":"031020010056CB23DB5C6205CF07DD70CB9BF9-B578-314F-7C9C-FE8053A33435","size":309716988},{"logo":"none","audio_lang":"default","height":236,"subtitle_lang":"default","segs":[{"total_milliseconds_audio":"360467","total_milliseconds_video":"360467","key":"abb3b539d70ab894261ee499","size":"19560570"},{"total_milliseconds_audio":"417866","total_milliseconds_video":"417866","key":"293f85e13e95058c282b400a","size":"21138321"},{"total_milliseconds_audio":"388934","total_milliseconds_video":"388934","key":-1,"size":"20374628"},{"total_milliseconds_audio":"418795","total_milliseconds_video":"418800","key":-1,"size":"19258302"},{"total_milliseconds_audio":"384337","total_milliseconds_video":"384333","key":-1,"size":"22624922"},{"total_milliseconds_audio":"416334","total_milliseconds_video":"416333","key":-1,"size":"24074972"},{"total_milliseconds_audio":"388934","total_milliseconds_video":"388934","key":-1,"size":"18177355"},{"total_milliseconds_audio":"380668","total_milliseconds_video":"380666","key":-1,"size":"20014678"},{"total_milliseconds_audio":"373330","total_milliseconds_video":"373334","key":-1,"size":"18748463"},{"total_milliseconds_audio":"363532","total_milliseconds_video":"363533","key":-1,"size":"20529197"},{"total_milliseconds_audio":"403934","total_milliseconds_video":"403933","key":-1,"size":"21769062"},{"total_milliseconds_audio":"410668","total_milliseconds_video":"410667","key":-1,"size":"21981298"},{"total_milliseconds_audio":"406535","total_milliseconds_video":"406533","key":-1,"size":"19772516"},{"total_milliseconds_audio":"382201","total_milliseconds_video":"382200","key":-1,"size":"18124355"},{"total_milliseconds_audio":"386333","total_milliseconds_video":"386334","key":-1,"size":"22707491"},{"total_milliseconds_audio":"413734","total_milliseconds_video":"413733","key":-1,"size":"20945744"},{"total_milliseconds_audio":"413129","total_milliseconds_video":"413133","key":-1,"size":"19944524"},{"total_milliseconds_audio":"387402","total_milliseconds_video":"387400","key":-1,"size":"22482018"},{"total_milliseconds_audio":"385265","total_milliseconds_video":"385267","key":-1,"size":"21186330"},{"total_milliseconds_audio":"384801","total_milliseconds_video":"384800","key":-1,"size":"19559546"},{"total_milliseconds_audio":"340591","total_milliseconds_video":"340467","key":-1,"size":"17161813"}],"stream_type":"flvhd","width":624,"milliseconds_video":8207667,"drm_type":"default","transfer_mode":"http","milliseconds_audio":8207790,"stream_fileid":"030002150056CB24165C6205CF07DD70CB9BF9-B578-314F-7C9C-FE8053A33435","size":430136105},{"logo":"none","audio_lang":"default","height":308,"subtitle_lang":"default","segs":[{"total_milliseconds_audio":"372959","total_milliseconds_video":"372956","key":"23b3d2c3d7ed442b261ee499","size":"27023079"},{"total_milliseconds_audio":"360606","total_milliseconds_video":"360610","key":"77402701ddd18077261ee499","size":"24490689"},{"total_milliseconds_audio":"403238","total_milliseconds_video":"403236","key":-1,"size":"26414111"},{"total_milliseconds_audio":"411411","total_milliseconds_video":"411411","key":-1,"size":"24618781"},{"total_milliseconds_audio":"392974","total_milliseconds_video":"392976","key":-1,"size":"30115476"},{"total_milliseconds_audio":"404027","total_milliseconds_video":"404029","key":-1,"size":"31120601"},{"total_milliseconds_audio":"405746","total_milliseconds_video":"405739","key":-1,"size":"25301368"},{"total_milliseconds_audio":"408114","total_milliseconds_video":"408116","key":-1,"size":"28155327"},{"total_milliseconds_audio":"418331","total_milliseconds_video":"418334","key":-1,"size":"28842743"},{"total_milliseconds_audio":"382757","total_milliseconds_video":"382758","key":-1,"size":"27636467"},{"total_milliseconds_audio":"391767","total_milliseconds_video":"391766","key":-1,"size":"27154872"},{"total_milliseconds_audio":"398733","total_milliseconds_video":"398732","key":-1,"size":"28502184"},{"total_milliseconds_audio":"397851","total_milliseconds_video":"397855","key":-1,"size":"24702362"},{"total_milliseconds_audio":"371334","total_milliseconds_video":"371330","key":-1,"size":"25896900"},{"total_milliseconds_audio":"415497","total_milliseconds_video":"415498","key":-1,"size":"28863067"},{"total_milliseconds_audio":"406907","total_milliseconds_video":"406907","key":-1,"size":"27191158"},{"total_milliseconds_audio":"412247","total_milliseconds_video":"412245","key":-1,"size":"26553053"},{"total_milliseconds_audio":"371287","total_milliseconds_video":"371287","key":-1,"size":"28740144"},{"total_milliseconds_audio":"372123","total_milliseconds_video":"372122","key":-1,"size":"27744823"},{"total_milliseconds_audio":"370869","total_milliseconds_video":"370871","key":-1,"size":"25901395"},{"total_milliseconds_audio":"339012","total_milliseconds_video":"338838","key":-1,"size":"20156636"}],"stream_type":"mp4hd","width":816,"milliseconds_video":8207616,"drm_type":"default","transfer_mode":"http","milliseconds_audio":8207790,"stream_fileid":"030008150056CB3F2F5C6205CF07DD70CB9BF9-B578-314F-7C9C-FE8053A33435","size":565125236},{"logo":"none","audio_lang":"default","height":512,"subtitle_lang":"default","segs":[{"total_milliseconds_audio":"181766","total_milliseconds_video":"181765","key":"96c9a6ece3edcc7424128929","size":"29077695"},{"total_milliseconds_audio":"191193","total_milliseconds_video":"191191","key":"30e0c8cdb9a82ff8261ee499","size":"30219501"},{"total_milliseconds_audio":"180512","total_milliseconds_video":"180514","key":"9ac52f6475b60d20282b400a","size":"25622454"},{"total_milliseconds_audio":"209583","total_milliseconds_video":"209584","key":"0cb7e89d2e00c6b524128929","size":"30398631"},{"total_milliseconds_audio":"180512","total_milliseconds_video":"180514","key":-1,"size":"26781182"},{"total_milliseconds_audio":"193237","total_milliseconds_video":"193234","key":-1,"size":"27535683"},{"total_milliseconds_audio":"182973","total_milliseconds_video":"182975","key":-1,"size":"26215618"},{"total_milliseconds_audio":"194490","total_milliseconds_video":"194486","key":-1,"size":"24720142"},{"total_milliseconds_audio":"207494","total_milliseconds_video":"207499","key":-1,"size":"34505384"},{"total_milliseconds_audio":"199413","total_milliseconds_video":"199407","key":-1,"size":"29814877"},{"total_milliseconds_audio":"181719","total_milliseconds_video":"181723","key":-1,"size":"32593923"},{"total_milliseconds_audio":"189521","total_milliseconds_video":"189523","key":-1,"size":"31454888"},{"total_milliseconds_audio":"201875","total_milliseconds_video":"201868","key":-1,"size":"30796122"},{"total_milliseconds_audio":"200156","total_milliseconds_video":"200159","key":-1,"size":"26604692"},{"total_milliseconds_audio":"197694","total_milliseconds_video":"197697","key":-1,"size":"27116126"},{"total_milliseconds_audio":"203871","total_milliseconds_video":"203871","key":-1,"size":"33481106"},{"total_milliseconds_audio":"190729","total_milliseconds_video":"190732","key":-1,"size":"24642905"},{"total_milliseconds_audio":"181394","total_milliseconds_video":"181389","key":-1,"size":"28486692"},{"total_milliseconds_audio":"187107","total_milliseconds_video":"187104","key":-1,"size":"30126778"},{"total_milliseconds_audio":"184181","total_milliseconds_video":"184184","key":-1,"size":"29501755"},{"total_milliseconds_audio":"184970","total_milliseconds_video":"184976","key":-1,"size":"26784468"},{"total_milliseconds_audio":"197369","total_milliseconds_video":"197364","key":-1,"size":"29113194"},{"total_milliseconds_audio":"187478","total_milliseconds_video":"187479","key":-1,"size":"27913966"},{"total_milliseconds_audio":"200203","total_milliseconds_video":"200200","key":-1,"size":"30336279"},{"total_milliseconds_audio":"190775","total_milliseconds_video":"190774","key":-1,"size":"30460990"},{"total_milliseconds_audio":"182973","total_milliseconds_video":"182975","key":-1,"size":"26346186"},{"total_milliseconds_audio":"194862","total_milliseconds_video":"194861","key":-1,"size":"25875679"},{"total_milliseconds_audio":"189103","total_milliseconds_video":"189105","key":-1,"size":"24186375"},{"total_milliseconds_audio":"193562","total_milliseconds_video":"193569","key":-1,"size":"38126306"},{"total_milliseconds_audio":"182648","total_milliseconds_video":"182641","key":-1,"size":"30360874"},{"total_milliseconds_audio":"191982","total_milliseconds_video":"191983","key":-1,"size":"23572420"},{"total_milliseconds_audio":"202571","total_milliseconds_video":"202577","key":-1,"size":"30406754"},{"total_milliseconds_audio":"194491","total_milliseconds_video":"194486","key":-1,"size":"28309300"},{"total_milliseconds_audio":"208329","total_milliseconds_video":"208334","key":-1,"size":"30535465"},{"total_milliseconds_audio":"205125","total_milliseconds_video":"205121","key":-1,"size":"27650352"},{"total_milliseconds_audio":"190404","total_milliseconds_video":"190399","key":-1,"size":"30206016"},{"total_milliseconds_audio":"187849","total_milliseconds_video":"187854","key":-1,"size":"31720572"},{"total_milliseconds_audio":"189150","total_milliseconds_video":"189147","key":-1,"size":"32832908"},{"total_milliseconds_audio":"184645","total_milliseconds_video":"184643","key":-1,"size":"28131066"},{"total_milliseconds_audio":"186596","total_milliseconds_video":"186603","key":-1,"size":"28050404"},{"total_milliseconds_audio":"203917","total_milliseconds_video":"203912","key":-1,"size":"30857718"},{"total_milliseconds_audio":"149490","total_milliseconds_video":"149483","key":-1,"size":"23076025"},{"total_milliseconds_audio":"169878","total_milliseconds_video":"169711","key":-1,"size":"19389333"}],"stream_type":"mp4hd2","width":1360,"milliseconds_video":8207616,"drm_type":"default","transfer_mode":"http","milliseconds_audio":8207790,"stream_fileid":"0300012B0056CB439B5C6205CF07DD70CB9BF9-B578-314F-7C9C-FE8053A33435","size":1233938804},{"logo":"none","audio_lang":"default","height":724,"subtitle_lang":"default","segs":[{"total_milliseconds_audio":"145101","total_milliseconds_video":"145103","key":"6e725dff16b8777c24128929","size":"49047793"},{"total_milliseconds_audio":"128337","total_milliseconds_video":"128337","key":"da1b3706d178292124128929","size":"33564472"},{"total_milliseconds_audio":"147981","total_milliseconds_video":"147981","key":"2ee021157bb876a4282b400a","size":"45393702"},{"total_milliseconds_audio":"132052","total_milliseconds_video":"132049","key":"087f49ffb442c2f9282b400a","size":"36824371"},{"total_milliseconds_audio":"134258","total_milliseconds_video":"134259","key":"33cfe8895b13fc88261ee499","size":"40758933"},{"total_milliseconds_audio":"134884","total_milliseconds_video":"134884","key":-1,"size":"33821353"},{"total_milliseconds_audio":"142060","total_milliseconds_video":"142059","key":-1,"size":"43227656"},{"total_milliseconds_audio":"127292","total_milliseconds_video":"127294","key":-1,"size":"36970883"},{"total_milliseconds_audio":"144312","total_milliseconds_video":"144311","key":-1,"size":"41099819"},{"total_milliseconds_audio":"147563","total_milliseconds_video":"147564","key":-1,"size":"38504366"},{"total_milliseconds_audio":"130426","total_milliseconds_video":"130422","key":-1,"size":"32686712"},{"total_milliseconds_audio":"145891","total_milliseconds_video":"145896","key":-1,"size":"44401891"},{"total_milliseconds_audio":"132423","total_milliseconds_video":"132423","key":-1,"size":"40415473"},{"total_milliseconds_audio":"128175","total_milliseconds_video":"128170","key":-1,"size":"38426817"},{"total_milliseconds_audio":"122787","total_milliseconds_video":"122790","key":-1,"size":"42361062"},{"total_milliseconds_audio":"131587","total_milliseconds_video":"131589","key":-1,"size":"44572825"},{"total_milliseconds_audio":"131425","total_milliseconds_video":"131423","key":-1,"size":"39154112"},{"total_milliseconds_audio":"141851","total_milliseconds_video":"141850","key":-1,"size":"43093036"},{"total_milliseconds_audio":"134258","total_milliseconds_video":"134259","key":-1,"size":"34898416"},{"total_milliseconds_audio":"134884","total_milliseconds_video":"134885","key":-1,"size":"34946545"},{"total_milliseconds_audio":"122207","total_milliseconds_video":"122206","key":-1,"size":"35792341"},{"total_milliseconds_audio":"136301","total_milliseconds_video":"136302","key":-1,"size":"38994033"},{"total_milliseconds_audio":"148027","total_milliseconds_video":"148023","key":-1,"size":"45991317"},{"total_milliseconds_audio":"133840","total_milliseconds_video":"133842","key":-1,"size":"32419841"},{"total_milliseconds_audio":"142060","total_milliseconds_video":"142059","key":-1,"size":"43870333"},{"total_milliseconds_audio":"138762","total_milliseconds_video":"138764","key":-1,"size":"44755105"},{"total_milliseconds_audio":"149862","total_milliseconds_video":"149858","key":-1,"size":"46443423"},{"total_milliseconds_audio":"136882","total_milliseconds_video":"136886","key":-1,"size":"40069507"},{"total_milliseconds_audio":"126293","total_milliseconds_video":"126293","key":-1,"size":"36011591"},{"total_milliseconds_audio":"124668","total_milliseconds_video":"124666","key":-1,"size":"33526256"},{"total_milliseconds_audio":"145310","total_milliseconds_video":"145312","key":-1,"size":"42458418"},{"total_milliseconds_audio":"130171","total_milliseconds_video":"130172","key":-1,"size":"38159451"},{"total_milliseconds_audio":"131425","total_milliseconds_video":"131423","key":-1,"size":"38794735"},{"total_milliseconds_audio":"124877","total_milliseconds_video":"124875","key":-1,"size":"34678627"},{"total_milliseconds_audio":"130543","total_milliseconds_video":"130547","key":-1,"size":"41072929"},{"total_milliseconds_audio":"126293","total_milliseconds_video":"126293","key":-1,"size":"36774355"},{"total_milliseconds_audio":"148399","total_milliseconds_video":"148398","key":-1,"size":"43994572"},{"total_milliseconds_audio":"139180","total_milliseconds_video":"139181","key":-1,"size":"37222093"},{"total_milliseconds_audio":"136719","total_milliseconds_video":"136719","key":-1,"size":"32677105"},{"total_milliseconds_audio":"133260","total_milliseconds_video":"133259","key":-1,"size":"33815449"},{"total_milliseconds_audio":"123623","total_milliseconds_video":"123623","key":-1,"size":"53839308"},{"total_milliseconds_audio":"123832","total_milliseconds_video":"123832","key":-1,"size":"39028762"},{"total_milliseconds_audio":"147191","total_milliseconds_video":"147189","key":-1,"size":"42795877"},{"total_milliseconds_audio":"135674","total_milliseconds_video":"135677","key":-1,"size":"33494540"},{"total_milliseconds_audio":"142478","total_milliseconds_video":"142476","key":-1,"size":"44860612"},{"total_milliseconds_audio":"139598","total_milliseconds_video":"139597","key":-1,"size":"33545257"},{"total_milliseconds_audio":"135465","total_milliseconds_video":"135469","key":-1,"size":"40584893"},{"total_milliseconds_audio":"139599","total_milliseconds_video":"139598","key":-1,"size":"42908468"},{"total_milliseconds_audio":"148399","total_milliseconds_video":"148398","key":-1,"size":"38144018"},{"total_milliseconds_audio":"137346","total_milliseconds_video":"137346","key":-1,"size":"40210095"},{"total_milliseconds_audio":"130380","total_milliseconds_video":"130380","key":-1,"size":"37788950"},{"total_milliseconds_audio":"128545","total_milliseconds_video":"128545","key":-1,"size":"42059288"},{"total_milliseconds_audio":"143267","total_milliseconds_video":"143268","key":-1,"size":"42146148"},{"total_milliseconds_audio":"120535","total_milliseconds_video":"120537","key":-1,"size":"46185462"},{"total_milliseconds_audio":"136766","total_milliseconds_video":"136762","key":-1,"size":"42610900"},{"total_milliseconds_audio":"130380","total_milliseconds_video":"130380","key":-1,"size":"40028259"},{"total_milliseconds_audio":"145519","total_milliseconds_video":"145521","key":-1,"size":"44151496"},{"total_milliseconds_audio":"137555","total_milliseconds_video":"137554","key":-1,"size":"42804076"},{"total_milliseconds_audio":"123623","total_milliseconds_video":"123623","key":-1,"size":"27694456"},{"total_milliseconds_audio":"94389","total_milliseconds_video":"94386","key":-1,"size":"28279011"},{"total_milliseconds_audio":"120953","total_milliseconds_video":"120829","key":-1,"size":"23574306"}],"stream_type":"mp4hd3","width":1920,"milliseconds_video":8207616,"drm_type":"default","transfer_mode":"http","milliseconds_audio":8207743,"stream_fileid":"0300803D0056CB4B4E5C6205CF07DD70CB9BF9-B578-314F-7C9C-FE8053A33435","size":2398425900}],"dvd":{"point":[{"title":"张译客串恶城管 遭冯小刚霸气教训","desc":"","start":"322292","ctype":"story"},{"title":"冯小刚许晴理发店上演激情云雨","desc":"","start":"887392","ctype":"story"},{"title":"张一山满嘴浑话 被冯小刚教训服软","desc":"","start":"1295504","ctype":"story"},{"title":"宁浩出面提供线索 街头被警察抓捕","desc":"","start":"1548045","ctype":"story"},{"title":"白举纲杀马特造型演绎飙车\"古惑仔\"","desc":"","start":"1756697","ctype":"story"},{"title":"","desc":"","start":"2307166","ctype":"standard"},{"title":"李易峰被父踹倒 吴亦凡气场拽炸天","desc":"","start":"2315136","ctype":"story"},{"title":"连奕名客串富商 冯小刚借钱遭冷待","desc":"","start":"3085799","ctype":"story"},{"title":"莽撞刘桦帮倒忙 修车厂对峙约茬架","desc":"","start":"3688799","ctype":"story"},{"title":"冯小刚李易峰父子酒局对弈解心结","desc":"","start":"4648712","ctype":"story"},{"title":"冯小刚拒绝手术 与李易峰私逃出院","desc":"","start":"5318993","ctype":"story"},{"title":"","desc":"","start":"5724114","ctype":"standard"},{"title":"于和伟变带头大哥 率众围殴冯小刚","desc":"","start":"5829197","ctype":"story"},{"title":"吴亦凡单约冯小刚 按规矩击掌约定","desc":"","start":"6422407","ctype":"story"},{"title":"TFBOYS客串医院义工为病人唱歌","desc":"","start":"6931673","ctype":"story"},{"title":"两帮伙震撼对峙 冰湖决战一触即发","desc":"","start":"7356724","ctype":"story"},{"title":"冯小刚高举战刀 一路狂奔冲向对面","desc":"","start":"7638519","ctype":"story"}],"notsharing":"0"},"videos":{"list":[{"vv":0,"title":"老炮儿","encodevid":"XMTQ3NjIyNjQzNg==","seq":"1","vid":"369056609"}]},"uploader":{"certification":true,"fan_count":3714629,"reason":"优酷院线官方视频空间","show_brand":0,"avatar":{"big":"http://g3.ykimg.com/0130391F455629F41209FD05CF07DD70724791-DDBB-6813-0E95-8BEBA021F60B","small":"http://g4.ykimg.com/0130391F455629F413790C05CF07DD57A8FD59-86E4-F390-E681-A41A995DE808","middle":"http://g3.ykimg.com/0130391F455629F412DC7405CF07DD5A3DA711-4473-BAD7-4F6A-809CA817B983","large":"http://g2.ykimg.com/0130391F455629F41109D105CF07DD338E1BAC-8949-263A-ABB9-53052FF82FB8"},"homepage":"http://i.youku.com/u/UMzg5ODE2MTgw"},"show":{"id":"286394","title":"老炮儿","video_pay":1,"video_type":1,"pay_type":["mon"],"exclusive":false,"encodeid":"1c7f5a5880ec11e3a705","pay":1,"copyright":"1","showkind":{},"stage":"1"},"security":{"encrypt_string":"NAXVSQofJbnZ2fTD9OJxW9Sl6kU41wzMWBY=","ip":1991953071},"network":{"dma_code":"70008","area_code":"110000"},"id":369056609,"fee":{"own_channel_id":0,"paid":1,"video_type":0,"ad":0,"paid_type":["mon"]},"preview":{"timespan":"6000","thumb":["http://g2.ykimg.com/0521000E56CB4BE56A07BA1544065A91","http://g2.ykimg.com/0521010E56CB4BE56A07BA1544065A91","http://g3.ykimg.com/0521020E56CB4BE56A07BA1544065A91","http://g1.ykimg.com/0521030E56CB4BE56A07BA1544065A91","http://g4.ykimg.com/0521040E56CB4BE56A07BA1544065A91","http://g2.ykimg.com/0521050E56CB4BE56A07BA1544065A91","http://g2.ykimg.com/0521060E56CB4BE56A07BA1544065A91","http://g2.ykimg.com/0521070E56CB4BE56A07BA1544065A91","http://g1.ykimg.com/0521080E56CB4BE56A07BA1544065A91","http://g2.ykimg.com/0521090E56CB4BE56A07BA1544065A91","http://g4.ykimg.com/05210A0E56CB4BE56A07BA1544065A91","http://g4.ykimg.com/05210B0E56CB4BE56A07BA1544065A91","http://g2.ykimg.com/05210C0E56CB4BE56A07BA1544065A91","http://g3.ykimg.com/05210D0E56CB4BE56A07BA1544065A91"]},"pay":{"duration":30,"can_play":false,"price":"20","discount_price":"","h5_caseurl":"http://cps.youku.com/redirect.html?id=0000f111&url=http%3A%2F%2Fpay.youku.com%2Fh5%2Fredirect.html%3Fsign%3Dd362b7fca61544b1f5cd8cc26b4d6a03%26pstype%3D101%26psid%3D2"},"controller":{"html5_disable":false,"continuous":true,"video_capture":true,"stream_mode":2,"download_disable":true,"share_disable":false,"circle":false,"play_mode":2},"trial":{"time":"600","type":"time","episodes":"0"},"user":{"uid":""},"video":{"tags":["老炮儿"],"logo":"http://r1.ykimg.com/0541040856CB4B596A0A4804618355AA","share_type":"ecommerce","userid":97454045,"privacy":"anybody","category_id":96,"type":["show","dvd","share","bullet","fee"],"upload":"import","restrict":1,"share":true,"title":"老炮儿","username":"优酷会员","source":5,"seconds":"8207.79","encodeid":"XMTQ3NjIyNjQzNg==","category_letter_id":"c","subcategories":[{"id":"2034","name":"大陆"}]}},"cost":0.01100000087171793}}
YKP={"playerType":"h5","uniplayerUrl":"http://passport-log.youku.com/logsys/logstorage/append?project=uniplayer&log=","MPIECEURL":"http://passport-log.youku.com/logsys/logstorage/append?project=mpiece&log=","userCache":{"a1":"4","a2":"1"},"playerState":{"PLAYER_STATE_INIT":"PLAYER_STATE_INIT","PLAYER_STATE_READY":"PLAYER_STATE_READY","PLAYER_STATE_AD":"PLAYER_STATE_AD","PLAYER_STATE_PLAYING":"PLAYER_STATE_PLAYING","PLAYER_STATE_END":"PLAYER_STATE_END","PLAYER_STATE_ERROR":"PLAYER_STATE_ERROR"},"playerCurrentState":"PLAYER_STATE_INIT","canOpenApp":{"android":"MQQBrowser|micromessenger|weibo|AliApp|article","ios":"micromessenger|weibo|AliApp|article","noIntent":"MQQBrowser|ucbrowser|baidubrowser|sogouMobilebrowser|mxbrowser|LieBao|360 APhone"},"supportHTML5Video":true,"isIOS":false,"os":"Android 6. Android 6. Safari Android 6. Chrome Android 6. Android 6. Android 6. Android 6. Android 6. Android 6. Android 6. Android Android 6. Android 6. Android 6. Android 6. Android 6. Android 6. Mobile Android 6. Android 6. Android 6. Android 6. Android 6. Android 6. ","canPlayMP4":true,"canPlayOGG":true,"canPlayWEBM":true,"isWin":false,"isAndroid4":true,"isMac":false,"isSafari":true,"isChrome":true,"isIPAD":false,"isIPAD7":false,"isIPHONE":false,"isIPOD":false,"isLEPAD":false,"isMIUI":false,"isAndroid":true,"isAndroid41":false,"isSonyDTV":false,"isBlackBerry":false,"isMQQBrowser":false,"isMobile":true,"isSamSung":false,"isHTC":false,"isLumia":false,"isVIVO":false,"isUC":false,"isMobileIOS":false,"isSupportH5M3U8":false,"isSupportH5MP4":true,"isSupportFlash":0,"isPhone":true,"isAndroidPad":false,"isPad":false,"_target":"player","playerId":"youku-player"}


BuildVideoInfo = {}
BuildVideoInfo.total = function(a, b, c) {
        var d = a[b][c]
            , e = 0
            , f = 0;
        if (YK.v.data.controller.html5_disable)
                e += parseInt(YK.v.data.video.seconds);
        else
                for (var g = 0; g < d.length; g++) {
                        var h = d[g];
                        e += parseInt(h.seconds),
                        f += parseInt(h.size)
                }
        return {
                totalTime: e,
                totalBytes: f
        }
}
,
BuildVideoInfo.init = function (jsona) {
    var a = jsona;
    var b = a.data;
    var c = jsona.data.stream;
    var d = [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26],
    e = rc4(translate(YK.mk.a3 + "o0b" + YKP.userCache.a1, d).toString(), decode64(b.security.encrypt_string))
    , f = e.split("_");
    
    //sid, token
    
    YKP.userCache.sid = e.split("_")[0],
    YKP.userCache.token = e.split("_")[1];
    
    videoInfo = new PlayListData(b,c,'mp4');
    

    //console.log(videoInfo)
    var src= videoInfo._videoSegsDic;
    //return src
    return src.streams['guoyu']['mp4'][0].src
    
    }


BuildVideoInfo.response = function (jsona) {
    
    return BuildVideoInfo.init(jsona)
}
BuildVideoInfo.start = function (jsona) {
    return BuildVideoInfo.init(jsona)
}


