import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    console.log("🌱 Iniciando Seed (T3 Stack)...")

    try {
        // 1. Criar Usuário Admin
        const adminUser = await prisma.user.upsert({
            where: { email: "rafael@cookup.com" }, // Email é a chave principal no NextAuth
            update: {},
            create: {
                name: "Rafael Schetinger",
                email: "rafael@cookup.com",
                username: "schetinger",
                nickname: "Chef Rafael",
                role: "ADMIN",
                image: "https://github.com/shadcn.png", // Imagem de perfil fictícia
                bio: "Fundador do CookUp."
            }
        })

        // 2. Criar Usuário Visitante
        const visitorUser = await prisma.user.upsert({
            where: { email: "visitante@cookup.com" },
            update: {},
            create: {
                name: "Visitante",
                email: "visitante@cookup.com",
                username: "visitante",
                nickname: "Visitante",
                role: "USER"
            }
        })

        console.log("👤 Usuários criados.")

        // 3. Receitas da Home (Dados Reais para o Front-end)
        const receitas = [
            {
                title: "Pancakes de Mirtilo",
                imageUrl: "/images/Pancakes de Mirtilo.png",
                category: "Café da Manhã",
                prepTime: "25 min",
                ingredients: "Farinha, leite, ovos, mirtilos",
                body: "Misture tudo e frite.",
            },
            {
                title: "Sanduíche Gourmet",
                imageUrl: "/images/Sanduíche Gourmet.png",
                category: "Lanche",
                prepTime: "15 min",
                ingredients: "Pão, presunto, queijo",
                body: "Monte o sanduíche.",
            },
            {
                title: "Bolo de Chocolate",
                imageUrl: "/images/Bolo de Chocolate Premium.png",
                category: "Sobremesa",
                prepTime: "60 min",
                ingredients: "Chocolate, farinha, açúcar",
                body: "Asse por 40 min.",
            },
            {
                title: "Carbonara Clássica",
                imageUrl: "/images/Pasta Carbonara Clássica.png",
                category: "Principal",
                prepTime: "30 min",
                ingredients: "Massa, ovos, bacon, queijo",
                body: "Misture a massa quente com ovos.",
            },
            {
                title: "Salada Mediterrânea",
                imageUrl: "/images/Salada Fresca Mediterrânea.png",
                category: "Saudável",
                prepTime: "10 min",
                ingredients: "Tomate, pepino, azeitona",
                body: "Corte e tempere.",
            },
            {
                title: "Costela BBQ",
                imageUrl: "/images/Costela BBQ Caramelizada.png",
                category: "Churrasco",
                prepTime: "120 min",
                ingredients: "Costela, molho barbecue",
                body: "Asse lentamente.",
            },
        ];

        console.log("🍳 Criando receitas...");

        // Loop simples para criar
        for (const rec of receitas) {
            await prisma.postReceita.create({
                data: {
                    title: rec.title,
                    imageUrl: rec.imageUrl,
                    category: rec.category,
                    prepTime: rec.prepTime,
                    ingredients: rec.ingredients,
                    body: rec.body,
                    status: "PUBLICADO",
                    userId: adminUser.id // Usa o ID string do usuário
                }
            })
        }

        console.log("✅ Receitas inseridas!")

        // 4. Review de teste
        const receita = await prisma.postReceita.findFirst();
        if (receita) {
            await prisma.review.create({
                data: {
                    title: "Gostei!",
                    body: "Receita muito prática.",
                    rate: 5,
                    userId: visitorUser.id,
                    id_receita: receita.id
                }
            })
        }

    } catch (e) {
        console.error('❌ Erro no seed:', e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()