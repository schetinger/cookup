import { prisma, Prisma } from "./"
const main = async()=>{
    const user1 = await prisma.user.create({data:{
            username:"schetinger",
            nickname:"rafael"
    }})


    const receita = await prisma.postReceita.create({data:{
           title :"risole" ,
           ingredients:"milho",
           body: "mistura",
           userId: user1.id,
        
        
    }})
    const review = await prisma.review.create({data:{
        title:"review",
        body:"dificil de fazer",
        userId : user1.id,
        id_receita: receita.id,
        rate: 0,
    
    }})
    const follow = await prisma.follow.create({data:{
        followed_user_id: user1.id,
        following_user_id: user1.id
    }
    })
};

main()
   .then(async () => await prisma.$disconnect())
   .catch(async (e) => 
    {console.log(e); 
    await prisma.$disconnect}
);