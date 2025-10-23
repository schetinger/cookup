import Image from "next/image"
import pancake from '~/assets/images/pancake.jpg'
import sandwich from '~/assets/images/sandwich.jpg'
import cake from '~/assets/images/cake.jpg'
import ribs from '~/assets/images/ribs.jpg'
export function Sec1 ({className}:{className:string}){
    return(
        <section className={className}>
            <p className="text-8xl p-4 text-center font-bold">Conheça as melhores receitas</p>
            <div className="grid-cols-2 gap-2 grid ">
                <Image
                        src={pancake}
                        alt="Pancake"
                        width={500}
                        height={500}
                        className="rounded-xl"
                    />
                <Image
                        src={sandwich}
                        alt="Sandwich"
                        width={200}
                        height={200}
                        className="rounded-xl"
                />
                <Image
                    src={ribs}
                    alt="Ribs"
                    width={400}
                    height={400}
                    className="rounded-xl"
                />
                <Image
                    src={cake}
                    alt="Cake"
                    width={350}
                    height={350}
                    className="rounded-xl"
                                />


                </div> 
                <p className="text-8xl text-center p-4 font-bold">E faça você mesmo em casa</p>
            </section>
    )
    
}