import { DefaultTheme } from "styled-components";

// 미리 타입들을 지정해둬서 추가적인 인자가 들어올 때 알림을 줘서 변화를 캐치하기 슆다
export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
  btnColor: "tomato",
};

export const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white",
  btnColor: "teal",
};
