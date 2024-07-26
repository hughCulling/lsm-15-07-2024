"use client";
import React, { useEffect, useRef } from "react";

export default function BroadcastComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        })
        .catch((err) => {
          console.error("Failed to load IVSBroadcastClient", err);
        });
    }
  }, []);

  return (
    <>
      <div id="broadcast">
        <canvas id="preview" ref={canvasRef} width="640" height="360"></canvas>
      </div>
    </>
  );
}
