//現在時間
function update(){
    var now = new Date();
    document.getElementById("year").textContent = now.getFullYear();
    document.getElementById("month").textContent = (now.getMonth()+1);
    document.getElementById("date").textContent = now.getDate();
    document.getElementById("hour").textContent = (now.getHours());
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


//ニュース完成していません
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
