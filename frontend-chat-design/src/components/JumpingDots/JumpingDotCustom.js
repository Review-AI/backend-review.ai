import * as React from "react";
import './styles.css'

export default function JumpingDotCustom() {
  return (
    <div>
        <span className={"jumping-dots"}>
            <span className={"dot-1"}></span>
            <span className={"dot-2"}></span>
            <span className={"dot-3"}></span>
        </span>
    </div>
  );
}
