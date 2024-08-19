const Footer = (): JSX.Element => {
  return (
    <footer className="w-full bg-slate-200 fixed bottom-0 p-4 flex items-center justify-center">
      <p>
        <span>&copy; 2024 Kevin3991</span>
        <a
          href="mailto:court.dream3@gmail.com"
          className="text-dark ml-2 hover:underline"
        >
          (court.dream3@gmail.com)
        </a>
      </p>
      <div className="ml-3 flex items-center">
        <a
          href="https://github.com/sather33"
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center"
        >
          <i className="pi pi-github"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
