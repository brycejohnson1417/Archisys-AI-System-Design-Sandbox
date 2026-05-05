# Archisys AI System Design Sandbox

Archisys is an AI-powered system-design sandbox. It lets a user sketch architecture ideas and receive structured critique on reliability, scalability, security, and tradeoffs.

View the AI Studio prototype: https://ai.studio/apps/30324eb0-f0a1-4972-9bbf-f1e10dfe36a7

## What It Explores

- Visual system-design thinking instead of plain text prompting.
- Architecture review as an interactive workflow.
- Failure-mode and tradeoff analysis for early technical plans.
- How AI critique can become more useful when tied to visible components.

## Technical Notes

- React and Vite frontend.
- React Flow through `@xyflow/react`.
- Gemini API integration through `@google/genai`.
- framer-motion, clsx, tailwind-merge, and lucide-react for UI polish.

## Current Status

This is a prototype source repo. It is useful as a system-design interaction sandbox, but production use would require stronger factual grounding, import/export, versioned diagrams, review scoring calibration, and clearer limits around AI-generated critique.

## Run Locally

Prerequisite: Node.js.

1. Install dependencies:
   `npm install`
2. Create `.env.local` and add your own Gemini API key.
3. Run the app:
   `npm run dev`

## API Key Boundary

Do not deploy this Vite app with a private Gemini key embedded into browser JavaScript. If deploying outside AI Studio, use a server-side API route or an explicit visitor-provided key flow.

## AI-Assisted Build Note

This prototype was built with AI assistance. The important work is the review model: turning architecture critique into a visible workflow with explicit failure modes, not treating generated feedback as automatically correct.

## Related Public Notes

See the combined prototype overview repo: https://github.com/brycejohnson1417/ai-studio-prototype-overviews
