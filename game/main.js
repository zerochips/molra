//캔버스세팅
let canvas;
let ctx; /*이미지를 그려주는 변수가 될거다 */
canvas = document.createElement("canvas"); /*canvas 양동이~ */
ctx = canvas.getContext("2d");
canvas.width=500;
canvas.height=750;
document.body.appendChild(canvas);
//함수는 묶음의 단위
let backgroundImage,gameover2Image,handImage,breadImage,hand5Image;
let gameOver=false; // true 이면 게임이 끝남, false 이면 게임이 안끝남
let score=0;
//x(손) 좌표 앞으로 계속 바뀔예정이라 따로 빼주도록 한다.
let handX = canvas.width/2-32;
let handY = canvas.height-48;

let BulletList = [];//총알들을 저장하는 리스트

function Bullet(){
    this.x=0;
    this.y=0;
    this.init=function(){ //init 초기값으로 초기화 해준다
        this.x=handX; //+ 20;
        this.y=handY;
        this.alive = true; //true면 살아있는 총알 false 면 죽은 총알

        BulletList.push(this);
    };
    this.update = function(){
        this.y -= 7;  // 손 속도
    };

    this.checkHit=function(){
        //총알.y <= 적군.y and
        //총알.x >= 적군.x and 총알.x <= 적군.x +적군의 넓이
        for(let i=0; i < breadList.length; i++){
            if(
                this.y <= breadList[i].y &&
                this.x >= breadList[i].x &&
                this.x <= breadList[i].x + 110
                ) {
                //총알이 죽게됨 적구의 우주선이 없어짐, 점수 획득
                score++;
                this.alive = false; // 죽은 총알
                breadList.splice(i, 1);
            }

        }
        
    }
}
/* 이 부분은 구글링해서 꼭 찾아보는게 좋다 */
function generateRandomValue(min,max){                                    /* 랜덤한 숫자를 리턴만 하면 된다 */
    let randomNum = Math.floor(Math.random()*(max-min+1))+min             /* (0~1)까지의 언더의 숫자만 반영하게 된다 */
    return randomNum    /* return randomNum 리턴랜덤넘버를 해주면 된다 그러면 반환된 랜덤넘버가 아래 this x안에 들어가게 된다*/
                }       /* 소수점으로 반환되기 때문에 Math.floor(내림함수) 를 해줘야됨 */     /* 함수를 콜할 때 최소 값과 최대값을 미리 보내준다 */

/* 적군을 찍어내는 클래스와 같은 개념 */

let breadList=[]

function Bread(){
    this.x = 0;
    this.y = 0; 
    this.init = function(){                             /* 처음에 초기화를 할건데 */
        this.y = 0;                                     /* 시작 y값은 최상단 0에서 시작하는데 */
        this.x = generateRandomValue(20, canvas.width - 123);                 /* 적군의 위치가 랜덤하게 떨어진다 랜덤한 숫자를 뽑아주된 최소값과 최대값을 지정해준다 */
        breadList.push(this);                                             /* 최소값은 0으로  */
    };
    this.update = function(){
        this.y += 3; // 적군의 소도 조절

        if(this.y >= canvas.height - 100){  /* 빵이 바닥에 닿으면 게임오버 되도록 형성 */
            gameOver = true;
            console.log("gameover");
        }
    }
}

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src="images/background.gif";

    handImage = new Image();
    handImage.src="images/hand.png";

    gameover2Image = new Image();
    gameover2Image.src="images/gameover2.png";
    
    hand5Image = new Image();
    hand5Image.src="images/handbk.png";
    
    breadImage = new Image();
    breadImage.src="images/bread.png";
}

let keyDown={}//어떤 버튼이 눌렀는지 이 객체안에 한 번에 저장하도록 하겠다. 버튼을 떼는 순간 keyCode는 사라져야 한다. 
function setupKeyboardListener(){
    document.addEventListener("keydown",function(event){//event 클릭된 버튼의 값을 keyDown에 저장해줄거다
        
        keyDown[event.keyCode] = true;
        console.log("키다운객체에 들어간 값은?", keyDown); // 어떤값이 들어갔는지 확인을 해본다

    });

    document.addEventListener("keyup",function(event){  //떼지면 이벤트를 만들어준다. 이걸 만들어주지 않으면 영원히 눌러진 상태에 있다.
        delete keyDown[event.keyCode]; //올라간 아이의 keyCode 값을 삭제해 주세요.
        
        if(event.keyCode == 32) {
            createBullet(); // 총알 생성            
        } //스페이스의 숫자는 32이다
    });

}

