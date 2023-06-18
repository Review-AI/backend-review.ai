import React from "react";
import { useEffect, useRef } from 'react';

export default function AlwaysScrollToBottom() {
  const elementRef = useRef<null | HTMLDivElement>(null); 
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
}
