//[Dashboard Javascript]

// const { write } = require("fs");

//Project:	DashboardX Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)

// document.write("<script language=javascript src='./js/api.js'></script>");
// document.write("<script language=javascript src='http://at.alicdn.com/t/font_2612700_uzdaq5d2kzd.js'></script>");

$(function () {


    getCardListData();

    $("#showTotal").hide();
    $("#token-wallet-btn").hide();
    $(".show-extract-grant").hide();

    'use strict';

    // Unpkg imports
    const Web3Modal = window.Web3Modal.default;
    const WalletConnectProvider = window.WalletConnectProvider;
    // const EvmChains = window.evmChains;
    // const Fortmatic = window.Fortmatic;

    // Web3modal instance
    let web3Modal

    // Chosen wallet provider given by the dialog window
    let provider;

    // Address of the selected account
    let selectedAccount;

    /**
     * Setup the orchestra
     */
    function init() {

        // console.log("WalletConnectProvider is", WalletConnectProvider);
        // console.log("Fortmatic is", Fortmatic);

        // Tell Web3modal what providers we have available.
        // Built-in web browser provider (only one can exist as a time)
        // like MetaMask, Brave or Opera is added automatically by Web3modal
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    // Mikko's test key - don't copy as your mileage may vary
                    // infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
                    infuraId: "1ukYu9Xueflh1PmstJniWl0BZMi",
                }
            },

            //     // fortmatic: {
            //     //     package: Fortmatic,
            //     //     options: {
            //     //         // Mikko's TESTNET api key
            //     //         key: "pk_test_391E26A3B43A3350"
            //     //     }
            //     // }
        };

        web3Modal = new Web3Modal({
            cacheProvider: false, // optional
            providerOptions, // required
        });

    }


    /**
     * Kick in the UI action after Web3modal dialog has chosen a provider
     */
    async function fetchAccountData() {

        // Get a Web3 instance for the wallet
        // const web3 = new Web3(provider);
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

        // console.log(Web3.givenProvider._state.accounts.length);

        // console.log("Web3 instance is", web3);

        // Get list of accounts of the connected wallet
        const accounts = await web3.eth.getAccounts();

        // 返回地址在指定区块的余额。
        // web3.eth.getBalance("0x158BcddbA8Ce60731C007C4d1c2C1340952C556E").then(console.log);

        //返回匹配给定交易哈希的交易对象。
        // web3.eth.getTransaction('0x72fe77eb52ef32d21c136fb0d6524613cbc251a2135b642714283be5427f29b2')
        //     .then(console.log);

        // 获取由指定地址发送的交易数量。
        // web3.eth.getTransactionCount("0x158BcddbA8Ce60731C007C4d1c2C1340952C556E").then(console.log);

        // 返回当前所连接节点的链 ID
        // web3.eth.getChainId().then(console.log);

        // 判断给定的地址是否是一个有效的以太坊地址。大小写混合的地址还会检测校验和
        // console.log(web3.utils.isAddress("0x158BcddbA8Ce60731C007C4d1c2C1340952C556E"));


        $("#showTotal").show();
        $("#token-wallet-btn").show();
        $("#link-wallet-btn").hide();

        selectedAccount = accounts[0];
        console.log("账户：", selectedAccount);
        if (selectedAccount === undefined) {
            $("#showTotal").hide();
            $("#token-wallet-btn").hide();
            $("#link-wallet-btn").show();
            $(".show-extract-grant").hide();
            $(".unlock-wallet-row").show();
            window.localStorage.removeItem("isInjected");
            return false;
        }

        //处理token
        var tempSelectedAccount = selectedAccount.substring(0, 5) + "..." + selectedAccount.substring(selectedAccount.length - 4);
        $("#token-wallet-btn").html(tempSelectedAccount);

        //设置是否注入
        window.localStorage.setItem("isInjected", true);

        // // Get connected chain id from Ethereum node
        // const chainId = await web3.eth.getChainId();

        // // Load chain information over an HTTP API
        // const chainData = await EvmChains.getChainByChainId(chainId);
        // const chainData = await EvmChains.getAllChains();
        // console.log("chainData", chainData);


        // Get a handl
        // const template = document.querySelector("#template-balance");
        // const accountContainer = document.querySelector("#accounts");

        // Purge UI elements any previously loaded accounts
        // accountContainer.innerHTML = '';

        // Go through all accounts and get their ETH balance
        // const rowResolvers = accounts.map(async (address) => {
        //     const balance = await web3.eth.getBalance(address);
        //     // ethBalance is a BigNumber instance
        //     // https://github.com/indutny/bn.js/
        //     const ethBalance = web3.utils.fromWei(balance, "ether");
        //     const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
        //     // Fill in the templated row and put in the document
        //     // const clone = template.content.cloneNode(true);
        //     const clone = template;
        //     // clone.querySelector(".address").textContent = address;
        //     clone.querySelector(".balance").textContent = humanFriendlyBalance;
        //     console.log("clone:", clone);
        //     accountContainer.appendChild(clone);
        // });



        // Because rendering account does its own RPC commucation
        // with Ethereum node, we do not want to display any results
        // until data for all accounts is loaded
        // await Promise.all(rowResolvers);

        // Display fully loaded UI for wallet data
        // document.querySelector("#prepare").style.display = "none";
        // document.querySelector("#connected").style.display = "block";


    }



    /**
     * Fetch account data for UI when
     * - User switches accounts in wallet
     * - User switches networks in wallet
     * - User connects wallet initially
     */
    async function refreshAccountData() {

        // If any current data is displayed when
        // the user is switching acounts in the wallet
        // immediate hide this data
        // document.querySelector("#connected").style.display = "none";
        // document.querySelector("#prepare").style.display = "block";

        // Disable button while UI is loading.
        // with Ethereum node via JSON-RPC and loads chain data
        // over an API call.
        // document.querySelector("#btn-connect").setAttribute("disabled", "disabled")

        $("#showTotal").show();
        $("#token-wallet-btn").show();
        $("#link-wallet-btn").hide();

        await fetchAccountData(provider);
        // document.querySelector("#btn-connect").removeAttribute("disabled")


    }



    /**
     * Connect wallet button pressed.
     */
    async function onConnect() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        if (typeof web3 !== 'undefined') {
            if (web3.currentProvider.isMetaMask == true) {
                // "MetaMask可用"
                try {
                    provider = await web3Modal.connect();
                    $(".show-extract-grant").show();
                    $(".unlock-wallet-row").hide();
                } catch (e) {
                    $("#showTotal").hide();
                    $("#token-wallet-btn").hide();
                    return;
                }

                // Subscribe to accounts change
                provider.on("accountsChanged", (accounts) => {
                    // console.log("accountsChanged");
                    fetchAccountData();
                });

                // Subscribe to chainId change
                provider.on("chainChanged", (chainId) => {
                    // console.log("chainChanged");
                    fetchAccountData();
                });

                // Subscribe to networkId change
                provider.on("networkChanged", (networkId) => {
                    // console.log("networkChanged");
                    fetchAccountData();
                });

                await refreshAccountData();
            } else {
                // //登录
                // //查看余额信息
                // //打开转账页面
                // //填写地址、金额
                // //转账
                // $("#transfer-accounts-btn").click();
                // $(".number-input").val(0);
                // $(".number-input").html("");
                // $("#to-address").val("");
                // $(".error-info").html("");
                // // 请求用户授权 解决web3js无法直接唤起Meta Mask获取用户身份
                // var accounts = await web3.eth.getAccounts();

                // // 取第一个账户
                // var fromAccount = accounts[0];
                // $("#from-address").html(fromAccount);

                // // 返回账户的余额
                // var balance = await web3.eth.getBalance(fromAccount);
                // $("#account-balance").html(web3.utils.fromWei(balance));

                // // var toAccount = accounts[1];
                // // $("#to-address").html(toAccount);

            }
        } else {
            $("#env").html("No web3? 需要安装<a href='https://metamask.io/'>MetaMask</a>!");
        }
    }


    /**
     * Disconnect wallet button pressed.
     */
    async function onDisconnect() {

        // TODO: Which providers have close method?
        if (provider.close) {
            await provider.close();

            // If the cached provider is not cleared,
            // WalletConnect will default to the existing session
            // and does not allow to re-scan the QR code with a new wallet.
            // Depending on your use case you may want or want not his behavir.
            await web3Modal.clearCachedProvider();
            provider = null;
        }

        selectedAccount = null;

        // Set the UI back to the initial state
        // document.querySelector("#prepare").style.display = "block";
        // document.querySelector("#connected").style.display = "none";

        // $("#showTotal").hide();
        // $("#token-wallet-btn").hide();
        // $("#link-wallet-btn").show();
        // $("#link-wallet-btn").html("连接钱包");

    }

    function onShowWallet() {
        $("#token").html(selectedAccount);
        $("#HECO-href").attr("href", "https://hecoinfo.com/address/" + selectedAccount);
    }


    if (window.localStorage.getItem("isInjected")) {
        provider = Web3.givenProvider;

        $(".show-extract-grant").show();
        $(".unlock-wallet-row").hide();

        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
            fetchAccountData();
        });

        // Subscribe to chainId change
        provider.on("chainChanged", (chainId) => {
            fetchAccountData();
        });

        // Subscribe to networkId change
        provider.on("networkChanged", (networkId) => {
            fetchAccountData();
        });

        refreshAccountData();
    }


    init();

    document.querySelector("#link-wallet-btn").addEventListener("click", onConnect);

    for (let i = 0; i < document.querySelectorAll(".unlock-wallet").length; i++) {
        document.querySelectorAll(".unlock-wallet")[i].addEventListener("click", onConnect);
    }
    // document.querySelector("#token-wallet-btn").addEventListener("click", onDisconnect);
    document.querySelector("#token-wallet-btn").addEventListener("click", onShowWallet);

    document.querySelector("#transfer-submit").addEventListener("click", transferSubmit);

    // /**
    //  * Main entry point.
    //  */
    // window.addEventListener('load', async () => {
    //     init();

    //     document.querySelector("#link-wallet-btn").addEventListener("click", onConnect);

    //     for (let i = 0; i < document.querySelectorAll(".unlock-wallet").length; i++) {
    //         document.querySelectorAll(".unlock-wallet")[i].addEventListener("click", onConnect);
    //     }
    //     // document.querySelector("#token-wallet-btn").addEventListener("click", onDisconnect);
    //     document.querySelector("#token-wallet-btn").addEventListener("click", onShowWallet);

    //     document.querySelector("#transfer-submit").addEventListener("click", transferSubmit);
    // });





    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    $('.number-input').bind('input propertychange', function () {
        $(".error-info").html("");
        if ($(this).val()) {
            $(".number-input").val($(this).val());
        }
    })

    $('#to-address').bind('input propertychange', function () {
        $(".error-info").html("");
        if ($(this).val()) {
            $("#to-address").val($(this).val());
        }
    })

    $(".grant-btn").on("click", function () {
        $(this).hide();
        $(this).siblings().show();
    });


    $(".deposit-btn").hide();

    $(".deposit-btn").on("click", function () {
        $(".deposit-btn").attr({ 'data-toggle': "modal", 'data-target': "#modal-deposit" });
        deposited();
    });


    $("#smart-contract-transfer-btn").on("click", function () {
        openTransfer();
    });


}); // End of use strict

