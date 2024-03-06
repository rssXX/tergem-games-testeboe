const btnOne = document.getElementById('send')
const btnTwo = document.getElementById('get')
const spisok = document.querySelector('#spisok')


const getRandomInt = () => Math.floor(Math.random() * (20000 - 0) + 0);


const parseDate = (date) => {
    const [data, time] = date.split(' ')
    const [day, month, year] = data.split('.')
    return new Date(`${year}.${month}.${day} ${time}`).getTime()
}

const getCsv = async () => {
    return await fetch('http://localhost:3000/data.csv')
        .then(res => res.text())
        .then(csvString => {
            const data = []
            const rows = csvString.split('\n');
            for (row of rows) {
                const elem = row.replace('\r', '').split("; ");
                data.push({
                    id: getRandomInt(),
                    username: elem[0],
                    email: elem[1],
                    createAt: parseDate(elem[2]),
                    status: elem[3]
                })
            }
            return data
        })
}

btnOne.addEventListener('click', async () => {
    const csv = await getCsv()
    const response = await fetch('http://localhost:3000/api/user', {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(csv)
    })
})

btnTwo.addEventListener('click', async() => {
    const data = await fetch('http://localhost:3000/api/user', {method: "GET"})
        .then(res => res.json())
    console.log(data);
    for (const elem of data) {
        const date = new Date(+elem.createat)
        spisok.innerHTML += `<div>${elem.username} ${elem.email} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}</div>`
    }
})