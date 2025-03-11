export const Footer = () => {
  return (
    <div className="bg-white">
      <footer className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        Petfinder © {new Date().getFullYear()}
      </footer>
    </div>
  );
};
Footer.displayName = 'Footer';