function getCardListData() {
    var str = '';
    for (let i = 0; i < 1; i++) {
        str += '<div class="col-12 col-xl-4">';
        str += '<div class="card container-fluid p-4" style="border-radius: 20px;">';
        str += '<div class="row">';
        str += '<div class="col-6 text-left p-0">';
        str += '<img src="../images/currency/ADA.png" height="40px" width="40px">';
        str += '<span style="padding-left:4px;vertical-align: middle; font-size: 24px; color: #131d32;font-weight: bolder;">COW</span>';
        str += '</div>';
        str += '<div class="col-6 text-right p-1">';
        str += '<span style="font-size: 10px; line-height: 40px;color: #8391a8;float: right;">收获MDX、COW</span>';
        str += '</div>';
        str += '</div>';
        str += '<div class="card-body p-0">';
        str += '<div class="row">';
        str += '<div class="col-6 text-left p-2" style="line-height: 29px;">';
        str += '<span style="font-size: 12px;color: 8391a8;">年化收益率<span style="color: #3078ff;">(复利)</span></span>';
        str += '</div>';
        str += '<div class="col-6 text-right p-1">';
        str += '<span style="font-size: 24px; color: #00b595;font-weight: bolder;">123.75%</span>';
        str += '</div>';
        str += '</div>';
        str += '<div class="row">';
        str += '<div class="col-6 text-left p-2"><span style="font-size: 12px;color: 8391a8;">已存入(';
        str += '<span>COW</span> )</span>';
        str += '</div>';
        str += '<div class="col-6 text-right p-2"><span style="font-size: 14px;font-weight: bold;color: #131d32;">0.00000</span>';
        str += '</div>';
        str += '</div>';
        str += '<div class="row">';
        str += '<div class="col-6 text-left p-2"><span style="font-size: 12px;color: 8391a8;">锁仓量(';
        str += '<span>COW</span> )</span>';
        str += '</div>';
        str += '<div class="col-6 text-right p-2"><span style="font-size: 14px;font-weight: bold;color: #8391a8;">2,211,587.41</span>';
        str += '</div>';
        str += '</div>';
        str += '<div class="row">';
        str += '<div class="col-6 text-left p-2"><span style="font-size: 12px;color: 8391a8;">剩余可投(';
        str += '<span>COW</span> )</span>';
        str += '</div>';
        str += '<div class="col-6 text-right p-2"><span style="font-size: 14px;font-weight: bold;color: #8391a8;">1288412.59</span>';
        str += '</div>';
        str += '</div>';
        str += '<div class="row">';
        str += '<div class="col-10 text-left p-2 pt-20 pb-20" style="vertical-align: middle;">';
        str += '<div class="progress progress-xxs mb-0">';
        str += '<div class="progress-bar" role="progressbar"';
        str += 'aria-valuenow="60" aria-valuemin="0"';
        str += 'aria-valuemax="100" style="width: 60%;background-color: #3078ff;">';
        str += '</div>';
        str += '</div>';
        str += '</div>';
        str += '<div class="col-2 text-right p-2"style="line-height: 29px;">';
        str += '<span style="float: right; font-size: 14px;font-weight: bold;color: #8391a8;">';
        str += '60%';
        str += '</span>';
        str += '</div>';
        str += '</div>';
        str += '<div class="row unlock-wallet-row">';
        str += '<div class="col-12 p-2">';
        str += '<button type="button"';
        str += 'class="waves-effect waves-light btn bg-gradient-bluecyan unlock-wallet"';
        str += 'style="width: 100%;border-radius: 20px;">解锁钱包</button>';
        str += '</div>';
        str += '</div>';
        str += '<div class="row show-extract-grant">';
        str += '<div class="col-12 p-2">';
        str += '<div class="row">';
        str += '<div class="col-6"><button id="extract-btn"';
        str += 'type="button"';
        str += 'class="waves-effect waves-light btn" onclick="extract()">提取</button>';
        str += '</div>';
        str += '<div class="col-6"><button type="button" class="waves-effect waves-light btn bg-gradient-bluecyan grant-btn">授权</button>';
        str += '<button type="button" class="waves-effect waves-light btn bg-gradient-bluecyan deposit-btn">存入</button>';
        str += '</div>';
        str += '</div>';
        str += '</div>';
        str += '</div>';
        str += '</div>';
        str += '</div>';
        str += '</div>';
        str += '</div>';
        str += '</div>';
    }

    $("#tab-1-card-list").append(str);
    // $("#tab-2-card-list").append(str);
}

