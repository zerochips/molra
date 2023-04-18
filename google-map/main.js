//const API_KEY="AIzaSyDReCKYLlI19ZVw2hLAyQH0YlgGrsPqb14"; 코딩알려주는누나에서 const url="ServiceKey=${API_KEY}가 정상적으로 작동이 안돼서 맵이 나타나지 않았다."

async function getData(){ /*await 함수를 사용하려면 async 라는 함수를 선언을 해줘야한다*/
    const url="http://apis.data.go.kr/B552061/frequentzoneBicycle/getRestFrequentzoneBicycle?ServiceKey=AIzaSyDReCKYLlI19ZVw2hLAyQH0YlgGrsPqb14&searchYearCd=2021&siDo=11&guGun=680&type=json&numOfRows=10&pageNo=1"; /*이 부분에 요청주소 삽입*/
    const response = await fetch(url);
    const data = await response.json(); /*여기까지가 API를 부르는 가장 기본적인 명령어이다*/
    console.log("data", data);
    const locations = data.items.item.map(spot=>[spot.spot_nm,spot.la_crd,spot.lo_crd]);
    console.log("locations", locations);

    drawMap(locations);
}

function drawMap(locations) {
    //매개변수의 형태
    //location = [ ["지역이름, 위도, 경도"],
    //              ["지역이름, 위도, 경도"]
    //              ]

    //맵을 생성
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: new google.maps.LatLng(locations[0][1], locations[0][2]),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
  
    const infowindow = new google.maps.InfoWindow();
  
    let marker, i;
    
    //로케이션별 마크 생성
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
      });
      //마크를 클릭했을 때 보여주는 정보
      google.maps.event.addListener(
        marker,
        "click",
        (function (marker, i) {
          return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  }
  
getData();