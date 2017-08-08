class CacheProxy {
    _fetchData(url) {
        return fetch(url, {
            headers: {
                'X-Auth-Token': '765f919bb0b24db286cec8a8f9d1c0d0'
            }
        }).then(r => r.json());
    }



    constructor() {
        this.cache = {}

        this.get = url => {
            if (url in this.cache)
                return Promise.resolve(this.cache[url]);
            else
                return this._fetchData(url).then(data => {
                    this.cache[url] = data;
                    return data;
                });
        }
    }

}

module.exports = new CacheProxy();
