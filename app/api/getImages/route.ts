export async function GET(request: Request) {
  // Connect to Microsoft Azure Function endpoint
  const response = await fetch(
    `${process.env.FUNCTION_APP_URL}/api/getimages`,
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

  const blobData = await response.blob();
  const textData = await blobData.text();

  const data = JSON.parse(textData);

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
