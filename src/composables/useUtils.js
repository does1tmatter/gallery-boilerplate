import { computed } from 'vue'
import { ethers } from 'ethers'

export const useUtils = () => {

    const paginate = (array, pageSize, pageNumber) => array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)

    const fixURL = (url) => {
        if (url.startsWith('ipfs')) {
          let hash = url.split('ipfs://')
          hash = hash.filter(x => !!x)
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

    return {
        paginate,
        fixURL,
        isMetaMaskInstalled,
        sliceAddress,
        formatBalance,
        randomNumber
    }
}