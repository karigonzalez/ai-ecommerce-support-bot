# 🤖 SupportBot AI — Chatbot Inteligente de Atención al Cliente para E-Commerce

![Versión](https://img.shields.io/badge/Versi%C3%B3n-1.0.0-teal)
![Estado](https://img.shields.io/badge/Estado-Activo-brightgreen)
![Nicho](https://img.shields.io/badge/Tecnolog%C3%ADa-IA%20%26%20E--commerce-purple)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)

Bienvenido/a al repositorio oficial de **SupportBot AI**, una aplicación web interactiva desarrollada por **Yeiny Karine Gonzalez Cifuentes**. Funciona como un widget de chat de soporte automatizado 24/7 para tiendas virtuales, combinando una base de conocimientos local de respuesta inmediata con la API de **Google Gemini AI** para resolver consultas complejas sobre envíos, pagos, seguimiento de pedidos y devoluciones.

---

## 📌 Tabla de Contenidos
- [Vista Previa & Demo](#-vista-previa--demo)
- [Características Principales](#-características-principales)
- [Arquitectura Híbrida de Respuestas](#-arquitectura-híbrida-de-respuestas)


---

## 🌐 Vista Previa & Demo

Sitio desplegado públicamente en **GitHub Pages**:
👉 **[Ver Chatbot AI en Vivo](https://karigonzalez.github.io/ai-ecommerce-support-bot/)**

---

## ✨ Características Principales

* **Motor Híbrido de Inteligencia:** Búsqueda ultra rápida en base de conocimiento local + integración con modelos de lenguaje de última generación (Google Gemini Flash API).
* **Botones de Sugerencia Rápida (*Pill Buttons*):** Consultas predeterminadas con un solo clic sobre costos de envío, políticas de devolución y métodos de pago.
* **Experiencia Conversacional Realista:** Indicador de escritura animado (*typing dots*), avatares diferenciados y desplazamiento automático fluido.
* **Persistencia de Clave API:** Permite guardar la clave de API de Gemini localmente (`localStorage`) sin exponer credenciales.
* **Diseño Responsive:** Interfaz moderna que se adapta desde dispositivos móviles hasta monitores de escritorio.

---

## 🧠 Arquitectura Híbrida de Respuestas

```text
[Consulta del Cliente]
          │
          ▼
¿Existe respuesta en la Base de Conocimiento Local? (knowledge.js)
    ├── SÍ ──► [Respuesta Inmediata Local (0.6s)]
    └── NO
          │
          ▼
¿Existe API Key de Gemini configurada?
    ├── SÍ ──► [Llamada a Google Gemini API (gemini-1.5-flash)]
    └── NO ──► [Respuesta Guía para Activar la IA]