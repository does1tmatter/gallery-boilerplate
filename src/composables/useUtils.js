import { computed, reactive, ref } from 'vue'
import { ethers } from 'ethers'
import Moralis from "moralis/dist/moralis.min.js"

export const useUtils = () => {

  const paginate = (array, pageSize, pageNumber) => array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)

  const fixURL = (url) => {
    if (url.startsWith("ipfs")) {
      let hash = url.split("ipfs://")
      hash = hash.filter((x) => !!x)
      return `https://ipfs.moralis.io:2053/ipfs/${hash}`
    } else {
      return url
    }
  }

  const isMetaMaskInstalled = computed(() => Boolean(window.ethereum))

  const sliceAddress = (_address, chars = 5) => _address ? `${_address.slice(0, chars)}...${_address.slice(-chars)}` : null

  const formatBalance = (balance) => {
    const number = ethers.utils.formatEther(balance)
    return parseFloat(number).toFixed(4)
  }

  const randomNumber = (max) => Math.floor(Math.random() * max) + 1

  const getTokenId = (token) => Number(token.match(/\d+/))

  const generateFilters = (metadata) => {
    let filters = {}

    metadata.forEach((token) => {
      if (token.attributes) {
        token.attributes.forEach((attribute) => {
          if (!filters[attribute.trait_type]) {
            filters[attribute.trait_type] = []
          }
          if (!filters[attribute.trait_type].includes(attribute.value)) {
            filters[attribute.trait_type].push(attribute.value)
          }
        })
      }
    })
    for (const key in filters) {
      filters[key].sort((a, b) => a.localeCompare(b))
    }
    
    return filters
  }

  const createFilterObject = (list) => {
    const tempObj = reactive({})
    Object.keys(list).every((key) => tempObj[key] = [])
    tempObj.id = ref(null)
    return tempObj
  }

  const filterData = (_metadata, _filters) => {
    const filterById = (token) => _filters.id ? Number(_filters.id) === getTokenId(token.name) : true
    const filterByTraits = (token) => Object.entries(_filters).filter(([ key, value ]) => value?.length).map(([key, value]) => key).every(key => _filters[key].includes(token.attributes?.find(attribute => attribute.trait_type === key)?.value))
    return _metadata
            .filter(filterById)
            .filter(filterByTraits)
            .sort((a, b) => getTokenId(a.name) + getTokenId(b.name))
  }

  const getUserNFT = async (_address) => await Moralis.Web3API.account.getNFTsForContract({ chain: import.meta.env.VITE_NETWORK_ID, address: _address, token_address: import.meta.env.VITE_CONTRACT_ADDRESS })

  const getToken = async (_token) => await Moralis.Web3API.token.getTokenIdMetadata({ chain: import.meta.env.VITE_NETWORK_ID, token_id: _token, address: import.meta.env.VITE_CONTRACT_ADDRESS })


  return {
    paginate,
    fixURL,
    isMetaMaskInstalled,
    sliceAddress,
    formatBalance,
    randomNumber,
    getTokenId,
    generateFilters,
    createFilterObject,
    filterData,
    getUserNFT,
    getToken
  }
}
