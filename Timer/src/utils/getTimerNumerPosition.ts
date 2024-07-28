/**
 * 获取钟表上的时间位置
 * @param params 
 * @returns 
 */
export const getTimerNumberPosition = (params: { x: number, y: number, r: number }) => {
  const { x: arcX, y: arcY, r: arcR } = params;

  const timerObj: Record<number, { x: number, y: number, deg: number }> = {
    12: { x: arcX, y: 0 + 22, deg: 0 },
    1: { x: arcX + arcR * Math.cos(Math.PI / 3) * 0.85, y: arcY - arcR * Math.sin(Math.PI / 3) * 0.85, deg: Math.PI / 6 },
    2: { x: arcX + arcR * Math.cos(Math.PI / 6) * 0.85, y: arcY - arcR * Math.sin(Math.PI / 6) * 0.85, deg: Math.PI / 3 },
    3: { x: arcX + arcR * 0.9, y: arcY, deg: Math.PI / 2 },
    4: { x: arcX + arcR * Math.cos(Math.PI / 6) * 0.9, y: arcY + arcR * Math.sin(Math.PI / 6) * 0.9, deg: 2 * Math.PI / 3 },
    5: { x: arcX + arcR * Math.cos(Math.PI / 3) * 0.9, y: arcY + arcR * Math.sin(Math.PI / 3) * 0.9, deg: 5 * Math.PI / 6 },
    6: { x: arcX, y: arcY + arcR * 0.9, deg: Math.PI },
    7: { x: arcX - arcR * Math.cos(Math.PI / 3) * 0.95, y: arcY + arcR * Math.sin(Math.PI / 3) * 0.95, deg: 7 * Math.PI / 6 },
    8: { x: arcX - arcR * Math.cos(Math.PI / 6) * 0.95, y: arcY + arcR * Math.sin(Math.PI / 6) * 0.95, deg: 4 * Math.PI / 3 },
    9: { x: arcX - arcR * 0.95, y: arcY, deg: 3 * Math.PI / 2 },
    10: { x: arcX - arcR * Math.cos(Math.PI / 6) * 0.9, y: arcY - arcR * Math.sin(Math.PI / 6) * 0.9, deg: 5 * Math.PI / 2 },
    11: { x: arcX - arcR * Math.cos(Math.PI / 3) * 0.9, y: arcY - arcR * Math.sin(Math.PI / 3) * 0.9, deg: 11 * Math.PI / 6 },
  };

  return timerObj;
};