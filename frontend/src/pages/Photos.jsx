export default function Photos({photosLink, setPhotosLink, addPhotoByLink, addedPhotos, uploadPhoto, onChange}) {
    
    function removePhoto(ev,filename) 
    {
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo => photo !== filename)]);
    }

    function selectMainPhoto(ev,filename)
    {
        ev.preventDefault();
        onChange([filename, ...addedPhotos.filter(photo => photo !== filename)]);
    }
    return (
        <>
            <div className='flex gap-2'>
                <input 
                    className=""
                    type="text" 
                    placeholder={'Add using a link...jpg'}
                    value={photosLink}
                    onChange={(e) => setPhotosLink(e.target.value)}
                    />
                    <button 
                        className='primary max-w-12'
                        onClick={addPhotoByLink}
                        >Add&nbsp;</button>
            </div>
            <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                {addedPhotos.length > 0 && addedPhotos.map
                    (link =>
                        (
                            <div className='h-32 flex relative' key={link}>
                                <img src={`http://localhost:3500/uploads/${link}`} alt='uploaded' className='w-full h-32 object-cover rounded-2xl' />
                                <button  onClick={ev => removePhoto(ev,link)} className="absolute bottom-1 right-1 text-white bg-gray-700 bg-opacity-50 rounded-2xl p-2 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                                <button  onClick={ev => selectMainPhoto(ev,link)} className="absolute bottom-1 left-1 text-white bg-yellow-700 bg-opacity-50 rounded-2xl p-2 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-300">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                                </button>
                            </div>

                        )
                    )
                }
                <label className='border bg-transparent rounded-2xl items-center text-gray-500 text-2xl my-3 flex justify-center gap-2'>
                    <input type="file" multiple className='hidden cursor-context-menu' onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    Upload
                </label>
            </div>
            </>
    )
}
