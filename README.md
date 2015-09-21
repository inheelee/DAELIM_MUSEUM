# DAELIM MUSEUM Project
* [대림미술관 바로가기(현재창)](https://www.daelimmuseum.org/index.do)

### 기본 규칙

```성능 이슈
- gulpfile.js
이미지 추가가 없는 경우 : task default에서 image 부분 주석처리.
추가된 이미지가 있을 경우 : task default에서 image 주석 제거 후 gulp 실행

-susy 사용
npm i >> 작업할 sass 파일 상단에 

@import part/config/setting
@import susy-global-setting

입력

```html
<link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:300,700' rel='stylesheet' type='text/css'>
```

```css
body {
	font:normal 12px '나눔고딕',nanumgothic,'돋움',dotum,AppleGothic, Arial, Verdana, sans-serif;
	font-family: 'Roboto Condensed', sans-serif;
}

#wrap {
	width: 100%
}

// .inner는 header, section, footer 등 크기를 말함
.inner {
	width: 1184px;
}

h2 {
	font-size: 26px;
	font-weight: 300;
}
h3 {
	font-size: 18px;
	font-weight: 700;
}
```


