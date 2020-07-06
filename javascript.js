//現在時間
function update(){
    var now = new Date();
    document.getElementById("year").textContent = now.getFullYear();
    document.getElementById("month").textContent = (now.getMonth()+1);
    document.getElementById("date").textContent = now.getDate();
    document.getElementById("hour").textContent = now.getHours();
    document.getElementById("min").textContent = now.getMinutes();
    document.getElementById("sec").textContent = now.getSeconds();
}
//0610課題_素因数分解
function minFactor(a) {
    if (isNaN(a)) {
        var em="半角数字を入力してください!!";
        return em;
    }
    var num = a; //数字
    var mod = 1; //あまり余り１以上で次の数へ
    var d   = 2; //numを割る数
    var res = 0;
    var fac = a+" = "; //素因数分解の文字列
    var cun = 0; //カウンター初めを判別するため
    while (num>1 && d<=num) {
        mod = num%d;
        if (mod==0) { //dは、aの素因数
            num /= d;
            res = d;
            cun += 1;
            if (cun==1) {
                fac += res;
            }else {
                fac += "*"+res;
            }
        }else { //dは、素因数ではないので1つあげる。
            d +=1;
        }
    }
    return fac;
}
//0617課題_自動計算表
function trans() {
    a = Number(tra.value01.value);
    b = Number(tra.value02.value);
    if (isNaN(a)||isNaN(b)) {
        alert("半角数字を入力してください!!");
        return;
    }
    c = Number(tra.num01.value);
    d = Number(tra.num02.value);
    for (var i = 0; i <= 2; i++) {
        if(tra.par[i].checked){
            e = Number(tra.par[i].value);
        }
    }
    f = Math.floor(a*c*e);//商品１の税別価格×個数
    g = Math.floor(b*d*e);//商品２の税別価格×個数
    console.log(typeof(c));
    console.log(typeof(c+d));
    console.log(typeof(e));
    tra.valueS.value = a*c+b*d;
    tra.numS.value = c+d;
    tra.value01N.value = f;
    tra.value02N.value = g;
    tra.valueNS.value = f+g;
}
//0624課題_気象情報平均
function weather() {
    result = getCSV("https://www.gakujutsu.co.jp/text/isbn978-4-7806-0708-6/file/oneyear.csv");
    f0624.txt.value="";//テキストリセット
    //[0]年月日[1~4]彦根[5~8]那覇[9~13]網走
    var total=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];//[日照時間,降水量,気温,積雪量]=k、[彦根,那覇,沖縄]=j
    var s = Number(f0624.timestart.value);
    var e = Number(f0624.timeend.value);
    if (s<1 || 12<s || e<1 || 12<e) {
        alert("1~12の半角数字を入力してください!!");
        return;
    }
    var count = 0; //期間が何日かカウンター
    for (var i = 2; i < result.length-1; i++) {
        var month = Number(result[i][0].split("/")[1]);
        if (s<=month && month<=e) {
            count+=1;
            for (var j = 0; j <= 2; j++) {
                for (var k = 0; k <=3; k++) {
                    total[k][j]+=Number(result[i][j*4+k+1]);
                }
            }
        }
    }
    console.log(total[2]);
    console.log(count);
    var pla = [f0624.pla1, f0624.pla2, f0624.pla3];
    var menu = [f0624.menu1, f0624.menu2, f0624.menu3, f0624.menu4];
    var unit = ["時間","mm","℃","cm"];
    for (var j = 0; j <= 2; j++) {
        var str ="";
        if (pla[j].checked) {
            str+=pla[j].value+"の";
            for (var k = 0; k <=3; k++) {
                if (menu[k].checked) {
                    var mean=(total[k][j]/count).toFixed(2);
                    str+=menu[k].value+"は"+mean+unit[k];
                }
            }
        }
        if (str!="") {
            f0624.txt.value+=str+"\n";
        }
    }
}
function getCSV(file){
    var req = new XMLHttpRequest( );
    req.open("get", file, false);
    req.send();
    var tmp = req.responseText.split("\n");
    var result = new Array();
    for(var i=0;i<tmp.length;i++){
        result[i] = tmp[i].split(",");
    }
    return result;
}
function downloadText( name, content ) {
    var blob = new Blob([ content ], { "type" : "text/plain" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';
    a.download = name;
    a.click();
}
//0701課題_気温
function temp() {
    var cvs=document.getElementById("temp-cnv");
    var ctx=cvs.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    result = getCSV("https://www.gakujutsu.co.jp/text/isbn978-4-7806-0708-6/file/oneyear.csv");
    //[0]年月日[3]彦根[7]那覇[11]網走：気温データ
    var pla = [f0701.pla1, f0701.pla2, f0701.pla3];
    var col = [[255,0,0],[0,255,0],[0,0,255]]
    var y0 = 50;
    var x0 = 50;
    var yzoom = 5;
    var xzoom = 2;
    var num = result.length-1;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.font="10px sans-serif";
    ctx.strokeText( "0", x0-15, yzoom*y0);
    ctx.strokeText( "30", x0-15, yzoom*(y0-30));
    line( ctx, x0, yzoom*(y0+12.5), x0, yzoom*(y0-42.5), 0, 0, 0 );//y軸
    line( ctx, x0-10, yzoom*y0, x0+xzoom*num, yzoom*y0, 150, 150, 150 );//０度ライン
    line( ctx, x0-10, yzoom*(y0-30), x0+xzoom*num, yzoom*(y0-30), 150, 150, 150 );//猛暑日ライン
    var count = 0;
    for (var j = 0; j <= 2; j++) {
        if (pla[j].checked) {
            //凡例
            ctx.fillStyle = "rgb(200,200,200)";
            ctx.fillRect(x0+20, yzoom*(y0-42)+30*(count), 150, 30 );
            line( ctx, x0+25, yzoom*(y0-42+3)+30*(count), x0+100, yzoom*(y0-42+3)+30*(count), col[j][0], col[j][1] , col[j][2] );//3*yzoom=3*5=15
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.font="16px sans-serif";
            ctx.strokeText( pla[j].value, x0+120, yzoom*(y0-42+5)-2+30*(count));
            //グラフの描画
            for (var i = 3; i < result.length-1; i++) {
                var x1 = x0+xzoom*(i-1);
                var x2 = x0+xzoom*i;
                var y1 = y0-Number(result[i-1][4*j+3]);
                var y2 = y0-Number(result[i][4*j+3]);
                line( ctx, x1, yzoom*y1, x2, yzoom*y2, col[j][0], col[j][1] , col[j][2] );
            }
            count+=1;
        }
    }

}//----temp
function line( ctx, x1, y1, x2, y2, r, g, b ) {
    ctx.strokeStyle = "rgb("+r+","+g+","+b+")";
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}


//ニュース完成していません
function news() {
    result = getCSV("data/newsdata.csv");
    console.log(result);
    var str = "";
    for (var i = 0; i < result.length; i++) {
        var title=result[i][0];
        var link =result[i][1];
        str += '<a href="'+link+'" target="_blank">'+title+'</a></br>';
    }
    return str;
}
/*
const outputElement = document.getElementById('output_csv');
function getCsvData(dataPath) {
 const request = new XMLHttpRequest();
 request.addEventListener('load', (event) => {
  const response = event.target.responseText;
  outputElement.innerHTML = response;
 });
 request.open('GET', dataPath, true);
 request.send();
}
getCsvData('./data/newsdata.csv');
*/
