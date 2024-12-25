import React, { createContext, useEffect, useState } from "react";

import { AnimationProvider } from "./Animation";
import { NuiVisibilityFrame } from "@/types";
import { Post } from "@/hooks/post";
import clsx from "clsx";
import { isEnvBrowser } from "@/utils/misc";
import { listen } from "@/hooks/listen";
import { observe } from "@/hooks/observe";

export const VisibilityContext = createContext<NuiVisibilityFrame | null>(null);

export const VisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  observe<boolean>("setVisibility", setVisible);
  observe<string>("setColor", (data) => {
    document.documentElement.style.setProperty("--main-color", data);
  });
  listen<KeyboardEvent>("keydown", (e) => {
    if (visible && ["Escape"].includes(e.code)) {
      setVisible(false);
    }
  });
  useEffect(() => {
    if (!visible && !isEnvBrowser()) {
      Post.create("removeFocus");
    }
  }, [visible]);
  return (
    <VisibilityContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      <AnimationProvider show={visible}>
        <div
          className={clsx("h-screen", {
            "bg-slate-800": isEnvBrowser(),
          })}
        >
          {children}
        </div>
      </AnimationProvider>
    </VisibilityContext.Provider>
  );
};
