# Guía de Configuración de Modelos e Endpoints Gratuitos de IA 🤖

Esta guía permite integrar y utilizar endpoints y modelos de IA de acceso gratuito para optimizar el desarrollo del proyecto **PololoSafe** sin modificar el código fuente de la aplicación.

---

## 1. Proveedores y Modelos Recomendados

### A. Google AI Studio (Gratuito)
- **Modelos recomendados:** `gemini-1.5-pro`, `gemini-2.0-flash`
- **Endpoint Base:** `https://generativelanguage.googleapis.com/v1beta`
- **Obtención de API Key:** [Google AI Studio Console](https://aistudio.google.com/)

### B. Groq Cloud (Gratuito y Alta Velocidad)
- **Modelos recomendados:** `qwen-2.5-coder-32b`, `llama-3.3-70b-versatile`
- **Endpoint Base Compatible OpenAI:** `https://api.groq.com/openai/v1`
- **Obtención de API Key:** [Groq Cloud Console](https://console.groq.com/)

### C. OpenRouter (Modelos Gratuitos Unificados)
- **Modelos recomendados:** `qwen/qwen-2.5-coder-32b-instruct:free`, `meta-llama/llama-3.3-70b-instruct:free`
- **Endpoint Base Compatible OpenAI:** `https://openrouter.ai/api/v1`
- **Obtención de API Key:** [OpenRouter Console](https://openrouter.ai/)

### D. Ollama (Local / Offline)
- **Modelo recomendado:** `qwen2.5-coder:7b`
- **Endpoint Local Predeterminado:** `http://localhost:11434/v1`

---

## 2. Pasos para Configurar en el IDE / Asistente

Para utilizar estos modelos dentro de tu entorno de desarrollo sin alterar el código de la app:

1. **Configuración de Variables:**
   - Duplica el archivo `.env.example` ubicado en la raíz del proyecto y renómbralo a `.env`.
   - Coloca las API Keys correspondientes en cada variable (`GEMINI_API_KEY`, `GROQ_API_KEY`, `OPENROUTER_API_KEY`).

2. **Ingreso Manual en la Configuración del IDE / Extensión de Asistente:**
   - Abre el panel de **Ajustes / Settings** de tu extensión de IA o IDE (ej. Continue, Roo Code, Cline, Aider, etc.).
   - En la sección **Custom Provider / OpenAI Compatible**:
     - **Para Groq:** Ingresa Base URL `https://api.groq.com/openai/v1`, ingresa tu `GROQ_API_KEY` y selecciona el modelo `qwen-2.5-coder-32b`.
     - **Para Ollama Local:** Selecciona tipo `Ollama`, ingresa Server URL `http://localhost:11434` y selecciona el modelo `qwen2.5-coder:7b`.
     - **Para OpenRouter:** Ingresa Base URL `https://openrouter.ai/api/v1`, ingresa tu `OPENROUTER_API_KEY` y selecciona `qwen/qwen-2.5-coder-32b-instruct:free`.

---

## 3. Guía para Instalar y Ejecutar Ollama (Soporte Local Offline)

Si deseas utilizar un modelo de desarrollo asistido 100% offline y gratuito en tu equipo:

1. **Descarga e Instalación:**
   - Descarga el instalador de Ollama para Windows desde [ollama.com/download](https://ollama.com/download).

2. **Comandos de Terminal para Descargar e Iniciar el Modelo:**
   ```bash
   # Verificar que Ollama esté instalado correctamente
   ollama --version

   # Descargar e iniciar el modelo especializado en código Qwen 2.5 Coder 7B
   ollama run qwen2.5-coder:7b
   ```

3. **Verificación del Servidor Local:**
   - El servidor de Ollama quedará activo escuchando en: `http://localhost:11434`.

---

## 4. Notas sobre el Código Fuente
*(Conforme a las reglas de seguridad acordadas, no se ha modificado ni eliminado ningún archivo fuente del proyecto. Todos los modelos e integraciones descritos en este documento operan a nivel de herramienta de desarrollo externas al entorno de ejecución de la app).*
