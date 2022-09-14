import React from "react";
// about css
import styled from "styled-components";
import palette from "../styles/palette";
// common
import Button from "../component/Button";
import Input from "../component/Input";
// hooks
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "../store";
import { userActions } from "../store/userSlice";

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

  const history = useHistory();
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidated(true);
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidated(true);
    setPassword(e.target.value);
  };
  const validateEmail = (email: string) => {
    const regExp =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regExp.test(email);
  };

  // 로그인 버튼
  const login = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (password.length < 8 || !validateEmail(email)) {
      return setValidated(false);
    }
    try {
      fetch("https://mycroft-test-api.herokuapp.com/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      }).then((res) => {
        if (res.status >= 200 && res.status <= 204) {
          // msg -> 서버에서 보내오는 데이터
          res.json().then((msg) => {
            if (userToken == msg.token) {
              dispatch(userActions.setLoggedIn());
              alert("로그인 성공!");
              return history.push("/");
            }
          });
        } else if (res.status == 401) {
          return setValidated(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  //로그인 되어있으면 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  });

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
          type="password"
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
