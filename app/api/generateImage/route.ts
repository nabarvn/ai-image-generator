import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function POST(request: Request) {
  const data = await request.json();
  const prompt = data.prompt;

  // Connect to Microsoft Azure Function endpoint
  const response = await fetch(
    `${process.env.FUNCTION_APP_URL}/api/generateimage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ prompt }),
    }
  ).catch((error: Error) => {
    console.error(error);

    return new Response(JSON.stringify({ response: "Internal server error" }), {
      status: 500,
    });
  });

  if (!response) {
    return new Response(JSON.stringify({ response: "Failed to fetch data" }), {
      status: 400,
    });
  }

  const textResponse = await response.text();

  return NextResponse.json(textResponse);
}
