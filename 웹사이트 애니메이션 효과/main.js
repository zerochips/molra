let mainText = document.querySelector("h1");

window.addEventListener('scroll',function(){//스크롤의 높이를 가져와야 한다//
    let value = this.window.scrollY;
    console.log("scrollY", value);

    if(value>200){
        mainText.style.animation = "disappear 1s ease-out forwards"; /*글씨가 사라지고나서 다시 나타나지 않는다*/
    }else{
        mainText.style.animation = "slide 1s ease-out"; /*여기서 다시 설정을 해주면 글씨가 나타나고 사라지고를 반복한다*/
    }
});
