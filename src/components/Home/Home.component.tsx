 import {
    fetch,
    getDefaultSession, handleIncomingRedirect, login,
    logout
} from "@inrupt/solid-client-authn-browser";
import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
 
 
 const REDIRECT_URL = "http://localhost:3000/";
 const CLIENT_APP_WEBID =
   "https://pod-admin.wittrock.us/";
 
 export const HomeComponent = () => {
   const [webId, setWebId] = useState(getDefaultSession().info.webId);
   const [issuer, setIssuer] = useState("https://pod.wittrock.us/");
   const [resource, setResource] = useState<string>(webId || "");
   const [data, setData] = useState<string | null>(null);
 
   // The useEffect hook is executed on page load, and in particular when the user
   // is redirected to the page after logging in the identity provider.
   useEffect(() => {
     // After redirect, the current URL contains login information.
     handleIncomingRedirect({
       restorePreviousSession: true,
     }).then((info:any) => {
       setWebId(info.webId);
       setResource(webId || "");
     });
   }, [webId]);
 
 
   const handleLogin = (e:any) => {
     // The default behaviour of the button is to resubmit.
     // This prevents the page from reloading.
     e.preventDefault();
     // Login will redirect the user away so that they can log in the OIDC issuer,
     // and back to the provided redirect URL (which should be controlled by your app).
     login({
        clientId: CLIENT_APP_WEBID,
        clientName: "Demo app",
        oidcIssuer: issuer,
        redirectUrl: REDIRECT_URL,
     });
   };
 
   const handleLogout = (e:any) => {
     e.preventDefault();
     logout();
     // The following has no impact on the logout, it just resets the UI.
     setWebId(undefined);
     setData("");
     setResource("");
   };
 
   const handleFetch = (e:any) => {
     e.preventDefault();
     fetch(resource, { headers: new Headers({ Accept: "text/turtle" }) })
       .then((response) => response.text())
       .then(setData);
   };

   const onChangeIssuer = (e:any) => {
    setIssuer(e.target.value);
  };

  const onChangeResource = (e:any) => {
    setResource(e.target.value);
  };
 
   return (
     <div>
       <main>
         <h1>Sandbox app</h1>
         <p>{webId ? `Logged in as ${webId}` : "Not logged in yet"}</p>
         <div>
           <form>
             <input
               type="text"
               value={issuer}
               onChange={onChangeIssuer}
             />
             <button onClick={handleLogin}>Log In</button>
             <button onClick={handleLogout}>Log Out</button>
           </form>
         </div>
         <hr />
         <div>
           <input
             type="text"
             value={resource}
             onChange={onChangeResource}
           />
           <button onClick={handleFetch}>Fetch</button>
         </div>
         <pre>{data}</pre>
       </main>
     </div>
   );
 }