import { Spinner } from "@material-tailwind/react";
 
function Loading() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Spinner className="h-10 w-10 text-gray-900/50" />
      </div>
    );
  }

  export default Loading;