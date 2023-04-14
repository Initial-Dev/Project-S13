"use client";
import { useEffect, useState } from "react";

export default function Page() {
  /**
   * Responsive breakpoints
   *
   * - mobile: 0 - 768px
   * - tablet: 768px - 1366px
   * - desktop: 1366px - 1920px
   */

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(
      Boolean(
        userAgent.match(
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        )
      )
    );
  }, []);

  return <>{isMobile ? <div>Mobile</div> : <div>Desktop</div>}</>;
}

// get user agent
// window.navigator.userAgent
// const userAgent = navigator.userAgent;
// const isMobile = Boolean(userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i));
