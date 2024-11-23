import { ring } from "ldrs";
ring.register("my-loading");

const Loading = () => {
  return (
    <div className="bg-black h-full w-full top-0 left-0 rounded-lg opacity-80 flex justify-center items-center absolute">
      <my-loading color="red"></my-loading>
    </div>
  );
};

export default Loading;
