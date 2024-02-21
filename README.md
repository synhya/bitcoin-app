## built with nextjs, tailwindcss, radix-ui(shadcn), rechart, coinmarketAPI

웹앱 프로젝트 #1

https://bitcoin-app-zeta.vercel.app/

### 버그
production 빌드에서는 fetch data 캐싱이 잘되는데   
deploy 시에 안되는 문제가 있음.    
-> 써드파티 api에서 status code 429를 반환하며
튕기는 문제로 연결됨
