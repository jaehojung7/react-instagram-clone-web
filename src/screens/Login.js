import routes from "../routes";
import BaseBox from "../components/shared";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { darkModeVar, isLoggedInVar } from "../Apollo";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const FacebookLogin = styled.div`
  display: flex;
  align-items: center;
  color: #385285;
  margin-bottom: 15px;
  a {
    color: #385285;
    margin-left: 7px;
    font-weight: 600;
  }
`;

const ForgotPassword = styled.div`
  a {
    color: #385285;
    font-size: 8px;
  }
`;

const Gap = styled.div`
  height: 30px;
`;

function Login() {
  return (
    <AuthLayout>
      <FormBox>
        <span>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </span>
        <Gap></Gap>
        <form>
          <Input type="text" placeholder="Phone number, username, or email" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" value="Log In" />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <a href="#">Log in with Facebook</a>
        </FacebookLogin>
        <ForgotPassword>
          <a href="#">Forgot Password?</a>
        </ForgotPassword>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
}

export default Login;
