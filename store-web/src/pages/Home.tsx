export default function Homepage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
      >
        <source src="/home.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-caramel-gold bg-opacity-10 z-10 pointer-events-none" />

      {/* Header Navigation */}
      <header className="absolute top-0 left-0 w-full z-20 bg-vanilla-beige bg-opacity-90 text-dark-brown shadow-md">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-caramel-gold">Patisserie</h1>
          <nav className="space-x-4 text-dark-brown">
            <a href="/login" className="hover:text-pistachio-green transition-colors">Login</a>
            <a href="/signup" className="hover:text-pistachio-green transition-colors">Sign up</a>
          </nav>
        </div>
      </header>

      {/* Centered Welcome Text */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-caramel-gold drop-shadow-lg">
          Welcome to Patisserie
        </h1>
        <p className="mt-4 text-lg text-vanilla-white max-w-xl">
          Handcrafted French desserts with love and care. Taste the magic of every bite.
        </p>

        {/* CTA Button */}
        <a
          href="/menu"
          className="mt-6 inline-block px-6 py-3 bg-caramel-gold text-milk-white rounded-full font-semibold hover:bg-pistachio-green transition-all duration-300"
        >
          Explore Our Menu
        </a>
      </div>
    </div>
  );
}
