var minY=1900;
var maxY=2020;
var curdiv = document.createElement("div");
//picker弹层
function pickfn(title,con){
    if($(".picker")){
        $(".picker").remove();
    }
    var picker = new Picker({
        title: title
    });
     picker.show();
     $(".picker-content").html("").append(con)
}


//呼出日期插件
function popupDate(e) {
    minY=1900;
    maxY=2020
    curdiv.className = "gearDate";
    curdiv.innerHTML = '<p class="tip">生日详情不公开展示<br>请选择你的公历生日，系统将自动为你计算星座和当前年龄</p><div class="date_ctrl">' +
        '<div class="date_roll_mask">' +
        '<div class="date_roll">' +
        '<div>' +
        '<div class="gear date_yy" data-datetype="date_yy"></div>' +
        '<div class="date_grid">' +
        '<div>年</div>' +
        '</div>' +
        '</div>' +
        '<div>' +
        '<div class="gear date_mm" data-datetype="date_mm"></div>' +
        '<div class="date_grid">' +
        '<div>月</div>' +
        '</div>' +
        '</div>' +
        '<div>' +
        '<div class="gear date_dd" data-datetype="date_dd"></div>' +
        '<div class="date_grid">' +
        '<div>日</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    pickfn("生日",curdiv)

    dateCtrlInit();
    var date_yy = curdiv.querySelector(".date_yy");
    var date_mm = curdiv.querySelector(".date_mm");
    var date_dd = curdiv.querySelector(".date_dd");
    
    date_yy.addEventListener('touchstart', gearTouchStart);
    date_mm.addEventListener('touchstart', gearTouchStart);
    date_dd.addEventListener('touchstart', gearTouchStart);
    date_yy.addEventListener('touchmove', gearTouchMove);
    date_mm.addEventListener('touchmove', gearTouchMove);
    date_dd.addEventListener('touchmove', gearTouchMove);
    date_yy.addEventListener('touchend', gearTouchEnd);
    date_mm.addEventListener('touchend', gearTouchEnd);
    date_dd.addEventListener('touchend', gearTouchEnd);
}
//血型
function popupother(str,num) {
     minY=1;
    maxY=4;
    curdiv.className = "gearDate";
    var str=str
    curdiv.innerHTML = '<div class="date_ctrl">' +
        '<div class="date_roll_mask">' +
        '<div class="date_roll">' +
        '<div class="bloodgear">' +
        '<div class="gear date_yy blood" data-datetype="blood">'+str+'</div>' +
        '<div class="date_grid">' +
        '<div></div>' +
        '</div>' +
        '</div>' +
        '<div>' +
        '</div>' +
        '</div>' +
        '</div>';
    pickfn("血型",curdiv);
    
    var date_yy = curdiv.querySelector(".date_yy");
     date_yy.setAttribute("top", 6+'em');
     date_yy.setAttribute("val", 1);
   
   
};

