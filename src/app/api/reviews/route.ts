import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { v2 as cloudinary } from "cloudinary";
import { Notable } from "next/font/google";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    console.log("📦 DADOS RECEBIDOS NO BACKEND:");
    console.log("Titulo:", data.get("titulo"));
    console.log("Body:", data.get("descricao"));
    console.log("Rate:", data.get("rate"));
    console.log("ID Receita:", data.get("receitaid"));
    console.log("userid: ",data.get("userid"))
    console.log("-----------------------------------");
    const titulo = data.get("titulo") as string;
    const descricao = data.get("descricao") as string;
    const rate = data.get("rate") as string;
    const imagemFile = data.get("imagem") as File;
    const userId = data.get("userid") as string;
    const receitaId = data.get("receitaid") as string;

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
          folder: "cookup-reviews",
          resource_type: "image"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });


   const novaReview = await db.review.upsert({
  where: {
    userId_id_receita: {
      userId: usuarioDono.id,
      id_receita: parseInt(receitaId),
    },
  },
  update: {
    title: titulo,
    body: descricao,
    rate: parseInt(rate),
    imageUrl: uploadResponse.secure_url,
    status: "PUBLICADO",
  },
  
  create: {
    title: titulo,
    body: descricao,
    rate: parseInt(rate),
    imageUrl: uploadResponse.secure_url,
    status: "PUBLICADO",
    userId: usuarioDono.id,
    id_receita: parseInt(receitaId),
  },
});

    return NextResponse.json(novaReview, { status: 201 });

  } catch (error) {
    console.error("Erro ao processar receita:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao salvar receita" }, 
      { status: 500 }
    );
  }
}