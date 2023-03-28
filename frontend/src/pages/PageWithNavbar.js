import { Navbar } from "../core/Navbar";

export const PageWithNavbar = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
