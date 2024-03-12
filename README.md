## 웹앱 프로젝트 #1

https://bitcoin-app-zeta.vercel.app

### 사용기술

- nextjs
- tailwindcss
- tanstack table (react table)
- shadcn/ui
- rechart

### 배운점

#### 스웨거

[coinmarketcap](https://coinmarketcap.com)에서 제공하는 API를 통해 만들었습니다.    
해당 API의 문서가 Swagger로 작성되어 있어서 자연스레 스웨거의 사용법에 대해서도 익힐 수 있었습니다.

#### 캐싱

또한 Nextjs의 강력한 캐싱기능도 활용해서 API요청횟수를 줄이는 작업도 진행해보았습니다.    
요청횟수가 많아지면 요금을 청구하기때문에 꼭 필요한 작업이었습니다.    

#### 스켈레톤

또한 [Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)와 스켈레톤 컴포넌트를 활용해서 
UX를 향상시키는 작업도 진행해보았습니다.

>[!WARNING] 
>일반 빌드에서는 캐싱이 제대로 되는데 Vercel에 배포시에 캐싱이 안되는 문제가 있습니다.

