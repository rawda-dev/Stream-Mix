import React from "react";
// import vectorBackground from "./assets/vector_background.png";
import { RegisterCard } from "./components/RegisterCard";
function App() {
  return (
    <div className="font-gray-800 text-center lg:bg-no-repeat h-screen flex flex-col items-center justify-center lg:bg-[url('./assets/vector_background.png')]">
      <RegisterCard />
    </div>
  );
}

export default App;
