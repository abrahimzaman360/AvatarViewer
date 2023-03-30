import "./App.css";
import { useEffect, useState } from "react";
import { Avatar } from "@readyplayerme/visage";

function App() {
  const [avatarurl, setAvatarUrl] = useState("");
  const [avatarlink, setAvatarLink] = useState(
    "https://models.readyplayer.me/63e9d717d79584041a60212c.glb"
  );
  const frame = document.getElementById("frame");
  const [loading, setLoading] = useState(false);

  const [creatormode, setCreatorMode] = useState(true);
  const [error, setError] = useState(false);
  const [iframe, setIframe] = useState(false);

  useEffect(() => {
    window.addEventListener("message", subscribe);
    document.addEventListener("message", subscribe);
  }, []);

  // Utitliy Function:
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const GetAvatar = async () => {
    setLoading(true);
    await delay(2000);
    if (avatarurl.length <= 10 || avatarurl.length == 0) {
      setError(true);
    } else {
      setAvatarLink(avatarurl);
      setError(false);
    }
    setLoading(false);
  };

  function displayIframe() {
    setIframe(!iframe);
    setCreatorMode(!creatormode);
  }

  function parse(event) {
    try {
      return JSON.parse(event.data);
    } catch (error) {
      return null;
    }
  }

  function subscribe(event) {
    const json = parse(event);

    if (json?.source !== "readyplayerme") {
      return;
    }

    // Susbribe to all events sent from Ready Player Me once frame is ready
    if (json.eventName === "v1.frame.ready") {
      frame.contentWindow.postMessage(
        JSON.stringify({
          target: "readyplayerme",
          type: "subscribe",
          eventName: "v1.**",
        }),
        "*"
      );
    }

    // Get avatar GLB URL
    if (json.eventName === "v1.avatar.exported") {
      setAvatarLink(json.data.url);
      setCreatorMode(false);
    }
  }

  return (
    <>
      <div className="mb-1 flex flex-col md:flex-row justify-between sm:px-5 gap-x-16 items-center">
        <h1 className="text-center dark:text-yellow-500 text-yellow-600 font-bold text-3xl mt-4">
          ReadyPlayer.me - Digital Avatar Booth
        </h1>
        <button className="mt-4" onClick={displayIframe}>
          {iframe ? "hide Avatar Creator" : "Show Avatar Creator"}
        </button>
      </div>
      <div>
        {!creatormode ? (
          <div>
            <section className="text-xl font-mono text-center gap-2 flex flex-col">
              <div>
                {iframe && (
                  <iframe
                    id="frame"
                    className="frame"
                    src="https://frenchdev.readyplayer.me/en/avatar?frameApi="
                    allow="camera *; microphone *; clipboard-write"
                  ></iframe>
                )}
              </div>
            </section>
            <h2 className="text-center px-2 text-red-500 font-medium">After Creating Your Avatar, Paste Link in Avatar Viewer Url.</h2>
          </div>
        ) : (
          <section class=" dark:bg-gray-900">
            <div class="max-w-3xl px-6 py-6 mx-auto text-center">
              <h1 class="text-xl border-2 py-1 from-neutral-800 cursor-none to-red-300 font-semibold text-gray-200 dark:text-gray-100">
                Avatar Viewer
              </h1>
              {
                <div className="mt-5 sm:ml-2 w-[400px] sm:w-[700px] h-[600px]">
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
              }
              <div class="flex flex-col gap-4 mt-8 justify-center">
                <input
                  id="avatarurl"
                  onChange={(event) => {
                    setAvatarUrl(event.target.value);
                  }}
                  type="text"
                  class="py-2 text-black bg-white border rounded-md dark:bg-black"
                  placeholder="Enter Avatar Url Here"
                />
                {error && (
                  <p className="text-red-600 text-md font-semibold">
                    Error! Enter a Url Please...
                  </p>
                )}
                <button
                  onClick={GetAvatar}
                  disabled={loading}
                  class="py-2 text-bold font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md  hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  {!loading ? "Show Avatar" : "Loading..."}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
      <footer>
        <p className="text-center sm:px-2 px-3">Made with ❤️ by <a href="https://abrahimzaman.com" className="font-bold text-green-400" target="_blank">Ibrahim Zaman</a> or Find Me on  <a href="https://github.com/abrahimzaman360" className="font-bold text-green-400" target="_blank">Github</a></p>
      </footer>
    </>
  );
}

export default App;
