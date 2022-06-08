export const parseArgs = () => {
    for (let j = 0; j < process.argv.length; j++) {
        if (/--username/.test(process.argv[j])) {
            return `${process.argv[j].split('=').pop()}`
        }
    }
};

export const setUser  = () => {
    process.env.USERNAME = parseArgs();
}

export const sayHelloAndSetUser = () => {
    setUser()
    console.log(`Welcome to file manager, ${process.env.USERNAME}`)
    return `Welcome to file manager, ${process.env.USERNAME}`
}
