import React from "react";
import { DeleteDialog } from "./components/DeleteDialog";

function App() {
  return (
    <DeleteDialog
      open={true}
      title="Delete Account"
      description="Are you sure you want to delete your account?"
    />
  );
}

export default App;
