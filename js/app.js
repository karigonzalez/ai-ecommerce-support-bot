/* ==========================================
   MOTOR DEL CHATBOT E-COMMERCE & GEMINI AI
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const messagesContainer = document.getElementById('messagesContainer');
    const typingIndicator = document.getElementById('typingIndicator');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const saveKeyBtn = document.getElementById('saveKeyBtn');
    const keyStatusText = document.getElementById('keyStatusText');
    const aiModeIndicator = document.getElementById('aiModeIndicator');
    const clearChatBtn = document.getElementById('clearChatBtn');

    // Estado global de la API Key
    let geminiApiKey = localStorage.getItem('gemini_api_key') || '';

    // Inicializar estado de API Key si existe
    if (geminiApiKey) {
        apiKeyInput.value = geminiApiKey;
        updateKeyStatusUI(true);
    }

    // Guardar o actualizar API Key
    saveKeyBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
            geminiApiKey = key;
            localStorage.setItem('gemini_api_key', key);
            updateKeyStatusUI(true);
            appendBotMessage("✨ **¡API Key de Gemini guardada correctamente!** Ahora puedo responder consultas complejas con Inteligencia Artificial avanzada.");
        } else {
            geminiApiKey = '';
            localStorage.removeItem('gemini_api_key');
            updateKeyStatusUI(false);
            appendBotMessage("ℹ️ Clave eliminada. Operando en modo Base de Conocimientos local.");
        }
    });

    // Actualizar indicador de estado
    function updateKeyStatusUI(hasKey) {
        if (hasKey) {
            keyStatusText.textContent = "✅ API Key configurada. Modo IA Activo.";
            keyStatusText.style.color = "#10b981";
            aiModeIndicator.innerHTML = '<i class="fa-solid fa-sparkles"></i> Modo: Inteligencia Artificial Activa';
            aiModeIndicator.style.backgroundColor = "#e0e7ff";
            aiModeIndicator.style.color = "#4338ca";
        } else {
            keyStatusText.textContent = "Sin clave API (Operando en modo Base de Conocimiento local).";
            keyStatusText.style.color = "#f59e0b";
            aiModeIndicator.innerHTML = '<i class="fa-solid fa-database"></i> Modo: Base de Conocimientos Local';
            aiModeIndicator.style.backgroundColor = "#e2e8f0";
            aiModeIndicator.style.color = "#334155";
        }
    }

    // Enviar mensaje en el formulario
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        handleUserMessage(text);
        userInput.value = '';
    });

    // Evento para botones de sugerencia rápida (pills & topics)
    document.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.pill-btn, .topic-item-btn');
        if (targetBtn) {
            const query = targetBtn.getAttribute('data-query');
            if (query) {
                handleUserMessage(query);
            }
        }
    });

    // Procesar mensaje del usuario
    async function handleUserMessage(query) {
        appendUserMessage(query);
        showTypingIndicator();

        // 1. Intentar responder primero con la Base de Conocimiento local
        const localAnswer = searchKnowledgeBase(query);

        if (localAnswer) {
            setTimeout(() => {
                hideTypingIndicator();
                appendBotMessage(localAnswer);
            }, 600);
            return;
        }

        // 2. Si hay API Key de Gemini, enviar consulta a la IA
        if (geminiApiKey) {
            try {
                const aiResponse = await callGeminiAPI(query, geminiApiKey);
                hideTypingIndicator();
                appendBotMessage(aiResponse);
            } catch (error) {
                console.error("Error al consultar Gemini:", error);
                hideTypingIndicator();
                appendBotMessage("⚠️ Ocurrió un error al conectar con la IA de Gemini. Por favor verifica tu API Key o intenta nuevamente.");
            }
            return;
        }

        // 3. Respuesta por defecto si no hay coincidencia local ni API Key
        setTimeout(() => {
            hideTypingIndicator();
            appendBotMessage("🤖 No encontré una respuesta exacta en la base local para esa consulta.<br><br>💡 *Tip:* Puedes agregar tu **API Key de Gemini** en el panel lateral para activar respuestas con Inteligencia Artificial avanzada.");
        }, 800);
    }

    // Agregar mensaje del usuario a la pantalla
    function appendUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user-message';
        msgDiv.innerHTML = `
            <div class="message-avatar"><i class="fa-solid fa-user"></i></div>
            <div class="message-content"><p>${escapeHTML(text)}</p></div>
        `;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    // Agregar mensaje del bot a la pantalla
    function appendBotMessage(htmlContent) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message';
        msgDiv.innerHTML = `
            <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="message-content"><p>${htmlContent}</p></div>
        `;
        messagesContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    // Indicador de escritura
    function showTypingIndicator() {
        typingIndicator.style.display = 'flex';
        scrollToBottom();
    }

    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    // Reiniciar conversación
    clearChatBtn.addEventListener('click', () => {
        messagesContainer.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="message-content">
                    <p>¡Conversación reiniciada! 👋 ¿En qué puedo ayudarte hoy?</p>
                    <div class="quick-pills">
                        <button class="pill-btn" data-query="¿Cuál es el costo de envío?">🚚 Costos de Envío</button>
                        <button class="pill-btn" data-query="¿Cómo rastrear mi orden?">📦 Rastreo de Pedido</button>
                    </div>
                </div>
            </div>
        `;
    });

    // Llamada a la API de Google Gemini (gemini-1.5-flash)
    async function callGeminiAPI(promptText, apiKey) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const systemPrompt = "Eres un asistente virtual experto en soporte al cliente para la tienda e-commerce TechStore. Responde de forma amable, clara, breve y concisa en formato texto con saltos de línea legibles.";

        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: `${systemPrompt}\n\nConsulta del cliente: ${promptText}` }
                    ]
                }
            ]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error API HTTP: ${response.status}`);
        }

        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        return candidateText 
            ? candidateText.replace(/\n/g, '<br>')
            : "No pude procesar la respuesta de la IA.";
    }
});