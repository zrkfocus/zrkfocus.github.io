
(function () {
    var head = document.getElementsByTagName('head')[0];
    var flexibleScript = document.createElement("script");
    flexibleScript.src = "http://g.tbcdn.cn/mtb/lib-flexible/0.3.2/??flexible_css.js,flexible.js";
    // flexibleScript.src = "./flexible.js";
    head.appendChild(flexibleScript);
    var style = document.createElement('style');
    var commonStyle = "body {margin: 0;}.hidden{display:none}"
        + ` .mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0px !important;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal {
    width: 9.36rem;
}

.close_div {
    text-align: right;
    padding-right: 0.4rem;
}

.close_img {
    width: 0.48rem;
    height: 0.48rem;
}`;
    style.innerHTML = commonStyle;
    head.appendChild(style);
    // var axiosScript = document.createElement("script");
    // axiosScript.src = "https://unpkg.com/axios/dist/axios.min.js";
    // head.appendChild(flexibleScript);
    var jqueryScript = document.createElement("script");
    jqueryScript.src = "https://g.alicdn.com/sj/lib/jquery/dist/jquery.min.js";
    head.appendChild(jqueryScript);

    const jsArray = [
        { type: 'text/javascript', src: "https://oss.suning.com/cbpmb/xhsmp/isv/suning-sdk-galaxieV0.4.9.js" },
        { type: 'text/javascript', src: "https://res.suning.cn/project/mvs/RES/common/script/android/sneapp.js?v=2.0" },
        { type: 'text/javascript', src: "https://dfp.suning.com/dfprs-collect/dist/fp.js?appCode=NZRMHf38RelyOjCa?v=2.0" },
        { type: 'text/javascript', src: "https://mmds.suning.com/mmds/mmds.js?appCode=NZRMHf38RelyOjCa?v=2.0" },
        { type: 'text/javascript', src: "https://iar-web.suning.com/iar-web/snstatic/SnCaptcha.js?v=2.0" },
        { type: 'text/javascript', src: "https://res.wx.qq.com/open/js/jweixin-1.3.2.js?v=2.0" },
    ]
    jsArray.forEach(function (item) {
        let script = document.createElement("script");
        script.type = item.type;
        script.src = item.src;
        head.appendChild(script);
    })

    // 背景颜色默认值
    var mask_bg = "#9100D6"
    var rankDataList = {}, imgSetting = [];
    if (jqueryScript.readyState) {   //IE
        jqueryScript.onreadystatechange = function () {
            if (jqueryScript.readyState == 'complete' || jqueryScript.readyState == 'loaded') {
                jqueryScript.onreadystatechange = null;
            }
        }
    } else {
        jqueryScript.onload = function () {
            getBasicImg(function (res) {
                if (res.errorCode && res.errorCode === "12") {
                    oauthAction();
                } else {
                    const imgs = res.data.styleSettings, rankData = res.data.interestFreeList;
                    rankDataList = {
                        freeRate: res.data.interestFreeList,
                        freeBill: res.data.freeList,
                        freeMail: res.data.freeMailingList
                    }
                    for (let i = 0; i < imgs.length; i++) {
                        let key = imgs[i].styleName
                        imgSetting[key] = imgs[i].url
                    }
                    createRank(style, imgSetting, rankDataList, 'freeRate');
                }
            })
            // loadRuleModal(style);
            // loadTaskModal(style);
            // createCenterPosition(style);
            // createFocusModal(style);
        }
    }

}());


