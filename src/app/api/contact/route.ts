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

    // Correo que se enviará al administrador del sitio
    const adminMail = {
      from: process.env.EMAIL_USER,
      to: 'ceramicosalva@gmail.com', // Dirección de correo de la empresa
      subject: `Mensaje desde el sitio web, de: ${nombre}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>        
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    };

    // Correo de confirmación al cliente
    const clientMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Gracias por contactar con Cerámicos Alva`,
      html: `
        <h2>¡Gracias por contactarnos!</h2>
        <p>Hola ${nombre},</p>
        <p>Hemos recibido tu mensaje.</p>
        <p>Uno de nuestros representantes se pondrá en contacto contigo lo antes posible.</p>
        <br>
        <p>Atentamente,</p>
        <p><strong>Equipo de Cerámicos Alva</strong></p>
        <hr>
        <p><small>Este es un correo automático, por favor no responda a este mensaje.</small></p>
      `,
    };

    // Enviar ambos correos
    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(clientMail)
    ]);

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
