import os from 'os'
export const getOs = () => {
    const cpus = os.cpus();
    const username = os.userInfo().username
    const homedir = os.userInfo().homedir
    const architecture = os.arch()
    console.log(os.arch())
    cpus.map((item) => {
        delete item.times
    })
    console.table(cpus)
}
