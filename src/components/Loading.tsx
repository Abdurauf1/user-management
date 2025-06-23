import { ring } from "ldrs";

const Loading = () => {
  ring.register();
  return (
    <div className="w-100 mt-5 py-5 d-flex justify-content-center align-items-center">
      <l-ring size="50" stroke="5" bg-opacity="0" speed="2" color="white"></l-ring>
    </div>
  );
};

export default Loading;