/**
 * 提取按钮
 */
async function extract() {
    $(".number-input").val(0);
    $(".number-input").html("");
    $("#extract-btn").attr({ 'data-toggle': "modal", 'data-target': "#modal-extract" });
    $(".error-info").html("");


    if (JSON.parse(window.localStorage.getItem("extractdata"))) {
        var data = JSON.parse(window.localStorage.getItem("extractdata"))
        for (let i = 0; i < data.length; i++) {
            $("#MDX-profit").html(data[i].MDXProfit);
            $("#COW-profit").html(data[i].COWProfit);
            $("#COW-deposited").html(data[i].COWDeposited);
        }
        if (parseFloat($("#COW-profit").html()) === 0) {
            $("#extract-all-button").attr("disabled", "true");
            $("#extract-profit-btn").attr("disabled", "true");
            $("#extract-submit").attr("disabled", "true");
        }
    } else {
        $.ajax({
            type: "get",
            url: "/main-ltr/json/extractdata.json",
            success: function (res) {
                for (let i = 0; i < res.length; i++) {
                    $("#MDX-profit").html(res[i].MDXProfit);
                    $("#COW-profit").html(res[i].COWProfit);
                    $("#COW-deposited").html(res[i].COWDeposited);
                }
                if (parseFloat($("#COW-profit").html()) === 0) {
                    $("#extract-all-button").attr("disabled", "true");
                    $("#extract-profit-btn").attr("disabled", "true");
                }
            }
        });
    }
}