//初始化年月日插件默认值
function dateCtrlInit() {
    var date = new Date();
    var dateArr = {
        yy: date.getFullYear(),
        mm: date.getMonth(),
        dd: date.getDate() - 1
    };
    var val=$("#birthday .birthday").html();
    if(val==''){
        val=date;
    }
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(val)) {
        rs = val.match(/(^|-)\d{1,4}/g);
        dateArr.yy = rs[0] - minY;
        dateArr.mm = rs[1].replace(/-/g, "") - 1;
        dateArr.dd = rs[2].replace(/-/g, "") - 1;
    } else {
        dateArr.yy = dateArr.yy - minY;
    }
    curdiv.querySelector(".date_yy").setAttribute("val", dateArr.yy);
    curdiv.querySelector(".date_mm").setAttribute("val", dateArr.mm);
    curdiv.querySelector(".date_dd").setAttribute("val", dateArr.dd);
    setDateGearTooth();
}
//重置日期节点个数
function setDateGearTooth() {
    var passY = maxY - minY + 1;
    var date_yy = curdiv.querySelector(".date_yy");
    var itemStr = "";
    if (date_yy && date_yy.getAttribute("val")) {
        //得到年份的值
        var yyVal = parseInt(date_yy.getAttribute("val"));
        //p 当前节点前后需要展示的节点个数
        for (var p = 0; p <= passY - 1; p++) {
            itemStr += "<div class='tooth'>" + (minY + p) + "</div>";
        }
        date_yy.innerHTML = itemStr;
        var top = Math.floor(parseFloat(date_yy.getAttribute('top')));
        if (!isNaN(top)) {
            top % 2 == 0 ? (top = top) : (top = top + 1);
            top > 8 && (top = 8);
            var minTop = 8 - (passY - 1) * 2;
            top < minTop && (top = minTop);
            date_yy.style["-webkit-transform"] = 'translate3d(0,' + top + 'em,0)';
            date_yy.setAttribute('top', top + 'em');
            yyVal = Math.abs(top - 8) / 2;
            date_yy.setAttribute("val", yyVal);
        } else {
            date_yy.style["-webkit-transform"] = 'translate3d(0,' + (8 - yyVal * 2) + 'em,0)';
            date_yy.setAttribute('top', 8 - yyVal * 2 + 'em');
        }
    } else {
        return;
    }
    var date_mm = curdiv.querySelector(".date_mm");
    if (date_mm && date_mm.getAttribute("val")) {
        itemStr = "";
        //得到月份的值
        var mmVal = parseInt(date_mm.getAttribute("val"));
        var maxM = 11;
        var minM = 0;
        //当年份到达最大值
        if (yyVal == passY - 1) {
            maxM = maxM - 1;
        }
        //当年份到达最小值
        if (yyVal == 0) {
            minM = minM - 1;
        }
        //p 当前节点前后需要展示的节点个数
        for (var p = 0; p < maxM - minM + 1; p++) {
            itemStr += "<div class='tooth'>" + (minM + p + 1) + "</div>";
        }
        date_mm.innerHTML = itemStr;
        if (mmVal > maxM) {
            mmVal = maxM;
            date_mm.setAttribute("val", mmVal);
        } else if (mmVal < minM) {
            mmVal = maxM;
            date_mm.setAttribute("val", mmVal);
        }
        date_mm.style["-webkit-transform"] = 'translate3d(0,' + (8 - (mmVal - minM) * 2) + 'em,0)';
        date_mm.setAttribute('top', 8 - (mmVal - minM) * 2 + 'em');
    } else {
        return;
    }
    var date_dd = curdiv.querySelector(".date_dd");
    if (date_dd && date_dd.getAttribute("val")) {
        itemStr = "";
        //得到日期的值
        var ddVal = parseInt(date_dd.getAttribute("val"));
        //返回月份的天数
        var maxMonthDays = calcDays(yyVal, mmVal);
        //p 当前节点前后需要展示的节点个数
        var maxD = maxMonthDays - 1;
        var minD = 0;
        //当年份月份到达最大值
        if (yyVal == passY - 1 && maxM == mmVal + 1) {
            maxD = maxD - 1;
        }
        //当年、月到达最小值
        if (yyVal == 0 && minM == mmVal + 1) {
            minD =minD - 1;
        }
        for (var p = 0; p < maxD - minD + 1; p++) {
            itemStr += "<div class='tooth'>" + (minD + p + 1) + "</div>";
        }
        date_dd.innerHTML = itemStr;
        if (ddVal > maxD) {
            ddVal = maxD;
            date_dd.setAttribute("val", ddVal);
        } else if (ddVal < minD) {
            ddVal = minD;
            date_dd.setAttribute("val", ddVal);
        }
        date_dd.style["-webkit-transform"] = 'translate3d(0,' + (8 - (ddVal - minD) * 2) + 'em,0)';
        date_dd.setAttribute('top', 8 - (ddVal - minD) * 2 + 'em');
    } else {
        return;
    }
}

