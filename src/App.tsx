import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Router from "./Router";

// 전역으로 적용되는 styled-components 내장 함수 createGlobalStyle 활용해 스타일을 초기화
const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
 html, body, div, span, applet, object, iframe,
 h1, h2, h3, h4, h5, h6, p, blockquote, pre,
 a, abbr, acronym, address, big, cite, code,
 del, dfn, em, img, ins, kbd, q, s, samp,
 small, strike, strong, sub, sup, tt, var,
 b, u, i, center,
 dl, dt, dd, menu, ol, ul, li,
 fieldset, form, label, legend,
 table, caption, tbody, tfoot, thead, tr, th, td,
 article, aside, canvas, details, embed,
 figure, figcaption, footer, header, hgroup,
 main, menu, nav, output, ruby, section, summary,
 time, mark, audio, video {
   margin: 0;
   padding: 0;
   border: 0;
   font-size: 100%;
   font: inherit;
   vertical-align: baseline;
 }
 /* HTML5 display-role reset for older browsers */
 article, aside, details, figcaption, figure,
 footer, header, hgroup, main, menu, nav, section {
   display: block;
 }
 /* HTML5 hidden-attribute fix for newer browsers */
 *[hidden] {
     display: none;
 }
 body {
   line-height: 1;
 }
 menu, ol, ul {
   list-style: none;
 }
 blockquote, q {
   quotes: none;
 }
 blockquote:before, blockquote:after,
 q:before, q:after {
   content: '';
   content: none;
 }
 table {
   border-collapse: collapse;
   border-spacing: 0;
 }
 * {
   box-sizing: border-box;
 }
 body {
   font-family: 'Source Sans Pro', sans-serif;
   background-color:${(props) => props.theme.bgColor};
   color:${(props) => props.theme.textColor}
 }
 a {
   text-decoration:none;
   // inherit를 사용해서 부모의 컬러 색을 가져온다.
   color: inherit;
 }
 `;
function App() {
  return (
    // <></>은 fragecomponent 즉 유령 컴포넌트로 div로 감싸줄 필요 없이 해당 문자로 두 태그를 감싸줄 수 있다.
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
