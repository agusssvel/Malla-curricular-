const materias = [
  { id: "bio1", nombre: "Intro a Biología Celular y Molecular", abre: ["bio2"] },
  { id: "salud1", nombre: "Salud Pública y Humanidades", abre: ["anato3"] },
  { id: "bioest", nombre: "Intro a Bioestadística", abre: [] },
  { id: "ap1", nombre: "Aprendizaje en Territorio 1", abre: ["ap2"] },
  { id: "bio2", nombre: "Biología Celular y Molecular", abre: ["histo1", "neuro1", "cardio1", "hemato", "anato3"] },
  { id: "ap2", nombre: "Aprendizaje en Territorio 2", abre: ["metod1"] },
  { id: "anato3", nombre: "Anatomía Clínica y Bioética", abre: ["digestivo"] },
  { id: "fisica", nombre: "Biofísica del Músculo y Locomoción", abre: [] },
  { id: "histo1", nombre: "Histología Neuro/Cardio/Respiratorio", abre: [] },
  { id: "neuro1", nombre: "Neurociencias", abre: [] },
  { id: "cardio1", nombre: "Cardiovascular y Respiratorio", abre: [] },
  { id: "digestivo", nombre: "Digestivo/Renal/Endocrino/etc.", abre: [] },
  { id: "hemato", nombre: "Hematología e Inmunología", abre: ["med1", "patobases", "pediatria", "gine"] },
  { id: "metod1", nombre: "Metodología Científica", abre: [] },
  { id: "med1", nombre: "Medicina 1º Nivel de Atención", abre: ["medfam"] },
  { id: "patobases", nombre: "Bases Científicas de la Patología", abre: ["clinicamed", "patotera", "quirurgica", "patoquir"] },
  { id: "gine", nombre: "Ginecología - Neonatología", abre: [] },
  { id: "pediatria", nombre: "Pediatría", abre: [] },
  { id: "clinicamed", nombre: "Clínica Médica", abre: [] },
  { id: "patotera", nombre: "Patología Médica y Terapéutica", abre: [] },
  { id: "quirurgica", nombre: "Clínica Quirúrgica", abre: [] },
  { id: "patoquir", nombre: "Patología Quirúrgica", abre: [] },
  { id: "medfam", nombre: "Medicina Familiar y Comunitaria", abre: ["metod2"] },
  { id: "metod2", nombre: "Metodología Científica II", abre: ["internado"] },
  { id: "internado", nombre: "Internado Rotatorio", abre: [] },
];

const estadoMaterias = {};
materias.forEach(m => estadoMaterias[m.id] = false);

function renderMalla() {
  const cont = document.getElementById("malla");
  cont.innerHTML = "";
  materias.forEach(m => {
    const div = document.createElement("div");
    div.classList.add("materia");
    div.textContent = m.nombre;

    if (estadoMaterias[m.id]) {
      div.classList.add("approved");
    } else if (!materiaDesbloqueada(m.id)) {
      div.classList.add("locked");
    }

    div.onclick = () => aprobarMateria(m.id);
    cont.appendChild(div);
  });
}

function aprobarMateria(id) {
  if (estadoMaterias[id]) return;
  if (!materiaDesbloqueada(id)) return;

  estadoMaterias[id] = true;
  const desbloquea = materias.find(m => m.id === id)?.abre || [];
  desbloquea.forEach(dep => {
    if (!estadoMaterias[dep]) estadoMaterias[dep] = false;
  });

  renderMalla();
}

function materiaDesbloqueada(id) {
  const requisitos = materias.filter(m => m.abre.includes(id));
  if (requisitos.length === 0) return true;
  return requisitos.every(m => estadoMaterias[m.id]);
}

renderMalla();
