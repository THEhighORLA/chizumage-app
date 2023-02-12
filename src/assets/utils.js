
export default  {
    computed: {
        $t() {
            return this.$i18n.t;
        },
        $n() {
            return this.$i18n.n;
        },
    },
    methods: {
        fetchUri(obj){
            let {
                url,
                method = "GET",
                mode ="cors",
                cache = "no-cache",
                credentials = "same-origin"
            } = obj;
            
            // * Develop: process.env.VUE_APP_API_URI
            // * Production: process.env.VUE_APP_API_HEROKU_URI
            let urlPrefix = process.env.VUE_APP_API_URI;
            urlPrefix = urlPrefix.endsWith('/')? urlPrefix : `${urlPrefix}/`;
            url = `${urlPrefix}${url}`;
            console.log('urlPrefix',urlPrefix)
            
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
                fetchConfig["body"] = [JSON.stringify(obj.params)];
            }
                fetch(url, fetchConfig)
                .then((response) => response.json())
                .then((data) => {
                obj.onSuccess(data)})
                .catch((data)=>{
                    obj.onError(data)
                });
                
        },
        preFormatCurrency(e){
            let val = e.target.value;
            e.target.value = val.replace(/\D/g, '');
        },
        formatCurrency(e){
            setTimeout(() => {
                let val = e.target.value;
                e.target.value = this.formatMoney(parseFloat(val));

            },20)
        },
        preventAlfa(e){
            const value = e.target.value
            const regex = /^\d*\.?\d*$/
            if (!regex.test(value)) {
                e.target.value = value.slice(0, -1)
            }
        },
        getCurrencyMask(){
            return '$##,##0.00';
        },
        formatMoney(i) {
            return this.$n(i, "currency", "en-US");
        },
        usDateToLatin(usDate){
            usDate = usDate.replaceAll('/', '-');
            let aux = usDate.split('-');
            let month = aux[0];
            let day = aux[1];
            let year = aux[2];
            
            return `${day}-${month}-${year}`;
        },
        latinDateToUs(latinDate){
            latinDate = latinDate.replaceAll('/', '-');
            let aux = latinDate.split('-');
            let month = aux[1];
            let day = aux[0];
            let year = aux[2];
            console.log('latinChange:')
            return `${month}-${day}-${year}`;
        },
        utilTest:()=>(
            "Esto es una prueba"
        ),
    },
}