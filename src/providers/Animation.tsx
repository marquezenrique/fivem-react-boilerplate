import React, { useEffect, useState, useTransition } from "react";

const duration = 200;

const transitionStyle = (state: string) => ({
  opacity: state === "entered" ? 1 : 0,
  transition: `opacity ${duration}ms ease`,
});

interface AnimationProviderProps {
  children: React.ReactNode;
  show?: boolean;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
  show = false,
}) => {
  const [status, setStatus] = useState("unmounted");
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (show) {
      startTransition(() => {
        setStatus("entering");
        setTimeout(() => setStatus("entered"), 0);
      });
    } else {
      startTransition(() => {
        setStatus("exiting");
        setTimeout(() => setStatus("exited"), duration);
      });
    }
  }, [show]);

  useEffect(() => {
    if (status === "exited") {
      setStatus("unmounted");
    }
  }, [status]);

  if (status === "unmounted") {
    return null;
  }

  return <div style={transitionStyle(status)}>{children}</div>;
};
