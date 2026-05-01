import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ArchitectureReview {
  summary: string;
  score: number;
  bottlenecks: string[];
  securityConcerns: string[];
  scalingAdvice: string[];
}

export const analyzeArchitecture = async (nodes: any[], edges: any[]): Promise<ArchitectureReview> => {
  const model = 'gemini-3.1-pro-preview';

  const systemPrompt = `You are a Staff Cloud Architect. Your job is to provide an unvarnished, expert critique of a system architecture. 
The user will provide a graph of nodes (infrastructure components) and edges (connections).
Evaluate the architecture for:
1. Single points of failure (e.g. single database instance, missing load balancers).
2. Scalability bottlenecks (e.g. missing caches, synchronous message passing).
3. Security risks (e.g. clients connecting directly to databases).
4. Overall robustness.

Respond strictly in the requested JSON format. Be critical and professional. Use engineering terminology. Note that if the architecture makes zero contextual sense, point that out clearly.`;

  const input = JSON.stringify({ nodes, edges }, null, 2);

  const response = await ai.models.generateContent({
    model,
    contents: `Please review this architecture layout. Evaluate connections and missing components.\n\nGraph Input:\n${input}`,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.STRING,
            description: "A high-level 2-3 sentence overview of the architecture's strengths and its most glaring flaws."
          },
          score: {
            type: Type.NUMBER,
            description: "An overall architecture score from 0 to 100 based on standard well-architected framework principles. Be harsh if needed."
          },
          bottlenecks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of critical bottlenecks or single points of failure."
          },
          securityConcerns: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of security vulnerabilities in this specific layout (e.g., untrusted network boundaries)."
          },
          scalingAdvice: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Specific tactical advice on how to correctly evolve this architecture."
          }
        },
        required: ["summary", "score", "bottlenecks", "securityConcerns", "scalingAdvice"]
      }
    }
  });

  try {
    const rawText = response.text || "{}";
    return JSON.parse(rawText) as ArchitectureReview;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Failed to parse architecture review");
  }
};
