export const hasStayPermissions = (stayStatus) => {
  switch (stayStatus) {
    case "none": // no reservation information or no upcoming stays
    case "outside24": // pre-stay but outside of 24 hour window, do not provide address or key information
      return false;
    case "within24": // pre-stay within 24 hours, provide address and key information
    case "current": // guest during current stay
      return true;
    default:
      // default setting
      return false;
  }
};
