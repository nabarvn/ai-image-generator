export const config = {
  runtime: "edge",
};

export async function GET(request: Request) {
  // Connect to Microsoft Azure Function endpoint
  const response = await fetch(
    `${process.env.FUNCTION_APP_URL}/api/getpromptsuggestion`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
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

  return new Response(JSON.stringify(textResponse.trim()), {
    status: 200,
  });
}
