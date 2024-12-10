import React, { useState } from 'react';

const QuemSomos = () => {
    const [currentContent, setCurrentContent] = useState(0);

    const content = [
        {


            foto: "https://deg9n53j48u2o.cloudfront.net/animeverse.png",
            title: "NOSSA HISTÓRIA",
            text: (
                <>
                    <p className="text-gray-700 mb-4 text-justify">
                        Alexandre e Edvaldo, dois amigos apaixonados por anime, estavam em um evento quando perceberam a dificuldade de encontrar produtos de qualidade e a falta de plataformas online com boa usabilidade. Decidiram então criar o Animeverse, um e-commerce dedicado a produtos de anime com uma plataforma intuitiva e visualmente atraente.
                    </p>
                    <p className="text-gray-700 mb-4 text-justify">
                        Alexandre, com expertise em design e programação, construiu o site, enquanto Edvaldo, com seu talento para negócios, elaborou as estratégias de marketing.  Pesquisaram as tendências do mercado, negociaram com fornecedores e garimparam produtos para todos os gostos.
                    </p>
                    <p className="text-gray-700 mb-4 text-justify">
                        Após meses de trabalho, o Animeverse foi lançado com sucesso, conquistando a comunidade de fãs de anime.  A dupla continua trabalhando para aprimorar a plataforma e oferecer a melhor experiência aos clientes, transformando o sonho de unir paixão e negócio em realidade.
                    </p>
                </>
            ),
        },
        {
            foto: "https://deg9n53j48u2o.cloudfront.net/animeverse2-Photoroom.jpg",
            title: "NOSSA VISÃO",
            text: (
                <>
                    <p className="text-gray-700 mb-4 text-justify">
                        Vislumbramos o Animeverse como o principal destino online para os fãs de anime no Brasil e América Latina, um verdadeiro paraíso digital onde a comunidade se conecta, descobre e adquire produtos que celebram sua paixão. Queremos ir além de ser um simples e-commerce,  construindo um ecossistema vibrante que promova a cultura anime, com conteúdo envolvente, eventos online e interação constante com os fãs. Nosso objetivo é  oferecer uma experiência de compra impecável, com curadoria especializada, produtos exclusivos e atendimento personalizado que faça cada cliente se sentir parte da família Animeverse.
                    </p>
                    <p className="text-gray-700 mb-4 text-justify">
                        Acreditamos no poder do anime para conectar pessoas, inspirar a criatividade e transcender barreiras culturais.  Por isso,  buscamos  expandir o acesso a essa cultura,  oferecendo produtos de alta qualidade a preços justos, além de apoiar artistas e criadores brasileiros.  Sonhamos em ser  referência em  inovação e  confiabilidade no mercado,  construindo uma marca que  represente a paixão e o entusiasmo da comunidade anime.
                    </p>
                </>
            ),
        },
        {
            foto: "https://deg9n53j48u2o.cloudfront.net/animeverse3-Photoroom.jpg",
            title: "NOSSOS VALORES",
            text: (
                <ul className="list-decimal list-inside text-gray-700 mb-4 text-justify">
                    <li className="mb-2">
                        <strong>Paixão:</strong> O amor pelo anime é o nosso combustível. Buscamos transmitir esse entusiasmo em cada detalhe, desde a seleção de produtos até o atendimento ao cliente.
                    </li>
                    <li className="mb-2">
                        <strong>Comunidade:</strong> Acreditamos no poder da comunidade anime e queremos ser um ponto de encontro para fãs, promovendo a conexão e o compartilhamento de experiências.
                    </li>
                    <li className="mb-2">
                        <strong>Excelência:</strong> Buscamos a excelência em tudo o que fazemos, oferecendo produtos de alta qualidade, uma plataforma intuitiva e um atendimento impecável.
                    </li>
                    <li className="mb-2">
                        <strong>Inovação:</strong> Estamos sempre em busca de novas ideias e soluções criativas para aprimorar a experiência dos nossos clientes e impulsionar o mercado de anime.
                    </li>
                </ul>
            ),
        },
    ];

    const handleNextContent = () => {
        setCurrentContent((prevContent) => (prevContent + 1) % content.length);
    };

    const nextContentIndex = (currentContent + 1) % content.length;
    const buttonText = content[nextContentIndex].title;

    return (
        <div className="w-[100%] mx-auto my-auto mt-[80px] mb-[103px] font-inter">
            <div className="flex flex-row bg-white rounded-lg shadow-lg overflow-hidden items-center">
                <img src={content[currentContent].foto} alt="Car" className="w-[45%]" />
                <div className='flex flex-col p-6 text-center justify-between'>
                    <h2 className="text-2xl font-bold mb-4">{content[currentContent].title}</h2>
                    <div>{content[currentContent].text}</div>
                    <button onClick={handleNextContent} className="max-w-[30%] bg-[#B68322] text-white px-4 py-2 rounded-lg m-auto">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuemSomos;
