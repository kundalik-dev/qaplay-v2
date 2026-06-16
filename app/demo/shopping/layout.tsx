import React from "react";

const ShoppingDemoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-testid="demo-shopping-layout" data-section="demo-shopping">
      {children}
    </div>
  );
};

export default ShoppingDemoLayout;
