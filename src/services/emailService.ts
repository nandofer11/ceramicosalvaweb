import emailjs from '@emailjs/browser';

// Configuración de EmailJS
const EMAILJS_SERVICE_ID = 'service_ceramicos'; // Lo configuraremos después
const EMAILJS_TEMPLATE_ID_CONTACT = 'template_contact';
const EMAILJS_TEMPLATE_ID_COTIZACION = 'template_cotizacion';
const EMAILJS_PUBLIC_KEY = 'TU_PUBLIC_KEY'; // Lo configuraremos después

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface ContactData {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  mensaje: string;
}

export interface CotizacionData {
  // Información personal/empresa
  tipoPersona: 'natural' | 'juridica' | null;
  dni?: string;
  nombres?: string;
  ruc?: string;
  razon_social?: string;
  celular: string;
  email?: string;
  
  // Productos
  tipoSeleccionProducto: 'unico' | 'multiple' | null;
  productoUnico?: string | null;
  cantidadUnico?: number;
  productosSeleccionados?: ProductoSeleccionado[];
  unidadMedida?: string;
  
  // Entrega
  tipoEntrega: 'propio' | 'envio' | null;
  ciudad?: string;
  direccion?: string;
  celular_receptor?: string;
  tipoDescarga?: 'propio' | 'solicitar' | null;
  
  // Comentarios
  comentarios?: string;
}

interface ProductoSeleccionado {
  id: string;
  nombre: string;
  cantidad: number;
  seleccionado: boolean;
}

// Función para formatear productos
const formatProductos = (data: CotizacionData): string => {
  if (data.tipoSeleccionProducto === 'unico' && data.productoUnico) {
    return `${data.productoUnico}: ${data.cantidadUnico} ${data.unidadMedida}`;
  } else if (data.tipoSeleccionProducto === 'multiple' && data.productosSeleccionados) {
    return data.productosSeleccionados
      .filter(p => p.seleccionado && p.cantidad > 0)
      .map(p => `${p.nombre}: ${p.cantidad} ${data.unidadMedida}`)
      .join(', ');
  }
  return 'No especificado';
};

// Enviar formulario de contacto
export const sendContactForm = async (data: ContactData): Promise<{ success: boolean; message: string }> => {
  try {
    const templateParams = {
      from_name: `${data.nombre} ${data.apellido}`,
      from_email: data.email,
      telefono: data.telefono || 'No proporcionado',
      message: data.mensaje,
      to_email: 'ceramicosalva@gmail.com'
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_CONTACT,
      templateParams
    );

    return {
      success: true,
      message: 'Mensaje enviado correctamente. Pronto nos pondremos en contacto contigo.'
    };
  } catch (error) {
    console.error('Error al enviar el formulario de contacto:', error);
    return {
      success: false,
      message: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente por WhatsApp.'
    };
  }
};

// Enviar formulario de cotización
export const sendCotizacionForm = async (data: CotizacionData): Promise<{ success: boolean; message: string }> => {
  try {
    // Validaciones básicas
    if (!data.tipoPersona || !data.celular || !data.tipoSeleccionProducto) {
      throw new Error('Faltan datos obligatorios');
    }

    const templateParams = {
      // Información del cliente
      tipo_persona: data.tipoPersona === 'natural' ? 'Persona Natural' : 'Persona Jurídica',
      cliente_nombre: data.tipoPersona === 'natural' ? (data.nombres || '') : (data.razon_social || ''),
      documento: data.tipoPersona === 'natural' ? `DNI: ${data.dni || ''}` : `RUC: ${data.ruc || ''}`,
      celular: data.celular,
      email: data.email || 'No proporcionado',
      
      // Productos
      productos: formatProductos(data),
      
      // Entrega
      tipo_entrega: data.tipoEntrega === 'propio' ? 'Recogerá con movilidad propia' : 'Entrega a domicilio',
      ciudad: data.ciudad || 'N/A',
      direccion: data.direccion || 'N/A',
      celular_receptor: data.celular_receptor || 'N/A',
      tipo_descarga: data.tipoDescarga === 'propio' ? 'Tiene personal para descarga' : 'Solicita servicio de descarga',
      
      // Comentarios
      comentarios: data.comentarios || 'Ninguno',
      
      // Fecha
      fecha: new Date().toLocaleString('es-PE', {
        timeZone: 'America/Lima',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      
      to_email: 'ceramicosalva@gmail.com'
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_COTIZACION,
      templateParams
    );

    return {
      success: true,
      message: 'Solicitud de cotización enviada correctamente. Nos pondremos en contacto contigo vía WhatsApp en máximo 24 horas.'
    };
  } catch (error) {
    console.error('Error al enviar la solicitud de cotización:', error);
    return {
      success: false,
      message: 'Error al enviar la solicitud. Por favor, inténtalo de nuevo o contáctanos directamente por WhatsApp.'
    };
  }
};

// Función alternativa usando mailto (fallback)
export const sendViaMailto = (data: ContactData | CotizacionData, type: 'contact' | 'cotizacion') => {
  let subject = '';
  let body = '';
  
  if (type === 'contact') {
    const contactData = data as ContactData;
    subject = `Mensaje desde el sitio web de ${contactData.nombre}`;
    body = `Nombre: ${contactData.nombre} ${contactData.apellido}\n`;
    body += `Email: ${contactData.email}\n`;
    body += `Teléfono: ${contactData.telefono || 'No proporcionado'}\n\n`;
    body += `Mensaje:\n${contactData.mensaje}`;
  } else {
    const cotizacionData = data as CotizacionData;
    subject = `Solicitud de cotización desde el sitio web`;
    body = `Tipo: ${cotizacionData.tipoPersona === 'natural' ? 'Persona Natural' : 'Persona Jurídica'}\n`;
    
    if (cotizacionData.tipoPersona === 'natural') {
      body += `Nombre: ${cotizacionData.nombres}\n`;
      body += `DNI: ${cotizacionData.dni}\n`;
    } else {
      body += `Razón Social: ${cotizacionData.razon_social}\n`;
      body += `RUC: ${cotizacionData.ruc}\n`;
    }
    
    body += `WhatsApp: ${cotizacionData.celular}\n`;
    body += `Email: ${cotizacionData.email || 'No proporcionado'}\n\n`;
    body += `Productos: ${formatProductos(cotizacionData)}\n\n`;
    body += `Entrega: ${cotizacionData.tipoEntrega === 'propio' ? 'Recogerá con movilidad propia' : 'Entrega a domicilio'}\n`;
    
    if (cotizacionData.tipoEntrega === 'envio') {
      body += `Ciudad: ${cotizacionData.ciudad}\n`;
      body += `Dirección: ${cotizacionData.direccion}\n`;
      body += `Celular receptor: ${cotizacionData.celular_receptor}\n`;
    }
    
    if (cotizacionData.comentarios) {
      body += `\nComentarios: ${cotizacionData.comentarios}`;
    }
  }
  
  const mailtoUrl = `mailto:ceramicosalva@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoUrl);
};