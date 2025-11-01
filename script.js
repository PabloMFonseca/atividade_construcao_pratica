// Carregar produtos
async function carregarProdutos() {
  try {
    const res = await fetch("/api/produtos");
    const produtos = await res.json();
    const container = document.getElementById("produtos");

    produtos.forEach((p) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${p.imagem}" alt="${p.nome}">
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <strong>R$ ${p.preco.toFixed(2)}</strong>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}

// Enviar inscrição
document.getElementById("formInscricao").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("mensagem");

  // validação
  const emailValido = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailValido.test(email)) {
    msg.textContent = "Digite um e-mail válido!";
    msg.style.color = "red";
    return;
  }

  try {
    const res = await fetch("/api/inscricao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email_inscrito: email }),
    });

    const data = await res.json();
    msg.textContent = data.message;
    msg.style.color = res.ok ? "green" : "red";
    if (res.ok) e.target.reset();
  } catch (error) {
    msg.textContent = "Erro ao conectar com o servidor.";
    msg.style.color = "red";
  }
});

carregarProdutos();
