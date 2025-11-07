import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuración de Nodemailer para VPS
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, apellido, email, telefono, mensaje } = body;

    // Validación básica
    if (!nombre || !apellido || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos requeridos deben ser completados' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido' },
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

    // Correo que se enviará al administrador del sitio
    const adminMail = {
      from: process.env.EMAIL_USER,
      to: 'ceramicosalva@gmail.com',
      subject: `Nuevo mensaje de contacto - ${nombre} ${apellido}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #FC602E, #e55525); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Nuevo Mensaje de Contacto</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Fecha: ${fechaSolicitud}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #FC602E; margin-top: 0; border-bottom: 2px solid #FC602E; padding-bottom: 10px;">
                📋 Información del Contacto
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 30%;">Nombre completo:</td>
                  <td style="padding: 8px 0;">${nombre} ${apellido}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Teléfono:</td>
                  <td style="padding: 8px 0;">${telefono || 'No proporcionado'}</td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #FC602E; margin-top: 0; border-bottom: 2px solid #FC602E; padding-bottom: 10px;">
                💬 Mensaje
              </h2>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 0; line-height: 1.6; border-left: 4px solid #FC602E;">
                ${mensaje.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
            <p>Este correo fue generado automáticamente desde el sitio web de Cerámicos Alva</p>
            <p>Para responder, utiliza directamente el email: <strong>${email}</strong></p>
          </div>
        </div>
      `,
    };

    // Correo de confirmación al cliente
    const clientMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Gracias por contactar con Cerámicos Alva',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #FC602E, #e55525); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">¡Gracias por contactarnos!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="margin: 0 0 15px 0;">
                Hola <strong>${nombre}</strong>,
              </p>
              <p style="margin: 0 0 15px 0;">
                Hemos recibido tu mensaje con fecha <strong>${fechaSolicitud}</strong>.
              </p>
              <p style="margin: 0 0 15px 0;">
                Nuestro equipo revisará tu consulta y se pondrá en contacto contigo a la brevedad posible.
              </p>
              
              <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #2196f3;">
                <h3 style="margin: 0 0 10px 0; color: #1976d2;">📞 Contacto directo:</h3>
                <p style="margin: 0;"><strong>WhatsApp:</strong> +51 970 584 592</p>
                <p style="margin: 5px 0 0 0;"><strong>Email:</strong> ceramicosalva@gmail.com</p>
              </div>
              
              <p style="margin: 15px 0 0 0;">
                Si tienes alguna pregunta urgente, no dudes en contactarnos directamente.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Atentamente,<br>
              <strong>Equipo de Cerámicos Alva</strong>
            </p>
            <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">
              Este es un correo automático, por favor no responda a este mensaje.
            </p>
          </div>
        </div>
      `,
    };

    // Enviar ambos correos
    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(clientMail)
    ]);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente. Recibirás una confirmación por email y nos pondremos en contacto contigo pronto.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}
