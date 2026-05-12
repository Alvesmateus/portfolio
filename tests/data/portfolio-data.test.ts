import { portfolioData } from "@/data/portfolio";

describe("portfolioData", () => {
  it("preserves the canonical portfolio facts and asset counts", () => {
    expect(portfolioData.profile.name).toBe("Mateus Alves");
    expect(portfolioData.profile.role).toBe(
      "Creative Designer & Video Strategist specialized in Viral Content",
    );
    expect(portfolioData.profile.ageLabel).toBe("26 anos");
    expect(portfolioData.profile.phrase).toBe(
      '"Criatividade, retenção e resultados que transformam."',
    );
    expect(portfolioData.contact.phoneLabel).toBe("+55 (21) 97304-2881");
    expect(portfolioData.contact.email).toBe("mateusalves.flu@gmail.com");
    expect(portfolioData.contact.emailHref).toBe(
      "mailto:mateusalves.flu@gmail.com",
    );
    expect(portfolioData.contact.whatsappHref).toContain("5521973042881");
    expect(portfolioData.contact.instagramHref).toBe(
      "https://www.instagram.com/mateusalvesdzn",
    );
    expect(portfolioData.contact.linkedInHref).toBe("#");
    expect(portfolioData.projects).toHaveLength(10);
    expect(portfolioData.thumbnails).toHaveLength(14);
    expect(portfolioData.squareAssets).toHaveLength(8);
    expect(portfolioData.instagramSquareAssets).toHaveLength(4);
    expect(portfolioData.clients).toHaveLength(2);
    expect(portfolioData.skills).toHaveLength(7);
    expect(portfolioData.niches).toHaveLength(5);
    expect(portfolioData.differentials).toHaveLength(5);
  });

  it("preserves exact canonical links, assets, and client metrics", () => {
    expect(portfolioData.channels).toEqual([
      {
        label: "Canal Fuzileiro",
        href: "https://www.youtube.com/fuzileiroreal",
      },
      {
        label: "Canal Só Papiro",
        href: "https://www.youtube.com/@sopapirocast",
      },
    ]);

    expect(portfolioData.projects.map((item) => item.assetPath)).toEqual([
      "/videos/A HISTÓRIA do CB ANISIO - O NAVAL QUE FOI PARAR NA UCRÂNIA!-00.00.00.000-00.00.51.811.mp4",
      "/videos/COMANDOS ANFÍBIOS OU OPERAÇÕES ESPECIAIS_ QUAL é a DIFERENÇA ENTRE OS DOIS CURSOS_-00.00.00.000-00.01.13.698.mp4",
      "/videos/CONHEÇA O BEPI - OS CAÇADORES DA CAATINGA!-00.00.00.000-00.01.26.278.mp4",
      "/videos/GERR ou COMANF_ QUAL É A DIFERENÇA_ COMO ENTRAR_-00.00.00.000-00.01.01.375.mp4",
      "/videos/INSANO_ TAF dos PARACOMANDOS-00.00.00.000-00.01.13.423.mp4",
      "/videos/O LADO SOMBRIO DA LEGIÃO ESTRANGEIRA _ PASSO A PASSO PARA SE TORNAR UM LEGIONÁRIO!-00.00.00.000-00.01.09.160.mp4",
      "/videos/O TAF DA CIA PREC É HARDCORE!-00.00.00.000-00.00.26.086.mp4",
      "/videos/OPERAÇÕES COM CÃES - TODOS OS TEMEM OS CÃES DE GUERRA!-00.00.00.000-00.01.23.215.mp4",
      "/videos/PELOTÃO DE RECONHECIMENTO E VIGILÂNCIA DO CORPO DE FUZILERIOS NAVAIS-00.00.00.000-00.01.06.105.mp4",
      "/videos/brasileironaucrania.mp4",
    ]);

    expect(portfolioData.thumbnails.map((item) => item.assetPath)).toEqual([
      "/tumb/3 (2).jpg",
      "/tumb/3.jpg",
      "/tumb/maxresdefault (1).jpg",
      "/tumb/maxresdefault (2).jpg",
      "/tumb/maxresdefault (3).jpg",
      "/tumb/maxresdefault (4).jpg",
      "/tumb/maxresdefault (5).jpg",
      "/tumb/maxresdefault (6).jpg",
      "/tumb/maxresdefault.jpg",
      "/tumb/sddefault (1).jpg",
      "/tumb/sddefault (2).jpg",
      "/tumb/sddefault (3).jpg",
      "/tumb/sddefault (4).jpg",
      "/tumb/sddefault.jpg",
    ]);

    expect(portfolioData.squareAssets.map((item) => item.assetPath)).toEqual([
      "/square/07 de Setembro 🇧🇷 - “BRAVA GENTE BRASILEIRA LONGE VÁ, TEMOR SERVIL OU FICAR A PÁTRIA LIVRE, OU.jpg",
      "/square/10 de Junho - Dia da arma de Artilharia O 25° Batalhão Logístico (Es) parabeniza a todos os mili.jpg",
      "/square/18 de Setembro - Dia da Família Militar.....#familia #militar #exercitobrasileiro #military #arm.jpg",
      "/square/aciso.webp",
      "/square/dia sd.jpg",
      "/square/engenharia.jpg",
      "/square/matbel.jpg",
      "/square/matbel2.jpg",
    ]);

    expect(portfolioData.instagramSquareAssets.map((item) => item.assetPath)).toEqual([
      "/img/instagram-square/Adsumus é uma palavra em latim que significa “aqui estamos” ou “estamos presentes”. É uma expres.jpg",
      "/img/instagram-square/Adsumus é uma palavra em latim que significa “aqui estamos” ou “estamos presentes”. É uma expres.mp4",
      "/img/instagram-square/Se você pretende se tornar FUZILEIRO NAVAL lê atentamente todas as imagens!Adsumus 🤜🤛.heic",
      "/img/instagram-square/adsumus.gif",
    ]);

    expect(portfolioData.skills).toEqual([
      { name: "Photoshop", rating: 5, maxRating: 5 },
      { name: "CapCut", rating: 4, maxRating: 5 },
      { name: "Premiere Pro", rating: 5, maxRating: 5 },
      { name: "After Effects", rating: 4, maxRating: 5 },
      { name: "Blender", rating: 3, maxRating: 5 },
      { name: "Canva", rating: 5, maxRating: 5 },
      { name: "InDesign", rating: 4, maxRating: 5 },
    ]);

    expect(portfolioData.clients).toEqual([
      {
        name: "Fuzileiro Real",
        niche: "Entretenimento Militar",
        logoPath: "/logo/download.jpg",
        stats: [
          {
            label: "Instagram",
            value: "250k+",
            href: "https://www.instagram.com/fuzileiroreal02/",
          },
          {
            label: "YouTube",
            value: "1.2M+",
            href: "https://www.youtube.com/fuzileiroreal",
          },
        ],
      },
      {
        name: "Só Papiro Cast",
        niche: "Entretenimento Militar e Educativo",
        logoPath: "/logo/channels4_profile.jpg",
        stats: [
          {
            label: "Instagram",
            value: "85k",
            href: "https://www.instagram.com/sopapirocast/",
          },
          {
            label: "YouTube",
            value: "300k+",
            href: "https://www.youtube.com/@sopapirocast",
          },
        ],
      },
    ]);

    expect(portfolioData.niches.map((item) => item.label)).toEqual([
      "Entretenimento Militar",
      "Entretenimento Educativo",
      "Podcasts",
      "Mídia para Cursos",
      "Filmmaker",
    ]);

    expect(portfolioData.differentials).toEqual([
      {
        title: "Comunicativo",
        description:
          "Foco em entendimento claro e alinhamento constante com o cliente.",
      },
      {
        title: "Trabalho em Equipe",
        description:
          "Fácil integração com times de marketing e departamentos criativos.",
      },
      {
        title: "Postagens em Massa",
        description:
          "Especialista em fluxo de trabalho para alto volume de conteúdo.",
      },
      {
        title: "IA para Automação",
        description:
          "Uso de ferramentas avançadas para acelerar a produção sem perder qualidade.",
      },
      {
        title: "Versatilidade Técnica",
        description:
          "Capacidade única de entrega em qualquer setup (PC forte ou fraco).",
      },
    ]);
  });
});
