export default function PlacePhotos({place, index=0, className=null}) {
    if (!place.photos?.length) return '';
    if (!className) className = 'object-cover rounded-2xl';
    return (
        <img src={`http://localhost:3500/uploads/${place.photos[index]}`} alt="uploaded" className={className}/>
        
    )
}