/**
 * 提取全部
 */
function extractAll() {
    $(".number-input").val($("#COW-profit").html());
    $(".error-info").html("");
}

/**
 * 提取表单
 */
function extractSubmit() {
    if ($(".number-input").val() <= 0) {
        $(".error-info").html("输入数量不能为负数或0");
        return false;
    } else {
        if ($("#COW-profit").html() - $(".number-input").val() < 0) {
            $(".error-info").html("超过了最大可提取收益");
            return false;
        } else {
            var extractdata = [];
            extractdata[0] = {
                "MDXProfit": "25.3600",
                "COWProfit": parseFloat($("#COW-profit").html()) - parseFloat($(".number-input").val()),
                "COWDeposited": parseFloat($("#COW-deposited").html()) + parseFloat($(".number-input").val())
            };
            window.localStorage.setItem("extractdata", JSON.stringify(extractdata));
            $(".extra-close-btn").click();
        }
    }
}



// 存入相关
/**
 * 存入按钮
 */
async function deposited() {
    $(".number-input").val(0);
    $(".number-input").html("");
    $(".error-info").html("");

    if (JSON.parse(window.localStorage.getItem("depositeddata"))) {
        var data = JSON.parse(window.localStorage.getItem("depositeddata"))
        for (let i = 0; i < data.length; i++) {
            $("#haveDeposit").html(data[i].haveDeposit);
            $("#surplusSaved").html(data[i].surplusSaved);
            $("#balance").html(data[i].balance);
        }
        if (parseFloat($("#balance").html()) === 0) {
            $("#deposited-all-button").attr("disabled", "true");
            $("#deposited-submit").attr("disabled", "true");
        }
    } else {
        $.ajax({
            type: "get",
            url: "/main-ltr/json/depositdata.json",
            success: function (res) {
                for (let i = 0; i < res.length; i++) {
                    $("#haveDeposit").html(res[i].haveDeposit);
                    $("#surplusSaved").html(res[i].surplusSaved);
                    $("#balance").html(res[i].balance);
                }
            }
        });
    }

}

