import React from "react";
// about css
import styled from "styled-components";
import palette from "../styles/palette";
// common
import Input from "../component/Input";
// hooks
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../component/Button";

const Base = styled.div`
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  .login_logo {
    font-size: 2.5rem;
    font-weight: 500;
    color: ${(props) => props.theme.accentColor};
    padding-bottom: 0.5rem;
    margin-top: 5.5rem;
  }
  .login_form {
    display: flex;
    flex-direction: column;
    border: 0.5px solid ${(props) => props.theme.textColor};
    gap: 1rem;
    max-height: 30rem;
    max-width: 22rem;
    width: 100%;
    padding: 20px;
    border-radius: 1rem;

    .validation_text {
      color: ${palette.red[500]};
      font-size: 0.875rem; // 14px
    }
    Button {
      margin-top: 30px;
      color: ${(props) => props.theme.textColor};
      border: 1px solid ${(props) => props.theme.textColor};
      transition: 0.3s ease-in-out;
      &:hover {
        color: ${(props) => props.theme.accentColor};
        border: 1px solid ${(props) => props.theme.accentColor};
      }
      &:active {
        scale: 0.8;
      }
    }
    .forgot_pw {
      text-align: center;
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: 0;
      cursor: pointer;

      :hover {
        text-decoration: underline;
      }
    }
    .createAccount_btn_container {
      display: flex;
      justify-content: center;
      Button {
        text-align: center;
        font-size: 1.2rem;
        margin: 1rem;
        padding: 0.7rem;
        border-radius: 10px;
        background-color: ${(props) => props.theme.accentColor};
        color: ${(props) => props.theme.textColor};
        border: 1px solid ${(props) => props.theme.bgColor};
        cursor: pointer;
        transition: 0.5s ease-in-out;
        :hover {
          background-color: ${(props) => props.theme.bgColor};
          border: 1px solid ${(props) => props.theme.accentColor};
          color: ${(props) => props.theme.accentColor};
        }
        :active {
          transform: scale(0.9);
        }
      }
    }
    .password_container {
      cursor: pointer;
      position: absolute;
      color: ${palette.gray[400]};
      transition: 0.3s;
      &:hover {
        color: ${palette.gray[600]};
      }
      .password_container_visibile {
        position: relative;
        top: 4rem;
        left: 17rem;
      }
    }
  }
  .login-modal {
    bottom: 3rem;
    right: 2rem;
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(true);
  // passwordType state
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });
  const history = useHistory();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidated(true);
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidated(true);
    setPassword(e.target.value);
  };
  // 로그인 버튼
  const login = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      fetch("http://localhost:3001/user/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id: email, pwd: password }),
      }).then((res) => {
        if (res.status >= 200 && res.status <= 204) {
          // msg -> 서버에서 보내오는 데이터
          res
            .json()
            .then((msg) =>
              localStorage.setItem("accessToken", JSON.stringify(msg["data"]))
            );
          console.log("클라이언트 로그인성공");
        } else if (res.status == 400) {
          history.push("/signin");
          res.json().then((msg) => alert(msg.message));
        }
        console.log(res.status);
        if (res.status >= 400) {
          console.log("해당 입력이 잘못되었습니다.");
        }
      });
    } catch (error) {
      console.log(error);
    }
    // error 메시지 확인 가능 https://krpeppermint100.medium.com/ts-nodejs-express%EC%9D%98-%EC%9A%94%EC%B2%AD-%EC%9D%91%EB%8B%B5-%EC%97%90%EB%9F%AC-%ED%95%B8%EB%93%A4%EB%A7%81-8943ab7bd13b
    history.push("/");
  };
  /*   // 로그인 되어있으면 리다이렉트 
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    } else if (loginModal) {
      needLogin();
    }
  }); */

  return (
    <Base>
      <h1 className="login_logo">로그인</h1>
      <form className="login_form">
        <Input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
        />
        <Input
          type={passwordType.type}
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
        {!validated && (
          <p className="validation_text">
            이메일 또는 비밀번호가 잘못되었습니다.
          </p>
        )}
        <Button size="large" onClick={login}>
          로그인
        </Button>
        <div className="createAccount_btn_container">
          <Button size="medium" onClick={() => history.push("/sign-up")}>
            회원가입
          </Button>
        </div>
      </form>
    </Base>
  );
};

export default Login;
