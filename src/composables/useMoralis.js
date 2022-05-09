import Moralis from 'moralis'
import { computed, ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import { createSharedComposable } from '@vueuse/core'

export const useMoralis = createSharedComposable(() => {

    const toast = useToast()

    const user = reactive({
        address: null,
        balance: null,
        ensName: null,
        ensAvatar: null,
        chain: null,
        username: computed(() => user.ensName || sliceAddress(user.address)),
        isNetwork: computed(() => import.meta.env.VITE_NETWORK_ID === user.chain),
        ownedBalance: computed(() => ownedNFT.value ? (ownedNFT.value).length : 0)
    })

    const ownedNFT = ref(null)

    const isAuthenticated = computed(() => Boolean(user.address))
    const provider = computed(() => window.ethereum || null)
    const isMetaMaskInstalled = computed(() => Boolean(provider.value))

    const detectChain = async () => user.chain = await provider.value.request({ method: 'eth_chainId' })

    const handleUser = async (_address) => {
        try {
            const ethers = await Moralis.enableWeb3()
            user.address = _address
            user.balance = await ethers.getBalance(_address).then(res => parseFloat(Moralis.Units.FromWei(res)))
            user.ensName = await ethers.lookupAddress(_address)
            user.ensAvatar = await ethers.getAvatar(_address)
            await getUserNFT(_address).then(res => ownedNFT.value = res.result)
        } catch (error) {
            console.log(error)
        } finally {
            await Moralis.deactivateWeb3()
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
        ownedNFT.value = null
        toast.success('Disconnected')
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

    const disconnect = async () => await Moralis.User.logOut().then(() => resetUser())

    const getUserNFT = async (address) => await Moralis.Web3API.account.getNFTsForContract({ chain: 'eth', address, token_address: import.meta.env.VITE_CONTRACT_ADDRESS })

    const sliceAddress = (_address, chars = 5) => _address ? `${_address.slice(0, chars)}...${_address.slice(-chars)}` : null

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
        sliceAddress
    }
})