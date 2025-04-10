import React from 'react';
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps): React.ReactElement {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-16 col-lg-16">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
