import "./App.css";
import { useState } from "react";
import { Avatar, Exhibit } from "@readyplayerme/visage";

function App() {
  const [avatarlink, setAvatarLink] = useState("");

  const GetAvatar = async () => {
    setAvatarLink(avatarlink);
  };

  return (
    <>
      <div className="">
        <section class=" dark:bg-gray-900">
          <div class="max-w-3xl px-6 py-8 mx-auto text-center">
            <h1 class="text-3xl font-semibold text-gray-200 dark:text-gray-100">
              ReadyPlayer.me Avatar Viewer
            </h1>
            {avatarlink != null && (
              <div className="mt-16 sm:ml-2 w-[400px] sm:w-[700px] h-[600px]">
                <Avatar
                  ambientLightColor="#fff5b6"
                  ambientLightIntensity={0.25}
                  cameraInitialDistance={4}
                  cameraTarget={1.5}
                  dirLightColor="#002aff"
                  shadows={true}
                  dirLightIntensity={5}
                  environment="city"
                  onLoading={<h1>Loading Avatar...</h1>}
                  modelSrc={avatarlink}
                  onLoaded={function noRefCheck() {}}
                  headMovement={true}
                  scale={1}
                  spotLightAngle={0.314}
                  spotLightColor="#fff5b6"
                  spotLightIntensity={1}
                  style={{
                    background: "transparent",
                  }}
                />
              </div>
            )}
            <div class="flex flex-col gap-4 mt-8 justify-center">
              <input
                id="avatarurl"
                onChange={(event) => {
                  setAvatarLink(event.target.value);
                }}
                type="text"
                class="py-2 text-black bg-white border rounded-md dark:bg-black"
                placeholder="Enter Avatar Url Here"
              />

              <button
                onClick={GetAvatar}
                class="py-2 text-bold font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md  hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Show Avatar
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
