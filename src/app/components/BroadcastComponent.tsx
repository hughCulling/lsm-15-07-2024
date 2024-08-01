"use client";
import React, { useEffect, useRef, useState } from "react";

export default function BroadcastComponent(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    async function retrieveMediaStream(client: any, streamConfig: any) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((d) => d.kind === "videoinput");
      const audioDevices = devices.filter((d) => d.kind === "audioinput");

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

      // Add video and audio input devices to the client
      client.addVideoInputDevice(cameraStream, "camera1", { index: 0 });
      client.addAudioInputDevice(microphoneStream, "mic1");
    }

    // Ensure this code runs only on the client
    if (typeof window !== "undefined") {
      import("amazon-ivs-web-broadcast")
        .then((IVSBroadcastClient) => {
          // Initialize and use IVSBroadcast here
          const client = IVSBroadcastClient.create({
            streamConfig: IVSBroadcastClient.BASIC_LANDSCAPE,
            ingestEndpoint:
              "rtmps://548ea801f896.global-contribute.live-video.net:443/app/",
          });
          console.log("IVSBroadcastClient initialized:", client);
          // Add your IVSBroadcast related code here

          // Attach the preview to the canvas element
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

  const startBroadcast = () => {
    if (client) {
      // const streamKey =
      // "sk_eu-west-1_zXgl164D4daF_vYjfLYlabad2B2uW3vhPwfQsI8IeRr"; // Replace with your actual stream key
      const streamKey = props.streamKey;
      client
        .startBroadcast(streamKey)
        .then((result: any) => {
          // Specify the type of result
          console.log("I am successfully broadcasting!");
        })
        .catch((error: any) => {
          // Specify the type of error
          console.error(
            "Something drastically failed while broadcasting!",
            error
          );
        });
    }
  };

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
