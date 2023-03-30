const frame = document.getElementById("frame");

window.addEventListener("message", subscribe);
document.addEventListener("message", subscribe);

function parse(event) {
  try {
    return JSON.parse(event.data);
  } catch (error) {
    return null;
  }
}

function displayIframe() {
  document.getElementById("frame").hidden = false;
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
    console.log(`Avatar URL: ${json.data.url}`);
    document.getElementById(
      "avatarUrl"
    ).innerHTML = `Avatar URL: ${json.data.url}`;
    document.getElementById("frame").hidden = true;
  }

  // Get user id
  if (json.eventName === "v1.user.set") {
    console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
  }
}