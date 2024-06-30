import './assets/styles.css';

interface Comic {
    month: string;
    num: number;
    link: string;
    year: string;
    news: string;
    safe_title: string;
    transcript: string;
    alt: string;
    img: string;
    title: string;
    day: string;
}

document.addEventListener('DOMContentLoaded', async () => {
    const email = 'l.smirnova@innopolis.university';
    try {
        const params = new URLSearchParams({ email });
        const idResponse = await fetch(`https://fwd.innopolis.university/api/hw2?${params.toString()}`);
        
        if (!idResponse.ok) {
            throw new Error(`Failed to fetch comic ID: ${idResponse.statusText}`);
        }
        const comicId = await idResponse.json();
        console.log('ID data:', comicId); 

        try {
            const comicParams = new URLSearchParams({ id: comicId });
            const comicResponse = await fetch(`https://fwd.innopolis.university/api/comic?id=${comicId.toString()}`);
            
            if (!comicResponse.ok) {
                throw new Error(`Failed to fetch comic data: ${comicResponse.statusText}`);
            }
            
            const comicData: Comic = await comicResponse.json();
            console.log('Comic data:', comicData); 

            const comicImg = document.getElementById('comic_img') as HTMLImageElement;
            const comicTitle = document.getElementById('comic_title') as HTMLElement;
            const comicDate = document.getElementById('comic_date') as HTMLElement;

            comicImg.src = comicData.img;
            comicImg.alt = comicData.alt;
            comicTitle.textContent = comicData.safe_title;

            const comicReleaseDate = new Date(
                parseInt(comicData.year),
                parseInt(comicData.month) - 1,
                parseInt(comicData.day)
            );
            comicDate.textContent = comicReleaseDate.toLocaleDateString();

            // Dynamic import for moment
            const moment = await import('moment');
            comicDate.textContent += ` (${moment.default(comicReleaseDate).fromNow()})`;

        } catch (error) {
            console.error('Error fetching comic data:', error);
        }
    } catch (error) {
        console.error('Error fetching comic ID:', error);
    }
});

