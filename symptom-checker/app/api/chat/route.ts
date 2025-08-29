// app/api/chat/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    // Call local Ollama API
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        messages: [{ role: "user", content: message }],
        stream: false,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Ollama API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Ollama returns { message: { role, content } }
    return NextResponse.json({
      reply: data.message?.content ?? "No reply",
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Ollama" },
      { status: 500 }
    );
  }
}
