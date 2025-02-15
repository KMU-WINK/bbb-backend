const axios = require('axios');

const kakaoApi = axios.create({
    baseURL: 'https://dapi.kakao.com/v3/search/book',
    headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_ID}`,
    },
});

exports.kakaoSearch = async (query, options = {}) => {
    try {
        const { data } = await kakaoApi.get('', {
            params: { query, ...options },
        });
        return data;
    } catch (error) {
        console.error('Kakao API Error:', error.message);
        throw error;
    }
};
