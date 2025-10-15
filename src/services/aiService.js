export async function identifyCar(imageBase64) {
  console.log("Imagem recebida:", (imageBase64 || "").substring(0, 30) + "...");

  // Convert base64 to Blob
  function base64ToBlob(base64) {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const blob = base64ToBlob(imageBase64);
  const formData = new FormData();
  formData.append("file", blob, "car.png");

  // Altere a URL para o endpoint do Render
  const response = await fetch("https://cardexbackend.onrender.com/predict", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  let result;
  try {
    result = await response.json();
    console.log("Resposta bruta da API:", result); // <-- log para depuração
  } catch (e) {
    throw new Error("Erro ao fazer parse do JSON da resposta da API");
  }

  if (!result.success || !result.predictions || result.predictions.length === 0) {
    throw new Error("No predictions returned");
  }

  const pred = result.predictions[0];

  // Return the identified car plus an id and the original image so we can persist/display it
  return {
    id: Date.now().toString(),
    marca: pred.brand,
    modelo: pred.model,
    ano: "", // API does not return year
    imagem: imageBase64 || null,
    confianca: typeof pred.confidence === "number" ? pred.confidence : pred.confidence_percent,
  };
}
