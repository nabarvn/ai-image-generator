const fetchImages = async () => {
  const response = await fetch("/api/getImages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return response.json();
};

export default fetchImages;
