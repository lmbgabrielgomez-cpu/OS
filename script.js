// ── RELOJ EN TIEMPO REAL ──────────────────────────
function updateTime() {
  document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

// ── ABRIR / CERRAR VENTANA ────────────────────────
var welcomeScreen      = document.querySelector("#welcome");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen  = document.querySelector("#welcomeopen");

function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "flex";
}

welcomeScreenClose.addEventListener("click", function () {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function () {
  openWindow(welcomeScreen);
});

// ── VENTANA ARRASTRABLE ───────────────────────────
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("diario"));
dragElement(document.getElementById("proyectos"));
dragElement(document.getElementById("chat"));
dragElement(document.getElementById("galeria"));
dragElement(document.getElementById("musica"));
dragElement(document.getElementById("config"));

function dragElement(element) {
  var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = whileDragging;
  }

  function whileDragging(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top  = (element.offsetTop  - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup   = null;
    document.onmousemove = null;
  }
}

// ── APP Y NOTAS ───────────────────────────────────
var selectedIcon = undefined;
var selectedEntry = undefined;
var biggestIndex = 2;

var diaryScreen     = document.querySelector("#diario");
var diaryClose      = document.querySelector("#diarioclose");
var diaryIcon       = document.querySelector("#iconDiario");
var projectScreen   = document.querySelector("#proyectos");
var projectClose    = document.querySelector("#proyectosclose");
var projectIcon     = document.querySelector("#iconProyectos");
var topBar          = document.querySelector("#topbar");

var content = [
  {
    title: "Amanecer en la Mina",
    date: "20/06/2026",
    body: `<p>Las primeras horas del día tienen un brillo especial cuando la mina despierta.</p>
           <p class="nota-highlight">El aire fresco y la luz dorada siempre me inspiran.</p>
           <blockquote>La mejor herramienta es la paciencia.</blockquote>
           <p>Hoy revisé el mapa y encontré una veta nueva de rocas brillantes.</p>`
  },
  {
    title: "Música de Aventura",
    date: "19/06/2026",
    body: `<p>Escuché algunas canciones nuevas mientras trabajaba.</p>
           <p class="nota-highlight">Las notas me ayudan a mantener el ritmo del día.</p>
           <blockquote>La mejor parte de minar es la música de fondo.</blockquote>
           <p>Quiero probar una lista de reproducción más suave para las horas quietas.</p>`
  },
  {
    title: "Recetas y Energía",
    date: "18/06/2026",
    body: `<p>Probé una bebida energética casera con miel y jengibre.</p>
           <p class="nota-highlight">Una buena receta siempre hace la faena más llevadera.</p>
           <blockquote>Cuida tu cuerpo, trabaja mejor.</blockquote>
           <p>También preparé pan integral mientras esperaba que el equipo completara la excavación.</p>`
  }
];

function handleIconTap(element, windowId) {
  if (selectedIcon === element) {
    deselectIcon(element);
    closeWindow(document.querySelector("#" + windowId));
    return;
  }

  if (selectedIcon) {
    deselectIcon(selectedIcon);
  }

  selectIcon(element);
  openWindow(document.querySelector("#" + windowId));
}

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
}

function deselectIcon(element) {
  if (!element) return;
  element.classList.remove("selected");
  selectedIcon = undefined;
}

