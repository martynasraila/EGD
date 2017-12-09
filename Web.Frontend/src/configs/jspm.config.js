SystemJS.config({
    baseURL: "/",
    paths: {
        "npm:": "libs/npm/",
        "github:": "libs/github/"
    },
    packages: {
        "": {
            "meta": {
                "*.css": {
                    "loader": "css"
                }
            }
        }
    },
    map: {
        "whatwg-fetch": "npm:whatwg-fetch@2.0.3"
    }
});

SystemJS.config({
    packageConfigPaths: [
        "npm:@*/*.json",
        "npm:*.json",
        "github:*/*.json"
    ],
    map: {
        "classnames": "npm:classnames@2.2.5",
        "react-router-dom": "npm:react-router-dom@4.2.2",
        "assert": "npm:jspm-nodelibs-assert@0.2.1",
        "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
        "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
        "constants": "npm:jspm-nodelibs-constants@0.2.1",
        "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
        "css": "github:systemjs/plugin-css@0.1.35",
        "domain": "npm:jspm-nodelibs-domain@0.2.1",
        "events": "npm:jspm-nodelibs-events@0.2.2",
        "flux": "npm:flux@3.1.2",
        "fs": "npm:jspm-nodelibs-fs@0.2.1",
        "http": "npm:jspm-nodelibs-http@0.2.0",
        "https": "npm:jspm-nodelibs-https@0.2.2",
        "immutable": "npm:immutable@3.8.1",
        "json": "github:systemjs/plugin-json@0.3.0",
        "os": "npm:jspm-nodelibs-os@0.2.1",
        "path": "npm:jspm-nodelibs-path@0.2.3",
        "process": "npm:jspm-nodelibs-process@0.2.1",
        "react": "npm:react@15.5.4",
        "react-dom": "npm:react-dom@15.5.4",
        "simplr-flux": "npm:simplr-flux@2.0.1",
        "stream": "npm:jspm-nodelibs-stream@0.2.1",
        "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.1",
        "url": "npm:jspm-nodelibs-url@0.2.1",
        "util": "npm:jspm-nodelibs-util@0.2.2",
        "vm": "npm:jspm-nodelibs-vm@0.2.1",
        "zlib": "npm:jspm-nodelibs-zlib@0.2.3"
    },
    packages: {
        "npm:simplr-flux@2.0.1": {
            "map": {
                "flux": "npm:flux@3.1.2",
                "immutable": "npm:immutable@3.8.1",
                "action-emitter": "npm:action-emitter@0.2.1",
                "@types/flux": "npm:@types/flux@3.1.0"
            }
        },
        "npm:flux@3.1.2": {
            "map": {
                "fbjs": "npm:fbjs@0.8.16",
                "fbemitter": "npm:fbemitter@2.1.1"
            }
        },
        "npm:react-dom@15.5.4": {
            "map": {
                "fbjs": "npm:fbjs@0.8.16",
                "loose-envify": "npm:loose-envify@1.3.1",
                "prop-types": "npm:prop-types@15.5.10",
                "object-assign": "npm:object-assign@4.1.1"
            }
        },
        "npm:react@15.5.4": {
            "map": {
                "fbjs": "npm:fbjs@0.8.16",
                "loose-envify": "npm:loose-envify@1.3.1",
                "prop-types": "npm:prop-types@15.5.10",
                "object-assign": "npm:object-assign@4.1.1"
            }
        },
        "npm:jspm-nodelibs-buffer@0.2.3": {
            "map": {
                "buffer": "npm:buffer@5.0.8"
            }
        },
        "npm:jspm-nodelibs-domain@0.2.1": {
            "map": {
                "domain-browser": "npm:domain-browser@1.1.7"
            }
        },
        "npm:jspm-nodelibs-stream@0.2.1": {
            "map": {
                "stream-browserify": "npm:stream-browserify@2.0.1"
            }
        },
        "npm:jspm-nodelibs-http@0.2.0": {
            "map": {
                "http-browserify": "npm:stream-http@2.7.2"
            }
        },
        "npm:jspm-nodelibs-zlib@0.2.3": {
            "map": {
                "browserify-zlib": "npm:browserify-zlib@0.1.4"
            }
        },
        "npm:jspm-nodelibs-crypto@0.2.1": {
            "map": {
                "crypto-browserify": "npm:crypto-browserify@3.12.0"
            }
        },
        "npm:jspm-nodelibs-os@0.2.1": {
            "map": {
                "os-browserify": "npm:os-browserify@0.2.1"
            }
        },
        "npm:jspm-nodelibs-string_decoder@0.2.1": {
            "map": {
                "string_decoder": "npm:string_decoder@0.10.31"
            }
        },
        "npm:jspm-nodelibs-url@0.2.1": {
            "map": {
                "url": "npm:url@0.11.0"
            }
        },
        "npm:action-emitter@0.2.1": {
            "map": {
                "fbemitter": "npm:fbemitter@2.1.1",
                "@types/fbemitter": "npm:@types/fbemitter@2.0.32"
            }
        },
        "npm:prop-types@15.5.10": {
            "map": {
                "fbjs": "npm:fbjs@0.8.16",
                "loose-envify": "npm:loose-envify@1.3.1"
            }
        },
        "npm:fbemitter@2.1.1": {
            "map": {
                "fbjs": "npm:fbjs@0.8.16"
            }
        },
        "npm:loose-envify@1.3.1": {
            "map": {
                "js-tokens": "npm:js-tokens@3.0.2"
            }
        },
        "npm:stream-browserify@2.0.1": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "readable-stream": "npm:readable-stream@2.3.3"
            }
        },
        "npm:stream-http@2.7.2": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "readable-stream": "npm:readable-stream@2.3.3",
                "builtin-status-codes": "npm:builtin-status-codes@3.0.0",
                "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
                "xtend": "npm:xtend@4.0.1"
            }
        },
        "npm:browserify-zlib@0.1.4": {
            "map": {
                "readable-stream": "npm:readable-stream@2.3.3",
                "pako": "npm:pako@0.2.9"
            }
        },
        "npm:@types/flux@3.1.0": {
            "map": {
                "@types/react": "npm:@types/react@15.0.29",
                "@types/fbemitter": "npm:@types/fbemitter@2.0.32"
            }
        },
        "npm:url@0.11.0": {
            "map": {
                "querystring": "npm:querystring@0.2.0",
                "punycode": "npm:punycode@1.3.2"
            }
        },
        "npm:isomorphic-fetch@2.2.1": {
            "map": {
                "whatwg-fetch": "npm:whatwg-fetch@2.0.3",
                "node-fetch": "npm:node-fetch@1.7.3"
            }
        },
        "npm:diffie-hellman@5.0.2": {
            "map": {
                "randombytes": "npm:randombytes@2.0.5",
                "miller-rabin": "npm:miller-rabin@4.0.1",
                "bn.js": "npm:bn.js@4.11.8"
            }
        },
        "npm:browserify-sign@4.0.4": {
            "map": {
                "create-hmac": "npm:create-hmac@1.1.6",
                "create-hash": "npm:create-hash@1.1.3",
                "inherits": "npm:inherits@2.0.3",
                "browserify-rsa": "npm:browserify-rsa@4.0.1",
                "elliptic": "npm:elliptic@6.4.0",
                "bn.js": "npm:bn.js@4.11.8",
                "parse-asn1": "npm:parse-asn1@5.1.0"
            }
        },
        "npm:public-encrypt@4.0.0": {
            "map": {
                "randombytes": "npm:randombytes@2.0.5",
                "create-hash": "npm:create-hash@1.1.3",
                "browserify-rsa": "npm:browserify-rsa@4.0.1",
                "bn.js": "npm:bn.js@4.11.8",
                "parse-asn1": "npm:parse-asn1@5.1.0"
            }
        },
        "npm:create-hmac@1.1.6": {
            "map": {
                "create-hash": "npm:create-hash@1.1.3",
                "inherits": "npm:inherits@2.0.3",
                "sha.js": "npm:sha.js@2.4.9",
                "ripemd160": "npm:ripemd160@2.0.1",
                "safe-buffer": "npm:safe-buffer@5.1.1",
                "cipher-base": "npm:cipher-base@1.0.4"
            }
        },
        "npm:create-hash@1.1.3": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "sha.js": "npm:sha.js@2.4.9",
                "ripemd160": "npm:ripemd160@2.0.1",
                "cipher-base": "npm:cipher-base@1.0.4"
            }
        },
        "npm:randombytes@2.0.5": {
            "map": {
                "safe-buffer": "npm:safe-buffer@5.1.1"
            }
        },
        "npm:create-ecdh@4.0.0": {
            "map": {
                "elliptic": "npm:elliptic@6.4.0",
                "bn.js": "npm:bn.js@4.11.8"
            }
        },
        "npm:browserify-cipher@1.0.0": {
            "map": {
                "browserify-aes": "npm:browserify-aes@1.1.1",
                "browserify-des": "npm:browserify-des@1.0.0",
                "evp_bytestokey": "npm:evp_bytestokey@1.0.3"
            }
        },
        "npm:ripemd160@2.0.1": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "hash-base": "npm:hash-base@2.0.2"
            }
        },
        "npm:browserify-rsa@4.0.1": {
            "map": {
                "bn.js": "npm:bn.js@4.11.8",
                "randombytes": "npm:randombytes@2.0.5"
            }
        },
        "npm:elliptic@6.4.0": {
            "map": {
                "bn.js": "npm:bn.js@4.11.8",
                "inherits": "npm:inherits@2.0.3",
                "brorand": "npm:brorand@1.1.0",
                "hash.js": "npm:hash.js@1.1.3",
                "hmac-drbg": "npm:hmac-drbg@1.0.1",
                "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
                "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
            }
        },
        "npm:parse-asn1@5.1.0": {
            "map": {
                "browserify-aes": "npm:browserify-aes@1.1.1",
                "create-hash": "npm:create-hash@1.1.3",
                "pbkdf2": "npm:pbkdf2@3.0.14",
                "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
                "asn1.js": "npm:asn1.js@4.9.2"
            }
        },
        "npm:browserify-des@1.0.0": {
            "map": {
                "cipher-base": "npm:cipher-base@1.0.4",
                "inherits": "npm:inherits@2.0.3",
                "des.js": "npm:des.js@1.0.0"
            }
        },
        "npm:hash-base@2.0.2": {
            "map": {
                "inherits": "npm:inherits@2.0.3"
            }
        },
        "npm:hmac-drbg@1.0.1": {
            "map": {
                "hash.js": "npm:hash.js@1.1.3",
                "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
                "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
            }
        },
        "npm:des.js@1.0.0": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
            }
        },
        "npm:encoding@0.1.12": {
            "map": {
                "iconv-lite": "npm:iconv-lite@0.4.19"
            }
        },
        "npm:react-router-dom@4.2.2": {
            "map": {
                "prop-types": "npm:prop-types@15.5.10",
                "loose-envify": "npm:loose-envify@1.3.1",
                "invariant": "npm:invariant@2.2.2",
                "warning": "npm:warning@3.0.0",
                "history": "npm:history@4.7.2",
                "react-router": "npm:react-router@4.2.0"
            }
        },
        "npm:invariant@2.2.2": {
            "map": {
                "loose-envify": "npm:loose-envify@1.3.1"
            }
        },
        "npm:warning@3.0.0": {
            "map": {
                "loose-envify": "npm:loose-envify@1.3.1"
            }
        },
        "npm:fbjs@0.8.16": {
            "map": {
                "loose-envify": "npm:loose-envify@1.3.1",
                "object-assign": "npm:object-assign@4.1.1",
                "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
                "setimmediate": "npm:setimmediate@1.0.5",
                "ua-parser-js": "npm:ua-parser-js@0.7.17",
                "promise": "npm:promise@7.3.1",
                "core-js": "npm:core-js@1.2.7"
            }
        },
        "npm:history@4.7.2": {
            "map": {
                "invariant": "npm:invariant@2.2.2",
                "loose-envify": "npm:loose-envify@1.3.1",
                "warning": "npm:warning@3.0.0",
                "value-equal": "npm:value-equal@0.4.0",
                "resolve-pathname": "npm:resolve-pathname@2.2.0"
            }
        },
        "npm:react-router@4.2.0": {
            "map": {
                "history": "npm:history@4.7.2",
                "invariant": "npm:invariant@2.2.2",
                "loose-envify": "npm:loose-envify@1.3.1",
                "prop-types": "npm:prop-types@15.5.10",
                "warning": "npm:warning@3.0.0",
                "hoist-non-react-statics": "npm:hoist-non-react-statics@2.3.1",
                "path-to-regexp": "npm:path-to-regexp@1.7.0"
            }
        },
        "npm:promise@7.3.1": {
            "map": {
                "asap": "npm:asap@2.0.6"
            }
        },
        "npm:readable-stream@2.3.3": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "string_decoder": "npm:string_decoder@1.0.3",
                "safe-buffer": "npm:safe-buffer@5.1.1",
                "isarray": "npm:isarray@1.0.0",
                "core-util-is": "npm:core-util-is@1.0.2",
                "process-nextick-args": "npm:process-nextick-args@1.0.7",
                "util-deprecate": "npm:util-deprecate@1.0.2"
            }
        },
        "npm:path-to-regexp@1.7.0": {
            "map": {
                "isarray": "npm:isarray@0.0.1"
            }
        },
        "npm:string_decoder@1.0.3": {
            "map": {
                "safe-buffer": "npm:safe-buffer@5.1.1"
            }
        },
        "npm:node-fetch@1.7.3": {
            "map": {
                "encoding": "npm:encoding@0.1.12",
                "is-stream": "npm:is-stream@1.1.0"
            }
        },
        "npm:buffer@5.0.8": {
            "map": {
                "ieee754": "npm:ieee754@1.1.8",
                "base64-js": "npm:base64-js@1.2.1"
            }
        },
        "npm:crypto-browserify@3.12.0": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "create-hmac": "npm:create-hmac@1.1.6",
                "create-ecdh": "npm:create-ecdh@4.0.0",
                "browserify-cipher": "npm:browserify-cipher@1.0.0",
                "pbkdf2": "npm:pbkdf2@3.0.14",
                "diffie-hellman": "npm:diffie-hellman@5.0.2",
                "public-encrypt": "npm:public-encrypt@4.0.0",
                "randombytes": "npm:randombytes@2.0.5",
                "browserify-sign": "npm:browserify-sign@4.0.4",
                "create-hash": "npm:create-hash@1.1.3",
                "randomfill": "npm:randomfill@1.0.3"
            }
        },
        "npm:pbkdf2@3.0.14": {
            "map": {
                "safe-buffer": "npm:safe-buffer@5.1.1",
                "create-hash": "npm:create-hash@1.1.3",
                "create-hmac": "npm:create-hmac@1.1.6",
                "sha.js": "npm:sha.js@2.4.9",
                "ripemd160": "npm:ripemd160@2.0.1"
            }
        },
        "npm:randomfill@1.0.3": {
            "map": {
                "randombytes": "npm:randombytes@2.0.5",
                "safe-buffer": "npm:safe-buffer@5.1.1"
            }
        },
        "npm:sha.js@2.4.9": {
            "map": {
                "safe-buffer": "npm:safe-buffer@5.1.1",
                "inherits": "npm:inherits@2.0.3"
            }
        },
        "npm:evp_bytestokey@1.0.3": {
            "map": {
                "safe-buffer": "npm:safe-buffer@5.1.1",
                "md5.js": "npm:md5.js@1.3.4"
            }
        },
        "npm:browserify-aes@1.1.1": {
            "map": {
                "safe-buffer": "npm:safe-buffer@5.1.1",
                "cipher-base": "npm:cipher-base@1.0.4",
                "inherits": "npm:inherits@2.0.3",
                "create-hash": "npm:create-hash@1.1.3",
                "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
                "buffer-xor": "npm:buffer-xor@1.0.3"
            }
        },
        "npm:cipher-base@1.0.4": {
            "map": {
                "safe-buffer": "npm:safe-buffer@5.1.1",
                "inherits": "npm:inherits@2.0.3"
            }
        },
        "npm:miller-rabin@4.0.1": {
            "map": {
                "bn.js": "npm:bn.js@4.11.8",
                "brorand": "npm:brorand@1.1.0"
            }
        },
        "npm:md5.js@1.3.4": {
            "map": {
                "hash-base": "npm:hash-base@3.0.4",
                "inherits": "npm:inherits@2.0.3"
            }
        },
        "npm:hash-base@3.0.4": {
            "map": {
                "safe-buffer": "npm:safe-buffer@5.1.1",
                "inherits": "npm:inherits@2.0.3"
            }
        },
        "npm:asn1.js@4.9.2": {
            "map": {
                "bn.js": "npm:bn.js@4.11.8",
                "inherits": "npm:inherits@2.0.3",
                "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
            }
        },
        "npm:hash.js@1.1.3": {
            "map": {
                "inherits": "npm:inherits@2.0.3",
                "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
            }
        }
    }
});