// 排行榜
function createRank(style, imgSetting, rankDataList, type) {
    console.log(style);
    var rankData = rankDataList[type]
    console.log(rankDataList)
    var rankStyle =
        `  .rank_container {
            width: 10rem;
        }

        .banner_img {
            height: 10.9067rem;
            background: url('${imgSetting.head}') center no-repeat;
            background-size: 100%;
        }

        .free_rank {
            height: 4.6267rem;
            background: url('${imgSetting.free_bg}') center no-repeat;
            background-size: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: -0.0267rem;
        }
        .free_bill,.center_img,.free_mail{
            width: 2.9867rem;
            height: 3.28rem;
        }
        .center_img {
            margin-top: -0.5333rem;
        }

        .rank_list_contaianer {
            background-color: #9100D6;
            margin-top: -0.0133rem;
            padding-bottom: 0.3333rem;
        }

        .rank_list {
            margin: 0 0.3333rem;
            padding: 0 0.1333rem;
            width: 9.0667rem;
            background:linear-gradient(to bottom,#9604DA,#AE31FD);
            border-radius: 0.2rem;
        }

        .rank_list_before {
            height: 3.8rem;
            position: relative;
        }
        .p_rank{
            position: absolute;
            top: 0;
            left: 0;
            height: 3.8rem;
            width: 3.0133rem;
            z-index: 1;
            background: url('${imgSetting.p_rank}');
            background-size: 100%;
        }
        .d_rank{
            position: absolute;
            top: -0.2267rem;
            left: 2.8rem;
            height: 4.0267rem;
            width: 3.4667rem;
            z-index: 2;
            background: url('${imgSetting.d_rank}');
            background-size: 100%;
            text-align:center;
        }
        .g_rank{
            position: absolute;
            top: 0;
            right: 0;
            height: 3.8rem;
            width: 3.0133rem;
            z-index: 1;
            background: url('${imgSetting.g_rank}');
            background-size: 100%;
            text-align:right;
        }
        .rank_list_after{
            padding-top: 0.0667rem;
            padding-bottom: 0.2rem;
        }
        .forth_rank{
            background-color: #fff;
            height: 1.2rem;
            border-radius: 0.2rem;
            margin-top: 0.2rem;
            padding:0 0.4rem;
            display:flex;
            justify-content: space-between;
            align-items: center;
        } 
        .p_rank_img {
            width: 1.64rem;
            height: 1.64rem;
            border-radius: 50%;
            margin-top: 0.8667rem;
            margin-left: 0.6rem;
        }
        .d_rank_img{
            width: 1.7333rem;
            height: 1.7333rem;
            margin-top: 0.8667rem;
            border-radius: 50%;
        }
        .g_rank_img{
            width: 1.64rem;
            height: 1.64rem;
            border-radius: 50%;
            margin-top: 0.8667rem;
            margin-right: 0.6rem;
        }
        .rank_font{
            font-size: 0.24rem;
            text-align: center;
            padding: 0.08rem 0;
        }
        .rank_font_big{
            font-size: 0.2667rem;
            text-align: center;
            padding: 0.1067rem 0;
        }
        .rank_font_num{
            font-size: 0.24rem;
            color: #ff348d;
        }
        .rank_focus{
            text-align: center;
            font-size: 0;
        }
        .rank_focus_small{
            width: 2.08rem;
            height: 0.6267rem;
        }
        .rank_focus_big{
            width: 2.2133rem;
            height: 0.6667rem;
        }
        .forth_rank_span{
            font-size: 0.4rem;
        }
        .forth_rank_img{
            width: 2rem;
            height: 0.88rem;
        }
        `;
    style.innerHTML = style.innerHTML + rankStyle;
    var rankDom =
        `<div class='rank_container'>
        <div class="free_rank">
            <img class="free_bill" id="free_bill" src="${imgSetting.free_rate}"  />
            <img class="center_img" src="${imgSetting.free_bill}"  />
            <img class="free_mail" src="${imgSetting.free_mail}"  />
        </div>
        <div class="rank_list_contaianer">
            <div class="rank_list">
                <div class="rank_list_before">
                    <div class="p_rank">
                        <div style="font-size:0"><img class="p_rank_img" src="${rankData[1].image}" alt="" /></div>
                        <div class="rank_font">已关注：<span class="rank_font_num">${rankData[1].number}人</span></div>
                        <div class="rank_focus"><img class="rank_focus_small" src="${imgSetting.small_focus}" /></div>
                    </div>
                    <div class="d_rank">
                        <div style="font-size:0"><img class="d_rank_img" src="${rankData[0].image}" alt="" /></div>
                        <div class="rank_font_big">已关注：<span class="rank_font_num">${rankData[0].number}人</span></div>
                        <div class="rank_focus"><img class="rank_focus_big" src="${imgSetting.small_focus}" /></div>
                    </div>
                    <div class="g_rank">
                        <div style="font-size:0"><img class="g_rank_img" src="${rankData[2].image}" alt="" /></div>
                        <div class="rank_font">已关注：<span class="rank_font_num">${rankData[2].number}人</span></div>
                        <div class="rank_focus"><img class="rank_focus_small" src="${imgSetting.small_focus}" /></div>
                    </div>
                </div>
                <div class="rank_list_after">
                    <div class="forth_rank">
                        <span class="forth_rank_span">4</span>
                        <img class="forth_rank_img" src="${rankData[3].image}" alt="" />
                        <div class="rank_font">已关注：<span class="rank_font_num">${rankData[3].number}人</span></div>
                        <div class="rank_focus"><img class="rank_focus_small" src="${imgSetting.small_focus}" /></div>
                    </div>
                    <div class="forth_rank">
                        <span class="forth_rank_span">5</span>
                        <img class="forth_rank_img" src="${rankData[4].image}" alt="" />
                        <div class="rank_font">已关注：<span class="rank_font_num">${rankData[4].number}人</span></div>
                        <div class="rank_focus"><img class="rank_focus_small" src="${imgSetting.small_focus}" /></div>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
    $("body").append(rankDom);
    // setTimeout(function () {
    //     // 发生产后会给一个 id 做钩子放 html 内容，同时不需要 setTimeout
    //     $("#20_20200518151702114326").html(rankDom);
    // }, 1500)
    $("#free_bill").onclick = function () {
        console.log(1);
    };
}

// 点击切换榜单
function changeRankList() {
    createRank(style, imgSetting, rankDataList, 'freeRate')
}
// 规则弹窗
function loadRuleModal(style, mask_bg) {
    var ruleModalStyle =
        `.rule_container {
    background-color: ${mask_bg};
    padding: 0.2667rem 0.2667rem 0.3333rem 0.2667rem;
    border-radius: 0.48rem;
}

.rule_title {
    font-size: 0.4533rem;
    color: #fff;
    text-align: center;
    font-weight: bold;
    line-height: 0.9333rem;
}

.rule_subTitle {
    font-size: 0.32rem;
    color: #fff;
}

.rule_content {
    font-size: 0.2533rem;
    color: #e8b8ff;
}`;
    style.innerHTML = style.innerHTML + ruleModalStyle;
    var ruleModalDom =
        `<div id="ruleModal" class="hidden">
        <div class="mask">
        <div class="modal">
            <div class="close_div">
                <img class="close_img" src="./img2/close.png" onclick="toggleModal('ruleModal')" alt="">
            </div>
            <div class="rule_container">
                <div class="rule_title">
                    活动规则
                </div>
                <div class="rule_subTitle">
                    首单免费
                </div>
                <div class="rule_content">1、限指定商品参加新人首单免额活动，具体免额形式和减免金额以下单时券实际抵扣金额为准；</div>
                <div class="rule_content">2、减免金额合计为61.8，仅限新人领取；</div>
                <div class="rule_content">3、使用时间：2020.07.25-2020.07.31；</div>
                <div class="rule_content">4、使用规则：</div>
                <div class="rule_content">·免额券由**组成，用户可在苏宁易购平台购买平台指定部分实物商品使用，其中延保、话费通信、生活缴费、加油卡、娱乐充值、其他虚拟类目等类目商品无法使用;
                </div>
                <div class="rule_content">·优惠券仅限用户在苏宁易购APP、小程序、PC、WAP端付款时进行抵扣;</div>
                <div class="rule_content">·优惠券暂不支持线下门店等支付场景使用;</div>
                <div class="rule_content">·如果使用优惠券的订单产生退货退款，优惠券将原路返回至账户，但使用有效期保持一致， 即:如果订单退货退款时已过红包有效期，已使用的红包同样失效;
                    ·优惠券不可提现，仅限在有效期内使用，过期无效。</div>
                <div class="rule_subTitle" style="margin-top:0.4rem">
                    分期免息
                </div>
                <div class="rule_content">1、限指定商品参加对应期数的免息活动，具体参与商品及免息期数以收银台     展示为准；</div>
                <div class="rule_content">2、支付时选择任性付/信用卡/花呗分期即可查看免息期数和手续费优惠金额；</div>
                <div class="rule_content">3、分期免息活动仅限苏宁易购APP最新版本参与；</div>
                <div class="rule_content">4、分期免息商品不支持与非免息商品多订单合并付款，请单独下单支付；</div>
                <div class="rule_content">5、预售商品支付尾款时可选择任性付/信用卡/花呗分期享免息。</div>
                <div class="rule_subTitle" style="margin-top:0.4rem">
                    退货免邮
                </div>
                <div class="rule_content">1、适用范围：仅限服饰百货主会场（当前会场）的所有商户及商品参与退货免邮政策；</div>
                <div class="rule_content">2、适用时间：2020年5月25日至2020年6月21日内产生的订单；</div>
                <div class="rule_content">3、免邮形式</div>
                <div class="rule_content">·卖家版运费险：提交订单时会自动生成运费险，若产生订单退货，保费将默认理赔到您的账户里；</div>
                <div class="rule_content">·若无运费险，退货时请联系在线客服，我们可提供相应的补邮费政策；</div>
                <div class="rule_content">4、特殊情况</div>
                <div class="rule_content">部分类目及特殊商品因存在运输及退货方面的特殊性可不支持运费险的除外；</div>
            </div>
        </div>
        </div>
        </div>`
    $("body").append(ruleModalDom);
}

// 任务弹窗
function loadTaskModal(style) {
    var taskModalStyle =
        ` /* 任务弹窗 */
    .task_contanier {
        width: 9.36rem;
        height: 11.2rem;
        background: url("./img/task_bg.png") center no-repeat;
        background-size: 100%;
    }

    .task_title {
        font-size: 0.76rem;
        text-align: center;
        color: #fff;
        padding-top: 0.5333rem;
    }

    .task_subtitle {
        font-size: 0.32rem;
        text-align: center;
        color: #fff;
        padding-top: 0.2rem;
        padding-bottom: 0.4rem;
    }

    .task_item {
        padding: 0.1333rem 0.2667rem;
    }

    .task_content {
        padding: 0 0.2667rem;
        height: 1.8267rem;   
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        border-radius: 0.2667rem;
    }

    .task_content_left {
        flex: 1;
        display: flex;
        align-items: center;
    }

    .task_logo {
        width: 0.9333rem;
        height: 0.9333rem;
        margin-right: 0.2rem;
    }

    .task_item_name {
        font-size: 0.32rem;
        color: #1c1c1c;
        font-weight: bold;
        margin-bottom: 0.1333rem;
    }

    .task_item_description {
        font-size: 0.2933rem;
        color: #8e8e8e;
    }

    .task_content_right{
        width: 1.9467rem;
        text-align: center;
    }`
    style.innerHTML = style.innerHTML + taskModalStyle;
    var taskModalStyle =
        `<div id="taskModal" class="hidden">
    <div class="mask">
    <div class="modal">
        <div class="close_div">
            <img class="close_img" src="./img2/close.png" onclick="toggleModal('taskModal')" alt="">
        </div>
        <div class="task_contanier">
            <div class="task_title">做任务 赚云钻</div>
            <div class="task_subtitle">已获得云钻</div>
            <div class="task_item">
                <div class="task_content">
                    <div class="task_content_left">
                        <img class="task_logo" src="./img/focus_logo.png" alt="">
                        <div>
                            <div class="task_item_name">三免榜单 关注3个店铺</div>
                            <div class="task_item_description">每日可领5个云钻</div>
                        </div>
                    </div>
                    <div class="task_content_right">
                        <img src="./img/gofocus_btn.png" alt="">
                    </div>
                </div>
            </div>
            <div class="task_item">
                <div class="task_content">
                    <div class="task_content_left">
                        <img class="task_logo" src="./img/focus_logo.png" alt="">
                        <div>
                            <div class="task_item_name">超级大牌周 进店浏览今日大牌店铺</div>
                            <div class="task_item_description">每日可领5个云钻</div>
                        </div>
                    </div>
                    <div class="task_content_right">
                        <img src="./img/getted.png" alt="">
                    </div>
                </div>
            </div>
            <div class="task_item">
                <div class="task_content">
                    <div class="task_content_left">
                        <img class="task_logo" src="./img/focus_logo.png" alt="">
                        <div>
                            <div class="task_item_name">每日助力 参与品牌助力</div>
                            <div class="task_item_description">单次获胜奖励10个云钻</div>
                            <div class="task_item_description">每累计3次获胜额外奖励20个云钻</div>
                        </div>
                    </div>
                    <div class="task_content_right">
                        <img src="./img/gofocus_btn.png" alt="">
                    </div>
                </div>
            </div>
            <div class="task_item">
                <div class="task_content">
                    <div class="task_content_left">
                        <img class="task_logo" src="./img/focus_logo.png" alt="">
                        <div>
                            <div class="task_item_name">邀请好友 参与会场互动</div>
                            <div class="task_item_description">邀请1位好友进入活动奖励5个云钻</div>
                            <div class="task_item_description">每日最多可邀请3位好友</div>
                        </div>
                    </div>
                    <div class="task_content_right">
                        <img src="./img/gofocus_btn.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>`;
    $("body").append(taskModalStyle);
}

