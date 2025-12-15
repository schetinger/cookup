import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const titulo = data.get("nome") as string;
    const ingredientes = data.get("descricao") as string;
    const modoPreparo = data.get("modoPreparo") as string;
    const imagemFile = data.get("imagem") as File;

    if (!titulo || !imagemFile) {
      return NextResponse.json(
        { error: "Título e imagem são obrigatórios" }, 
        { status: 400 }
      );
    }

    //pegar um usuário para ser o dono
    const usuarioDono = await db.user.findFirst();

    if (!usuarioDono) {
      return NextResponse.json(
        { error: "Nenhum usuário encontrado no banco. Rode o seed primeiro!" }, 
        { status: 404 }
      );
    }

    const arrayBuffer = await imagemFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          folder: "cookup-receitas",
          resource_type: "image"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });


    const novaReceita = await db.postReceita.create({
      data: {
        title: titulo,
        ingredients: ingredientes,
        body: modoPreparo,                
        imageUrl: uploadResponse.secure_url, 
        status: "PUBLICADO",
        userId: usuarioDono.id,           
      },
    });

    return NextResponse.json(novaReceita, { status: 201 });

  } catch (error) {
    console.error("Erro ao processar receita:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao salvar receita" }, 
      { status: 500 }
    );
  }
}