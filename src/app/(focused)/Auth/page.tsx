"use client";
import "@aws-amplify/ui-react/styles.css";
import './login.css'
import { Authenticator, Button, Heading, useAuthenticator, useTheme, View, Text } from "@aws-amplify/ui-react";
import logo from '@/assets/MyRewardsLogo3.svg'
import Image from "next/image";

const Authentication = () => {
  return (
    <div className='flex flex-1 justify-center'>
      <Authenticator components={components} formFields={formFields} />
    </div>
  );
};

const components = {
  Header() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Amplify logo"
          src={logo}
        />
      </View>
    );
  },
  SignIn: {
    Footer() {
      const { toForgotPassword } = useAuthenticator();
      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toForgotPassword}
            size="small"
            variation="link"
          >
            Reset Password
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Password resets will be sent to the provided emails</Text>;
    },
  },
  SetupTotp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    }
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    }
  },
  ForgotPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Reset Password
        </Heading>
      );
    }
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Reset Password
        </Heading>
      );
    }
  },
};


const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    given_name:{
      label: 'First Name',
      order: 1,
      isRequired: true,
      placeholder:'First Name'
    },
    family_name:{
      label: 'Last Name',
      order: 2,
      isRequired: true,
      placeholder:'Last Name'
    },
    birthdate:{
      label: 'Birthday',
      order: 3,
    },
    password: {
      label: 'Password',
      placeholder: 'Password',
      isRequired: true,
      order: 4,
    },
    confirm_password: {
      label: 'Confirm Password',
      placeholder:'Confirm Password',
      order: 5,
    },
    'custom:linked': {
      value: 0,
      type: 'hidden'
    }
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your Password',
    },
  },
  forgotPassword: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter your Confirmation Code',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please',
    },
  },
  setupTotp: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code',
      isRequired: false,
    },
  },
}

export default Authentication;