// 弹窗
function toggleModal(id) {
    $('#' + id).toggleClass('hidden');
}

// c位
function createCenterPosition(style) {
    /* .c_position {
       background-color: #9100D6;
   }

   .c_position_banner {
       width: 10rem;
       height: 4.28rem;
       background: url('./img/c_banner.png') center no-repeat;
       background-size: 100%;
   }

   .c_position_content {
       padding: 0 0.32rem 0.2667rem 0.32rem;
   }

   .c_position_bg {
       background: linear-gradient(to bottom, #8D04D7, #640495);
       // padding: 0 0.1333rem;
   }

   .c_top_goods {
       display: flex;
       justify-content: space-between;
   }

   .top_goods_item {
       width: 3.1733rem;
       height: 4.2933rem;
       background: url('./img/goods_bg.png') center no-repeat;
       background-size: 100%;
   }

   .act_calendar {
       font-size: 0;
   }

   .act_calendar_title {
       font-size: 0.4rem;
       font-weight: bold;
       color: #fff;
   } */
    // <div class="c_position">
    //     <div class="c_position_banner">
    //     </div>
    //     <div class="c_position_content">
    //         <div class="c_position_bg">
    //             <div class="c_top_goods">
    //                 <div class="top_goods_item">
    //                     <div></div>
    //                 </div>
    //                 <div class="top_goods_item"></div>
    //                 <div class="top_goods_item"></div>
    //             </div>
    //             <div class="act_calendar">
    //                 <div>
    //                     <div class="act_calendar_title">活动日历</div>
    //                     <div class="act_calendar_time">活动时间:</div>
    //                 </div>
    //                 <img src="./img/check_rule.png" />
    //             </div>
    //         </div>
    //     </div>
    // </div> 
}

