import Link from 'next/link'
import '@/styles/globals.css';
 
export default function GlobalNotFound() {
  return (
    <html>
      <body>
        <main>
          <div className='items-center justify-center text-center text-white m-10'>
            <h2 className='text-xl'>Sorry, I am working on it! 🛠️</h2>
            <p>Could not find requested resource</p>
            <Link href="/" className='text-blue-300'>Return Home</Link>
          </div>
        </main>
      </body>
    </html>
  )
}