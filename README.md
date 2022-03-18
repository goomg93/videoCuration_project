# 동영상 큐레이션 클라이언트 모듈


## 📜 서비스 내용

- vling 동영상 큐레이션 클라이언트 모듈 개발
    - 블링(https://vling.net)에는 기업용 솔루션으로 개발된 유튜브 영상 큐레이션 서비스가 있습니다.
        
        영상큐레이션 서비스는 유튜브의 동영상 플레이 목록을 키워드를 기반으로 검색하여
        
        재생목록을 생성하는 서비스입니다.
        
    - 이미 개발되어 있는 영상큐레이션 서비스 API 를 활용하여,
        
        유튜브 동영상을 웹페이지에 embedding 하여 플레이하는 클라이언트 모듈을 개발
        

## 🛠 기술 스택

- Front : react.js, GraphQL client
- Back : node.js, GraphQL server, mongoDB atlas, ec2/acm/elb, docker, socket.io, redis

## 🖥 개발 내용

![스크린샷 2022-03-10 오전 3 55 04](https://user-images.githubusercontent.com/90296791/158980313-7d62c500-4a36-4e9d-90e7-17d7ab4eeeb0.png)


### Redis server 활용

vling API를 통해 가지고 온 데이터를 redis server에 저장하여 요청에대한 캐시 응답으로 불필요한 api 호출을 방지

### 실시간 채팅 기능

현재 재생중인 영상(라이브 영상)을 클릭했을 시 영상 시청과 동시에 실시간 채팅이 가능하도록 기능 구현 (socket.io 사용)

- mongoDB atlas와 연결하여 채팅 관련 데이터 저장

### 클라이언트 인증 모듈

CORS(Cross Origin Resource Sharing) 개념을 활용해서 허용도메인에서만 요청을 보낼 수 있도록 구현

- 허용된 origin에 한해 api key 인증 방식으로 추가 인증 로직 구현

### winston을 활용한 로그 처리

서버로 들어오는 요청 및 에러에 대한 로그 출력 및 저장

- mongoDB atlas와 연결하여 로그데이터 저장

### AWS EC2/ACM/ELB 를 활용한 https 배포

기업에서 제공해준 개발용 도메인을 사용해서 https 배포

- docker build

## 💡 성장 경험

### 새로운 기술 경험

기존에 사용했던 기술 스택과는 다소 다른 스택을 사용하는 기업이었습니다.

Graphql, mongoDB 등 새로운 기술을 공식문서 등을 참고하여 기능을 구현해 볼 수 있는 경험이었습니다.

또 처음 구현해보는 실시간 채팅, redis를 활용한 캐시 응답, https 배포 를 하기 위해서 부딪혔던 문제에 대해서

처음 구현해보는 기능에 대해서도 검색과 회의를 통해서 문제를 해결해 볼 수 있었던 경험이었습니다.

### 개발 공부의 방향성

인증 모듈을 구현하면서 cors라는 개념을 통해서 도메인을 인증할 방법을 구현 했는데

cors에 대해 제대로된 개념이 잡히지 않은 상태에서 사용하다보니 도메인 인증이라는 말이 이해가 안됐습니다.

기존의 사용한 개념임에도 불구하고 제대로된 이해가 없이 사용하다 보니 삽질의 반복이었습니다.

기능 구현에 급급한 마음으로 지금까지 공부했던 모습을 반성하고 한가지 기능을 구현하더라도 제대로 알고

구현하는 것이 더 나은 서비스를 제공할 수 있다는 방향성을 갖게 되는 프로젝트였습니다.

## 👀 서비스 화면

- 플레이 목록 및 실시간 영상 재생화면

<img width="480" alt="스크린샷 2022-03-18 오후 3 39 13" src="https://user-images.githubusercontent.com/90296791/158980443-5739fc84-9cb8-4374-b505-30ca6cac9371.png">  <img width="480" alt="스크린샷 2022-03-18 오후 3 39 52" src="https://user-images.githubusercontent.com/90296791/158980797-6e2e313b-738d-430d-bae5-9bc6598876aa.png">


- 플러그인 형태 활용 예시
<img width="640" alt="스크린샷 2022-03-18 오후 6 52 59" src="https://user-images.githubusercontent.com/90296791/158981093-ed899fe6-d7cc-48c1-b672-dd0cf034aaf3.png">

링크 - [https://vimeo.com/689572343](https://vimeo.com/689572343)
