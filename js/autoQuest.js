export const getPos = () => {
  const url = window.location;
  console.log(url.pathname);
  if (url.pathname === "/autoquest"){
      console.log("ok")
  }
};
