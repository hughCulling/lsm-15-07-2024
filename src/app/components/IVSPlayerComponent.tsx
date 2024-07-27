"use client";

import React, { useEffect, useRef } from "react";
import {
  create,
  isPlayerSupported,
  PlayerError,
  PlayerEventType,
  Quality,
  TextCue,
  TextMetadataCue,
} from "amazon-ivs-player";
import wasmBinaryPath from "amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm";
import wasmWorkerPath from "amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js";

interface IVSPlayerComponentProps {
  streamUrl: string;
}

const IVSPlayerComponent: React.FC<IVSPlayerComponentProps> = ({
  streamUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log("useEffect called");
    if (isPlayerSupported) {
      console.log("Player is supported");

      const player = create({
        wasmWorker: wasmWorkerPath,
        wasmBinary: wasmBinaryPath,
      });

      if (videoRef.current) {
        console.log("Video element found");

        player.attachHTMLVideoElement(videoRef.current);
        player.load(streamUrl);
        player.play();

        console.log("Player initialized and started");

        player.addEventListener(PlayerEventType.ERROR, (error: PlayerError) => {
          console.error("Player Error:", error);
        });

        player.addEventListener(
          PlayerEventType.QUALITY_CHANGED,
          (quality: Quality) => {
            console.log("Quality Changed:", quality);
          }
        );

        player.addEventListener(PlayerEventType.TEXT_CUE, (cue: TextCue) => {
          console.log("Text Cue:", cue.startTime, cue.text);
        });

        player.addEventListener(
          PlayerEventType.TEXT_METADATA_CUE,
          (cue: TextMetadataCue) => {
            console.log("Text Metadata Cue:", cue.text);
          }
        );
      } else {
        console.error("Video element not found");
      }
    } else {
      console.error("IVS Player is not supported in this browser.");
    }
  }, [streamUrl]);

  return <video ref={videoRef} controls width="100%" />;
};

export default IVSPlayerComponent;
