import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import { listAccounts } from '../graphql/queries';
import awsconfig from "../aws-exports";
Amplify.configure({
  ...awsconfig,
  Auth: {
    mandatorySignIn: false,
  },
});
// Auth.configure({ mandatorySignIn: false });

export const awsSignUp = async (phone, password) => {
  // used to sign up a user via Amplify
  // Takes phone number and password
  // Returns a promise data object with Cognito user information
  // phone must be in following format (without punctuation)
  // [country code][phone number]. example: 15555555555

  try {
    const { user } = await Auth.signUp({
      username: `+${phone}`,
      password,
      attributes: {
        phone_number: `+${phone}`,
      },
    });

    return user;
  } catch (error) {
    console.log("error signing up", error);
    return error;
  }
};

export const awsSignUpEmail = async (email, password) => {
  // used to sign up a user via Amplify
  // Takes phone number and password
  // Returns a promise data object with Cognito user information
  // phone must be in following format (without punctuation)
  // [country code][phone number]. example: 15555555555

  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
    });

    return user;
  } catch (error) {
    console.log("error signing up", error);
    return error;
  }
};

export const awsConfirmSignUp = async (phone, code) => {
  // used to confirm signup with users 6-digit confirmation number
  // Takes phone number and code that was texted to user and entered by form
  // If unsuccessful, returns error object

  try {
    await Auth.confirmSignUp(`+${phone}`, code);
    return "success";
  } catch (error) {
    console.log("error confirming sign up", error);
    return error;
  }
};

export const awsConfirmSignUpEmail = async (email, code) => {
  // used to confirm signup with users 6-digit confirmation number
  // Takes phone number and code that was emailed to user and entered by form
  // If unsuccessful, returns error object

  try {
    await Auth.confirmSignUp(email, code);
    return "success";
  } catch (error) {
    console.log("error confirming sign up", error);
    return error;
  }
};

export const awsResendConfirmationCode = async (phone) => {
  // Used to resend 6-digit confirmation code
  // Takes phone number
  // If unsuccessful, returns error object

  try {
    await Auth.resendSignUp(`+${phone}`);
    console.log("code resent successfully");
    return "success";
  } catch (error) {
    console.log("error resending code: ", error);
    return error;
  }
};

export const awsResendConfirmationCodeEmail = async (email) => {
  // Used to resend 6-digit confirmation code
  // Takes email
  // If unsuccessful, returns error object

  try {
    await Auth.resendSignUp(email);
    console.log("code resent successfully");
    return "success";
  } catch (error) {
    console.log("error resending code: ", error);
    return error;
  }
};

export const awsSignIn = async (phone, password) => {
  // used to log a user in
  // Takes phone number and password
  // Returns a promise data object with Cognito user information

  console.log(`Phone number is +${phone} and password is ${password}`);

  try {
    const user = await Auth.signIn(`+1${phone.slice(-10)}`, password);

    return user;
  } catch (error) {
    console.log("error signing in", error);

    return error;
  }
};

export const awsSignInEmail = async (email, password) => {
  // used to log a user in
  // Takes phone number and password
  // Returns a promise data object with Cognito user information

  console.log(`Email is ${email} and password is ${password}`);

  try {
    const user = await Auth.signIn(email, password);

    return user;
  } catch (error) {
    console.log("error signing in", error);

    return error;
  }
};

export const awsForgotPassword = (phone) => {
  // used when user forgets password
  // Takes phone number and sends confirmation code to user

  Auth.forgotPassword(`+1${phone}`)
    .then((data) => {
      console.log(data, "returning data");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const awsForgotPasswordEmail = (email) => {
  // used when user forgets password
  // Takes email and sends confirmation code to user

  console.log(email);

  Auth.forgotPassword(email)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const awsForgotPasswordSubmit = (phone, code, new_password) => {
  // Used after awsForgotPassword flow
  // Phone entered from data passed from previous screen
  // Code texted to user and entered
  // new_password entered by user

  Auth.forgotPasswordSubmit(`+1${phone.slice(-10)}`, code, new_password)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const awsForgotPasswordSubmitEmail = (email, code, new_password) => {
  // Used after awsForgotPassword flow
  // Phone entered from data passed from previous screen
  // Code texted to user and entered
  // new_password entered by user

  Auth.forgotPasswordSubmit(email, code, new_password)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const awsSignOut = async () => {
  // used to log user out
  // If unsuccessful, returns error object
  try {
    const response = await Auth.signOut();
    return response;
  } catch (error) {
    console.log("error signing out: ", error);
    return error;
  }
};

export const awsCurrentAuthenticatedUser = async () => {
  try {
    return new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser({
        bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    })
  } catch (error) {
    console.log("error signing out: ", error);
    return error;
  }
};

export const getUserInformation = async (authEmail) => {
  const { data } = await API.graphql(
    graphqlOperation(listAccounts, {
      filter: {
        email: {
          eq: authEmail.toLowerCase()
        }
      }
    })
  );
  
  const { id, name, phone, points, email } =
    data.listAccounts.items[0] ?? {};
  return {
    id: id,
    name: name,
    phone: phone,
    points: points,
    email: authEmail
  };
}
