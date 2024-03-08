import { parseDate, getRandomInt } from './untils.js'
const btnOne = document.getElementById('send')
const btnTwo = document.getElementById('get')
const list = document.querySelector('#list')
const url = "http://localhost:3000"

const getCsv = () => {
    return fetch(`${url}/data.csv`)
        .then(res => res.text())
        .then(csvString => {
            const data = []
            const rows = csvString.split('\n');
            for (const row of rows) {
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
    await fetch(`${url}/api/user`, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(csv)
    })
})

btnTwo.addEventListener('click', async() => {
    const res = await fetch(`${url}/api/user`, {method: "GET"})
    const data = await res.json()
    for (const elem of data) {
        const date = new Date(Number(elem.createat))
        list.innerHTML += `<div>${elem.username} ${elem.email} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}</div>`
    }
})