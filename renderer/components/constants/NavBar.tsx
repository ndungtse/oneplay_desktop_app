import React, { useState } from 'react'
import { BiBell, BiCog, BiMinus, BiMovie, BiPlay, BiSearch, BiX } from 'react-icons/bi'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Navbar = () => {


  return (
    <div className="sm:px-11 z-[60] flex h-[60px] w-full items-center justify-between bg-[#030305]/90 border-b-2 navbar border-main/20 backdrop-blur-lg p-3 shadow-xl">
      <div className="flex ">
        <div className="flex w-[100px] cursor-pointer object-cover">
          <img src="/static/images/weblogo.svg" alt="" />
        </div>
      </div>
      <div className="flex items-center">
        <BiBell className="cursor-pointer rounded-full bg-stone-900 p-2  text-4xl text-gray-700" />
        <BiCog className="ml-2 cursor-pointer rounded-full bg-stone-900  p-2 text-4xl text-gray-700" />
        <div className="flex ml-5 items-center">
          <button>
            <BiMinus />
          </button>
          <button>
            <BiX />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
