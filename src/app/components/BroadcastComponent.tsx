"use client";
import { useEffect, useRef, useState } from "react";

export default function BroadcastComponent(props: any) {
  // Allows reference to an <HTMLCanvasElement> before it's created.
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // The 'client' is saved to a state so that it can be accessed outside the scope of it's parent function.
  const [client, setClient] = useState<any>(null);

  // This hook ensures the code only runs once the component's mounted.
  useEffect(() => {
    async function retrieveMediaStream(client: any, streamConfig: any) {
      // List Available Devices.
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((d) => d.kind === "videoinput");
      const audioDevices = devices.filter((d) => d.kind === "audioinput");

      // Retrieve a MediaStream from a Device.
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: videoDevices[0].deviceId,
          width: {
            ideal: streamConfig.maxResolution.width,
          },
          height: {
            ideal: streamConfig.maxResolution.height,
          },
        },
      });

      const microphoneStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: audioDevices[0].deviceId },
      });

      // Add Device to a Stream.
      client.addVideoInputDevice(cameraStream, "camera1", { index: 0 });
      client.addAudioInputDevice(microphoneStream, "mic1");
    }

    // Ensure this code runs only on the client
    if (typeof window !== "undefined") {
      import("amazon-ivs-web-broadcast")
        .then((IVSBroadcastClient) => {
          // Create an Instance of the AmazonIVSBroadcastClient.
          const client = IVSBroadcastClient.create({
            streamConfig: IVSBroadcastClient.BASIC_LANDSCAPE,
            ingestEndpoint:
              "rtmps://548ea801f896.global-contribute.live-video.net:443/app/",
          });
          console.log("IVSBroadcastClient initialized:", client);

          // Set Up a Stream Preview.
          const previewEl = canvasRef.current;
          if (previewEl) {
            client.attachPreview(previewEl);
            console.log("Preview attached to canvas:", previewEl);
          }
          // Retrieve and add media streams
          retrieveMediaStream(client, IVSBroadcastClient.BASIC_LANDSCAPE);

          // Save the client to the state
          setClient(client);
        })
        .catch((err) => {
          console.error("Failed to load IVSBroadcastClient", err);
        });
    }
  }, []);

  // Start a Broadcast.
  const startBroadcast = () => {
    if (client) {
      const streamKey = props.streamKey;
      client
        .startBroadcast(streamKey)
        .then((result: any) => {
          console.log("I am successfully broadcasting!");
        })
        .catch((error: any) => {
          console.error(
            "Something drastically failed while broadcasting!",
            error
          );
        });
    }
  };

  // Stop a Broadcast.
  const stopBroadcast = () => {
    if (client) {
      client.stopBroadcast();
      console.log("Broadcast stopped.");
    }
  };

  return (
    <>
      <div id="broadcast">
        <canvas id="preview" ref={canvasRef} width="640" height="360"></canvas>
        <br />
        <button onClick={startBroadcast}>Start Broadcast</button>
        <br />
        <br />
        <button onClick={stopBroadcast}>Stop Broadcast</button>
      </div>
    </>
  );
}
