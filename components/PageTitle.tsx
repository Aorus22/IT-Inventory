import React from "react";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className={"h-fit p-5 rounded-2xl w-full text-center bg-[#6495ED]"}>
            <h1 className='text-4xl font-bold text-white'>{title}</h1>
        </div>
    )
}

export default PageTitle