import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Tipo para productos seleccionados
interface ProductoSeleccionado {
  id: string;
  nombre: string;
  cantidad: number;
  seleccionado: boolean;
}

// Función para formatear los productos según el tipo de selección
const formatProductos = (tipoSeleccion: string, productoUnico: string | null, cantidadUnico: number, productosSeleccionados: ProductoSeleccionado[], unidadMedida: string) => {
  const getProductNameById = (productId: string): string => {
    const productNames: { [key: string]: string } = {
      'pandereta': 'Pandereta rayas',
      'techo12': 'Techo 12',
      'king_kong': 'King Kong 18 huecos',
      'segunda': 'Ladrillos de segunda'
    };
    return productNames[productId] || productId;
  };

  if (tipoSeleccion === 'unico' && productoUnico) {
    return `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${getProductNameById(productoUnico)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${cantidadUnico}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${unidadMedida}</td>
      </tr>
    `;
  } else if (tipoSeleccion === 'multiple') {
    return productosSeleccionados
      .filter(producto => producto.seleccionado && producto.cantidad > 0)
      .map(producto => `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${producto.nombre}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${producto.cantidad}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${unidadMedida}</td>
        </tr>
      `).join('');
  }
  return '';
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      // Información personal/empresa
      tipoPersona,
      dni,
      nombres,
      ruc,
      razon_social,
      celular,
      email,
      
      // Productos
      tipoSeleccionProducto,
      productoUnico,
      cantidadUnico,
      productosSeleccionados,
      unidadMedida,
      
      // Entrega
      tipoEntrega,
      ciudad,
      direccion,
      celular_receptor,
      tipoDescarga,
      
      // Comentarios
      comentarios
    } = body;

    // Validación básica
    if (!tipoPersona || !celular || !tipoSeleccionProducto) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios en la solicitud' },
        { status: 400 }
      );
    }

    // Validaciones específicas según tipo de persona
    if (tipoPersona === 'natural' && (!dni || !nombres)) {
      return NextResponse.json(
        { error: 'DNI y nombres son obligatorios para personas naturales' },
        { status: 400 }
      );
    }

    if (tipoPersona === 'juridica' && (!ruc || !razon_social)) {
      return NextResponse.json(
        { error: 'RUC y razón social son obligatorios para personas jurídicas' },
        { status: 400 }
      );
    }

    // Obtener fecha y hora actual
    const fechaSolicitud = new Date().toLocaleString('es-PE', {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Crear el HTML para el correo al administrador
    const productosHTML = formatProductos(tipoSeleccionProducto, productoUnico, cantidadUnico, productosSeleccionados, unidadMedida);

    const adminMail = {
      from: process.env.EMAIL_USER,
      to: 'ceramicosalva@gmail.com',
      subject: `Nueva solicitud de cotización - ${tipoPersona === 'natural' ? nombres : razon_social}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #FC602E, #e55525); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Nueva Solicitud de Cotización</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Fecha: ${fechaSolicitud}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <!-- Información del Cliente -->
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #FC602E; margin-top: 0; border-bottom: 2px solid #FC602E; padding-bottom: 10px;">
                📋 Información del Cliente
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 30%;">Tipo de persona:</td>
                  <td style="padding: 8px 0;">${tipoPersona === 'natural' ? 'Persona Natural' : 'Persona Jurídica'}</td>
                </tr>
                ${tipoPersona === 'natural' ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">DNI:</td>
                    <td style="padding: 8px 0;">${dni}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Nombres y Apellidos:</td>
                    <td style="padding: 8px 0;">${nombres}</td>
                  </tr>
                ` : `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">RUC:</td>
                    <td style="padding: 8px 0;">${ruc}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Razón Social:</td>
                    <td style="padding: 8px 0;">${razon_social}</td>
                  </tr>
                `}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">WhatsApp:</td>
                  <td style="padding: 8px 0;">+51 ${celular}</td>
                </tr>
                ${email ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0;">${email}</td>
                  </tr>
                ` : ''}
              </table>
            </div>

            <!-- Productos Solicitados -->
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #FC602E; margin-top: 0; border-bottom: 2px solid #FC602E; padding-bottom: 10px;">
                🧱 Productos Solicitados
              </h2>
              <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                <thead>
                  <tr style="background-color: #f8f9fa;">
                    <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">Producto</th>
                    <th style="padding: 12px; border: 1px solid #ddd; text-align: center;">Cantidad</th>
                    <th style="padding: 12px; border: 1px solid #ddd; text-align: center;">Unidad</th>
                  </tr>
                </thead>
                <tbody>
                  ${productosHTML}
                </tbody>
              </table>
            </div>

            <!-- Información de Entrega -->
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #FC602E; margin-top: 0; border-bottom: 2px solid #FC602E; padding-bottom: 10px;">
                🚚 Información de Entrega
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 30%;">Tipo de entrega:</td>
                  <td style="padding: 8px 0;">${tipoEntrega === 'propio' ? 'Recogerá con movilidad propia' : 'Entrega a domicilio'}</td>
                </tr>
                ${tipoEntrega === 'envio' ? `
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Ciudad:</td>
                    <td style="padding: 8px 0;">${ciudad}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Dirección:</td>
                    <td style="padding: 8px 0;">${direccion}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Celular del receptor:</td>
                    <td style="padding: 8px 0;">+51 ${celular_receptor}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Servicio de descarga:</td>
                    <td style="padding: 8px 0;">${tipoDescarga === 'propio' ? 'Tiene personal para descarga' : 'Solicita servicio de descarga'}</td>
                  </tr>
                ` : ''}
              </table>
            </div>

            ${comentarios ? `
              <!-- Comentarios Adicionales -->
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #FC602E; margin-top: 0; border-bottom: 2px solid #FC602E; padding-bottom: 10px;">
                  💬 Comentarios Adicionales
                </h2>
                <p style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 0; line-height: 1.6;">
                  ${comentarios}
                </p>
              </div>
            ` : ''}
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
            <p>Este correo fue generado automáticamente desde el sitio web de Cerámicos Alva</p>
          </div>
        </div>
      `,
    };

    // Correo de confirmación al cliente (solo si proporcionó email)
    let clientMail = null;
    if (email) {
      clientMail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmación de solicitud de cotización - Cerámicos Alva',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #FC602E, #e55525); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">¡Gracias por tu solicitud de cotización!</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p style="margin: 0 0 15px 0;">
                  Hola <strong>${tipoPersona === 'natural' ? nombres : razon_social}</strong>,
                </p>
                <p style="margin: 0 0 15px 0;">
                  Hemos recibido tu solicitud de cotización con fecha <strong>${fechaSolicitud}</strong>.
                </p>
                <p style="margin: 0 0 15px 0;">
                  Nuestro equipo comercial revisará tu solicitud y se pondrá en contacto contigo a través de WhatsApp 
                  (<strong>+51 ${celular}</strong>) en un plazo máximo de 24 horas para proporcionarte una cotización detallada.
                </p>
                
                <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #2196f3;">
                  <h3 style="margin: 0 0 10px 0; color: #1976d2;">📋 Resumen de tu solicitud:</h3>
                  <p style="margin: 0;"><strong>Tipo de entrega:</strong> ${tipoEntrega === 'propio' ? 'Recogerás con tu movilidad' : 'Entrega a domicilio'}</p>
                  ${tipoEntrega === 'envio' ? `<p style="margin: 5px 0 0 0;"><strong>Destino:</strong> ${ciudad}, ${direccion}</p>` : ''}
                </div>
                
                <p style="margin: 15px 0 0 0;">
                  Mientras tanto, si tienes alguna pregunta urgente, no dudes en contactarnos directamente al 
                  <strong>+51 970 584 592</strong>.
                </p>
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                Atentamente,<br>
                <strong>Equipo Comercial - Cerámicos Alva</strong>
              </p>
              <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">
                Este es un correo automático, por favor no responda a este mensaje.
              </p>
            </div>
          </div>
        `,
      };
    }

    // Enviar correos
    const emailPromises = [transporter.sendMail(adminMail)];
    if (clientMail) {
      emailPromises.push(transporter.sendMail(clientMail));
    }

    await Promise.all(emailPromises);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Solicitud de cotización enviada correctamente',
        emailSent: !!email
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al enviar la solicitud de cotización:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar la solicitud de cotización' },
      { status: 500 }
    );
  }
}