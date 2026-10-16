/* ==========================================
   BASE DE CONOCIMIENTO LOCAL (E-COMMERCE FAQs)
   ========================================== */
const storeKnowledgeBase = [
    {
        keywords: ['envio', 'envíos', 'envios', 'costo', 'tarifa', 'flete', 'despacho'],
        answer: '🚚 **Información de Envíos:**<br>• Envíos locales (Lima/Ciudad): 24-48 horas hábiles ($3.50 o Gratis en compras superiores a $50).<br>• Envíos nacionales: 3-5 días hábiles.<br>• Envíos internacionales: 7-12 días hábiles según país.'
    },
    {
        keywords: ['rastreo', 'rastrear', 'seguimiento', 'paquete', 'orden', 'pedido', 'donde esta'],
        answer: '📦 **Seguimiento de Pedidos:**<br>Puedes consultar el estado de tu paquete ingresando tu número de orden (ej: #ORD-1234) en nuestra sección de rastreo o haciendo clic en el enlace que enviamos a tu correo electrónico tras la compra.'
    },
    {
        keywords: ['cambio', 'devolucion', 'devoluciones', 'garantia', 'devolver', 'fallo'],
        answer: '🔄 **Política de Cambios y Devoluciones:**<br>Cuentas con **30 días calendario** desde que recibes el producto para solicitar un cambio o devolución sin costo adicional, siempre que el artículo conserve sus etiquetas y empaque original.'
    },
    {
        keywords: ['pago', 'pagos', 'tarjeta', 'metodos', 'efectivo', 'transferencia', 'yape', 'plin', 'paypal'],
        answer: '💳 **Métodos de Pago Aceptados:**<br>Aceptamos Tarjetas de Crédito/Débito (Visa, Mastercard, AMEX), PayPal, Transferencias Bancarias directas y billeteras digitales (Yape, Plin y PagoEfectivo).'
    },
    {
        keywords: ['horario', 'atencion', 'contacto', 'soporte', 'telefono', 'whatsapp', 'correo'],
        answer: '📞 **Contacto & Atención:**<br>Nuestro equipo de soporte humano está disponible de Lunes a Sábado de 8:00 am a 8:00 pm.<br>• **WhatsApp:** +51 964 310 280<br>• **Email:** soporte@techstoredemo.com'
    }
];

/**
 * Busca una respuesta en la base de datos local según palabras clave
 */
function searchKnowledgeBase(userQuery) {
    const cleanQuery = userQuery.toLowerCase().trim();
    
    for (const item of storeKnowledgeBase) {
        const hasMatch = item.keywords.some(keyword => cleanQuery.includes(keyword));
        if (hasMatch) {
            return item.answer;
        }
    }
    
    return null;
}