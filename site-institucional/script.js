const WHATSAPP_NUMBER = "244941082712";
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menuToggle.textContent = open ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));
}
const form = document.getElementById("enrolForm");
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      "Olá, LBA Academia de Xadrez! Gostaria de solicitar informações sobre a formação.",
      "",
      "Nome: " + data.get("studentName"),
      "Idade do aluno: " + data.get("studentAge"),
      "Tipo de formação: " + data.get("program"),
      "Modalidade: " + data.get("modality"),
      "Informação adicional: " + (data.get("message") || "Não indicada"),
      "",
      "Aguardo o vosso contacto. Obrigado(a)."
    ].join("\n");
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener,noreferrer");
  });
}
document.getElementById("year").textContent = new Date().getFullYear();