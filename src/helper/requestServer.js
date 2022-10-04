export const requestServer = (url) => {


    return fetch(url)
        .then(res =>
            res.ok ?
                (res.json()) :
                Promise.reject({
                    err: true,
                    status: res.status || "00",
                    statusText: res.statusText || "Ocurrio un Error"
                })
        )
        .catch(err => err)
}