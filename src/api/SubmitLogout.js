export default async function (e, setAuthUser) {
  e.preventDefault();
  console.log("submit logout");
  console.log(e);

  fetch("http://ec2-3-88-195-39.compute-1.amazonaws.com/api/v1/auth/logout", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        if(json.code == 200){
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
            setAuthUser(null)
        }
    });
}
