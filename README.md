# 랜선집사
### 목차
- [개발 배경](#개발-배경)
- [개발 과정](#개발-과정)
  - [개발 기간](#1-개발-기간)
  - [사용 언어](#2-사용-언어)
  - [기능 구현 목표](#3-기능-구현-목표)
  - [와이어프레임 설계](#4-와이어프레임-설계)
  - [API 설계](5-#API-설계)
- [개발 결과](#개발-결과)
  - [구현한 기능](#1-구현한-기능)
  - [실제 서비스 모습](#background)
  - [피드백](#install)
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
