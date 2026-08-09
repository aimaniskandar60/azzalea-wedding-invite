"use client";

import { ReactNode, useState } from "react";
import { EnvelopeGate } from "@/components/envelope-gate";

type InviteGateControllerProps = {
  children: ReactNode;
  onOpen?: () => void;
};

export function InviteGateController({ children, onOpen }: InviteGateControllerProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening || isOpened) {
      return;
    }

    setIsOpening(true);

    window.dispatchEvent(new Event("invite-envelope-opened"));
    onOpen?.();

    window.setTimeout(() => {
      setIsOpened(true);
      setIsOpening(false);
    }, 900);
  };

  return (
    <>
      {!isOpened ? <EnvelopeGate isOpening={isOpening} onOpen={handleOpen} /> : null}
      <div
        className={`invitation-shell ${isOpened ? "is-visible" : "is-hidden"}`}
        aria-hidden={!isOpened}
      >
        {children}
      </div>
    </>
  );
}