//求月份最大天数
function calcDays(year, month) {
    if (month == 1) {
        year += minY;
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0 && year % 4000 != 0)) {
            return 29;
        } else {
            return 28;
        }
    } else {
        if (month == 3 || month == 5 || month == 8 || month == 10) {
            return 30;
        } else {
            return 31;
        }
    }
}
//触摸开始
function gearTouchStart(e) {
    e.preventDefault();
    var target = e.target;
    while (true) {
        if (!target.classList.contains("gear")) {
            target = target.parentElement;
        } else {
            break
        }
    }
    clearInterval(target["int_" + target.id]);
    target["old_" + target.id] = e.targetTouches[0].screenY;
    target["o_t_" + target.id] = (new Date()).getTime();
    var top = target.getAttribute('top');
    if (top) {
        target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
    } else {
        target["o_d_" + target.id] = 0;
    }
    target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
}
//手指移动
function gearTouchMove(e) {
    e.preventDefault();
    var target = e.target;
    while (true) {
        if (!target.classList.contains("gear")) {
            target = target.parentElement;
        } else {
            break
        }
    }
    target["new_" + target.id] = e.targetTouches[0].screenY;
    target["n_t_" + target.id] = (new Date()).getTime();
    var f = (target["new_" + target.id] - target["old_" + target.id]) * 30 / window.innerHeight;
    target["pos_" + target.id] = target["o_d_" + target.id] + f;
    target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
    target.setAttribute('top', target["pos_" + target.id] + 'em');
    if (e.targetTouches[0].screenY < 1) {
        gearTouchEnd(e);
    };
}
//离开屏幕
function gearTouchEnd(e) {
    e.preventDefault();
    var target = e.target;
    while (true) {
        if (!target.classList.contains("gear")) {
            target = target.parentElement;
        } else {
            break;
        }
    }
    var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
    if (Math.abs(flag) <= 0.2) {
        target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
    } else {
        if (Math.abs(flag) <= 0.5) {
            target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
        } else {
            target["spd_" + target.id] = flag / 2;
        }
    }
    if (!target["pos_" + target.id]) {
        target["pos_" + target.id] = 0;
    }
    rollGear(target);
}
//缓动效果
function rollGear(target) {
    var d = 0;
    var stopGear = false;

    function setDuration() {
        target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms';
        stopGear = true;
    }
    var passY = maxY - minY + 1;
    clearInterval(target["int_" + target.id]);
    target["int_" + target.id] = setInterval(function() {
        var pos = target["pos_" + target.id];
        var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
        pos += speed;
        if (Math.abs(speed) > 0.1) {} else {
            var b = Math.round(pos / 2) * 2;
            pos = b;
            setDuration();
        }
        if (pos > 8) {
            pos = 8;
            setDuration();
        }
        switch (target.dataset.datetype) {
          
            case "date_yy":
                var minTop = 8 - (passY - 1) * 2;
                if (pos < minTop) {
                    pos = minTop;
                    setDuration();
                }
                if (stopGear) {
                    var gearVal = Math.abs(pos - 8) / 2;
                    setGear(target, gearVal);
                    clearInterval(target["int_" + target.id]);
                }
                break;
            case "date_mm":
                var date_yy = curdiv.querySelector(".date_yy");
                //得到年份的值
                var yyVal = parseInt(date_yy.getAttribute("val"));
                var maxM = 11;
                var minM = 0;
                //当年份到达最大值
                if (yyVal == passY - 1) {
                    maxM = maxM - 1;
                }
                //当年份到达最小值
                if (yyVal == 0) {
                    minM = minM - 1;
                }
                var minTop = 8 - (maxM - minM) * 2;
                if (pos < minTop) {
                    pos = minTop;
                    setDuration();
                }
                if (stopGear) {
                    var gearVal = Math.abs(pos - 8) / 2 + minM;
                    setGear(target, gearVal);
                    clearInterval(target["int_" + target.id]);
                }
                break;
            case "date_dd":
                var date_yy = curdiv.querySelector(".date_yy");
                var date_mm = curdiv.querySelector(".date_mm");
                //得到年份的值
                var yyVal = parseInt(date_yy.getAttribute("val"));
                //得到月份的值
                var mmVal = parseInt(date_mm.getAttribute("val"));
                //返回月份的天数
                var maxMonthDays = calcDays(yyVal, mmVal);
                var maxD = maxMonthDays - 1;
                var minD = 0;
                //当年份月份到达最大值
                if (yyVal == passY - 1 && maxM == mmVal + 1) {
                    maxD = maxD - 1;
                }
                //当年、月到达最小值
                if (yyVal == 0 && minM == mmVal + 1) {
                    minD =minD - 1;
                }
                var minTop = 8 - (maxD - minD) * 2;
                if (pos < minTop) {
                    pos = minTop;
                    setDuration();
                }
                if (stopGear) {
                    var gearVal = Math.abs(pos - 8) / 2 + minD;
                    setGear(target, gearVal);
                    clearInterval(target["int_" + target.id]);
                }
                break;
            case "time_hh":
                if (pos < -38) {
                    pos = -38;
                    setDuration();
                }
                if (stopGear) {
                    var gearVal = Math.abs(pos - 8) / 2;
                    setGear(target, gearVal);
                    clearInterval(target["int_" + target.id]);
                }
                break;
            case "time_mm":
                if (pos < -110) {
                    pos = -110;
                    setDuration();
                }
                if (stopGear) {
                    var gearVal = Math.abs(pos - 8) / 2;
                    setGear(target, gearVal);
                    clearInterval(target["int_" + target.id]);
                }
                break;
            default:
        }
        target["pos_" + target.id] = pos;
        target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
        target.setAttribute('top', pos + 'em');
        d++;
    }, 30);
}
//控制插件滚动后停留的值

function setGear(target, val) {
    val = Math.round(val);
    target.setAttribute("val", val);
    if (/date/.test(target.dataset.datetype)) {
        setDateGearTooth();
    } else {
        setTimeGearTooth();
    }
}
//其他
function setotherGear(target, val) {
    val = Math.round(val);
    target.setAttribute("val", val);
   if(val< (8 - (maxM - minM) * 2)){
    return false;
   }
}
//日期确认
function finishMobileDate(e) {
    var passY = maxY - minY + 1;
    var date_yy = parseInt(Math.round(curdiv.querySelector(".date_yy").getAttribute("val")));
    var date_mm = parseInt(Math.round(curdiv.querySelector(".date_mm").getAttribute("val"))) + 1;
    date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
    var date_dd = parseInt(Math.round(curdiv.querySelector(".date_dd").getAttribute("val"))) + 1;
    date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
    var date=(date_yy % passY + minY) + "-" + date_mm + "-" + date_dd;
   return date
    
}