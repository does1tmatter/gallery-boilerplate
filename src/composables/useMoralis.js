import Moralis from 'moralis/dist/moralis.min.js'
import { computed, ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import { createSharedComposable } from '@vueuse/core'
import { useUtils } from '@/composables/useUtils'

export const useMoralis = createSharedComposable(() => {

    const toast = useToast()
    const { fixURL } = useUtils()

    const user = reactive({
        address: null,
        balance: null,
        ensName: null,
        ensAvatar: null,
        chain: null,
        username: computed(() => user.ensName || sliceAddress(user.address)),
        isNetwork: computed(() => import.meta.env.VITE_NETWORK_ID === user.chain),
        ownedBalance: computed(() => ownedNFT.value.length)
    })

    let ownedNFT = ref([])

    const isAuthenticated = computed(() => user.address)
    const provider = computed(() => window.ethereum || null)
    const isMetaMaskInstalled = computed(() => Boolean(provider.value))

    const detectChain = async () => user.chain = await provider.value.request({ method: 'eth_chainId' })

    const handleUser = async (_address) => {
        try {
            const isWeb3 = Moralis.isWeb3Enabled()
            if (isWeb3) await Moralis.deactivateWeb3()
            if (user.address) resetUser()
            const ethers = await Moralis.enableWeb3()
            user.address = _address
            user.balance = await ethers.getBalance(_address).then(res => parseFloat(Moralis.Units.FromWei(res)))
            user.ensName = await ethers.lookupAddress(_address)
            user.ensAvatar = await ethers.getAvatar(_address)
            await getUserNFT(_address).then(res => res.result.map(x => ownedNFT.value.push(JSON.parse(x.metadata))))
                .finally(() => ownedNFT.value.map(x => x.image = fixURL(x.image)))
        } catch (error) {
            console.log(error)
        }
    }

    const getConnectedUser = async () => {
        try {
            const user = Moralis.User.current()
            if (user) handleUser(user.get('ethAddress'))
        } catch (error) {
            console.error(error)
        }
    }

    const resetUser = () => {
        user.address = null
        user.balance = null
        user.ensName = null
        user.ensAvatar = null
        ownedNFT.value = []
    }

    const connect = async (provider) => {
        try {
            await Moralis.authenticate({ signingMessage: 'Log in to gallery', provider })
                .then((res) => {
                    const { attributes: { accounts } } = res
                    handleUser(accounts[0])
                    toast.success('Authenticated')
                })
        } catch (error) {
            console.error(error)
        }
    }
    
    const setChain = (_chain) => user.chain = _chain

    const disconnect = async () => await Moralis.User.logOut().then(() => resetUser()).finally(() => toast.success('Disconnected'))

    const getUserNFT = async (_address) => await Moralis.Web3API.account.getNFTsForContract({ chain: '0x1', address: _address, token_address: import.meta.env.VITE_CONTRACT_ADDRESS })

    const sliceAddress = (_address, chars = 5) => _address ? `${_address.slice(0, chars)}...${_address.slice(-chars+2)}` : null

    return {
        setChain,
        detectChain,
        isAuthenticated,
        isMetaMaskInstalled,
        connect,
        disconnect,
        getConnectedUser,
        user,
        ownedNFT,
        sliceAddress,
        handleUser
    }
})