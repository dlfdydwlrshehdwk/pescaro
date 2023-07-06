// 변수한개를 지정 mob
// width가 800이하일떄 변수가 1이된다. 이상일땐 0
let mob = 0;
if (window.innerWidth < 600) mob = 1;
// console.log("처음mob:",mob);

// 리사이즈를해서 보이는크기가 800이하일경우 mob를 1로
window.addEventListener("resize", () => {
    if (window.innerWidth < 600) mob = 1;
    else mob = 0;
    console.log("리사이즈mob:", mob);
    if(mob ===1){
        document.querySelector('.ctbtn').style.display = 'none';
    }
    else if(mob === 0) {
        document.querySelector('.ctbtn').style.display = 'block';
    }
});

window.addEventListener("DOMContentLoaded", () => {
    // 새로고침시 화면맨위로설정
    // setTimeout(()=>{
    //     window.scrollTo(0,0);
    // },100) // 작동완료
    document.querySelector(".nav").classList.add("on");
    document.querySelector(".pob").classList.add("on");
    
    // 셀렉터 변수화
    const qs = (x) => document.querySelector(x);
    const qsa = (x) => document.querySelectorAll(x);

    // 데이터저장변수
    const h1 = ["BUSINESS", "About FESCARO", "Partnership", "Contact us"];

    // 변수 설정하기
    // 전체 페이지 변수
    let pgnum = 0; //현재 페이지 번호(첫페이지 0)
    // 전체 페이지 수
    const pgcnt = qsa(".page").length; //6개!
    // 광스크롤 금지 변수
    let prot_sc = 0;

    const page = qsa(".page");
    // 대상 page on주면 애니메이션
    const qor = 100;
    // 휠이벤트설정
    window.addEventListener("wheel", wheelFn, { passive: false });
    // 스크롤이벤트설정
    window.addEventListener("scroll", scrollFn, { passive: false });
    const retVal = (x) => x.getBoundingClientRect().top;


    function scrollFn() {
        let hhh = window.scrollY;
        if (!mob) return;

        page.forEach((ele) => {
            let point = retVal(ele);
            // console.log(point);
            if (point < 150 && point > -150) ele.classList.add("on");
            else ele.classList.remove("on");
        });
        console.log(window.innerHeight)
        console.log(hhh);
        // 모바일때 네브바가 딸려오게하기 기능
        if(hhh > 150){
            qs('.nav').style.backgroundColor = '#fff';
            qs('.nav').style.height = '80px';
            qs('.btn').style.color = '#000'
            qsa(".logo img")[1].classList.add("on");
            qsa(".logo img")[0].classList.remove("on");
            qs(".tbtn").style.color = "#333";
        }
        else {
            qs('.nav').style.backgroundColor = '';
            qs('.nav').style.height = '120px';
            qs('.btn').style.color = '#fff'

            qsa(".logo img")[0].classList.add("on");
            qsa(".logo img")[1].classList.remove("on");
            qs(".tbtn").style.color = "#fff";
        }



        // 모바일쿼리시 기능 글씨 올라오는거 
        if(hhh > (window.innerHeight) - qor 
        // || hhh < (window.innerHeight)*2
        ){
            let hcode =""
        let idx = 0;
            for(let x of h1[0]){
                if(x ==="") x="&nbsp;";
                hcode +=`
                <h1 style = "transition-delay:${idx*0.02}s">${x}</h1>
                `;
                idx++;
            }
            console.log( qs('#pg'+(2)))
            qs('#pg'+(2)).querySelector('.stage').innerHTML = hcode;
        }
        if(hhh > (window.innerHeight*2) - qor 
        // || hhh < (window.innerHeight) * 3
        ){
            let hcode =""
            let idx = 0;
            for(let x of h1[1]){
                if(x ==="") x="&nbsp;";
                hcode +=`
                <h1 style = "transition-delay:${idx*0.02}s">${x}</h1>
                `;
                idx++;
            }
            qs('#pg'+(3)).querySelector('.stage').innerHTML = hcode;
        }
        if(hhh > (window.innerHeight * 3) - qor 
        // || hhh < (window.innerHeight) * 4
        ){
            let hcode =""
        let idx = 0;
            for(let x of h1[2]){
                if(x ==="") x="&nbsp;";
                hcode +=`
                <h1 style = "transition-delay:${idx*0.02}s">${x}</h1>
                `;
                idx++;
            }
            qs('#pg'+(4)).querySelector('.stage').innerHTML = hcode;
        }
        if(hhh > (window.innerHeight * 4) - qor 
        // || hhh < (window.innerHeight) * 5
        ){
            let hcode =""
        let idx = 0;
            for(let x of h1[3]){
                if(x ==="") x="&nbsp;";
                hcode +=`
                <h1 style = "transition-delay:${idx*0.02}s">${x}</h1>
                `;
                idx++;
            }
            qs('#pg'+(5)).querySelector('.stage').innerHTML = hcode;
        }

    }

    // 휠 이벤트 함수 만들기
    function wheelFn(e) {
        // 사이즈가 일정이상이면 휠이 안되게 
        if (mob) return;

        // 기본기능 멈추기
        e.preventDefault();

        // 광스크롤 막기
        if (prot_sc === 1) return;
        prot_sc = 1;
        setTimeout(() => (prot_sc = 0), 800);

        // 휠 방향 알아내기
        // 이벤트객체.wheelDelta
        let dir = e.wheelDelta; //위120 아래 -120

        // 방향에 따른 페이지 번호 증감
        // 페이지 밑방향 : 페이지 번호 증가
        if (dir < 0) {
            pgnum++;
            // 한계수 지정 총페이지수 -1
            if (pgnum > pgcnt - 1) pgnum = pgcnt - 1;
        } // if 문 ////

        // 스크롤 윗뱡향 : 페이지 번호 감소
        else {
            pgnum--;
            // 한계수 : 페이지 첫번호 인 0
            if (pgnum < 0) {
                pgnum = 0;
            }
        } //else ////
        console.log("페이지버놓", pgnum);
        updatePg();
        // updatePg(indic);
    } // wheel 이벤트 ////

    // 함수명 updatePg
    // 기능 페이지 이동 설정값 업데이트

    function updatePg() {
        // obj - 변경할 메뉴전체 객체
        // console.log('업데이트')
        // 페이지 이동하기
        // scrollTO(가로,세로)
        window.scrollTo(0, window.innerHeight * pgnum);
        // 세로 이동위치 : 윈도우 높이값* 페이지 번호

        setTimeout(() => {
            // console.log("실행!!!");
            page.forEach((ele, idx) => {
                ele.classList.remove("on");
                // console.log(ele)
            });

            page[pgnum].classList.add("on");
        }, 300);

        console.log(page[pgnum]);
        console.log(pgnum);

        ///////////////////////////////////////////////////////////
        // 휠 했을때 페이지별 분기
        ///////////////////////////////////////////////////////////

        // 컨택트동그라미 등장 기능
        if (pgnum !== 0) {
            qs(".ctbtn").classList.add("on");
        }
        // 첫페이지
        if (pgnum === 0) {
            qs(".ctbtn").classList.remove("on");
            qsa(".nav>ul>li>a").forEach((ele) => {
                ele.style.color = "white";
            });
            // nav 로고 이미지 색변경
            qsa(".logo img")[0].classList.add("on");
            qsa(".logo img")[1].classList.remove("on");
            // 탭버튼 색변경
            qs(".tbtn").style.color = "white";
            qs(".nav").classList.add("on");
        }
        // 페이지2
        else if (pgnum === 1) {
            qsa(".nav>ul>li>a").forEach((ele) => {
                ele.style.color = "white";
            });
            // nav 로고 이미지 색변경
            qsa(".logo img")[0].classList.add("on");
            qsa(".logo img")[1].classList.remove("on");
            // 탭버튼 색변경
            qs(".tbtn").style.color = "white";
            qs(".nav").classList.add("on");

        }
        // 3페이지
        else if (pgnum === 2) {
            qsa(".nav>ul>li> a").forEach((ele) => {
                ele.style.color = "#333";
            });
            // nav 로고 이미지 색변경
            qsa(".logo img")[1].classList.add("on");
            qsa(".logo img")[0].classList.remove("on");
            // 탭버튼 색변경
            qs(".tbtn").style.color = "#333";
            qs(".nav").classList.add("on");
        } // if

        // 4페이지
        else if (pgnum === 3) {
            // nav li 색변경
            qsa(".nav>ul>li> a").forEach((ele) => {
                ele.style.color = "#333";
            });
            // 로고 이미지 변경
            qsa(".logo img")[1].classList.add("on");
            qsa(".logo img")[0].classList.remove("on");
            // 탭버튼 색변경
            qs(".tbtn").style.color = "#333";
            qs(".nav").classList.add("on");
        }
        // 5페이지
        else if (pgnum === 4) {
            qsa(".nav>ul>li>a").forEach((ele) => {
                ele.style.color = "white";
            });
            // nav 로고 이미지 색변경
            qsa(".logo img")[0].classList.add("on");
            qsa(".logo img")[1].classList.remove("on");
            // 탭버튼 색변경
            qs(".tbtn").style.color = "white";
            qs(".tbtn").style.opacity = "1";
            qs(".nav").classList.add("on");
        }
        // 랏페이지
        else if (pgnum === 5) {
            console.log(555);
            // 탭버튼 없애기
            qs(".tbtn").style.opacity = 0;
            qs(".nav").classList.remove("on");
        } else {
            // nav li 색변경
            qsa(".nav>ul>li> a").forEach((ele) => {
                ele.style.color = "#fff";
            });
            // 로고 이미지 색변경
            qsa(".logo img")[0].classList.add("on");
            qsa(".logo img")[1].classList.remove("on");
            // 탭버튼 생기게하기 + 흰색
            qs(".tbtn").style.opacity = 1;
            qs(".tbtn").style.color = "white";
        }


        // 컨택버튼과 업버튼 위치바꾸는 거
        let tg1 = document.querySelector(".ctbtn");
        let tg2 = document.querySelector(".upbtn");

        if (pgnum !== 5 || pgnum !== 0) {
            tg1.style.bottom = "12%";
            tg2.style.bottom = "4%";
        }

        if (pgnum === 5) {
            tg1.style.bottom = "calc(704px + 12%)";
            tg2.style.bottom = "calc(704px + 4%)";
        }

        if (pgnum === 0) {
            tg1.style.bottom = "4%";
            tg2.style.bottom = "4%";
        }

        if(pgnum > 0 && pgnum < 6) h1txt();
    } //updatePg 함수 ////

    function h1txt () {
        let hcode =""
        let idx = 0;
            for(let x of h1[pgnum-1]){
                if(x ==="") x="&nbsp;";
                hcode +=`
                <h1 style = "transition-delay:${idx*0.02}s">${x}</h1>
                `;
                idx++;
            }
            qs('#pg'+(pgnum+1)).querySelector('.stage').innerHTML = hcode;
    }


    // 기능 : 일정시간마다 왼쪽으로 -39%씩이동
    // 화살표를 누르면 맨끝사진을 다른맨끝으로 잘라서 넣은 후 방향에 맞게 이동
    // 기능 : 게이지가 인터벌시간동안 -114%에서 0으로 옴





    // 사이트맵 버튼 이동 시작 //////////////////////////////////

    // 메인페이지 버튼
    btn = qs(".btn");
    // 사이트맵
    sitemap = qs(".sitemap");
    // 사이트맵 버튼
    stb = qs(".sitemap_btn");

    // 메인페이지 사이트맵 버튼누를시 사이트맵에 클래스 on 추가
    btn.onclick = () => {
        // console.log(btn);
        sitemap.style.display = 'block'
        setTimeout(()=>{
            sitemap.classList.add("show");
            document.body.style.overflow = "hidden";
        })
    };

    // 사이트맵에 버튼클릭시 사이트맵에 클래스 on 빼기
    stb.onclick = () => {
        sitemap.style.display = 'none'
        sitemap.classList.remove("show");
        document.body.style.overflow = "";
    };
    // 완료 !
    // 사이트맵 버튼 이동 끝 ///////////////////////////////////

    // 위로가는 화살표 버튼 누르면 위로가기 /////////////////////////////////
    // 이벤트대상 .upbtn
    const upbtn = qs(".upbtn");

    upbtn.onclick = () => {
        // 기본기능 막기
        event.preventDefault();
        pgnum = 0;
        // 페이지0으로 가기
        window.scrollTo(0, window.innerHeight * pgnum);
        qs(".ctbtn").classList.remove("on");
        qsa(".nav>ul>li>a").forEach((ele) => {
            ele.style.color = "white";
            console.log(pgnum);
        });
        // nav 로고 이미지 색변경
        qsa(".logo img")[0].classList.add("on");
        qsa(".logo img")[1].classList.remove("on");
        // 탭버튼 색변경
        qs(".tbtn").style.color = "white";
        // pgnum 0으로 교체
    };
    // 완료 !
    // 위로가는 화살표 버튼 끝 /////////////////////////////////

    // 로고 클릭시 페이지 새로고침 ////
    // 이벤트대상 .logo a
    const logoa = qsa(".logo a");
    logoa.forEach((ele) => {
        ele.onclick = () => {
            window.location.reload();
        };
    });

    // 완료
    // 로고 클릭시 페이지 새로고침 끝 ////

    // 로고색 바뀌기! 끝 //////////////////////////////////////

    const ctbtn = qs(".ctbtn");
    // 컨택트 버튼 누르면 컨택트페이지로 가기!!////
    // 기능 : 컨택트버튼을 누르면 컨택트 페이지로 넘어감
    // 이벤트대상 : .ctbtn
    ctbtn.onclick = () => {
        // 기본기능 막기
        event.preventDefault();
        // 페이지0으로 가기
        pgnum = 4;
        window.scrollTo(0, window.innerHeight * pgnum);
        // pgnum 0으로 교체
        // pgnum = 4;
        updatePg();
    };

    // 컨택트 버튼 누르면 컨택트페이지로 가기!! 끝////

    // nav ul 작업
    // nav ul
    const navul = qs(".nav ul");
    // logo img [0]백 [1]흑 on주면 등장
    const logoimg = qsa(".logo img");
    navul.onmouseenter = () => {
        console.log("hi");
        if (pgnum === 0) {
            qsa(".nav ul>li>a").forEach((ele) => {
                ele.style.color = "black";
            });
            logoimg[0].classList.remove("on");
            logoimg[1].classList.add("on");
            qs(".tbtn").style.color = "#333";
        } //if ////
        else if (pgnum === 1) {
            qsa(".nav ul>li>a").forEach((ele) => {
                ele.style.color = "black";
            });
            logoimg[0].classList.remove("on");
            logoimg[1].classList.add("on");
            qs(".tbtn").style.color = "#333";
        } else if (pgnum === 4) {
            qsa(".nav ul>li>a").forEach((ele) => {
                ele.style.color = "black";
            });
            logoimg[0].classList.remove("on");
            logoimg[1].classList.add("on");
            qs(".tbtn").style.color = "#333";
        }
    }; //mouseenter

    navul.onmouseleave = () => {
        console.log("hi");
        if (pgnum === 0) {
            setTimeout(() => {
                qsa(".nav ul>li>a").forEach((ele) => {
                    ele.style.color = "white";
                });
                logoimg[1].classList.remove("on");
                logoimg[0].classList.add("on");
                qs(".tbtn").style.color = "white";
            }, 200);
        } //if ////
        else if (pgnum === 1) {
            setTimeout(() => {
                qsa(".nav ul>li>a").forEach((ele) => {
                    ele.style.color = "white";
                });
                logoimg[1].classList.remove("on");
                logoimg[0].classList.add("on");
                qs(".tbtn").style.color = "white";
            }, 200);
        } else if (pgnum === 4) {
            setTimeout(() => {
                qsa(".nav ul>li>a").forEach((ele) => {
                    ele.style.color = "white";
                });
                logoimg[1].classList.remove("on");
                logoimg[0].classList.add("on");
                qs(".tbtn").style.color = "white";
            }, 200);
        }
    }; //mouseenter
}); //로드구역 ///


