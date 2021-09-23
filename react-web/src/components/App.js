import "../App.css";
import Nav from "./tools/Nav";
import DashBoard from "./dashboard";
import { Auth } from "aws-amplify";
import Amplify from "aws-amplify";
//import awsExports from "../aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

//Amplify.configure(awsExports);

console.log(Auth.currentUserInfo());

function App() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const user = await Auth.currentUserInfo();
    setUser(user);
    console.log(user);
  };

  useEffect(fetchUser, []);
  return (
    <div className="App">
      <Nav />
      <DashBoard />
    </div>
  );
}

export default App//withAuthenticator(App);
