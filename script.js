(() => {
  "use strict";

  document.documentElement.classList.add("js-enabled");

  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navAnchors = navLinks ? navLinks.querySelectorAll("a[href^='#']") : [];

  function closeMenu() {
    if (!menuButton || !navLinks) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("is-open");
  }

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navAnchors.forEach((anchor) => anchor.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) closeMenu();
    });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const sectionLinks = document.querySelectorAll(".nav-links a[href^='#']");
  const sections = Array.from(sectionLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeId = `#${entry.target.id}`;
        sectionLinks.forEach((link) => {
          if (link.getAttribute("href") === activeId) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const sensorDescriptions = {
    pm25: {
      title: "PM2.5 monitoring",
      description: "A proposed particulate input could provide environmental context. It does not establish exposure safety or validated detection."
    },
    uv: {
      title: "UV and IR exposure sensing",
      description: "Proposed ultraviolet and infrared inputs represent radiation-related context. No validated measurements, thresholds, or protective assessment are claimed."
    },
    temperature: {
      title: "Temperature monitoring",
      description: "A proposed temperature input could add context to the system. It is not a thermal hazard evaluation and has no validated threshold."
    },
    imu: {
      title: "Fall and abnormal-motion event concept",
      description: "An IMU could provide illustrative movement and orientation context for exploring event logic. It does not detect injury or infer a person's condition."
    },
    wear: {
      title: "Helmet-wear detection",
      description: "A concept input for exploring whether the helmet is being worn. This interface does not detect actual helmet fit or protective effectiveness."
    },
    alerts: {
      title: "Local LED, vibration, and buzzer alerts",
      description: "Proposed on-device outputs could provide distinct local feedback. This is a conceptual pathway, not a tested alert mechanism."
    }
  };

  const sensorButtons = document.querySelectorAll(".sensor-button, .sensor-hotspot");
  const sensorTitle = document.getElementById("sensor-title");
  const sensorDescription = document.getElementById("sensor-description");
  const sensorIndex = document.querySelector(".detail-index");

  sensorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sensor = sensorDescriptions[button.dataset.sensor];
      if (!sensor || !sensorTitle || !sensorDescription || !sensorIndex) return;
      const sensorNumber = Object.keys(sensorDescriptions).indexOf(button.dataset.sensor) + 1;
      sensorButtons.forEach((item) => {
        const selected = item.dataset.sensor === button.dataset.sensor;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      sensorTitle.textContent = sensor.title;
      sensorDescription.textContent = sensor.description;
      sensorIndex.textContent = `CAPABILITY / ${String(sensorNumber).padStart(2, "0")}`;
    });
  });

  const architecture = document.querySelector(".architecture");
  const pathButtons = document.querySelectorAll(".path-button");
  pathButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const path = button.dataset.path;
      if (!architecture || !path) return;
      architecture.dataset.activePath = path === "all" ? "" : path;
      pathButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    });
  });

  const architectureNodeDescriptions = {
    sensors: {
      title: "Sensor inputs",
      description: "The concept groups PM2.5, UV, IR, temperature, IMU, and helmet-wear inputs. Exact sensors, positions, and specifications are not defined."
    },
    controller: {
      title: "ESP32-S3 controller",
      description: "A proposed controller receives the illustrative sensor inputs and evaluates configured logic before choosing a local or connected path."
    },
    local: {
      title: "Local alerts",
      description: "The proposed on-helmet feedback pathway groups LED indicators, a vibration motor, and a buzzer. It is conceptually separate from gateway or internet availability."
    },
    espnow: {
      title: "ESP-NOW link",
      description: "ESP-NOW is shown as the nearby controller-to-gateway communication link. It is not the gateway's internet connection."
    },
    gateway: {
      title: "Nearby gateway",
      description: "A proposed ESP32 or Raspberry Pi gateway receives events over ESP-NOW and manages the separate dashboard connectivity path."
    },
    storage: {
      title: "SQLite local storage",
      description: "The gateway could store event records locally; storage behavior is a concept and has not been validated."
    },
    dashboard: {
      title: "Supervisor dashboard",
      description: "A web-based view could support helmet-status monitoring and incident review when the gateway's monitoring connection is available."
    }
  };
  const architectureNodes = document.querySelectorAll(".architecture-node");
  const architectureNodeType = document.getElementById("architecture-node-type");
  const architectureNodeTitle = document.getElementById("architecture-node-title");
  const architectureNodeCopy = document.getElementById("architecture-node-copy");

  function selectArchitectureNode(node) {
    const details = architectureNodeDescriptions[node.dataset.node];
    if (!details || !architectureNodeType || !architectureNodeTitle || !architectureNodeCopy) return;
    architectureNodes.forEach((item) => {
      const selected = item === node;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    architectureNodeType.textContent = "SYSTEM NODE / CONCEPT";
    architectureNodeTitle.textContent = details.title;
    architectureNodeCopy.textContent = details.description;
  }

  architectureNodes.forEach((node) => {
    node.addEventListener("click", () => selectArchitectureNode(node));
    node.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      selectArchitectureNode(node);
    });
  });

  const workflowContent = [
    ["Sense the environment", "Illustrative environmental and motion inputs represent air, radiation, temperature, movement, and helmet-wear context."],
    ["Process readings", "The proposed ESP32-S3 controller evaluates example readings against configured logic. No validated thresholds are claimed."],
    ["Alert locally", "Proposed LED indicators, vibration motor, and buzzer provide wearer-side feedback, independently of the dashboard path."],
    ["Communicate nearby", "ESP-NOW is shown carrying event data from the controller to a nearby gateway; it is distinct from internet connectivity."],
    ["Monitor at the gateway", "The gateway could store records in SQLite locally and forward them when connectivity is available. A web dashboard could support helmet-status monitoring and incident review."]
  ];
  const workflowButtons = Array.from(document.querySelectorAll(".workflow-step"));
  const workflowCounter = document.getElementById("workflow-counter");
  const workflowTitle = document.getElementById("workflow-title");
  const workflowDescription = document.getElementById("workflow-description");

  function selectWorkflowStep(index, moveFocus) {
    const content = workflowContent[index];
    if (!content || !workflowTitle || !workflowDescription || !workflowCounter) return;
    workflowButtons.forEach((button, buttonIndex) => {
      const selected = buttonIndex === index;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
      if (selected && moveFocus) button.focus();
    });
    workflowCounter.textContent = `STAGE ${String(index + 1).padStart(2, "0")} / 05`;
    workflowTitle.textContent = content[0];
    workflowDescription.textContent = content[1];
  }

  workflowButtons.forEach((button, index) => {
    button.addEventListener("click", () => selectWorkflowStep(index, false));
    button.addEventListener("keydown", (event) => {
      let nextIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % workflowButtons.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + workflowButtons.length) % workflowButtons.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = workflowButtons.length - 1;
      else return;
      event.preventDefault();
      selectWorkflowStep(nextIndex, true);
    });
  });
  selectWorkflowStep(0, false);

  const simulationForm = document.getElementById("simulation-form");
  const resetButton = document.getElementById("reset-simulation");
  const validationMessage = document.getElementById("sim-validation");
  const simulationState = document.getElementById("simulation-state");
  const inputSummary = document.getElementById("sim-input-summary");
  const processSummary = document.getElementById("sim-process-summary");
  const alertSummary = document.getElementById("sim-alert-summary");
  const alertStage = document.getElementById("local-alert-stage");
  const eventCard = document.querySelector(".gateway-event");
  const eventText = document.getElementById("gateway-event-text");
  const eventTime = document.getElementById("gateway-event-time");
  const connectivityToggle = document.getElementById("connectivity-toggle");
  const connectivityStatus = document.getElementById("connectivity-status");
  let internetAvailable = true;
  let queuedExampleEvents = 0;

  function updateConnectivityStatus() {
    if (!connectivityToggle || !connectivityStatus) return;
    connectivityToggle.setAttribute("aria-pressed", String(internetAvailable));
    connectivityToggle.textContent = `Simulate internet: ${internetAvailable ? "available" : "unavailable"}`;
    connectivityStatus.textContent = internetAvailable
      ? "Gateway view simulated as available · no sample events queued."
      : `Internet unavailable in this demo · ${queuedExampleEvents} illustrative gateway event${queuedExampleEvents === 1 ? "" : "s"} queued locally. Local alerts remain separate conceptually.`;
  }

  if (connectivityToggle) {
    connectivityToggle.addEventListener("click", () => {
      internetAvailable = !internetAvailable;
      if (internetAvailable) queuedExampleEvents = 0;
      updateConnectivityStatus();
    });
    updateConnectivityStatus();
  }

  function fieldNumber(formData, name, label, minimum, maximum, errors) {
    const raw = formData.get(name);
    const value = typeof raw === "string" && raw.trim() !== "" ? Number(raw) : Number.NaN;
    if (!Number.isFinite(value) || value < minimum || value > maximum) {
      errors.push(`${label} must be a number from ${minimum} to ${maximum}.`);
      return null;
    }
    return value;
  }

  function resetSimulationOutput() {
    queuedExampleEvents = 0;
    updateConnectivityStatus();
    if (validationMessage) validationMessage.textContent = "";
    if (simulationState) {
      simulationState.textContent = "AWAITING DEMONSTRATION";
      simulationState.classList.remove("is-alert", "is-clear");
    }
    if (inputSummary) inputSummary.textContent = "Example values ready";
    if (processSummary) processSummary.textContent = "Waiting to compare";
    if (alertSummary) alertSummary.textContent = "No demo run";
    if (alertStage) alertStage.classList.remove("is-alerting");
    if (eventCard) eventCard.classList.remove("has-event");
    if (eventText) eventText.textContent = "Run the demonstration to create a sample event. No data leaves this browser.";
    if (eventTime) eventTime.textContent = "LOCAL PREVIEW ONLY";
  }

  if (simulationForm) {
    simulationForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (validationMessage) validationMessage.textContent = "";
      const formData = new FormData(simulationForm);
      const errors = [];
      const pm25 = fieldNumber(formData, "pm25", "PM2.5 example value", 0, 1000, errors);
      const pm25Threshold = fieldNumber(formData, "pm25Threshold", "PM2.5 example threshold", 0, 1000, errors);
      const temperature = fieldNumber(formData, "temperature", "Temperature example value", -50, 200, errors);
      const temperatureThreshold = fieldNumber(formData, "temperatureThreshold", "Temperature example threshold", -50, 200, errors);
      const uv = fieldNumber(formData, "uv", "UV example value", 0, 100, errors);
      const uvThreshold = fieldNumber(formData, "uvThreshold", "UV example threshold", 0, 100, errors);
      const worn = formData.get("worn");

      if (worn !== "yes" && worn !== "no") errors.push("Select an illustrative helmet-wear state.");
      if (errors.length > 0) {
        if (validationMessage) validationMessage.textContent = errors[0];
        return;
      }

      const exampleTriggers = [];
      if (pm25 >= pm25Threshold) exampleTriggers.push("PM2.5 example comparison");
      if (temperature >= temperatureThreshold) exampleTriggers.push("temperature example comparison");
      if (uv >= uvThreshold) exampleTriggers.push("UV example comparison");
      if (worn === "no") exampleTriggers.push("helmet-wear example state");

      const hasExampleAlert = exampleTriggers.length > 0;
      queuedExampleEvents = internetAvailable ? 0 : 1;
      updateConnectivityStatus();
      if (inputSummary) inputSummary.textContent = `PM ${pm25} · ${temperature}°C · UV ${uv} · ${worn === "yes" ? "worn" : "not worn"}`;
      if (processSummary) processSummary.textContent = hasExampleAlert ? `${exampleTriggers.length} example comparison${exampleTriggers.length === 1 ? "" : "s"} matched` : "No example comparison matched";
      if (alertSummary) alertSummary.textContent = hasExampleAlert ? "Illustrative alert state" : "No illustrative alert";
      if (alertStage) alertStage.classList.toggle("is-alerting", hasExampleAlert);
      if (simulationState) {
        simulationState.textContent = hasExampleAlert ? "EXAMPLE CONDITION MATCHED" : "EXAMPLE VALUES BELOW THRESHOLDS";
        simulationState.classList.toggle("is-alert", hasExampleAlert);
        simulationState.classList.toggle("is-clear", !hasExampleAlert);
      }
      if (eventCard) eventCard.classList.add("has-event");
      if (eventText) {
        const detail = hasExampleAlert ? `Example matches: ${exampleTriggers.join(", ")}.` : "No example comparisons matched the configured thresholds.";
        eventText.textContent = `${detail} Sample event preview only; no data leaves this browser.`;
      }
      if (eventTime) {
        eventTime.textContent = `LOCAL PREVIEW · ${new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date())}`;
      }
    });
  }

  if (resetButton && simulationForm) {
    resetButton.addEventListener("click", () => {
      simulationForm.reset();
      resetSimulationOutput();
      const firstInput = simulationForm.querySelector("input");
      if (firstInput) firstInput.focus();
    });
  }
})();
