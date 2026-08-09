"use client";

import { ReactNode, useEffect, useState } from "react";
import { EnvelopeGate } from "@/components/envelope-gate";
import { resolveGuestByCode } from "@/content/guest-codes";

type InviteGateControllerProps = {
  children: ReactNode;
  onOpen?: () => void;
};

const ENVELOPE_REVEAL_DELAY_MS = 1250;

export function InviteGateController({ children, onOpen }: InviteGateControllerProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [guestName, setGuestName] = useState("Dear Guest");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const matchedGuest = resolveGuestByCode(params.get("code"));

    if (matchedGuest?.displayName) {
      setGuestName(matchedGuest.displayName);
    }
  }, []);

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
    }, ENVELOPE_REVEAL_DELAY_MS);
  };

  return (
    <>
      {!isOpened ? <EnvelopeGate isOpening={isOpening} onOpen={handleOpen} guestName={guestName} /> : null}
      <div
        className={`invitation-shell ${isOpened ? "is-visible" : "is-hidden"}`}
        aria-hidden={!isOpened}
      >
        {children}
      </div>
    </>
  );
}