$(()=>{
    // 슬라이드 39퍼씩 이동
    // 게이지 -114 에서 0
    // 슬라이드에서 5번째가 첫번째 보이는거
    console.log('제이쿼리')
    let slide = $('.bx3slide')

    let prot = 0

    function slidego(){
        
        // lclick()
        $('.p2btns div').first().on('click',function(e){
            console.log('왼쪽')
            e.preventDefault()

            if(prot) return;
            prot = 1;
            setTimeout(()=>{
                prot = 0;
            },1000)

            lclick()

            intervalClear()
        })

        // rclick
        $('.p2btns div').last().on('click',function(e){
            console.log('오른쪽')
            e.preventDefault()

            if(prot) return;
            prot = 1;
            setTimeout(()=>{
                prot = 0;
            },1000)
            rclick()

            intervalClear()
        })
    }


    function lclick(){
        // 슬라이드 오른쪽으로 이동시켜주시고
        slide.css({
            transition : '1s linear',
            left : '-117%' 
        })
        // 4번째 보이는거에서 -1번째 밝게해주시고
        $('.bx3 li').eq(3).css({
            opacity : 1
        })
        // 4번째 보이는거에서 -1번째 글씨 밝게해주시고
        $('.bx3 li').eq(3).find('div').css({
            opacity : 1
        })
        // 6번째 보이는거에서 2번째 서서히 어둡게
        $('.bx3 li').eq(5).css({
            transition : '1s linear',
            opacity : '.5'
        })
        $('.p2gage').css({
            transition : 'none',
            left : '-114%'
        })
        // 움직이고나서 프리펜드해주시고 다시 원위치 복귀 트랜지션0
        setTimeout(()=>{
            slide.prepend($('.bx3 li').last())
            slide.css({
                transition : "none",
                left : '-156%'
            })

            // clearInterval()
        },1000)
        

    }
    function rclick(){
        // 슬라이드 왼쪽으로 이동시켜주시고
        slide.css({
            transition : '1s linear',
            left : '-195%' 
        })
        // 7번째 보이는거에서 3번째꺼 밝게해주시고
        $('.bx3 li').eq(6).css({
            opacity : 1
        })
        // 7번째 보이는거에서 3번째 글씨 밝게해주시고
        $('.bx3 li').eq(6).find('div').css({
            transition : '1s linear',
            opacity : 1
        })
        $('.p2gage').css({
            transition : 'none',
            left : '-114%'
        })
        // 움직이고나서 어펜드해주시고 다시 원위치복귀 트랜지션0
        setTimeout(()=>{
            slide.append($('.bx3 li').eq(0))
            slide.css({
                transition : 'none',
                left : '-156%'
            })

            // intervalClear()
        },1000)
    }


    slidego()


    let autoI
    let autoT

    let autoG;
    let autoGt

    function interval(){
        console.log('인터벌')
        autoI = setInterval(rclick,5000)
    }
    function ginterval(){
        autoG = setInterval(gageOn,5000)
    }

    interval()
    ginterval()
    function intervalClear(){
        console.log('인터벌짜르기')
        clearInterval(autoI)
        clearInterval(autoG)

        clearTimeout(autoT)
        clearTimeout(autoGt)

        autoT = setTimeout(interval , 1000)
        autoGt = setTimeout(ginterval , 1000)
    }


    //  게이지 씨
     function gageOn(){
        $('.p2gage').css({
            transition : '3s linear',
            left : '0'
        })
        setTimeout(()=>{
            $('.p2gage').css({
                transition : 'none',
                left : '-114%'
            })
        },4900)
     }

     gageOn()

     



})