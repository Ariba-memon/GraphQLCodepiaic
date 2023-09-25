import Image from 'next/image'

//graphql tag
//npm i
//npm install graphql-tag
const getData  = async() =>{
  const res = await fetch("https://countries.trevorblades.com/",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    cache:"force-cache",
    body: JSON.stringify({
      query: `query GetCountries {
        countries{
          name
          
           
          }
        
        
        }`
    })

  })
  const data = await res.json()
return data
}

    

export default function Home(){
  return(
    <main className="flex min-h-screen flex-col ">

    </main>
  )
}