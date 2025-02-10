"use client";
import { color_pallete } from "@/static/colors";
import { STEPS } from "@/static/constants";

export default function StatusBar({ position }: { position: number }) {
  return (
    <div className="flex border-t-2 border-b-2 justify-around" style={{ borderColor: color_pallete[3] }}>
      {STEPS.map((label, index) => {
        const isActive = position >= index;
        const isCurrent = (position === index && index < STEPS.length-1)
        const end = index == STEPS.length-1

        return (
          <div
            key={index}
            className="flex p-2 flex-1 justify-center transition-all"
            style={{
              backgroundColor: isActive ? color_pallete[3] : undefined,
              color: isActive ? "white" : color_pallete[3],
              borderInlineEnd: !isActive && !end ? `solid ${color_pallete[3]} 2px` : '',
              borderTopRightRadius: (isCurrent || !isActive) ? "50px" : "0px",
              borderBottomRightRadius: (isCurrent || !isActive) ? "50px" : "0px",
              borderBlockColor:'transparent',
              borderInlineStart:'transparent'
            }}
          >
            <h1 className="flex font-bold">{label}</h1>
          </div>
        );
      })}
    </div>
  );
}
