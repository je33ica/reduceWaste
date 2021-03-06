import Quagga from "@ericblade/quagga2";
import { useEffect, useState } from "react";
import PopUpAlert from "../PopUpAlert";

const Scanner = ({ readBarcode, toggleScanner }) => {
  const [displayPopup, setDisplayPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment",
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: 0,
        decoder: {
          readers: ["ean_reader"],
        },
        debug: {
          showCanvas: true,
          showPatches: true,
          showFoundPatches: true,
          showSkeleton: true,
          showLabels: true,
          showPatchLabels: true,
          showRemainingPatchLabels: true,
          boxFromPatches: {
            showTransformed: true,
            showTransformedBox: true,
            showBB: true,
          },
        },
        locate: true,
      },
      (err) => {
        if (err) {
          setDisplayPopup({
            show: true,
            type: "failure",
            message:
              "We couldn't find your camera. It may be being used by another application",
          });
          setTimeout(() => {
            toggleScanner()
            setDisplayPopup({
              show: false,
              type: "",
              message: "",
            });
          }, 2500);
          return
        }
        Quagga.start();
      }
    );
    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2,
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });
    Quagga.onDetected((result) => {
      readBarcode(result);
      Quagga.stop();
    });
  });
  const positionViewportAndCanvas = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translateX(-50%)",
  }
  return (
    <>
      <div
        className="viewport"
        id="interactive"
        style={{ position: 'unset' }}
      >
        <video src="" style={positionViewportAndCanvas}></video>
        <canvas className="drawingBuffer" style={positionViewportAndCanvas}></canvas>
      </div>
      {displayPopup.show && <PopUpAlert type={displayPopup.type} message={displayPopup.message}/>}
    </>
  );
};

export default Scanner;
