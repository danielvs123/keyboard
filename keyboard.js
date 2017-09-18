;(function ( keyboard, undefined ) {
    var onBlurStr = "";

    var isEng = true;

    var onSelectWordDiv = document.getElementById("onSelectWordDiv"),
        inputShowDiv = document.getElementById("input_btn_div"),
        inner_text = document.getElementById("inner_text");

    keyboard.start = function(){
        var width = document.body.clientWidth,
            height = width*392/720,
            keyboard = document.getElementById("keyboardParent"),
            keyboardMain = document.getElementById("keyBoardOuterDiv");
        keyboard.style.height = height/2*3+"px";
        keyboardMain.style.height = height/2*3+"px";
        keyboardMain.style.marginBottom = -height/2+"px";
        var wordList = [
            ["q","w","e","r","t","y","u","i","o","p"],
            ["a","s","d","f","g","h","j","k","l"],
            ["z","x","c","v","b","n","m"]
        ];

        var charsetList = [
            ["1","2","3","4","5","6","7","8","9","0"],
            ["-","/",":",";","(",")","¥","@",'“','”'],
            ["。","，","、","?","!","."]
        ];

        //普通界面
        function printNormalList(){
            keyboardMain.innerHTML = "";
            for (var i = 0;i<wordList[0].length;i++){
                printInnerBtn(i,0,wordList);
            }
            emptyDiv();
            for (var i = 0;i<wordList[1].length;i++){
                printInnerBtn(i,1,wordList);
            }
            emptyDiv();
            functionalDiv(0);
            optionalDiv(1);
            for (var i = 0;i<wordList[2].length;i++){
                printInnerBtn(i,2,wordList);
            }
            optionalDiv(2);
            functionalDiv(1);
            functionalDiv(2);
            functionalDiv(3);
            spaceDiv();
            enterDiv();
            $('#input_btn_div').css({
                "line-height":height*0.25*0.85 + "px"
            });
            $('.alphabet').css({
                "font-size":width/16+"px",
                "line-height":document.getElementsByClassName("alphabet")[0].clientHeight + "px"
            });
        }

        //点击123按钮后的界面
        function printCharsetTable(){
            keyboardMain.innerHTML = "";
            for (var i = 0;i<charsetList[0].length;i++){
                printInnerBtn(i,0,charsetList);
            }
            for (var i = 0;i<charsetList[1].length;i++){
                printInnerBtn(i,1,charsetList);
            }
            functionalAddSymbol();
            for (var i = 0;i<charsetList[2].length;i++){
                functionalAddC(i,2,wordList);
            }
            functionalDiv(1);
            functionalDiv(5);
            functionalDiv(3);
            spaceDiv();
            enterDiv();
            $('#input_btn_div').css({
                "line-height":height*0.25*0.85 + "px"
            });
            $('.alphabet').css({
                "font-size":width/16+"px",
                "line-height":document.getElementsByClassName("alphabet")[0].clientHeight + "px"
            });
        }

        function functionalAddSymbol(){
            var upper = document.createElement("div");
            upper.className = "keyboard_alphabet_outer";
            upper.style.width = width*92/720 + "px";
            keyboardMain.appendChild(upper);
            var div = document.createElement("div");
            div.className = "sendBtn toolkit-color";
            div.innerText = "#+=";
            div.style.fontSize = width/32 + "px";
            div.style.lineHeight = height*0.85/4 + "px";
            div.style.width = "90%";
            upper.appendChild(div);
        }

        function functionalAddC(i,list,wordList){
            var upper = document.createElement("div");
            upper.className = "keyboard_alphabet_outer";
            upper.style.width = width*88/720 + "px";
            keyboardMain.appendChild(upper);
            var div = document.createElement("div");
            div.className = "sendBtn alphabet";
            div.innerText = charsetList[list][i];
            div.onclick = function(){
                inner_text.innerText = inner_text.innerText + div.innerText;
                onBlurStr = inner_text.innerText.toLowerCase();
            };
            div.style.lineHeight = height*0.85/4 + "px";
            div.style.width = "90%";
            upper.appendChild(div);
        }

        //大写和z之间的间隔
        function optionalDiv(num){
            var upper = document.createElement("div");
            upper.className = "keyboard_alphabet_outer";
            if(num==1){
                upper.style.width = width*14/720 + "px";
            }else{
                upper.style.width = width*8/720 + "px";
            }
            keyboardMain.appendChild(upper);
        }

        function functionalDiv(no){
            var upper = document.createElement("div");
            upper.className = "keyboard_alphabet_outer";
            upper.style.width = width*92/720 + "px";
            keyboardMain.appendChild(upper);
            var div = document.createElement("div");
            div.className = "innerSetBox toolkit-color";
            if (no == 3){
                div.style.left = "5%";
                var innerDiv = document.createElement("div");
                innerDiv.innerHTML = document.getElementById("svg_div").innerHTML;
                innerDiv.style.width = "80%";
                innerDiv.style.marginLeft = "auto";
                innerDiv.style.marginRight = "auto";
                innerDiv.style.paddingTop = "5px";
                div.onclick = function(){
                    if(isEng){
                        $('#path2392').css({
                            "fill":"rgb(0, 204, 255)"
                        })
                        isEng = false;
                    }else{
                        $('#path2392').css({
                            "fill":"transparent"
                        })
                        isEng = true;
                    }
                };
                div.appendChild(innerDiv);
            }else if (no == 1){
                //inputShowDiv.innerText
                var innerDiv = document.createElement("div");
                innerDiv.innerHTML = document.getElementById("delete_svg_div").innerHTML;
                innerDiv.style.width = "70%";
                innerDiv.style.marginLeft = "auto";
                innerDiv.style.marginRight = "auto";
                innerDiv.style.paddingTop = "5px";
                upper.style.lineHeight = document.getElementsByClassName("alphabet")[0].clientHeight + "px";
                div.appendChild(innerDiv);              //  delete_svg_div
                div.onclick = function(){
                    if (inner_text.innerText != ""){
                        var str =  inner_text.innerText;
                        inner_text.innerText =str.substring(0,str.length-1);
                        onBlurStr = inner_text.innerText.toLowerCase();
                        findFiveWord(onBlurStr);
                    }
                }
            }else if (no == 2){
                var div = document.createElement("div");
                div.className = "sendBtn toolkit-color";
                div.innerText = "123";
                div.onclick = function(){
                    printCharsetTable();
                }
                div.style.fontSize = width/32 + "px";
                div.style.lineHeight = height*0.85/4 + "px";
                div.style.width = "90%";
                upper.appendChild(div);
            }else if (no == 0){
                //点击大写
                var innerDiv = document.createElement("div");
                innerDiv.innerHTML = document.getElementById("upper_case_svg").innerHTML;
                innerDiv.style.width = "54%";
                innerDiv.style.marginLeft = "auto";
                innerDiv.style.marginRight = "auto";
                innerDiv.style.paddingTop = "5px";
                div.appendChild(innerDiv);
                upper.style.lineHeight = document.getElementsByClassName("alphabet")[0].clientHeight + "px";
                var lower = true;
                div.onclick = function(){
                    if (lower){
                        $('#upper_tool').css({
                            "fill":"00CCFF"
                        });
                        changeInnerAlpha(0);
                        lower = false;
                    }else{
                        $('#upper_tool').css({
                            "fill":"black"
                        });
                        changeInnerAlpha(1);
                        lower = true;
                    }
                }
            }
            else if (no==5){
                //这是数字界面的删除
                var div = document.createElement("div");
                div.className = "sendBtn toolkit-color";
                div.innerText = "拼音";
                div.onclick = function(){
                    printNormalList();
                }
                div.style.fontSize = width/32 + "px";
                div.style.lineHeight = height*0.85/4 + "px";
                div.style.width = "90%";
                upper.appendChild(div);
            }
            //upper_case_svg
            upper.appendChild(div);
        }

        function changeInnerAlpha(caseType){
            var alphabet = document.getElementsByClassName("alphabet");
            for (var i = 0 ;i<alphabet.length;i++){
                if (caseType == 0){
                    alphabet[i].innerText = alphabet[i].innerText.toUpperCase();
                }else{
                    alphabet[i].innerText = alphabet[i].innerText.toLowerCase();
                }
            }
        }

        function emptyDiv(){
            var div = document.createElement("div");
            div.className = "keyboard_alphabet_outer";
            div.style.width = width/25 + "px";
            keyboardMain.appendChild(div);
        }

        //寻找单词
        function findFiveWord(word){
            var count = 0,
                wordDesc = [],
                currentLocation = word.length,
                testArr = [];
            if (isEng){
                var thisTimeArr = [],
                    wordLength = word.length;
                for (var i = 0;i<wordFreq.length;i++){
                    if (wordFreq[i].length>=wordLength){
                        var thisWord = (wordFreq[i].substring(0,wordLength)).toLowerCase();
                        if (thisWord == word){
                            thisTimeArr.push(wordFreq[i]);
                        }
                    }
                }
                for (var i = 0;i<thisTimeArr.length;i++){
                    if (thisTimeArr[i].indexOf(word)!=-1){
                        wordDesc.push(thisTimeArr[i]);
                        count++;
                        if (count == 10){
                            break;
                        }
                    }
                }
                setTitle(wordDesc);
            }else{
                for (var i = 0;i<pyArr.length;i++){
                    if (currentLocation<=pyArr[i].length){
                        var mockArr = pyArr[i].substring(0,currentLocation)
                        if (mockArr == word){
                            testArr.push(pyArr[i])
                        }
                    }
                }
                var waitingArr = []
                for (var i = 0;i<testArr.length;i++){
                    var thisTimeArr = pyDict[testArr[i]];
                    for (var j = 0;j<thisTimeArr.length;j++){
                        var wordString  = thisTimeArr[j];
                        waitingArr.push(wordString);
                    }
                }
                var unique = uniqueF(waitingArr);
                setTitle(unique);
            }
        }

        //词组去重
        function uniqueF(array){
            var r = [];
            for(var i = 0, l = array.length; i < l; i++) {
                for(var j = i + 1; j < l; j++)
                    if (array[i] === array[j]) j = ++i;
                r.push(array[i]);
            }
            if (r.length>20){
                r.length = 20;
            }
            return r;
        }

        function spaceDiv(){
            var div = document.createElement("div");
            div.style.width = width*476/980 + "px";
            keyboardMain.appendChild(div);
            div.style.height = "16.66%";
            div.style.float = "left";
            div.style.textAlign = "center";
            div.style.position = "relative";
            var innerDiv = document.createElement("div");
            innerDiv.className = "spaceBtn";
            innerDiv.innerText = "空格";
            div.style.fontSize = width/32 + "px";
            div.style.lineHeight = height*0.85/4 + "px";
            div.appendChild(innerDiv);
            div.onclick = function(){
                inner_text.innerText = inner_text.innerText + "  ";
            }
        }

        function enterDiv(){
            var upper = document.createElement("div");
            upper.className = "keyboard_alphabet_outer";
            upper.style.width = width*182/720 + "px";
            keyboardMain.appendChild(upper);
            var div = document.createElement("div");
            div.className = "sendBtn toolkit-color";
            div.innerText = "发送";
            div.style.fontSize = width/32 + "px";
            div.style.lineHeight = height*0.85/4 + "px";
            div.style.width = "90%";
            upper.appendChild(div);
        }

        function printInnerBtn(i,list,wordList){
            var div = document.createElement("div");
            div.className = "keyboard_alphabet_outer";
            var innerDiv = document.createElement("div");
            innerDiv.className = "alphabet";
            innerDiv.innerText = wordList[list][i];
            innerDiv.onclick = function(){
                inner_text.innerText = inner_text.innerText + innerDiv.innerText;
                onBlurStr = inner_text.innerText.toLowerCase();
                findFiveWord(onBlurStr);
            };
            keyboardMain.appendChild(div);
            div.appendChild(innerDiv);
        }

        //开始
        printNormalList();
//        CharsetTable();

        function setTitle(wordDesc){
            var left = 0;
            onSelectWordDiv.innerHTML = "";
            for (var i = 0;i<wordDesc.length;i++){
                var div = document.createElement("div");
                div.className = "onSelectWord";
                div.innerText = wordDesc[i];
                div.style.left = left + "px";
                onSelectWordDiv.appendChild(div);
                div.onclick = function(){
                    inner_text.innerText = inner_text.innerText + this.innerText;
                };
                left = left + 10 + div.clientWidth;
            }
            $('.onSelectWord').css({
                "lineHeight":height/4+"px"
            });
        }
    };
    $(function() {
        FastClick.attach(document.body);
    });

}( window.keyboard = window.ym || {} ));