(function (win) {

    var config = getEnvConfig('xgpre');
    var rankBhdmId;
    // 冒烟测试的ID
    rankBhdmId = "20_20200518151702114326";

    var scriptReady = false;
    var initialized = false;
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    var commonStyle = ` body {
              margin: 0;
          }
      
          .hidden {
              display: none
          }
      
          .mask {
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
              width: 93.6vw;
          }
      
          .close_div {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            padding-right: 4vw;
            padding-bottom: 2vw;
          }
      
          .close_img {
              width: 4.8vw;
              height: 4.8vw;
          } `;
    style.innerHTML = commonStyle;
    head.appendChild(style);
    var jqueryScript = document.createElement("script");
    jqueryScript.src = config.jssdk;
    head.appendChild(jqueryScript);
    const jsArray = [
        {
            type: "text/javascript",
            src:
                "https://res.suning.cn/project/mvs/RES/common/script/android/sneapp.js?v=2.0",
        },
        {
            type: "text/javascript",
            src:
                "https://dfp.suning.com/dfprs-collect/dist/fp.js?appCode=NZRMHf38RelyOjCa?v=2.0",
        },
        {
            type: "text/javascript",
            src:
                "https://mmds.suning.com/mmds/mmds.js?appCode=NZRMHf38RelyOjCa?v=2.0",
        },
        {
            type: "text/javascript",
            src: "https://iar-web.suning.com/iar-web/snstatic/SnCaptcha.js?v=2.0",
        },
        // {
        //   type: "text/javascript",
        //   src: "https://res.wx.qq.com/open/js/jweixin-1.3.2.js?v=2.0",
        // },
    ];
    jsArray.forEach(function (item) {
        let script = document.createElement("script");
        script.type = item.type;
        script.src = item.src;
        head.appendChild(script);
    });

    // 背景颜色默认值
    var mask_bg = "#9100D6";
    var strTMMixNick = "",
        snUnionId = "";
    var rankDataList = {},
        imgSetting = [];
    if (jqueryScript.readyState) {
        //IE
        jqueryScript.onreadystatechange = function () {
            if (
                jqueryScript.readyState == "complete" ||
                jqueryScript.readyState == "loaded"
            ) {
                jqueryScript.onreadystatechange = null;
            }
        };
    } else {
        jqueryScript.onload = function () {
            scriptReady = true;
            if (isReady() && !initialized) {
                init();
            }
        };
    }

    function isReady() {
        return rankBhdmId && scriptReady;
    }

    function init() {
        initialized = true;
        const params = { rankDataList, imgSetting, style };
        oauthAction(params);
        // createCenterPosition(style);
        // createFocusModal(style);
    }

    // 排行榜
    function createRank(style, imgSetting, rankDataList) {
        var rankStyle = `  .rank_container {
                width: 100vw;
            }
    
            .banner_img {
                height: 109.067vw;
                background: url('${imgSetting.head}') center no-repeat;
                background-size: 100%;
            }
    
            .free_rank {
                height: 46.267vw;
                background: url('${imgSetting.free_bg}') center no-repeat;
                background-size: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: -0.267vw;
            }
            .free_bill,.center_img,.free_mail{
                width: 29.867vw;
                height: 32.8vw;
                background: transparent !important
            }
            .center_img {
                margin-top: -5.333vw;
            }
    
            .rank_list_contaianer {
                background-color: #9100D6;
                margin-top: -0.133vw;
                padding-bottom: 3.333vw;
            }
    
            .rank_list {
                margin: 0 3.333vw;
                padding: 0 1.333vw;
                width: 90.667vw;
                background:linear-gradient(to bottom,#9604DA,#AE31FD);
                border-radius: 2vw;
                box-sizing: content-box;
            }
    
            .rank_list_before {
                height: 38vw;
                position: relative;
            }
            .p_rank{
                position: absolute;
                top: 0;
                left: 0;
                height: 38vw;
                width: 30.133vw;
                z-index: 1;
                background: url('${imgSetting.p_rank}');
                background-size: 100%;
            }
            .d_rank{
                position: absolute;
                top: -2.267vw;
                left: 28vw;
                height: 40.267vw;
                width: 34.667vw;
                z-index: 2;
                background: url('${imgSetting.d_rank}');
                background-size: 100%;
                text-align:center;
            }
            .g_rank{
                position: absolute;
                top: 0;
                right: 0;
                height: 38vw;
                width: 30.133vw;
                z-index: 1;
                background: url('${imgSetting.g_rank}');
                background-size: 100%;
                text-align:right;
            }
            .rank_list_after{
                padding-top: 0.667vw;
                padding-bottom: 2vw;
            }
            .forth_rank{
                background-color: #fff;
                height: 12vw;
                border-radius: 2vw;
                margin-top: 2vw;
                padding:0 4vw;
                display:flex;
                justify-content: space-between;
                align-items: center;
            }
            .p_rank_img_con{
                font-size:0;
                width: 16.4vw;
                height: 16.4vw;
                border-radius: 50%;
                margin-top: 8vw;
                margin-left: 6vw;
                background-color: #fff;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .p_rank_img {
                background: transparent !important;
            }
            .d_rank_img{
                background: transparent !important;
            }
            .d_rank_img_div{
                font-size:0;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: 17.333vw;
                height: 17.333vw;
                margin-top: 8.667vw;
                border-radius: 50%;
                background-color: #fff;
                overflow: hidden;
                margin-left: auto;
                margin-right: auto;
            }
            .g_rank_img_div{
                font-size:0;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: 16.4vw;
                height: 16.4vw;
                border-radius: 50%;
                background-color: #fff;
                overflow: hidden;
                margin-top: 8vw;
                margin-right: 6vw;
                margin-left: auto;
            }
            .g_rank_img{
                background: transparent !important;
            }
            .rank_font{
                font-size: 2.4vw;
                text-align: center;
                padding: 0.8vw 0;
            }
            .rank_font_big{
                font-size: 2.667vw;
                text-align: center;
                padding: 1.067vw 0;
            }
            .rank_font_num{
                font-size: 2.4vw;
                color: #ff348d;
            }
            .rank_focus{
                text-align: center;
                font-size: 0;
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
            .rank_focus_z{
                font-size: 0;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                padding-left:3.467vw;
            }
            .rank_focus_y{
                font-size: 0;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                padding-right:3.467vw;
            }
            .rank_focus_small{
                width: 20.8vw;
                height: 6.267vw;
                background: transparent !important
            }
            .rank_focus_big{
                width: 22vw;
                height: 6.667vw;
                background: transparent !important
            }
            .forth_rank_span{
                font-size: 4vw;
            }
            .forth_rank_img{
                width: 20vw;
                // height: 8.8vw;
                background: transparent !important;
            }
            .more_tasks {
                position: fixed;
                top: 106.667vw;
                right: 0;
                width: 19.2vw;
                height: 6.533vw;
                z-index:99;
            }
            .more_tasks_img {
                width: 19.2vw;
                height: 6.533vw;
                background: transparent !important;
            }
            .show_rule {
                position: absolute;
                top: 50vw;
                right: 0;
                width: 14.933vw;
                height: 6.533vw;
                z-index:99;
            }
        
            .show_rule_img {
                width: 14.933vw;
                height: 6.533vw;
                background: transparent !important;
            }
            .rank_active {
                border-radius: 15px;
                box-shadow: 0 -11px 10px -10px #fff inset,0 11px 10px -10px #fff inset,-11px 0 10px -10px #fff inset,11px 0 10px -10px #fff inset;
            }
            `;
        style.innerHTML = style.innerHTML + rankStyle;
        var threeRankDom = '';
        for (var i in rankDataList) {
            var rankData = rankDataList[i];
            threeRankDom +=
                `<div class="rank_list_contaianer hidden" id="${i}RankListZr">
                <div class="rank_list">
                    <div class="rank_list_before">
                        <div class="p_rank">
                            <div class="p_rank_img_con"><img class="p_rank_img" src="${rankData[1].shopLogo}" alt="" /></div>
                            <div class="rank_font">已关注：<span class="rank_font_num" id="shop${rankData[1].id}${rankData[1].sign}">${rankData[1].number}人</span></div>
                            <div class="rank_focus_z" onclick="focusShopDom($(this),'${rankData[1].shopUrl}')"><img class="rank_focus_small" src="${imgSetting.small_focus}" onclick="focusShop('${rankData[1].actId}','${rankData[1].userId}','${rankData[1].sign}','${rankData[1].id}')"/></div>
                        </div>
                        <div class="d_rank">
                            <div class="d_rank_img_div"><img class="d_rank_img" src="${rankData[0].shopLogo}" alt="" /></div>
                            <div class="rank_font_big">已关注：<span class="rank_font_num" id="shop${rankData[0].id}${rankData[0].sign}">${rankData[0].number}人</span></div>
                            <div class="rank_focus" onclick="focusShopDom($(this),'${rankData[0].shopUrl}')"><img class="rank_focus_big" src="${imgSetting.small_focus}" onclick="focusShop('${rankData[0].actId}','${rankData[0].userId}','${rankData[0].sign}','${rankData[0].id}')" /></div>
                        </div>
                        <div class="g_rank">
                            <div class="g_rank_img_div"><img class="g_rank_img" src="${rankData[2].shopLogo}" alt="" /></div>
                            <div class="rank_font">已关注：<span class="rank_font_num" id="shop${rankData[2].id}${rankData[2].sign}">${rankData[2].number}人</span></div>
                            <div class="rank_focus_y" onclick="focusShopDom($(this),'${rankData[2].shopUrl}')"><img class="rank_focus_small" src="${imgSetting.small_focus}" onclick="focusShop('${rankData[2].actId}','${rankData[2].userId}','${rankData[2].sign}','${rankData[2].id}')"/></div>
                        </div>
                    </div>
                    <div class="rank_list_after">
                        <div class="forth_rank">
                            <span class="forth_rank_span">4</span>
                            <img class="forth_rank_img" src="${rankData[3].shopLogo}" alt="" />
                            <div class="rank_font">已关注：<span class="rank_font_num" id="shop${rankData[3].id}${rankData[3].sign}">${rankData[3].number}人</span></div>
                            <div class="rank_focus" onclick="focusShopDom($(this),'${rankData[3].shopUrl}')"><img class="rank_focus_small" src="${imgSetting.small_focus}" onclick="focusShop('${rankData[3].actId}','${rankData[3].userId}','${rankData[3].sign}',,'${rankData[3].id}')"/></div>
                        </div>
                        <div class="forth_rank">
                            <span class="forth_rank_span">5</span>
                            <img class="forth_rank_img" src="${rankData[4].shopLogo}" alt="" />
                            <div class="rank_font">已关注：<span class="rank_font_num" id="shop${rankData[4].id}${rankData[4].sign}">${rankData[4].number}人</span></div>
                            <div class="rank_focus" onclick="focusShopDom($(this),'${rankData[4].shopUrl}')"><img class="rank_focus_small" src="${imgSetting.small_focus}" onclick="focusShop('${rankData[4].actId}','${rankData[4].userId}','${rankData[4].sign}',,'${rankData[4].id}')"/></div>
                        </div>
                    </div>
                </div>
            </div>`
        }
        var rankDom =
            `<div class="more_tasks"><img id="loadTaskYunZuanModal" onclick='$("#taskYunZuanModal").removeClass("hidden");focusYuanZuan()' class="more_tasks_img" src="${imgSetting.more_tasks}" /></div>
    <div class='rank_container' id='rankContainerZr'>
        <div class="show_rule"><img id="loadRuleModal" onclick='$("#ruleModalZr").removeClass("hidden");' class="show_rule_img" src="${imgSetting.rule}" /></div>
        <div class="free_rank">
            <img class="free_bill rank_active" id="free_rate_zr" src="${imgSetting.free_rate}"  />
            <img class="center_img" id="free_bill_zr" src="${imgSetting.free_bill}"  />
            <img class="free_mail" id="free_mail_zr" src="${imgSetting.free_mail}"  />
        </div>
        ${threeRankDom}
       </div>`;
        $("#" + rankBhdmId).html(rankDom);
        $("#freeRateRankListZr").removeClass('hidden');
        $("#free_rate_zr").click(function () {
            $("#freeRateRankListZr").removeClass('hidden');
            $("#freeBillRankListZr").addClass('hidden');
            $("#freeMailRankListZr").addClass('hidden');
            $(this).addClass('rank_active');
            $("#free_bill_zr").removeClass('rank_active');
            $("#free_mail_zr").removeClass('rank_active');
        });
        $("#free_bill_zr").click(function () {
            $("#freeRateRankListZr").addClass('hidden');
            $("#freeBillRankListZr").removeClass('hidden');
            $("#freeMailRankListZr").addClass('hidden');
            $(this).addClass('rank_active');
            $("#free_rate_zr").removeClass('rank_active');
            $("#free_mail_zr").removeClass('rank_active');
        });
        $("#free_mail_zr").click(function () {
            $("#freeRateRankListZr").addClass('hidden');
            $("#freeBillRankListZr").addClass('hidden');
            $("#freeMailRankListZr").removeClass('hidden');
            $(this).addClass('rank_active');
            $("#free_bill_zr").removeClass('rank_active');
            $("#free_rate_zr").removeClass('rank_active');
        });

        var num = 0;
        var timer = null;
        rankGo();
        $("#rankContainerZr").mouseenter(function () {
            clearInterval(timer)
        }).mouseleave(function () {
            rankGo();
        });
        function rankGo() {
            timer = setInterval(function () {
                num++;
                if (num === 3) {
                    // $("#freeRateRankListZr").fadeIn();
                    $("#freeRateRankListZr").removeClass('hidden');
                    $("#freeBillRankListZr").addClass('hidden');
                    $("#freeMailRankListZr").addClass('hidden');
                    $("#free_rate_zr").addClass('rank_active');
                    $("#free_bill_zr").removeClass('rank_active');
                    $("#free_mail_zr").removeClass('rank_active');
                    num = 0;
                } else if (num === 1) {
                    $("#freeRateRankListZr").addClass('hidden');
                    $("#freeBillRankListZr").removeClass('hidden');
                    $("#freeMailRankListZr").addClass('hidden');
                    $("#free_rate_zr").removeClass('rank_active');
                    $("#free_bill_zr").addClass('rank_active');
                    $("#free_mail_zr").removeClass('rank_active');
                } else if (num === 2) {
                    $("#freeRateRankListZr").addClass('hidden');
                    $("#freeBillRankListZr").addClass('hidden');
                    $("#freeMailRankListZr").removeClass('hidden');
                    $("#free_rate_zr").removeClass('rank_active');
                    $("#free_bill_zr").removeClass('rank_active');
                    $("#free_mail_zr").addClass('rank_active');
                }

            }, 3000);
        }

    }

    // 规则弹窗
    function loadRuleModal(style, imgSetting) {
        var ruleModalStyle = `.rule_container {
        background-color: #8f00d9;
        padding: 2.667vw 2.667vw 3.333vw 2.667vw;
        border-radius: 4.8vw;
        height:80vh;
        overflow:auto;

    }
    
    .rule_title {
        font-size: 4.533vw;
        color: #fff;
        text-align: center;
        font-weight: bold;
        line-height: 9.333vw;
    }
    
    .rule_subTitle {
        font-size: 3.2vw;
        color: #fff;
    }
    
    .rule_content {
        font-size: 2.533vw;
        color: #e8b8ff;
    }`;
        style.innerHTML = style.innerHTML + ruleModalStyle;
        var ruleModalDom = `<div id="ruleModalZr" class="hidden">
            <div class="mask">
            <div class="modal">
                <div class="close_div">
                    <img class="close_img" src="${imgSetting.close}" onclick="toggleModal('ruleModalZr')" alt="">
                </div>
                <div class="rule_container">
                    <div class="rule_title">
                        活动规则
                    </div>
                    <div class="rule_subTitle">
                        限时免单
                    </div>
                    <div class="rule_content">1、活动时间：2020.06.01和2020.06.18；</div>
                    <div class="rule_content">2、参与店铺：七匹狼官方旗舰店、拉夏贝尔旗舰店、阿玛尼苏宁自营店、新秀丽官方旗舰店、卡西欧手表旗舰店；</div>
                    <div class="rule_content">注：活动期间在以上店铺可参与免额活动，具体免额参与及玩法以店铺公示为准；</div>
                    <div class="rule_subTitle" style="margin-top:4vw">
                        分期免息
                    </div>
                    <div class="rule_content">1、限指定商品参加对应期数的免息活动，具体参与商品及免息期数以支付页面展示为准；</div>
                    <div class="rule_content">2、支付时选择任性付/信用卡/花呗分期即可查看免息期数和手续费优惠金额；</div>
                    <div class="rule_content">3、分期免息活动仅限苏宁易购APP最新版本参与；</div>
                    <div class="rule_content">4、分期免息商品不支持与非免息商品多订单合并付款，请单独下单支付；</div>
                    <div class="rule_content">5、预售商品支付尾款时可选择任性付/信用卡/花呗分期享免息。</div>
                    <div class="rule_subTitle" style="margin-top:4vw">
                        退货免邮
                    </div>
                    <div class="rule_content">1、适用范围：仅限服饰百货主会场（当前会场）的所有商户及商品参与退货免邮政策；</div>
                    <div class="rule_content">2、适用时间：2020年5月25日至2020年6月21日内产生的订单；</div>
                    <div class="rule_content">3、免邮形式</div>
                    <div class="rule_content">·卖家版运费险：提交订单时会自动生成运费险，若产生订单退货，保费将默认理赔到您的账户里；</div>
                    <div class="rule_content">·若无运费险，退货时请联系在线客服，我们可提供相应的补邮费政策；</div>
                    <div class="rule_content">4、特殊情况</div>
                    <div class="rule_content">部分类目及特殊商品因存在运输及退货方面的特殊性可不支持运费险的除外；</div>
                    <div class="rule_subTitle" style="margin-top:4vw">
                        注意事项
                    </div>
                    <div class="rule_content">活动期间，如用户存在或曾经存在以下违规行为（包括但不限于恶意套取资金、恶意套券、批量注册、机器作弊、虚假交易、扰乱系统、实施网络攻击、使用小运营商手机号、盗用或冒用他人信息等）或其他不符合正常消费者消费习惯的行为、或者其他被认定为侵犯苏宁金融、其他用户或任何第三人合法利益的行为等，主办方取消用户活动资格，并有权撤销相关违规交易和奖励，必要时追究法律责任。</div>
                </div>
            </div>
            </div>
            </div>`;
        $("body").append(ruleModalDom);
    }


    // 任务弹窗
    function loadTaskModal(style, imgSetting) {
        var taskModalStyle = ` /* 任务弹窗 */
        .task_contanier {
            width: 93.6vw;
            // height: 112vw;
            height:51.5vw;
            background: url("${imgSetting.task_bg}") top no-repeat #9100D6;
            background-size: 100%;
            border-radius:2vw;
        }
    
        .task_title {
            font-size: 7.6vw;
            text-align: center;
            color: #fff;
            padding-top: 5.333vw;
        }
    
        .task_subtitle {
            font-size: 3.2vw;
            text-align: center;
            color: #fff;
            padding-top: 2vw;
            padding-bottom: 4vw;
        }
    
        .task_item {
            padding: 1.333vw 2.667vw;
        }
    
        .task_content {
            padding: 0 2.667vw;
            height: 18.267vw;   
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;
            border-radius: 2.667vw;
        }
    
        .task_content_left {
            flex: 1;
            display: flex;
            align-items: center;
        }
    
        .task_logo {
            width: 9.333vw;
            height: 9.333vw;
            margin-right: 2vw;
        }
    
        .task_item_name {
            font-size: 3.2vw;
            color: #1c1c1c;
            font-weight: bold;
            margin-bottom: 1.333vw;
        }
    
        .task_item_description {
            font-size: 2.933vw;
            color: #8e8e8e;
        }
    
        .task_content_right{
            width: 19.467vw;
            text-align: center;
        }`;
        style.innerHTML = style.innerHTML + taskModalStyle;
        var taskModal = `<div id="taskYunZuanModal" class="hidden">
        <div class="mask">
        <div class="modal">
            <div class="close_div">
                <img class="close_img" src="${imgSetting.close}" onclick="toggleModal('taskYunZuanModal')" alt="">
            </div>
            <div class="task_contanier">
                <div class="task_title">做任务 赚云钻</div>
                <div class="task_subtitle">已获得<span id="gettedYuanZuanNumZr"></span>云钻</div>
                <div class="task_item">
                    <div class="task_content">
                        <div class="task_content_left">
                            <img class="task_logo" src="${imgSetting.focus_logo}" alt="">
                            <div>
                                <div class="task_item_name">三免榜单 关注3个店铺</div>
                                <div class="task_item_description">每日可领5个云钻</div>
                            </div>
                        </div>
                        <div class="task_content_right">
                            <img id="yuanZuanFirstTaskZr" onclick="document.getElementById('rankContainerZr').scrollIntoView();toggleModal('taskYunZuanModal')" src="${imgSetting.gofocus_btn}" alt="">
                            <img class="hidden" style="width:80%" src="${imgSetting.getted}" />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        </div>
        </div>`;
        $("body").append(taskModal);
    }
    // c位
    function createCenterPosition(style) {
        /* .c_position {
             background-color: #9100D6;
         }
      
         .c_position_banner {
             width: 100vw;
             height: 42.8vw;
             background: url('./img/c_banner.png') center no-repeat;
             background-size: 100%;
         }
      
         .c_position_content {
             padding: 0 3.2vw 2.667vw 3.2vw;
         }
      
         .c_position_bg {
             background: linear-gradient(to bottom, #8D04D7, #640495);
             // padding: 0 1.333vw;
         }
      
         .c_top_goods {
             display: flex;
             justify-content: space-between;
         }
      
         .top_goods_item {
             width: 31.733vw;
             height: 42.933vw;
             background: url('./img/goods_bg.png') center no-repeat;
             background-size: 100%;
         }
      
         .act_calendar {
             font-size: 0;
         }
      
         .act_calendar_title {
             font-size: 4vw;
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

    // 关注弹窗
    function createFocusModal(style, imgSetting) {
        var focusStyle = `.focus_modal {
            width: 60.533vw;
        }
        .focus_modal_container{
            height: 56vw;
            background: url('${imgSetting.success_box}') center no-repeat;
            background-size: 100%;
        }
        .focus_icon{
            width: 5.6vw;
            height: 5.6vw;
            margin-right: 2vw;
        }
        .foucs_tip{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            padding-top: 33.333vw;
            color: #000;
            font-size: 4.533vw;
            font-weight: bold;
        }
        .focus_content{
            font-size: 4vw;
            color: #9b9b9b;
            text-align: center;
        }
        .focusfail_modal_container{
            height: 56vw;
            background: url('${imgSetting.fail_box}') center no-repeat;
            background-size: 100%;
        }
        `;
        style.innerHTML = style.innerHTML + focusStyle;
        var focusModalDom =
            `<div id="focusSuccessModalzr" class="hidden">
        <div class="mask">
            <div class="focus_modal">
                <div class="close_div">
                    <img class="close_img" src="${imgSetting.close}" onclick="toggleModal('focusSuccessModalzr')">
                </div>
                <div class="focus_modal_container">
                    <div class="foucs_tip">
                        <img class="focus_icon" src="${imgSetting.success_icon}" />
                        <div>关注成功</div>
                    </div>
                    <div class="focus_content" id="focusSuccessText">已领取5个云钻</div>
                </div>
            </div>
        </div>
    </div>
    <div id="focusFailModalzr" class="hidden">
        <div class="mask">
            <div class="focus_modal">
                <div class="close_div">
                    <img class="close_img" src="${imgSetting.close}" onclick="toggleModal('focusFailModalzr')">
                </div>
                <div class="focusfail_modal_container">
                    <div class="foucs_tip">
                        <img class="focus_icon" src="${imgSetting.warning_icon}" />
                        <div>关注失败</div>
                    </div>
                    <div class="focus_content" id="focusFailText">奖品发放失败</div>
                </div>
            </div>
        </div>
    </div>`;
        $("body").append(focusModalDom);
    }


    // 获取图片素材
    function getBasicImg(strTMMixNick, snUnionId, callback) {
        $.ajax({
            // url:'https://192.168.2.13:8080/ql/front/department/basicsInfo?actId=402880a371f32abf0171f3307bd60013&user_id=71056125',
            url:
                "https://galaxie100141.cloud.suning.com/ql/front/department/basicsInfo",
            method: "POST",
            data: {
                actId: "402880a371f32abf0171f3307bd60013",
                userId: "71056125",
                strTMMixNick: strTMMixNick,
                snUnionId: snUnionId,
            },
            dataType: "json",
            xhrFields: {
                withCredentials: true,
            },
            success: callback,
        });
    }

    // 授权登录
    function oauthAction(params) {
        locationUrl = window.location.href;
        // 调用方式：
        if ($.probeAuthStatus) {
            $.probeAuthStatus(
                function (userData) {
                    console.log(userData);
                    //已登录
                    window.localStorage.setItem("strTMMixNick", userData);

                    getBasicImg(userData, "", function (res) {
                        const imgs = res.data.styleSettings,
                            rankData = res.data.interestFreeList;
                        params.rankDataList = {
                            freeRate: res.data.interestFreeList,
                            freeBill: res.data.freeList,
                            freeMail: res.data.freeMailingList,
                        };
                        for (let i = 0; i < imgs.length; i++) {
                            let key = imgs[i].styleName;
                            params.imgSetting[key] = imgs[i].url;
                        }
                        createRank(
                            params.style,
                            params.imgSetting,
                            params.rankDataList,
                        );
                        loadTaskModal(params.style, params.imgSetting);
                        loadRuleModal(params.style, params.imgSetting);
                        createFocusModal(params.style, params.imgSetting)
                    });
                },
                function () {
                    // 未登录
                    var targetUrl = encodeURIComponent(locationUrl);
                    var serverUrl =
                        config.aqUrl +
                        "?targetUrl=" +
                        targetUrl +
                        "&loginTheme=wap_new";
                    // 这里有个问题，如果返回不刷新，targetUrl 要 encodeURIComponent, service 后面的参数要再 encodeURIComponent 一次，两次 encodeURIComponent 可以解决。
                    var url =
                        config.loginUrl + serverUrl;
                    window.location.href = url;
                },
                {
                    base: config.authStatusUrl,
                    loginTheme: "wap_new",
                }
            );
        }
    }

    function getEnvConfig(env) {
        var envMap = {
            'xgpre': {
                authStatusUrl: "//myprexg.cnsuning.com/",
                aqUrl: "//aqprexg.cnsuning.com/asc/auth",
                loginUrl: "//passportprexg.cnsuning.com/ids/login?service=",
                jssdk: "//oss.suning.com/cbpmb/scbpm/suning-sdk-galaxie_xgpre.js"
            },
            'prd': {
                authStatusUrl: "//loginst.suning.com/",
                aqUrl: "https://aq.suning.com/asc/auth",
                loginUrl: "https://passport.suning.com/ids/login?service=",
                jssdk: "https://oss.suning.com/cbpmb/scbpm/suning-sdk-galaxieV0.4.9.js"
            }
        }
        return envMap[env];
    }

    function rank(options) {
        rankBhdmId = options.id;
        if (isReady() && !initialized) {
            init();
        }
        // document.getElementById(options.id).innerHTML =rankDom;
    }

    win.rank = rank;

})(window);

// 获取已获得云钻数
function focusYuanZuan(){
    $.ajax({
        url:
            "https://galaxie100141.cloud.suning.com/ql/front/department/missionModal",
        method: "POST",
        data: {
            actId: '402880a371f32abf0171f3307bd60013',
            strTMMixNick: window.localStorage.getItem("strTMMixNick"),
        },
        dataType: "json",
        xhrFields: {
            withCredentials: true,
        },
        success: function (res) {
            if(res.succ){
                $("#gettedYuanZuanNumZr").text(res.data.diamondNumFav);
                if(res.data.finishFav){
                    $("#yuanZuanFirstTaskZr").toggleClass('hidden').next().toggleClass('hidden')
                }
            }
        },
    });
}
// 关闭弹窗
function toggleModal(id) {
    $('#' + id).toggleClass('hidden');
}
function focusShopDom(th, url) {
    var dom =
        `<a href="${url}" style="font-size:2.667vw;width: 20.8vw;
    line-height: 6.267vw;border-radius: 3.134vw;
    background: #FF4AA5 ;color:#fff;display:inline-block;text-align:center">进店逛逛</a>`
    th.html(dom);
}
function focusShop(actId, userId, type, id) {
    $.ajax({
        url:
            "https://galaxie100141.cloud.suning.com/ql/front/department/favAndGetAward",
        method: "POST",
        data: {
            actId: actId,
            userId: userId,
            buyerNick: window.localStorage.getItem("strTMMixNick"),
            type: type,
        },
        dataType: "json",
        xhrFields: {
            withCredentials: true,
        },
        success: function (res) {
            if (res.succ) {
                toggleModal('focusSuccessModalzr');
                $("#shop" + id + type).html((parseInt($("#shop" + id + type).html()) + 1) + '人');
                $("#focusSuccessText").text(res.msg);
            } else {
                toggleModal('focusFailModalzr');
                $("#focusFailText").text(res.errorMsg);
            }
            // alert("succc");
        },
    });
}
