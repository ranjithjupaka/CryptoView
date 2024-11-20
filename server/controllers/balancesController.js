const ERC20_ABI = require('../utils/erc20_abi.js')
const { Web3 } = require('web3')
require('dotenv').config()

const getTokenBalance = async (req, res) => {
  try {
    const { tokenAddress, walletAddress } = req.query

    const web3Provider = new Web3.providers.HttpProvider(process.env.NODE_URL)
    const web3 = new Web3(web3Provider)

    if (
      !web3.utils.isAddress(tokenAddress) ||
      !web3.utils.isAddress(walletAddress)
    ) {
      return res.status(400).json({
        success: false,
        error: 'Invalid token or wallet address',
      })
    }

    const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress)

    const [decimals, balance] = await Promise.all([
      tokenContract.methods.decimals().call(),
      tokenContract.methods.balanceOf(walletAddress).call(),
    ])

    console.log(decimals.toString(), balance.toString())

    const balanceInTokens = web3.utils.fromWei(
      parseInt(balance.toString()),
      parseInt(decimals.toString())
    )
    console.log(balanceInTokens)

    return res.json({
      success: true,
      data: {
        tokenAddress,
        walletAddress,
        balance: balance.toString(),
        balanceFormatted: balanceInTokens.toString(),
        decimals: decimals.toString(),
      },
    })
  } catch (error) {
    console.error('Error fetching token balance:', error)
    return res.status(500).json({
      success: false,
      error: 'Error fetching token balance',
    })
  }
}

module.exports = { getTokenBalance }
