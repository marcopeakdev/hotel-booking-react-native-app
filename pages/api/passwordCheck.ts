// This API route is for password protection in the dev staging server.

import { passwordCheckHandler } from "@storyofams/next-password-protect";

export default passwordCheckHandler(process.env.STAGING_PASSWORD, {
  cookieName: "authorization",
});
