const Showcase = ({img, title, desc, button}) => {
  return (
    <div className='text-[#fcf2de] flex flex-col items-center p-2 gap-2 md:w-1/3 pb-6'>
        <img className='rounded p-8' src={img} alt="" />
        <h3 className="text-xl">{title}</h3>
        <p className='text-[12px] text-center p-8'>{desc}</p>

    </div>
  )
}

export default Showcase