function depositedAll() {
    $(".number-input").val($("#balance").html());
    $(".error-info").html("");
}

/**
 * 提取表单
 */
function depositedSubmit() {
    if ($(".number-input").val() <= 0) {
        $(".error-info").html("输入数量不能为负数或0");
        return false;
    } else {
        if ($("#balance").html() - $(".number-input").val() < 0) {
            $(".error-info").html("超过了剩余余额");
            return false;
        } else {
            var depositeddata = [];
            depositeddata[0] = {
                "haveDeposit": parseFloat($("#haveDeposit").html()) + parseFloat($(".number-input").val()),
                "surplusSaved": (parseFloat($("#surplusSaved").html()) - parseFloat($(".number-input").val())).toFixed(4),
                "balance": parseFloat($("#balance").html()) - parseFloat($(".number-input").val())
            };

            window.localStorage.setItem("depositeddata", JSON.stringify(depositeddata));
            $(".extra-close-btn").click();
        }
    }
}


//转账模块
function transferAll() {
    $(".number-input").val($("#account-balance").html());
    $(".error-info").html("");
}

//转账
function transferSubmit() {
    var fromaddress = $("#from-address").html();
    var toaddress = $("#to-address").val();
    var accountnumber = $(".number-input").val();


    // const web3 = new Web3("http://127.0.0.1:7545");
    var web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    if (!web3.utils.isAddress($("#to-address").val())) {
        $(".error-info").html("请输入正确的地址");
        return false;
    }

    if ($(".number-input").val() <= 0) {
        $(".error-info").html("转账数量不能为负数或0");
        return false;
    } else {
        if ($("#account-balance").html() - $(".number-input").val() < 0) {
            $(".error-info").html("超过了余额");
            return false;
        } else {
            var gasprice;
            web3.eth.getGasPrice().then((res) => {
                gasprice = res;
                var total = (parseInt(gasprice) + parseInt(web3.utils.toWei(accountnumber)));
                if (total > parseInt(web3.utils.toWei($("#account-balance").html()))) {
                    $(".error-info").html("总费用大于余额");
                    return false;
                } else {
                    web3.eth.sendTransaction({
                        from: fromaddress,
                        to: toaddress,
                        value: web3.utils.toWei(accountnumber)
                    });
                }
                $(".extra-close-btn").click();
            });
        }
    }

}


