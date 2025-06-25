// FaceDetectionMini.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { FilesetResolver, FaceDetector } from "@mediapipe/tasks-vision";

// const FaceDetectionMini = ({ setAttentionSpan }) => {
//   const videoRef = useRef(null);
//   const [faceDetector, setFaceDetector] = useState(null);
//   const [runningMode, setRunningMode] = useState("IMAGE");

//   useEffect(() => {
//     const initializeFaceDetector = async () => {
//       const vision = await FilesetResolver.forVisionTasks("/mediapipe");
//       const detector = await FaceDetector.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath: "/models/blaze_face_short_range.tflite",
//           delegate: "GPU",
//         },
//         runningMode: "IMAGE",
//       });
//       setFaceDetector(detector);
//     };

//     initializeFaceDetector();
//   }, []);

//   const predictWebcam = async () => {
//     if (!videoRef.current || !faceDetector) {
//       return;
//     }

//     if (runningMode === "IMAGE") {
//       await faceDetector.setOptions({ runningMode: "VIDEO" });
//       setRunningMode("VIDEO");
//     }

//     const video = videoRef.current;
//     const startTimeMs = performance.now();
//     const results = await faceDetector.detectForVideo(video, startTimeMs);
//     if (results.detections.length > 0) {
//       const score = results.detections[0].categories[0].score;
//       setAttentionSpan(Math.round(score * 100));
//     }

//     requestAnimationFrame(predictWebcam);
//   };

//   const enableCam = async () => {
//     if (!faceDetector) {
//       return;
//     }
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: { width: 320, height: 240 }, // smaller resolution
//     });
//     videoRef.current.srcObject = stream;
//     videoRef.current.onloadeddata = predictWebcam;
//   };

//   useEffect(() => {
//     enableCam();
//   }, [faceDetector]);

//   return (
//     <div className="mt-4 flex justify-center">
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted
//         width={320}
//         height={240}
//         className="rounded-xl shadow-md"
//       />
//     </div>
//   );
// };

// export default FaceDetectionMini;

import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { FilesetResolver, FaceDetector } from "@mediapipe/tasks-vision";

const FaceDetectionMini = forwardRef(({ setAttentionSpan }, ref) => {
  const videoRef = useRef(null);
  const faceDetectorRef = useRef(null);
  const isRunningRef = useRef(false);
  const runningMode = useRef("IMAGE");

  useImperativeHandle(ref, () => ({
    startDetection,
    stopDetection,
  }));

  const startDetection = async () => {
    if (!faceDetectorRef.current) {
      const vision = await FilesetResolver.forVisionTasks("/mediapipe");
      faceDetectorRef.current = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/blaze_face_short_range.tflite",
          delegate: "GPU",
        },
        runningMode: "IMAGE",
      });
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 320, height: 240 },
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      isRunningRef.current = true;
      predictWebcam();
    }
  };

  const stopDetection = () => {
    isRunningRef.current = false;
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
    }
  };

  const predictWebcam = async () => {
    if (!isRunningRef.current || !videoRef.current || !faceDetectorRef.current)
      return;

    if (runningMode.current === "IMAGE") {
      await faceDetectorRef.current.setOptions({ runningMode: "VIDEO" });
      runningMode.current = "VIDEO";
    }

    const results = await faceDetectorRef.current.detectForVideo(
      videoRef.current,
      performance.now()
    );
    if (results.detections.length > 0) {
      const score = results.detections[0].categories[0].score;
      setAttentionSpan(Math.round(score * 100));
    }

    setTimeout(() => predictWebcam(), 500);
  };

  return (
    <div className="mt-4 flex justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width={320}
        height={240}
      />
    </div>
  );
});

export default FaceDetectionMini;
