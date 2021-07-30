# 랜선집사
### 목차
- [개발 배경](#개발-배경)
- [개발 과정](#개발-과정)
  - [개발 기간](#1-개발-기간)
  - [사용 언어](#2-사용-언어)
  - [기능 구현 목표](#3-기능-구현-목표)
  - [와이어프레임 설계](#4-와이어프레임-설계)
  - [API 설계](#5-API-설계)
- [개발 결과](#개발-결과)
  - [구현한 기능](#1-구현한-기능)
  - [실제 서비스 모습](#2-실제-서비스-모습)
  - [피드백](#3-회고-및-피드백)
---
### 개발 배경
- 귀여운 나의 반려동물을 다른 사람에게 자랑할 수 있는 공간을 제공하자는 아이디어에서 출발한 프로젝트입니다.
- 사용자 입장에서 경험할 수 있는 것은 ``제목, 내용과 함께 이미지 업로드``할 수 있고, 다른 게시물에 댓글작성, 이에 따른 포인트 지급으로 사이트 내 활동 랭킹을 확인하는 것입니다.
- `코딩을 거의 처음 접한 4명 + 첫 협업`이라는 어려운 조건을 이겨내고 완성했습니다.
---
### 개발 과정

#### 1. 개발 기간
- `2021년 06월 07일(월) ~ 2021년 06월 10일(목) / 총 4일`
- `설계 1일 / 개발 3일`

#### 2. 사용 언어
- **Languages** : HTML, CSS, Javascript, Python
- **Framework** : Flask
- **DB** : MongoDB

#### 3. 기능 구현 목표
1. 회원가입
2. JWT 방식의 로그인
3. 게시판 구현(기본적인 CRUD 구현, 이미지 업로드기능 포함)
4. 댓글 작성(CRUD 개념 적용)
5. 좋아요
6. 포인트 적립
7. 랭킹서비스

#### 4. 와이어프레임 설계
1. 회원가입
<img src="https://user-images.githubusercontent.com/85334989/127613778-7e37d84b-ab4e-4f65-8f15-26566e74fc55.jpg"  width="700" height="500">

2. 로그인
<img src="https://user-images.githubusercontent.com/85334989/127614116-4271ab97-2e3a-42d3-a88b-e1bc2251d7b4.jpg"  width="700" height="500">

3. 메인페이지(index.html)
<img src="https://user-images.githubusercontent.com/85334989/127614166-d2a65ef0-197e-4e4e-8aa3-3f2fbd3d5b84.jpg"  width="700" height="500">

4. 글작성 페이지(write.html)
<img src="https://user-images.githubusercontent.com/85334989/127614233-6db4b2e4-ca08-43ab-ac7c-e4e2642156f8.jpg"  width="700" height="500">

5. 게시글 세부페이지
<img src="https://user-images.githubusercontent.com/85334989/127614282-2d7f17d2-9c20-4eef-bed3-3d73733e246d.jpg"  width="700" height="500">

#### 5. API 설계

| 페이지 | 기능 | API URL | Method |
|:----------|:----------:|:----------:|:----------:|
| letin.html | 회원가입 | /sign_up/save | POST |
| letin.html | 중복가입 체크 - 아이디 | /sign_up/checkDup | POST |
| letin.html | 중복가입 체크 - 닉네임 | /sign_up/nik_checkDup | POST |
| login.html | 로그인 | / | GET, POST |
| index.html | 메인페이지 / 게시글 전체조회 | /home | - |
| write.html | 게시글 작성 | /contents | POST |
| update.html | 게시글 수정 | /update | POST |
| write.html | 게시글 삭제 | /delete | POST | 

---
### 개발 결과

#### 1.구현한 기능
처음 목표했던 7가지 기능 중, 3가지(`회원가입, 로그인, CRUD 게시판`)를 구현하였습니다. 나머지 4가지 기능은 끝까지 시도하다가 시간적 제약으로 인해 제외하고 배포를 하였습니다.</br></br>
대신, 저희 팀이 구현할 수 있던 위 3가지 기능에 추가적인 기능(후술)을 더하고, 사용자가 보기에 예쁜 웹을 만들기 위해 노력했습니다.</br></br>
- 정규식을 활용한 회원가입 시 입력값 검증 기능
```javascript
// {# 아이디, 비밀번호 정규식!! #}

function is_username(asValue) {
    //{# 괄호 ( )안의 요소는 필수 포함 요소임. a-zA-Z 소문자 a-z, 대문자 A-Z 포함! 대괄호는 선택포함을 의미함. 숫자 0-9사용가능!. 2-10자여야 한다.#}
    var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,10}$/;
    return regExp.test(asValue); // {# .test 메서드를 통해 boolean 값으로 return 가능 #}
}

function is_nickname(asValue) {
    var regExp = /^[가-힣ㄱ-ㅎa-zA-Z0-9._-]{2,}$/;
    return regExp.test(asValue);
}

function is_password(asValue) {
    // {# *\d = 숫자 무조건 포함해라#}
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
    return regExp.test(asValue);
```

- 회원가입 시 아이디 중복확인 기능
```javascript
// {# 아이디 중복확인 #}

function check_dup() {
    let username = $("#input-username").val()
    if (username == "") {
        $("#help-id").text("아이디를 입력해주세요.").removeClass("is-safe").addClass("is-danger")
        $("#input-username").focus()
        return;
    }
    if (!is_username(username)) {
        $("#help-id").text("아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-10자 길이").removeClass("is-safe").addClass("is-danger")
        $("#input-username").focus()
        return;
    }
    $("#help-id").addClass("is-loading")
    $.ajax({
        type: "POST",
        url: "/sign_up/checkDup",
        data: {
            id: username
        },
        success: function (response) {
            if (response["exists"]) {
                $("#help-id").text("이미 존재하는 아이디입니다.").removeClass("is-safe").addClass("is-danger")
                $("#input-username").focus()
            } else {
                $("#help-id").text("사용할 수 있는 아이디입니다.").removeClass("is-danger").addClass("is-success")
            }
            $("#help-id").removeClass("is-loading")
        }
    });
}
```

-게시글 작성 시간 표현방법 변경(js의 Date() → 알아보기 쉬운 표현)
```javascript
function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60 + 540

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60 // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 24) {
        return parseInt(time) + "일 전"
    }
    return date.getFullYear() + '년', date.getMonth() + 1 + '월', date.getDate() + '일'
}
```

-게시글 작성 최신순 정렬 기능
```python
@app.route('/lastes')
def lastes():
    lastes = list(db.contents.find({}, {'_id': False}).sort('uploadingTime', -1))
    return jsonify({'all_contents': lastes})
```

#### 2. 실제 서비스 모습
[시연 영상 YouTube 이동](https://www.youtube.com/watch?v=UcEe40xzBko)

#### 3. 회고 및 피드백
- 사용자 친화적인 웹서비스를 개발하기 위해서 '내가 사용자라면 이런 기능이 있으면 좋겠다' 싶은 것들을 많이 고민했습니다.
- 코딩에 친숙하지 않은 사람들이 만나 주어진 개발 시간 내 가능한 개발의 수준이 어느정도인지 감이 잡히지 않은 채 목표를 설정하는 실수도 있었습니다.
- 최초 목표했던 기능들을 모두 구현하지는 못했지만, `이론보다는 일단 당장 개발해보자` 는 모토를 갖고 협업하여 어떻게든 좋은 서비스를 완성해 배포해보는 좋은 경험이었습니다.
- 이미지/버튼 배치하는 것, 간단한 기능을 구현하는 것에도 개발자들의 수많은 고민이 필요했다는 것을 깨달았습니다.
- 좋아요 기능을 끝까지 포기하지 않고 적용하려고 했으나 시간 내 완성할 수 없을 것 같아서 포기했습니다. 다음에 꼭 다시 도전해보고 싶은 기능입니다.
- 전반적인 API의 흐름, 각개 기능이 서버와 클라이언트 간 어떻게 통신한 결과인지 등의 큰 흐름을 이해할 수 있었습니다. 
