import { ref, reactive, inject, computed } from "vue"
import { useUtils, useWallet } from "@/composables/"
import { createSharedComposable } from "@vueuse/core"
import { useToast } from "vue-toastification"
import Moralis from "moralis/dist/moralis.min.js"

export const useUser = createSharedComposable(() => {
  const {
    getChainId,
    getBalance,
    lookupAddress,
    getCurrentUser,
    requestAccounts,
    getAvatar,
  } = useWallet()
  const { formatBalance, sliceAddress, fixURL } = useUtils()
  const toast = useToast()

  const user = reactive({
    address: null,
    balance: null,
    ensName: null,
    ensAvatar: null,
    chain: null,
    username: computed(() => user.ensName || sliceAddress(user.address)),
    isNetwork: computed(() => import.meta.env.VITE_NETWORK_ID === user.chain),
    ownedBalance: computed(() => ownedTokens.value ? ownedTokens.value.length : 0),
  })

  const ownedTokens = ref(null)

  const userLoading = ref(false)
  const isNetwork = computed(() => Boolean(user.chain === import.meta.env.VITE_NETWORK_ID))
  const isAuthenticated = computed(() => Boolean(user.address))

  const setChain = (_chain) => (user.chain = _chain)

  const getUserNFT = async (_address) => await Moralis.Web3API.account.getNFTsForContract({ chain: import.meta.env.VITE_NETWORK_ID, address: _address, token_address: import.meta.env.VITE_CONTRACT_ADDRESS })

  const loadUserData = async (accounts) => {
    try {
      if (accounts.length === 0) {
        const ch = await getChainId()
        return {
          address: null,
          ensName: null,
          username: null,
          balance: null,
          chain: ch
        }
      } else {
        const ens = await lookupAddress(accounts[0])
        const ensAv = await getAvatar(ens || "")
        const bal = await getBalance(accounts[0])
        const ch = await getChainId()
        const ownedNFT = await getUserNFT(accounts[0]).then((res) =>res.result.map((x) => JSON.parse(x.metadata)))
        ownedNFT.map((x) => (x.image = fixURL(x.image)))
        return {
          address: accounts[0],
          ensName: ens,
          eAvatar: ensAv,
          balance: parseFloat(formatBalance(bal)),
          chain: ch,
          ownedNFTs: ownedNFT
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setUserData = (data) => {
    user.address = data.address
    user.ensName = data.ensName
    user.ensAvatar = data.eAvatar
    user.balance = data.balance
    user.chain = data.chain
    ownedTokens.value = data.ownedNFTs
  }

  const resetUser = () => {
    user.address = null
    user.ensName = null
    user.ensAvatar = null
    user.balance = null
    ownedTokens.value = null
  }

  const loadConnectedUser = async () => {
    try {
      userLoading.value = true
      await getCurrentUser().then((res) =>
        loadUserData(res).then((data) => {
          userLoading.value = false
          setUserData(data)
        })
      )
    } catch (error) {
      console.log(error)
      userLoading.value = false
      userError()
    }
  }

  const detectChain = () => getChainId().then((res) => setChain(res))

  const connectUser = async () => {
    try {
      userLoading.value = true
      await requestAccounts().then((res) =>
        loadUserData(res).then((data) => {
          setUserData(data)
          userLoading.value = false
          userSuccess()
        })
      )
    } catch (error) {
      userLoading.value = false
      userError()
    }
  }

  const userSuccess = (string = "Authenticated") => toast.success(string)

  const userError = () => toast.error("Failed to log in")

  return {
    userLoading,
    loadConnectedUser,
    isNetwork,
    isAuthenticated,
    setChain,
    detectChain,
    resetUser,
    connectUser,
    loadUserData,
    ownedTokens,
    user,
  }
})
