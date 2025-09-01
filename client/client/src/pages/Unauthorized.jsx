// src/pages/Unauthorized.jsx
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className=" bg-[#141414] flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-lg mb-6 text-white">
        You don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
