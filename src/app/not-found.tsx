import "@/styles/globals.css";

// Unknown locale or path: the root layout renders no <html>, so this page brings its own.
export default function NotFound() {
  return (
    <html lang="es">
      <body className="flex min-h-screen items-center justify-center bg-canvas px-4 text-center">
        <main>
          <p className="text-[0.875rem] text-ink-3">404</p>
          <h1 className="display-3 mt-2">Esta página no existe · This page doesn’t exist</h1>
          <a href="/" className="btn-primary mt-6">Departify</a>
        </main>
      </body>
    </html>
  );
}
