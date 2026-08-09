"use client";

type EnvelopeGateProps = {
  isOpening: boolean;
  onOpen: () => void;
};

export function EnvelopeGate({ isOpening, onOpen }: EnvelopeGateProps) {
  return (
    <section
      className={`envelope-screen ${isOpening ? "is-opening" : ""}`}
      aria-label="Invitation envelope"
    >
      <div className="envelope-stage">
        <div className="envelope-glow" aria-hidden="true" />

        <div className={`envelope-shell ${isOpening ? "is-opening" : ""}`} aria-hidden="true">
          <div className="envelope-back" />
          <div className="envelope-letter">
            <p className="envelope-letter-kicker">Bismillah</p>
            <h2 className="envelope-letter-title">Azzalea & Aiman</h2>
            <p className="envelope-letter-copy">You are warmly invited to our Nikah celebration.</p>
          </div>
          <div className="envelope-flap" />
        </div>

        <div className="envelope-cta-wrap">
          <button type="button" className="envelope-open-btn" onClick={onOpen} disabled={isOpening}>
            {isOpening ? "Opening..." : "Open Envelope"}
          </button>
          <p className="envelope-hint">Tap to unveil the invitation</p>
        </div>
      </div>
    </section>
  );
}
