import Image from "next/image"
import pancake from '~/assets/images/pancake.jpg'
import sandwich from '~/assets/images/sandwich.jpg'
import cake from '~/assets/images/cake.jpg'
import ribs from '~/assets/images/ribs.jpg'
import ingredients from '~/assets/images/orange.jpg'
export function Sec1 ({className}:{className:string}){
    return(
        <section className={`${className} bg-cover bg-center bg-no-repeat items-center`} style={{ backgroundImage: `url(${ingredients.src})` }}>
            <p className="text-4xl sm:text-6xl lg:text-7xl p-4 text-center font-mono">Descubra e compartilhe as melhores receitas</p>
            <div className="columns-2 gap-3">
                <Image
                        src={pancake}
                        alt="Pancake"
                        width={400}
                        height={400}
                        className="rounded-xl columns-1 w-full mb-3 break-inside-avoid"
                    />
                <Image
                        src={sandwich}
                        alt="Sandwich"
                        width={400}
                        height={400}
                        className="rounded-xl columns-2 w-full mb-3 break-inside-avoid"
                />
                <Image
                    src={ribs}
                    alt="Ribs"
                    width={400}
                    height={400}
                    className="rounded-xl h-full columns-1 w-full mb-3 break-inside-avoid"
                />
                <Image
                    src={cake}
                    alt="Cake"
                    width={400}
                    height={400}
                    className="rounded-xl columns-2 w-full mb-3 break-inside-avoid"
                                />


                </div> 
                <p className="text-4xl sm:text-6xl lg:text-7xl text-center p-4 font-mono ">Site pra achar as receitas mais criativas e compartilhar as suas prórpias</p>
            </section>
    )
    
}