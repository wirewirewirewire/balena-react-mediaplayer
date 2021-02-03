export default function urlEncode(url) {
  if (!url) return "";
  if (window.balenaEnv?.DATA_URL)
    return (
      window.balenaEnv.DATA_URL.substring(
        0,
        window.balenaEnv.DATA_URL.lastIndexOf("/")
      ) + url
    );
  else return url.replace("https:", "").replace("http:", "");
}
