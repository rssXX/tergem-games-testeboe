const getRandomInt = () => Math.floor(Math.random() * 20000);


const parseDate = (date) => {
    const [data, time] = date.split(' ')
    const [day, month, year] = data.split('.')
    return new Date(`${year}.${month}.${day} ${time}`).getTime()
}

export {getRandomInt, parseDate}