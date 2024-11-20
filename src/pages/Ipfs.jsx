import React, { useState } from 'react'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import axios from 'axios'

const Ipfs = () => {
  const [text, setText] = useState('')
  const [hash, setHash] = useState('')
  const [hash2, setHash2] = useState('')
  const [content, setContent] = useState('')

  const projectId = import.meta.env.VITE_PROJECT_ID
  const projectSecret = import.meta.env.VITE_PROJECT_SECRET
  const subdomain = import.meta.env.VITE_SUBDOMAIN

  const authorization = `Basic ${Buffer.from(
    `${projectId}:${projectSecret}`
  ).toString('base64')}`

  const client = create({
    host: 'infura-ipfs.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: authorization,
    },
  })

  console.log(client)

  const handleUpload = async (e) => {
    e.preventDefault()
    console.log(text)

    if (!text) {
      alert('Enter some text')
      return
    }
    const file = await client.add(Buffer.from(text))
    console.log(file, file.path)
    setHash(file.path)

    const resp = await axios.post('http://127.0.0.1:5000/api/ipfs/store', {
      hash: file.path,
      description: 'description1',
    })

    console.log(resp)
  }

  return (
    <div className='p-4'>
      <form className='flex flex-col border p-4'>
        <h1 className='mb-2'>Upload to IPFS</h1>
        <input
          type='text'
          placeholder='Enter Text to Store in IPFS'
          className='border p-2'
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleUpload} className='mt-4 border rounded-md'>
          IPFS Upload
        </button>
      </form>
      {hash && <div>IPFS Hash: {hash}</div>}
    </div>
  )
}

export default Ipfs
