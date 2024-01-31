![title](http://pic.lsw0604.store/책벌래.png)

책벌레와 의욕이나 의사를 묻는 어미 -ㄹ래를 합성한 단어 입니다.

"책벌레가 되어 보겠어?"라고 물어보는 의미도 있지만 "책볼래?" 라고 물어보기도하는 중의적인 의미로 이름 지었습니다.

## 이렇게 만들게 됐습니다.

제가 주로 사용하는 독서기록 어플 두개가 있습니다. A에 있는 기능은 B에는 없고 B에 있는 기능은 A에 없는 식이라 책을 읽고 기록을 하려면 번거로운게 이만저만이 아니였습니다. 그러다 **'내가 쓸건데 내가 직접 만들어 볼까?'** 라는 생각에서 책벌래가 탄생했습니다.

### SKILLS

![title](https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![title](https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white)

![title](https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=React&logoColor=white)
![title](https://img.shields.io/badge/REACT_QUERY-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)
![title](https://img.shields.io/badge/REACT_ROUTER-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white)
![title](https://img.shields.io/badge/RECOIL-3578E5?style=for-the-badge&logo=Recoil&logoColor=white)
![title](https://img.shields.io/badge/STYLED_COMPONENTS-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)

![title](https://img.shields.io/badge/EXPRESS-000000?style=for-the-badge&logo=express&logoColor=white)
![title](https://img.shields.io/badge/MYSQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white)
![title](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![title](https://img.shields.io/badge/PASSPORT-34E27A?style=for-the-badge&logo=passport&logoColor=white)

![title](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![title](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=black)
![title](https://img.shields.io/badge/RDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=black)
![title](https://img.shields.io/badge/EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=black)
![title](https://img.shields.io/badge/S3-569A31?style=for-the-badge&logo=amazons3&logoColor=black)

## ENV

```
book-habit/Frontend/.env

VITE_SERVER=

VITE_KAKAO_REST_API=
VITE_KAKAO_REDIRECT_URI=
VITE_KAKAO_LOGOUT_URI=
```

```
book-habit/Backend/.env

MYSQL_HOST=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=

SERVER_PORT=
SERVER_HOSTNAME=

CLIENT_URL=
ACCESS_TOKEN=
REFRESH_TOKEN=

KAKAO_CLIENT=
KAKAO_CALLBACK=

S3_ACCESS_KEY=
S3_SECRETE_KEY=
S3_BUCKET_NAME=
```

## 실행

```
book-habit/Frontend

npm install

npm run dev

```

```
book-habit/Backend

npm install

npm run dev
```

# ERD

![title](http://pic.lsw0604.store/ERD.png)

# API

rest api의 문서화는 postman을 사용했습니다.
[POSTMAN DOCUMENT](https://documenter.getpostman.com/view/17456196/2s9YXh63AU)

# 주요 페이지

### 로딩페이지

![title](http://pic.lsw0604.store/LoadingPage.gif)

### 검색페이지

![title](http://pic.lsw0604.store/SearchPage.gif)

- 기록하고자하는 책을 검색할 수 있습니다.
- 검색한 책을 나의 서재로 등록합니다.

### 한줄평페이지

![title](http://pic.lsw0604.store/CommentsPage.gif)

- 공개로 등록된 한줄평을 보여줍니다.
- 좋아요 및 댓글 수정 삭제 기능을 사용할 수 있습니다.

### 나의서재페이지

![title](http://pic.lsw0604.store/BookDetailPage.gif)

- 나의 서재에 등록된 책을 볼 수 있습니다.
- 서재에 등록된 책에 그날그날의 상태를 등록 할 수 있습니다.
- 등록된 책에 대해 한줄평을 남길 수 있습니다.

### 프로필페이지

![title](http://pic.lsw0604.store/ProfilePage.gif)

- 사용자가 남긴 좋아요 및 댓글을 확인 할 수 있습니다.
- 사용자의 프로필을 수정할 수 있습니다.
