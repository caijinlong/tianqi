export default function Footer() {
  return (
    <footer className="text-center py-6 text-sm text-slate-400">
      数据来源：
      <a
        href="https://open-meteo.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-slate-600"
      >
        Open-Meteo
      </a>
    </footer>
  );
}
