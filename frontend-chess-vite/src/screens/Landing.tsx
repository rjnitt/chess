import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mt-2">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {" "}
            <img src={"chess.jpeg"}></img>{" "}
          </div>
          <div className="bg-slate-400">
            {" "}
            <h1 className="mt-4 text-4xl capitalize text-white">
              Let's Play Chess{" "}
            </h1>
            <div className="mt-4">
              <button
                onClick={() => {
                  navigate("/game");
                }}
                className="rounded text-2xl mt-2 font-bold px-4 py-2 hover:bg-green-600 bg-green-500/100"
              >
                {" "}
                Play{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
