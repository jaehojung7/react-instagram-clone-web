import routes from "../routes";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Subtitle = styled.h3`
  font-weight: 600;
  font-size: 12px;
  color: #8e8e8e;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
  line-height: 18px;
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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const history = useHistory();
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home);
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <FontAwesomeIcon icon={faInstagram} size="3x" />
        <Subtitle>Sign up to see photos and videos from your friends.</Subtitle>
        <Button type="submit" value="Log in with Facebook" />
        <Separator />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: "First name is required.",
            })}
            type="text"
            placeholder="First Name"
          />
          <Input
            {...register("lastName", {
              required: "Last name is required.",
            })}
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register("email", {
              required: "Email is required.",
            })}
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("username", {
              required: "Username is required.",
            })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", {
              required: "Password is required.",
            })}
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
}

export default SignUp;
