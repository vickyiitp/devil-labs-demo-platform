import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Invalid query parameter" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY environment variable is missing" }, { status: 500 });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemPrompt = `You are NEXA AI, Chief Materials & Mechanical Engineering Consultant for NEXA INDUSTRIES.
Analyze the user's B2B manufacturing inquiry (e.g. environment, temperature, pressure, stress loads, corrosion risk, industry standards) and provide a structured technical recommendation from NEXA's precision engineering product catalog.

NEXA Product Families include:
- NEXA-X1 Superalloy Turbomachinery Rotor (Inconel 718 / Monel 400)
- NEXA-VALVE High-Pressure Cryogenic Manifold (Duplex 2205 Stainless / Hastelloy C-276)
- NEXA-HYDRA Heavy Duty Hydro-Mechanical Cylinder (4340 Alloy Steel Nitrided)
- NEXA-GEAR Zero-Backlash Planetary Transmission (Case-Hardened 9310 Steel)
- NEXA-SENSE Hermetic Smart Sensor Housing (Titanium Grade 5 / Sapphire Glass Window)

Ensure high precision engineering metrics, micro-tolerances (Ra 0.1-0.4µm), certifications (ISO 9001:2015, AS9100D, IATF 16949), and authoritative rationale.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Buyer Query: "${query}"`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedPartNumber: { type: Type.STRING },
            productName: { type: Type.STRING },
            primaryMaterial: { type: Type.STRING },
            secondaryAlloys: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            specifications: {
              type: Type.OBJECT,
              properties: {
                maxPressure: { type: Type.STRING },
                temperatureRating: { type: Type.STRING },
                surfaceTolerance: { type: Type.STRING },
                tensileStrength: { type: Type.STRING },
              },
              required: ["maxPressure", "temperatureRating", "surfaceTolerance", "tensileStrength"],
            },
            certifications: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            engineeringRationale: { type: Type.STRING },
            estimatedLeadTime: { type: Type.STRING },
            estimatedUnitPrice: { type: Type.STRING },
            suggestedApplications: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: [
            "recommendedPartNumber",
            "productName",
            "primaryMaterial",
            "specifications",
            "certifications",
            "engineeringRationale",
            "estimatedLeadTime",
            "estimatedUnitPrice",
          ],
        },
      },
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);

    return NextResponse.json({ success: true, recommendation: data });
  } catch (error: any) {
    console.error("Gemini API Recommendation Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}