// 成功关注失败
function createFocusModal(style) {
    var focusStyle = `.focus_modal {
        width: 6.0533rem;
    }
    .focus_modal_container{
        height: 5.6rem;
        background: url('./img2/success_bg.png');
    }
    .focus_icon{
        width: 0.56rem;
        height: 0.56rem;
        margin-right: 0.2rem;
    }
    .foucs_tip{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        padding-top: 3.3333rem;
        color: #000;
        font-size: 0.4533rem;
        font-weight: bold;
    }
    .focus_content{
        font-size: 0.4rem;
        color: #9b9b9b;
        text-align: center;
    }`
    style.innerHTML = style.innerHTML + focusStyle;
    var focusModalDom =
        `<div id="focusModal">
    <div class="mask">
        <div class="focus_modal">
            <div class="close_div">
                <img class="close_img" src="./img2/close.png" id="sssss">
            </div>
            <div class="focus_modal_container">
                <div class="foucs_tip">
                    <img class="focus_icon" src="./img2/warning_icon.png" />
                    <div>关注失败</div>
                </div>
                <div class="focus_content">奖品发放失败</div>
            </div>
        </div>
    </div>
</div>`;
    $("body").append(focusModalDom);
    $("#sssss").click(function () {

    })
}
// 获取图片素材
function getBasicImg(callback) {
    $.ajax({
        // url:'https://192.168.2.13:8080/ql/front/department/basicsInfo?actId=402880a371f32abf0171f3307bd60013&user_id=71056125',
        url: 'https://galaxie100141.cloud.suning.com/ql/front/department/basicsInfo',
        method: "POST",
        data: { actId: "402880a371f32abf0171f3307bd60013", userId: "71056125" },
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        success: callback
    })
}

