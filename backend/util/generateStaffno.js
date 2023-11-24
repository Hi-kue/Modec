const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const numset = '0123456789';

const getRandomInt = (length = 1) => {
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomChar = Math.floor(Math.random() * charset.length);
        result += charset[randomChar];
    }
    
    return result;
}

const getRandomAlph = (length = 1) => {
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomNum = Math.floor(Math.random() * numset.length);
        result += numset[randomNum]
    }
    
    return result;
}

const generateStaffno = (maxAlph = 2, maxInt = 2) => {
    return `${getRandomAlph(maxAlph)}${getRandomInt(maxInt)}`;
}

export default generateStaffno;