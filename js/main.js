let boxSpan = document.querySelector(".box span");
let boxAdvice = document.querySelector(".box p");
let btn = document.querySelector(".img");
let nextBtn = document.querySelector(".left");
let prevBtn = document.querySelector(".right");
let inputField = document.querySelector(".box input:nth-of-type(1)");
let submitBtn = document.querySelector(".box input:nth-of-type(2)");
let suggestsList = document.querySelector(".box form ul");
let suggests = [];

if(window.localStorage.getItem("suggests")){
    console.log("sug found")
    console.log(window.localStorage.getItem("suggests").split(","));
    window.localStorage.getItem("suggests").split(",").forEach((ele)=>{
        suggests.push(ele);
    })
}else{
    console.log("sug NOT found")
}

inputField.focus();
window.onload = ()=>{
    if(window.localStorage.getItem("ayahNumber")){
        ayahNumber = parseInt(window.localStorage.getItem("ayahNumber"));
        console.log("found", ayahNumber, typeof ayahNumber);
    }else{
        console.log("ayahNumber is NOT FOUND");
        var ayahNumber = 0;
        ayahNumber++;
        fetch(`http://api.alquran.cloud/v1/ayah/${ayahNumber}`)
        .then((result)=>{
            let data = result.json();
            return data;
        }).then((fullData)=>{
            boxSpan.textContent = `#${fullData.data.surah.number} ${fullData.data.surah.englishName} (${fullData.data.surah.englishNameTranslation}) | Ayah #${fullData.data.numberInSurah}`;
            boxAdvice.textContent = `"${fullData.data.text}"`;
            window.localStorage.setItem("ayahNumber",ayahNumber);
            console.log(fullData)
        })    }
}
// fetch("https://api.adviceslip.com/advice")
ayahNumber = parseInt(window.localStorage.getItem("ayahNumber"));
ayahNumber++;
fetch(`http://api.alquran.cloud/v1/ayah/${ayahNumber}`)
.then((result)=>{
    let data = result.json();
    return data;
}).then((fullData)=>{
    boxSpan.textContent = `#${fullData.data.surah.number} ${fullData.data.surah.englishName} (${fullData.data.surah.englishNameTranslation}) | Ayah #${fullData.data.numberInSurah}`;
    boxAdvice.textContent = `"${fullData.data.text}"`;
    window.localStorage.setItem("ayahNumber",ayahNumber);
    console.log(fullData)
})

nextBtn.addEventListener("click",()=>{
    ayahNumber++;
    fetch(`http://api.alquran.cloud/v1/ayah/${ayahNumber}`)
    .then((result)=>{
        let data = result.json();
        return data;
    }).then((fullData)=>{
        boxSpan.textContent = `${fullData.data.surah.number} ${fullData.data.surah.englishName} (${fullData.data.surah.englishNameTranslation}) | Ayah #${fullData.data.numberInSurah}`;
        boxAdvice.textContent = `"${fullData.data.text}"`;
        window.localStorage.setItem("ayahNumber",ayahNumber);
    })  
})
prevBtn.addEventListener("click",()=>{
    ayahNumber--;
    fetch(`http://api.alquran.cloud/v1/ayah/${ayahNumber}`)
    .then((result)=>{
        let data = result.json();
        return data;
    }).then((fullData)=>{
        boxSpan.textContent = `#${fullData.data.surah.number} ${fullData.data.surah.englishName} (${fullData.data.surah.englishNameTranslation}) | Ayah #${fullData.data.numberInSurah}`;
        boxAdvice.textContent = `"${fullData.data.text}"`;
        window.localStorage.setItem("ayahNumber",ayahNumber);
    })
})

btn.addEventListener("click",()=>{
    // fetch("https://api.adviceslip.com/advice")
    // fetch(`http://api.alquran.cloud/v1/ayah/${Math.ceil(6236*Math.random())}`)
    var ayahNumber = Math.ceil(6236*Math.random());
    fetch(`http://api.alquran.cloud/v1/ayah/${ayahNumber}`)
    .then((result)=>{
        let data = result.json();
        return data;
    }).then((fullData)=>{
        boxSpan.textContent = `#${fullData.data.surah.number} ${fullData.data.surah.englishName} (${fullData.data.surah.englishNameTranslation}) | Ayah #${fullData.data.numberInSurah}`;
        boxAdvice.textContent = `"${fullData.data.text}"`;
        window.localStorage.setItem("ayahNumber",ayahNumber);
    })
})

submitBtn.onclick = (e)=>{
    e.preventDefault();
    if(suggests.includes(inputField.value.trim())){
        return;
    }else{
        suggests.unshift(inputField.value.trim());
        window.localStorage.setItem("suggests",suggests);
        console.log("suggests added to localStorage")
    }
    window.open(`https://www.google.com/search?q=${inputField.value.trim()}`,"_self")
}
let arr = ["one", "two" , "three", "four", "five"];
inputField.oninput = ()=>{
    let regStr = new RegExp(`${inputField.value.trim()}`,"ig");
    let matches =  suggests.filter(function(ele){
        return ele.match(regStr);
    });
    if(document.querySelectorAll(".box form ul li").length > 0){
        document.querySelectorAll(".box form ul li").forEach((li)=>{
            suggestsList.removeChild(li);
        })
    }
    if(matches.length >= 5){
        for(let i = 0 ; i < 4; i++){
            var li = document.createElement("li");
            var link = document.createElement("a");
            link.setAttribute("href",`https://www.google.com/search?q=${matches[i].trim()}`);
            link.textContent = matches[i];
            li.append(link);
            suggestsList.append(li);
        }
    }else{
        matches.forEach((match)=>{
            var li = document.createElement("li");
            var link = document.createElement("a");
            link.setAttribute("href",`https://www.google.com/search?q=${match.trim()}`);
            link.textContent = match;
            li.append(link);
            suggestsList.append(li);
        })
    }
    console.log(suggestsList)
}
inputField.onfocus = ()=>{
    suggestsList.style.display = "block";
}
// inputField.onblur = ()=>{
//     suggestsList.style.display = "none";
// }