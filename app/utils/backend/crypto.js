import md5 from "md5";

const generateSessionIdHash = (session, id) => {
  return md5(`${session}${id}`);
};

export default generateSessionIdHash;
