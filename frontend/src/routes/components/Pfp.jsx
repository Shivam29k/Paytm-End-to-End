export function Pfp({ name }) {
    // name = [firstname, secondname]
    return <div className='h-full w-full rounded-full bg-amber-600 flex items-center justify-center p-1' >{`${name[0][0].toUpperCase()}${name[1][0].toUpperCase()}`}</div>
}