/**
 * 智能合约
 */
function smartContract() {
    //连接到Ganache
    var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
    // var web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    var abiData = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "num",
                    "type": "uint256"
                }
            ],
            "name": "store",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "retrieve",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    //创建合约对象
    var contract = new web3.eth.Contract(abiData, '0x866Aa01A566BeDc7E98852d05d0c35d8f2551798');
    //调用合约的方法
    //我们可以在Remix中设置，在这里读取，或者反过来。交叉验证更加直观。
    contract.methods.retrieve().call().then(console.log);
    contract.methods.store(200).send({ from: '0x95ff56CCA39eED255b47B973c2fd5B2C91885616' }).then(console.log);
}

async function openTransfer() {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
    // var web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    //登录
    //查看余额信息
    //打开转账页面
    //填写地址、金额
    //转账
    $("#transfer-accounts-btn").click();
    $(".number-input").val(0);
    $(".number-input").html("");
    $("#to-address").val("");
    $(".error-info").html("");
    // 请求用户授权 解决web3js无法直接唤起Meta Mask获取用户身份
    var accounts = await web3.eth.getAccounts();

    // 取第一个账户
    var fromAccount = accounts[0];
    $("#from-address").html(fromAccount);

    // 返回账户的余额
    var balance = await web3.eth.getBalance(fromAccount);
    $("#account-balance").html(web3.utils.fromWei(balance));

    // var toAccount = accounts[1];
    // $("#to-address").html(toAccount);

    smartContract();
}