function createBullet(){
    console.log("총알 생성");
    let b = new Bullet(); //총알 하나 생성
    b.init(); 
}

function createBread(){
    const interval = setInterval(function () {
        let e = new Bread();
        e.init();
    },1000); /* 첫번째는 (호출하고 싶은함수, 시간 1이면 1초마다 설정됨) */
}

function update(){
   if(39 in keyDown){
    handX += 7; //손의 속도    
   } //right 오른쪽으로 움직이게 설정

   if(37 in keyDown){
    handX -= 7;
   } //left 왼쪽으로 움직이게 설정

   //손의 좌표값이 무한대로 업데이트가 되는게 아닌! 경기장 안에서만 있게하려면
   if(handX <=28){ //0과 같거나 0이 크다면 0 이하로 내려가려고 하면 더 이상 못 내려가게 고정을 시킨다.
    handX=28;
   }
   if(handX >= canvas.width-76){
    handX = canvas.width-76;
   }

   //총알의 y좌표 업데이트한 함수 호출
   for(let i=0; i<BulletList.length;i++){
    if(BulletList[i].alive){
        BulletList[i].update();
        BulletList[i].checkHit();
    }
    
   }

   for(let i=0; i<breadList.length; i++){
    breadList[i].update();
   }
}

function render(){ //ui그려주는걸 render라고 한다. 보여주는건 모두 render에서 보여준다
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(handImage, handX, handY);
    ctx.fillText(`Score : ${score}`, 50, 40);
    ctx.fillStyle = "white"; // 글자색 설정
    ctx.font = "20px arial bold"; // 글자 크기 설정    

    for(let i = 0; i < BulletList.length; i++){
        if(BulletList[i].alive){
            ctx.drawImage(handImage,BulletList[i].x,BulletList[i].y);
        }        
    }

    for(let i = 0; i < breadList.length; i++)
        ctx.drawImage(breadImage,breadList[i].x,breadList[i].y);
}

//게임 오버로 멈춰버리려면 더이상 호출하지 못하게 만들어버리면 된다
function main(){ //주기적으로 계속 불러줘야하는 그래서 main 안에 넣어준다
        if(!gameOver){
            update(); //업테이트는 main 함수 안에 불러주겠다. 좌표값을 업데이트하고
            render(); //그려주고
            requestAnimationFrame(main);
        }else{
            ctx.drawImage(gameover2Image, 50,100,400,400);
        }
    
}

//여기 키보드 세팅하는 곳
loadImage();
setupKeyboardListener();
createBread();
main();

//방향키를 누르면
//우주선의 xy조표가 바뀌고 오른쪽 이동: X좌표 값 증가 | 왼쪽 이동: X좌표 값 감소
//다시 render 그려준다

//총알만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알이 발사 = 총알의 y값이 -- , 총알의 x값은? 스페이스를 누른 순간의 손의 x좌표
//3. 발사된 총알든은 총알 배열에 저장을 한다.
//4. 모든 총알들은 x,y 좌표값이 있어야 한다.
//5. 총알 배열을 가지고 render 그려준다.


/* 
적군 x, y, init, update
적군의 위치가 랜덤하다
적군은 밑으로 내려온다 = y 좌표가 증가한다
1초마다 하나씩 적군이 내려운다
적군의 우주선이 바닥에 닿은면 게임 오버
적군과 총알이 만나면 우주선이 사라진다 점수 1점 획득

적국이 죽는다 = 적군에게 닿는다
총알.y <= 적군.y and 
총알.x >= 적군.x and 총알.x <= 적군.x +적군의 넓이

닿았다

총알이 죽게됨 적군의 우주선이 없어짐, 점수 획득
*/
