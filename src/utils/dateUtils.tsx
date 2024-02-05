export const formatDate = (unixTime: number) => {
    const date = new Date(unixTime * 1000);
    return {
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes().toString().padStart(2, "0"),
    };
};
