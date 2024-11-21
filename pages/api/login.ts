// This API route is for password protection in the dev staging server.
import { loginHandler } from "@storyofams/next-password-protect";
/* eslint-disable */
console.log(process.env.STAGING_PASSWORD);
export default loginHandler(process.env.STAGING_PASSWORD, {
  cookieName: "authorization",
});
