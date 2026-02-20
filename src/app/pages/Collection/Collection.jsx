import { logout } from "@core/modules/auth/api.auth";
import React from "react";

const Collection = () => {
  return (
    <>
      <h1>Collection</h1>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default Collection;
