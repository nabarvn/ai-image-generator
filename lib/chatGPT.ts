const promptSuggestion = async () => {
  const response = await fetch("/api/getSuggestion", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return response.json();
};

export default promptSuggestion;
