export const getCurrentTimestamp = () => {
    const date = new Date();
    date.setHours(date.getHours() + 9);
    const isoString = date.toISOString();
    const formattedTimestamp = isoString.slice(0, 10) + 'T' + isoString.slice(11, 19);

    return formattedTimestamp;
};
