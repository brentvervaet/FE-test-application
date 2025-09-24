/// <reference types="vite/client" />

// Minimal types for canvas-confetti (only options we use)
declare module 'canvas-confetti' {
	interface ConfettiOrigin { x?: number; y?: number }
	interface ConfettiOptions {
		particleCount?: number;
		spread?: number;
		startVelocity?: number;
		origin?: ConfettiOrigin;
		scalar?: number;
	}
	const confetti: (options?: ConfettiOptions) => void;
	export default confetti;
}
