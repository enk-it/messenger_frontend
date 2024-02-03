export const getTicks  = () => {
    const currentDate = new Date();
    // const ms = currentDate.toISOString();
    const ms = currentDate.getTime();

    let divider = 100

    let res = Math.ceil(ms/divider)

    console.log(res, ms)

    return ms;
}

