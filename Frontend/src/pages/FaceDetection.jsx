import React, { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceDetector } from "@mediapipe/tasks-vision";

const FaceDetectionComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [faceDetector, setFaceDetector] = useState(null);
  const [runningMode, setRunningMode] = useState("IMAGE");
  const [streaming, setStreaming] = useState(false);
  const childrenRef = useRef([]);
  const lastVideoTimeRef = useRef(-1);

  useEffect(() => {
    const initializeFaceDetector = async () => {
      const vision = await FilesetResolver.forVisionTasks("/mediapipe");

      const detector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/blaze_face_short_range.tflite",
          delegate: "GPU",
        },
        runningMode: "IMAGE",
      });

      setFaceDetector(detector);
    };

    initializeFaceDetector();
  }, []);

  const enableCam = async () => {
    if (!faceDetector) {
      alert("Face Detector is unavailable! Please try again!");
      return;
    }

    setStreaming(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadeddata = () => {
        predictWebcam();
      };
    }
  };

  const predictWebcam = async () => {
    if (!videoRef.current || !faceDetector) return;

    if (runningMode === "IMAGE") {
      await faceDetector.setOptions({ runningMode: "VIDEO" });
      setRunningMode("VIDEO");
    }

    const video = videoRef.current;
    const startTimeMs = performance.now();

    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;

      const results = await faceDetector.detectForVideo(video, startTimeMs);
      displayDetections(results.detections);
    }

    window.requestAnimationFrame(predictWebcam);
  };

  const displayDetections = (detections) => {
    const canvas = canvasRef.current;
    if (!canvas || !videoRef.current) return;

    // Remove old children
    for (const el of childrenRef.current) {
      canvas.removeChild(el);
    }
    childrenRef.current = [];

    const video = videoRef.current;

    detections.forEach((detection) => {
      const attentionSpan = Math.round(
        parseFloat(detection.categories[0].score) * 100
      );
      console.log("Attention Span:", attentionSpan);

      const p = document.createElement("p");
      p.innerText =
        "Attention Span: " +
        Math.round(parseFloat(detection.categories[0].score) * 100) +
        "% .";
      p.className =
        "absolute text-white text-xs bg-black/70 px-1 rounded z-[2]";
      p.style.left =
        video.offsetWidth -
        detection.boundingBox.width -
        detection.boundingBox.originX +
        "px";
      p.style.top = detection.boundingBox.originY + "px";
      p.style.width = detection.boundingBox.width + "px";

      const highlighter = document.createElement("div");
      highlighter.className = "absolute border-2 border-red-500 rounded z-[1]";
      highlighter.style.left =
        video.offsetWidth -
        detection.boundingBox.width -
        detection.boundingBox.originX +
        "px";
      highlighter.style.top = detection.boundingBox.originY + "px";
      highlighter.style.width = detection.boundingBox.width - 10 + "px";
      highlighter.style.height = detection.boundingBox.height + "px";

      canvas.appendChild(highlighter);
      canvas.appendChild(p);
      childrenRef.current.push(highlighter, p);

      detection.keypoints.forEach((kp) => {
        const dot = document.createElement("span");
        dot.className =
          "absolute w-[6px] h-[6px] bg-blue-500 rounded-full z-[3]";
        dot.style.top = `${kp.y * video.offsetHeight - 3}px`;
        dot.style.left = `${
          video.offsetWidth - kp.x * video.offsetWidth - 3
        }px`;
        canvas.appendChild(dot);
        childrenRef.current.push(dot);
      });
    });
  };

  return (
    <div>
      <button
        onClick={enableCam}
        disabled={!faceDetector || streaming}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Enable Webcam
      </button>

      <div
        id="liveView"
        ref={canvasRef}
        style={{ position: "relative", width: 1280, height: 720 }}
      >
        <video
          id="webcam"
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width={1280}
          height={720}
          style={{ position: "absolute", zIndex: 0 }}
        />
      </div>
    </div>
  );
};

export default FaceDetectionComponent;
