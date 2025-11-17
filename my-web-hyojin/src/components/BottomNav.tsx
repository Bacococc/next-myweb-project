import Link from "next/link";
export default async function BottomNav() {
  return (
    <footer 
      className="fixed bottom-0.5 z-50 w-full text-gray-300 text-md"
      role="banner"
    >
      <nav 
        className="container mx-auto px-10" role="navigation" aria-label="Bottom navigation"
      >
        <div className="flex items-center justify-between h-16">
          <Link href="/about-hyojin" className="hover:text-gray-100 focus:ring-2 focus:ring-gray-400 focus:outline-none focus:ring-offset-2 focus:ring-offset-black rounded-sm p-2">
            About me
          </Link>
          <Link href="/project" className="hover:text-gray-100 focus:ring-2 focus:ring-gray-400 focus:outline-none focus:ring-offset-2 focus:ring-offset-black rounded-sm p-2">
            Projects
          </Link>
          <Link href="/comment" className="hover:text-gray-100 focus:ring-2 focus:ring-gray-400 focus:outline-none focus:ring-offset-2 focus:ring-offset-black rounded-sm p-2">
            Comments
          </Link>
          <a href="https://drive.google.com/drive/folders/1PT0wl841gO2-TI_WroQ-6ggAkj3TMuMT?usp=drive_link" className="hover:text-gray-100 focus:ring-2 focus:ring-gray-400 focus:outline-none focus:ring-offset-2 focus:ring-offset-black rounded-sm p-2">
            DL Portfolio
          </a>
        </div>
        
      </nav>
    </footer>
  );
}
