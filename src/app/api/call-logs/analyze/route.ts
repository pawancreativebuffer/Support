import { NextRequest, NextResponse } from 'next/server';
import { postgresPrisma } from '@/lib/postgresDb';

export async function POST(req: NextRequest) {
  try {
    const { callLogId } = await req.json();

    if (!callLogId) {
      return NextResponse.json({ error: 'callLogId is required' }, { status: 400 });
    }

    if (!postgresPrisma) {
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
    }

    // Fetch the call log
    const callLog = await postgresPrisma.callLog.findUnique({
      where: { id: Number(callLogId) },
      include: { customer: true }
    });

    if (!callLog) {
      return NextResponse.json({ error: 'Call log not found' }, { status: 404 });
    }

    // If it already has an AI analysis, return it directly
    if (callLog.aiAnalysis) {
      return NextResponse.json({
        analysis: callLog.aiAnalysis,
        callLog: {
          id: callLog.id,
          callerNumber: callLog.callerNumber,
          createdAt: callLog.createdAt,
          customer: callLog.customer,
          transcript: callLog.transcript
        }
      });
    }

    const transcript = callLog.transcript;
    if (!transcript || transcript.length < 20) {
      return NextResponse.json({ error: 'Transcript is too short or empty for analysis.' }, { status: 400 });
    }

    // Call Gemini API to analyze the transcript
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured.' }, { status: 500 });
    }

    const systemPrompt = `You are an expert Call Center Quality Assurance (QA) AI. 
Analyze the provided customer support transcript and return a highly detailed JSON object with the exact structure below. 
You must provide in-depth analysis. Do not include any markdown formatting, only pure JSON.

{
  "customerQuery": "A clear, detailed description of exactly what the customer was trying to achieve or resolve.",
  "issueCategory": "Category of the issue (e.g., Billing, Technical, Sales)",
  "resolutionStatus": "MUST be exactly one of: Resolved, Pending, Escalated, Follow-up Required, or N/A",
  "priority": "MUST be exactly one of: Low, Medium, High, Critical, or N/A",
  "csatScore": "Estimated CSAT Score from 1 to 10 based on customer satisfaction. You MUST estimate a number if there is any dialogue. Only use 'N/A' if the transcript is completely empty.",
  "csatPercentage": "Customer Satisfaction as a percentage (0-100) (no percent sign). You MUST estimate a number based on sentiment. Only use 'N/A' if completely empty.",
  "sentiment": "MUST be exactly one of: Positive, Neutral, Negative, or N/A",
  "agentPerformance": "A deep, detailed evaluation of the agent's performance, empathy, problem-solving skills, and areas for improvement (at least 3-4 sentences).",
  "churnRisk": "MUST be exactly one of: Low, Medium, High, or N/A",
  "churnProbability": "Number from 0 to 100 (no percent sign), or 'N/A'",
  "retentionStrategy": "What specific actions or offers can the company use to bring this customer back or make them completely happy? (1-2 sentences)",
  "aiSummary": "A comprehensive, highly detailed summary of the entire conversation from start to finish. Include key events, customer pain points, and how the agent responded (at least 3-4 sentences).",
  "actionItems": ["List of detailed, specific pending action items or next steps. Provide full context for each action item."],
  "suggestedEmail": "A ready-to-send follow-up email draft to the customer based on the conversation.",
  "customerName": "Extract the customer's name or company name from the transcript if they mention it (e.g., 'Pawan Office'). If they don't, return 'Unknown Caller'."
}`;

    const promptText = `Transcript:\n\n${transcript}`;

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt + "\n\n" + promptText }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      })
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.error("Gemini API Error:", err);
      return NextResponse.json({ error: 'Failed to analyze transcript using AI.' }, { status: 500 });
    }

    const data = await geminiRes.json();
    let analysisJson = null;

    try {
      const aiText = data.candidates[0].content.parts[0].text;
      analysisJson = JSON.parse(aiText);
    } catch (e) {
      console.error("Failed to parse Gemini JSON:", e);
      return NextResponse.json({ error: 'Failed to parse AI response.' }, { status: 500 });
    }

    // Save the analysis in Postgres
    if (postgresPrisma) {
      await postgresPrisma.callLog.update({
        where: { id: Number(callLogId) },
        data: {
          aiAnalysis: analysisJson
        }
      });
    }

    return NextResponse.json({
      analysis: analysisJson,
      callLog: {
        id: callLog.id,
        callerNumber: callLog.callerNumber,
        createdAt: callLog.createdAt,
        customer: callLog.customer,
        transcript: callLog.transcript
      }
    });

  } catch (error) {
    console.error("Error in AI Analysis:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
