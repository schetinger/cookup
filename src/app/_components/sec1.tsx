import Image from "next/image"
import pancake from '~/assets/images/pancake.jpg'
import sandwich from '~/assets/images/sandwich.jpg'
import cake from '~/assets/images/cake.jpg'
import ribs from '~/assets/images/ribs.jpg'
export function Sec1 ({className}:{className:string}){
    return(
        <section className={className}>
            <p className="text-8xl p-4 text-center font-bold">Conheça as melhores receitas</p>
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
                <p className="text-8xl text-center p-4 font-bold">E faça no conforto de sua casa</p>
            </section>
    )
    
}