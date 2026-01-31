import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req) {
        try {
                const body = await req.json();
                const { prompt } = body;

                if (!process.env.GOOGLE_API_KEY) {
                        // Fallback if no key is present, just return the original prompt
                        return NextResponse.json({ enhancedPrompt: prompt });
                }

                const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
                const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

                const systemInstruction = `You are an expert art director. 
    Take the user's input and rewrite it into a detailed, cinematic image generation prompt. 
    Focus on lighting, mood, composition, and style. 
    Keep it under 40 words. 
    Return ONLY the prompt text.`;

                const result = await model.generateContent(`${systemInstruction}\n\nUser Input: ${prompt}`);
                const response = await result.response;
                const enhancedPrompt = response.text().trim();

                return NextResponse.json({ enhancedPrompt });
        } catch (error) {
                console.error('Error enhancing prompt:', error);
                // Fallback to original prompt on error
                return NextResponse.json({ enhancedPrompt: body.prompt || '' });
        }
}
