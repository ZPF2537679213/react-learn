import React, { useEffect, useRef } from "react";
import { ClockTimerProps } from "../../typing/typing";
import "./index.less";
import { getTimerNumberPosition } from "../../utils/getTimerNumerPosition";

const ClockTimer: React.FC<ClockTimerProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<{ secound: number; minute: number; hour: number }>({
    secound: 0,
    minute: 0,
    hour: 0,
  });

  useEffect(() => {
    initCanvas();
    handleDrawArc();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleDrawNeedle();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const initCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
  };

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

    const realCanvas: CanvasRenderingContext2D = canvasRef.current?.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    realCanvas.drawImage(canvasImg, 0, 0);
  };

  /**
   * 画针
   * @param ctx
   */
  const handleDrawNeedle = () => {
    const ctx: CanvasRenderingContext2D = canvasRef.current?.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    const { x, y, r } = handleGetArcInfo();
    ctx.clearRect(x - r * 0.6, y - r * 0.6, 2 * r * 0.6, 2 * r * 0.6);
    const secEndPointX = x + r * Math.cos((timeRef.current.secound * Math.PI) / 30) * 0.6;
    const secEndPointY = y + r * Math.sin((timeRef.current.secound * Math.PI) / 30) * 0.6;

    const minuteEndPointX = x + r * Math.cos((timeRef.current.minute * Math.PI) / 30) * 0.45;
    const minuteEndPointY = y + r * Math.sin((timeRef.current.minute * Math.PI) / 30) * 0.45;

    const hourEndPointX = x + r * Math.cos((timeRef.current.hour * Math.PI) / 3) * 0.3;
    const hourEndPointY = y + r * Math.sin((timeRef.current.hour * Math.PI) / 3) * 0.3;

    //时针
    ctx.beginPath(); // 开始路径
    ctx.lineWidth = 3;
    ctx.moveTo(x, y); // 设置起点坐标
    ctx.lineTo(hourEndPointX, hourEndPointY); // 设置终点坐标
    ctx.stroke(); // 绘制线条

    //分针
    ctx.beginPath(); // 开始路径
    ctx.lineWidth = 2;
    ctx.moveTo(x, y); // 设置起点坐标
    ctx.lineTo(minuteEndPointX, minuteEndPointY); // 设置终点坐标
    ctx.stroke(); // 绘制线条

    //秒针
    ctx.beginPath(); // 开始路径
    ctx.lineWidth = 1;
    ctx.moveTo(x, y); // 设置起点坐标
    ctx.lineTo(secEndPointX, secEndPointY); // 设置终点坐标
    ctx.stroke(); // 绘制线条

    if ((timeRef.current.hour + 1) % 60 === 0) {
      timeRef.current.hour = (timeRef.current.minute + 1) % 60;
    }

    if ((timeRef.current.secound + 1) % 60 === 0) {
      timeRef.current.minute = (timeRef.current.hour + 1) % 12;
    }

    timeRef.current.secound = (timeRef.current.secound + 1) % 60;
  };

  return <canvas id={"clock-timer-canvas"} ref={canvasRef} />;
};

export default ClockTimer;
