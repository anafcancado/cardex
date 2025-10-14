export async function identifyCar(imageBase64) {
  console.log("Imagem recebida:", (imageBase64 || "").substring(0, 30) + "...");

  // Simulando um tempo de processamento
  await new Promise((r) => setTimeout(r, 800));

  // Retorno fake (poderia vir de um modelo real)
  const carros = [
    { marca: "Tesla", modelo: "Model 3", ano: "2021" },
    { marca: "Toyota", modelo: "Corolla", ano: "2020" },
    { marca: "Ford", modelo: "Mustang", ano: "2019" },
    { marca: "Chevrolet", modelo: "Camaro", ano: "2022" },
  ];

  const chosen = carros[Math.floor(Math.random() * carros.length)];

  // Return the identified car plus an id and the original image so we can persist/display it
  return {
    id: Date.now().toString(),
    ...chosen,
    imagem: imageBase64 || null,
  };
}
