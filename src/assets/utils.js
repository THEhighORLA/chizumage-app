const util = {};
util.fetchUri = (obj) => {
    let {
        method = "GET",
        mode ="cors",
        cache = "no-cache",
        credentials = "same-origin"
    } = obj;

    let fetchConfig = {
        method,
        mode,
        cache,
        credentials,
        headers: Object.assign({
            "Content-Type": "application/json",
        }, obj.headers),
    };
    if (obj.params) {
        fetchConfig["body"] = obj.params;
    }
    fetch(obj.url, fetchConfig)
        .then((response) => response.json())
        .then((data) => {
        obj.onSuccess(data);
    });
};

util.utilTest = ()=>(
    "Esto es una prueba"
);
