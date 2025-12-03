// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    console.log("seed")
try{

    const user1 = await prisma.user.create({
        data: {
            username: "schetinger",
            nickname: "rafael",
            email: "rafael@gmail.com", 
            role: "ADMIN"
        }
    })

    const user2 = await prisma.user.create({
        data: {
            username: "visitante",
            nickname: "Visitante",
            email: "visitante@gmail.com",
            role: "USER"
        }
    })

    const receita = await prisma.postReceita.create({
        data: {
            title: "Risole de Milho",
            ingredients: "Milho, Farinha, Leite",
            body: "Mistura tudo na panela e frita.",
            userId: user1.id,
            status: "PUBLICADO"
        }
    })

    const review = await prisma.review.create({
        data: {
            title: "Muito difícil",
            body: "A massa ficou dura, difícil de fazer.",
            rate: 2, 
            userId: user2.id,    
            id_receita: receita.id, 
        }
    })

    const follow = await prisma.follow.create({
        data: {
            following_user_id: user2.id,
            followed_user_id: user1.id
        }
    })

    console.log("Seed finalizado com sucesso!")
}   catch (e) {
    console.error('erro durante o seed:', e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()}
};

main()