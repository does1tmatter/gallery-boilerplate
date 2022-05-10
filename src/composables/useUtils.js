export const useUtils = () => {

    const paginate = (array, pageSize, pageNumber) => array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)

    const fixURL = (url) => {
        if (url.startsWith('ipfs')) {
          let hash = url.split('ipfs://')
          hash = hash.filter(x => !!x)
          return 'https://ipfs.moralis.io:2053/ipfs/' + hash
        } else {
          return url
        }
    }

    return {
        paginate,
        fixURL
    }
}