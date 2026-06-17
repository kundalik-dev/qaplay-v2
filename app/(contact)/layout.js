import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 md:px-0">
      {children}
    </div>
  );
};

export default MainLayout;
