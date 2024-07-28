import React, { useEffect } from "react";
import { ClockTimerProps } from "../../typing/typing";
import "./index.less";
import { getTimerNumberPosition } from "../../utils/getTimerNumerPosition";

const ClockTimer: React.FC<ClockTimerProps> = ({ width, height }) => {
  useEffect(() => {
    handleDrawArc();
  }, []);

  /**
   * 获取圆心和半径
   * @returns
   */
  const handleGetArcInfo = () => {
    const arcInfo = { x: 0, y: 0, r: 0 };
    arcInfo.x = Math.ceil(width / 2);
    arcInfo.y = Math.ceil(height / 2);
    arcInfo.r = Math.ceil(Math.min(width, height) / 2) * 0.9;

    return arcInfo;
  };

  /**
   * 绘制外圆
   */
  const handleDrawArc = () => {
    const canvasDom: HTMLCanvasElement = document.createElement("canvas");
    canvasDom.width = width;
    canvasDom.height = height;
    const canvas: CanvasRenderingContext2D = canvasDom?.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    const { x, y, r } = handleGetArcInfo();
    canvas.fillRect(x, y, 5, 5);
    canvas.beginPath();
    canvas.arc(x, y, r, 0, Math.PI * 2);
    canvas.stroke();
    canvas.closePath();
    canvas.font = "old 48px serif";

    const timerObj = getTimerNumberPosition({ x, y, r });

    for (const key in timerObj) {
      canvas.fillText(key, timerObj[key].x, timerObj[key].y);
    }

    const canvasImgUrl = canvasDom.toDataURL();
    const canvasImg = new Image();
    canvasImg.src = canvasImgUrl;

    const realCanvasDom: HTMLCanvasElement = document.getElementById(
      "clock-timer-canvas"
    ) as HTMLCanvasElement;
    realCanvasDom.width = width;
    realCanvasDom.height = height;

    const realCanvas: CanvasRenderingContext2D = realCanvasDom?.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    realCanvas.drawImage(canvasImg, 0, 0);
  };

  return <canvas id={"clock-timer-canvas"} />;
};

export default ClockTimer;
