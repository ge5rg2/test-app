import styled from "styled-components";
import Input from "../component/Input";
import Button from "../component/Button";
import palette from "../styles/palette";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Base = styled.div`
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 1rem; // 16px
  margin: 0 auto;
  color: ${palette.gray[200]};
  .signup-heading {
    color: ${(props) => props.theme.accentColor};
    font-size: 2.5rem;
    font-weight: 500;
    margin: 2rem 0 0 0; // 16px
    text-align: start;
  }

  .signup-input-label {
    font-size: 1.25rem; // 20px
    margin-bottom: 0;
  }

  .signup-error-icon {
    color: ${palette.red[500]};
  }

  .signup-pass-icon {
    color: ${palette.green[500]};
  }

  .signup-input-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .signup-input-message {
    font-size: 0.875rem;
    color: ${palette.gray[500]};
    margin-bottom: 1rem; // 16px
  }

  .signup-input-error-message {
    font-size: 0.875rem;
    color: ${palette.red[500]};
    margin-bottom: 1rem; // 16px
  }

  .signup-submit-button-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 1rem; // 16px
    .btn_signUp {
      background-color: ${(props) => props.theme.accentColor};
      border: 1px solid ${(props) => props.theme.bgColor};
      color: ${(props) => props.theme.textColor};
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

  .signup-input-visible {
    cursor: pointer;
  }
`;

const Signup: React.FC = () => {
  // user 정보를 담은 state
  const [userinfo, setUserinfo] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
  });
  // 정규식 state
  const [validate, setValidate] = useState({
    email: "none",
    password: "none",
    passwordConfirm: "none",
    phone: "none",
  });

  /* const isLoggedIn = useSelector((state) => state.user.isLoggedIn); */

  const history = useHistory();

  // 이메일 정규표현식
  const validateEmail = (email: string) => {
    const regExp =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regExp.test(email);
  };

  // 패스워드 정규표현식
  const validatePassword = (password: string) => {
    const regExp = /^.{8,15}$/;
    return regExp.test(password);
  };

  // 연락처 정규표현식
  const validatePhone = (phone: string) => {
    const regExp = /^(?=.*[0-9]).{10,11}$/;
    return regExp.test(phone);
  };

  // input value값에 따른 결과를 반영하는 함수
  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (key === "email") {
        if (value === "") {
          setValidate({ ...validate, [key]: "none" });
        } else if (validateEmail(value)) {
          setValidate({ ...validate, [key]: "pass" });
        } else {
          setValidate({ ...validate, [key]: "fail" });
        }
      } else if (key === "password") {
        if (value === "") {
          setValidate({ ...validate, [key]: "none" });
        } else if (validatePassword(value)) {
          setValidate({ ...validate, [key]: "pass" });
        } else {
          setValidate({ ...validate, [key]: "fail" });
        }
      } else if (key === "passwordConfirm") {
        if (value === "") {
          setValidate({ ...validate, [key]: "none" });
        } else if (value == userinfo.password) {
          setValidate({ ...validate, [key]: "pass" });
        } else {
          setValidate({ ...validate, [key]: "fail" });
        }
      } else if (key === "phone") {
        if (value === "") {
          setValidate({ ...validate, [key]: "none" });
        } else if (validatePhone(value)) {
          setValidate({ ...validate, [key]: "pass" });
        } else {
          setValidate({ ...validate, [key]: "fail" });
        }
      }
      setUserinfo({ ...userinfo, [key]: value });
    };
  // 가입하기 클릭시 발생 함수
  const onClickSubmitButton = async () => {
    const { email, password } = userinfo;
    if (!validateEmail(email)) {
      alert("올바른 이메일 양식인지 확인해주세요!");
      return;
    }
    if (!validatePassword(password)) {
      alert("올바른 비밀번호 양식인지 확인해주세요!");
      return;
    }

    const regForm = {
      username: email,
      password: password,
    };

    try {
      fetch("http://localhost:3001/user/register", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ regForm }),
      }).then((res) => {
        if (res.status >= 200 && res.status <= 204) {
          alert("회원가입 완료!! 10TUT 토큰 지급 !!");
          history.push("/");
        } else if (res.status == 400) {
          res.json().then((msg) => alert(msg.message));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  // 로그인시 리다이렉트
  useEffect(() => {
    /*     isLoggedIn && navigate("/", { replace: true }); */
  });

  return (
    <Base>
      <h1 className="signup-heading">회원가입</h1>
      <p className="signup-input-label">이메일</p>
      <div className="signup-input-wrapper">
        <Input
          type="text"
          onChange={handleInputValue("email")}
          validated={validate.email === "fail" ? false : true}
          width="100%"
        />
      </div>
      {validate.email === "pass" ? (
        <p
          className="signup-input-message"
          style={{ color: palette.green[500] }}
        >
          사용 가능한 이메일입니다.
        </p>
      ) : (
        <p
          className={
            validate.email === "none"
              ? "signup-input-message"
              : "signup-input-error-message"
          }
        >
          {validate.email === "none"
            ? "이메일 주소는 비밀번호 변경 등에 사용됩니다."
            : "올바른 이메일 주소를 입력해주세요."}
        </p>
      )}
      <p className="signup-input-label">비밀번호</p>
      <div className="signup-input-wrapper">
        <Input
          type="password"
          onChange={handleInputValue("password")}
          validated={validate.password === "fail" ? false : true}
          width="100%"
        />
      </div>
      {validate.password === "pass" ? (
        <p
          className="signup-input-message"
          style={{ color: palette.green[500] }}
        >
          사용 가능한 비밀번호입니다.
        </p>
      ) : (
        <p
          className={
            validate.password === "none"
              ? "signup-input-message"
              : "signup-input-error-message"
          }
        >
          비밀번호는 8~15자 이내로 맞춰주세요.
        </p>
      )}{" "}
      <p className="signup-input-label">비밀번호 확인</p>
      <div className="signup-input-wrapper">
        {validate.password === "pass" ? (
          <Input
            type="password"
            onChange={handleInputValue("passwordConfirm")}
            validated={validate.passwordConfirm === "fail" ? false : true}
            width="100%"
          />
        ) : (
          <Input type="password" width="100%" disabled />
        )}
      </div>
      {validate.passwordConfirm === "pass" &&
      userinfo.password == userinfo.passwordConfirm ? (
        <p
          className="signup-input-message"
          style={{ color: palette.green[500] }}
        >
          일치합니다.
        </p>
      ) : (
        <p
          className={
            validate.passwordConfirm === "none"
              ? "signup-input-message"
              : "signup-input-error-message"
          }
        >
          동일한 비밀번호를 입력해 주세요.
        </p>
      )}
      <p className="signup-input-label">연락처</p>
      <div className="signup-input-wrapper">
        <Input
          type="tel"
          onChange={handleInputValue("phone")}
          validated={validate.phone === "fail" ? false : true}
          width="100%"
        />
      </div>
      {validate.phone === "pass" ? (
        <p
          className="signup-input-message"
          style={{ color: palette.green[500] }}
        >
          사용 가능한 연락처 입니다.
        </p>
      ) : (
        <p
          className={
            validate.phone === "none"
              ? "signup-input-message"
              : "signup-input-error-message"
          }
        >
          숫자로만 입력해 주세요. ex)01000000000
        </p>
      )}
      <div className="signup-submit-button-wrapper">
        <Button className="btn_signUp" onClick={onClickSubmitButton}>
          가입하기
        </Button>
      </div>
    </Base>
  );
};

export default Signup;
