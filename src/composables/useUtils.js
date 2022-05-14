import { computed, reactive, ref } from 'vue'
import { ethers } from 'ethers'

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

    return filters
  }

  const createFilterObject = (list) => {
    const tempObj = reactive({})
    Object.keys(list).every((key) => (tempObj[key] = []))
    tempObj.id = ref(null)
    return tempObj
  }

  return {
    paginate,
    fixURL,
    isMetaMaskInstalled,
    sliceAddress,
    formatBalance,
    randomNumber,
    getTokenId,
    generateFilters,
    createFilterObject
  }
}
