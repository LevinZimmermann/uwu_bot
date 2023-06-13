export class APIquery {
    constructor() {

    }

    getSearch(params) {
        const Fetch = async () => {
            let respons = await fetch(`https://api.jikan.moe/v4/anime?q=${params.query}&order_by=title&sort=asc&limit=10`)
                .then(res => res.json())

            return respons
        }

        return Fetch
    }

    getTopTen() {
        const Fetch = async () => {
            let respons = await fetch(`https://api.jikan.moe/v4/top/anime`)
                .then(res => res.json())

            respons = respons.data.slice(0, 10);
            return respons
        }

        return Fetch
    }
}