function oauthAction() {
    // locationUrl = window.location.href;
    // alert("预加载！"+locationUrl+"    userId:"+$("#user_id").val());
    // alert("用户编码获取前");
    galaxie.getUserInfoByUri(locationUrl, function (data) {
        // alert("用户编码获取中 "+data);
        $.ajax({
            url: "/front/setCusNum",
            method: "POST",
            async: false, /*设置成同步*/
            data: { "strTMMixNick": data, userId: $("#user_id").val() },
            dataType: 'json',
            success: function (res) {
                if (res.succ) {
                    galaxie.getSnUnionIdByUri(locationUrl, function (snData) {
                        // alert("混淆编码获取中" + snData.snUnionId);
                        //获取混淆会员编码
                        $.ajax({
                            url: "/front/setSnUnionId",
                            method: "POST",
                            async: false, /*设置成同步*/
                            data: { userId: $("#user_id").val(), "snUnionId": snData.snUnionId },
                            dataType: 'json',
                            success: function (res) {
                                if (res.succ) {
                                    location.reload(true);
                                } else {
                                    // alert(res.msg);
                                }
                            },
                            error: function (res) {
                                alert("系统错误，请重试！");
                            }
                        });
                    });
                } else {
                    // alert(res.msg);
                }
            },
            error: function (res) {
                alert("系统错误，请重试！");
            }
        });
    });
    // alert("用户编码获取完 开始获取混淆编码");
    // alert("混淆编码获取完");
}