function bringToFront(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function openWindow(element) {
  element.style.display = "flex";
  bringToFront(element);
}

function closeWindow(element) {
  element.style.display = "none";
}

function initializeDiary() {
  var sidebar = document.querySelector("#sidebar");
  sidebar.innerHTML = "<p class='sidebar-titulo'>📋 Entradas</p>";

  for (let i = 0; i < content.length; i++) {
    addSidebarEntry(i, sidebar);
  }
}

function addSidebarEntry(index, sidebar) {
  var note = content[index];
  var entry = document.createElement("div");
  entry.className = "sidebar-entry";
  entry.innerHTML = `<p>${note.title}</p><div class='sidebar-date'>${note.date}</div>`;
  entry.addEventListener("click", function () {
    selectEntry(entry, index);
  });
  sidebar.appendChild(entry);
}

function selectEntry(entry, index) {
  if (selectedEntry) {
    selectedEntry.classList.remove("selected");
  }
  entry.classList.add("selected");
  selectedEntry = entry;
  setDiaryContent(index);
}

function setDiaryContent(index) {
  var note = content[index];
  var display = document.querySelector("#notaContenido");
  display.innerHTML = `
    <h2>${note.title}</h2>
    <div class="nota-fecha">${note.date}</div>
    ${note.body}
  `;
}

var projects = [
  {
    title: "Mapeo de Ideas",
    category: "Creatividad",
    subtitle: "Organizar mi flujo creativo",
    description: "Una mini app donde guardo notas rápidas, pensamientos y bocetos para futuros proyectos.",
    tags: ["Idea", "Notas", "Ritual"],
    details: `<p>Este proyecto es una forma de guardar pensamientos mientras trabajo en nuevas ideas.</p>
              <p>Me ayuda a mantener un registro de conceptos y explorar qué podría construir después.</p>`,
    link: "https://example.com/ideas"
  },
  {
    title: "Pokedex Personal",
    category: "Educación",
    subtitle: "Aprendiendo con datos interactivos",
    description: "Una guía de recursos y aprendizajes que voy recopilando en mi camino de programación.",
    tags: ["Aprendizaje", "JS", "Visual"],
    details: `<p>En este proyecto almaceno cosas que quiero estudiar y recursos útiles.</p>
              <p>Incluye enlaces a cursos, herramientas y ideas para practicar código.</p>`,
    link: "https://example.com/learning"
  },
  {
    title: "Guía de Mundos",
    category: "Entretenimiento",
    subtitle: "Mis lugares favoritos dentro de mis juegos",
    description: "Notas sobre mundos, misiones y descubrimientos en los juegos que disfruto.",
    tags: ["Juegos", "Mundo", "Aventura"],
    details: `<p>Este proyecto es un archivo de los mejores momentos dentro de los juegos que juego.</p>
              <p>Guardo mis descubrimientos, estrategias y lugares favoritos para volver a explorarlos.</p>`,
    link: "https://example.com/games"
  }
];

var selectedProjectCard = undefined;
var activeProjectFilter = "Todas";

function initializeProjects() {
  renderProjectFilters();
  renderProjectGrid(projects);
  updateProjectCount(projects.length);
  addProjectSearchListener();
}

function renderProjectFilters() {
  var categories = ["Todas"];
  projects.forEach(function (project) {
    if (!categories.includes(project.category)) {
      categories.push(project.category);
    }
  });

  var container = document.querySelector("#categoryFilters");
  container.innerHTML = "";

  categories.forEach(function (category) {
    var button = document.createElement("button");
    button.className = "filter-button" + (category === activeProjectFilter ? " selected" : "");
    button.textContent = category;
    button.addEventListener("click", function () {
      activeProjectFilter = category;
      renderProjectFilters();
      updateProjectList();
    });
    container.appendChild(button);
  });
}

function addProjectSearchListener() {
  var search = document.querySelector("#projectSearch");
  search.addEventListener("input", function () {
    updateProjectList();
  });
}

function updateProjectList() {
  var query = document.querySelector("#projectSearch").value.toLowerCase();
  var filtered = projects.filter(function (project) {
    var matchesFilter = activeProjectFilter === "Todas" || project.category === activeProjectFilter;
    var matchesQuery = project.title.toLowerCase().includes(query) || project.description.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });
  renderProjectGrid(filtered);
  updateProjectCount(filtered.length);
}

function renderProjectGrid(list) {
  var grid = document.querySelector("#projectGrid");
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = "<div class='project-count'>No se encontraron proyectos.</div>";
    document.querySelector("#projectDetail").innerHTML = "<p class='project-detail-empty'>Selecciona otro filtro o busca algo distinto.</p>";
    selectedProjectCard = undefined;
    return;
  }

  list.forEach(function (project, index) {
    var card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.subtitle}</p>
      <div class="project-tags">
        ${project.tags.map(function (tag) { return `<span class='tag'>${tag}</span>`; }).join("")}
      </div>
    `;
    card.addEventListener("click", function () {
      selectProject(project, card);
    });
    grid.appendChild(card);
  });
}

function selectProject(project, card) {
  if (selectedProjectCard) {
    selectedProjectCard.classList.remove("selected");
  }
  card.classList.add("selected");
  selectedProjectCard = card;
  showProjectDetail(project);
}

function showProjectDetail(project) {
  var detail = document.querySelector("#projectDetail");
  detail.innerHTML = `
    <h2>${project.title}</h2>
    <div class="subtitle">${project.category} · ${project.tags.join(" · ")}</div>
    <p class="description">${project.description}</p>
    ${project.details}
    <a class="project-link" href="${project.link}" target="_blank">Abrir proyecto</a>
  `;
}

function updateProjectCount(count) {
  document.querySelector("#projectCount").textContent = count + " proyecto(s) encontrados";
}

diaryClose.addEventListener("click", function () {
  closeWindow(diaryScreen);
  deselectIcon(diaryIcon);
});

projectClose.addEventListener("click", function () {
  closeWindow(projectScreen);
  deselectIcon(projectIcon);
});

// ── CHAT APP ──
var chatScreen = document.querySelector("#chat");
var chatClose = document.querySelector("#chatclose");
var chatIcon = document.querySelector("#iconChat");
var chatMessages = document.querySelector("#chatMessages");
var chatInput = document.querySelector("#chatInput");
var chatSendBtn = document.querySelector(".chat-send-btn");

chatClose.addEventListener("click", function () {
  closeWindow(chatScreen);
  deselectIcon(chatIcon);
});

chatSendBtn.addEventListener("click", function () {
  sendChatMessage();
});

chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendChatMessage();
});

function sendChatMessage() {
  var msg = chatInput.value.trim();
  if (!msg) return;
  
  var userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = msg;
  chatMessages.appendChild(userMsg);
  
  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  setTimeout(function () {
    var botMsg = document.createElement("div");
    botMsg.className = "message bot";
    botMsg.textContent = "¡Interesante! Cuéntame más sobre esto.";
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 500);
}

// ── GALERÍA APP ──
var galeriaScreen = document.querySelector("#galeria");
var galeriaClose = document.querySelector("#galeriaclose");
var galeriaIcon = document.querySelector("#iconGaleria");

galeriaClose.addEventListener("click", function () {
  closeWindow(galeriaScreen);
  deselectIcon(galeriaIcon);
});

function initializeGaleria() {
  var items = ["🏔️", "🌅", "🎮", "💻", "🎨", "📚", "🎭", "🚀", "🌙"];
  var grid = document.querySelector("#galleryGrid");
  
  items.forEach(function (item) {
    var card = document.createElement("div");
    card.className = "gallery-item";
    card.textContent = item;
    grid.appendChild(card);
  });
}

// ── MÚSICA APP ──
var musicaScreen = document.querySelector("#musica");
var musicaClose = document.querySelector("#musicaclose");
var musicaIcon = document.querySelector("#iconMusica");

musicaClose.addEventListener("click", function () {
  closeWindow(musicaScreen);
  deselectIcon(musicaIcon);
});

function initializeMusica() {
  var nowPlaying = document.querySelector("#nowPlaying");
  nowPlaying.innerHTML = `
    <div style="font-size:24px; margin-bottom:10px;">🎧</div>
    <h3>Álvaro Díaz — OMAKASE</h3>
    <p>Escuchando en vivo...</p>
  `;
  
  var playlist = document.querySelector("#playlist");
  var canciones = [
    "🎵 OMAKASE",
    "🎵 TITÍ",
    "🎵 UN x100TO",
    "🎵 DAKITI"
  ];
  
  canciones.forEach(function (cancion) {
    var item = document.createElement("div");
    item.className = "playlist-item";
    item.textContent = cancion;
    playlist.appendChild(item);
  });
}

// ── CONFIG APP ──
var configScreen = document.querySelector("#config");
var configClose = document.querySelector("#configclose");
var configIcon = document.querySelector("#iconConfig");

configClose.addEventListener("click", function () {
  closeWindow(configScreen);
  deselectIcon(configIcon);
});

initializeDiary();
initializeProjects();
initializeGaleria();
initializeMusica();
