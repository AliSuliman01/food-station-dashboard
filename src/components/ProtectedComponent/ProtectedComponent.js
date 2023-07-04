
const ProtectedComponent = ({ children }) => {
  const user = localStorage.getItem("user");

  if (user) {
    
    return children;
  }
};

export default ProtectedComponent;
